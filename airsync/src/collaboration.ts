import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { Database, ref, push, onChildAdded } from 'firebase/database';
import { EditorView } from '@codemirror/view';
import { StateEffect, Extension } from '@codemirror/state';
import { AwarenessProvider } from './awareness-provider';

export class CollaborationManager {
  private docs = new Map<string, Y.Doc>();
  private ytexts = new Map<string, Y.Text>();
  private unsubs = new Map<string, () => void>();
  private boundPaths = new Set<string>();
  private awarenessProviders = new Map<string, AwarenessProvider>();
  private db: Database;
  private displayName: string;
  private userColor: string;
  private userId: string;

  constructor(db: Database, displayName: string, userColor: string, userId: string) {
    this.db = db;
    this.displayName = displayName;
    this.userColor = userColor;
    this.userId = userId;
  }

  openDocument(path: string): void {
    if (this.docs.has(path)) return;

    const doc = new Y.Doc();
    const ytext = doc.getText('content');
    const encoded = encodePath(path);
    const updatesRef = ref(this.db, `docs/${encoded}/updates`);

    const unsub = onChildAdded(updatesRef, (snapshot) => {
      const val = snapshot.val();
      if (typeof val !== 'string') return;
      try {
        Y.applyUpdate(doc, decodeUpdate(val), 'firebase');
      } catch (e) {
        console.error('Airsync: Failed to apply update', e);
      }
    });

    doc.on('update', (update: Uint8Array, origin: any) => {
      if (origin === 'firebase') return;
      push(updatesRef, encodeUpdate(update))
        .catch((err) => console.error('Airsync: push failed', err));
    });

    const awareness = new AwarenessProvider(
      doc, this.db, path, this.userId,
      this.displayName, this.userColor,
    );

    this.docs.set(path, doc);
    this.ytexts.set(path, ytext);
    this.unsubs.set(path, unsub);
    this.awarenessProviders.set(path, awareness);
  }

  bindEditor(path: string, editorView: EditorView): void {
    const ytext = this.ytexts.get(path);
    if (!ytext || this.boundPaths.has(path)) return;
    this.boundPaths.add(path);

    if (ytext.length === 0) {
      const content = editorView.state.doc.toString();
      if (content.length > 0) {
        ytext.insert(0, content);
      }
    }

    const awareness = this.awarenessProviders.get(path) ?? null;

    const ext = yCollab(ytext, awareness, { undoManager: false });

    editorView.dispatch({
      effects: StateEffect.appendConfig.of(ext as Extension[]),
    });
  }

  closeDocument(path: string): void {
    const doc = this.docs.get(path);
    if (!doc) return;
    doc.destroy();
    this.docs.delete(path);
    this.ytexts.delete(path);
    this.unsubs.get(path)?.();
    this.unsubs.delete(path);
    this.boundPaths.delete(path);
    this.awarenessProviders.get(path)?.destroy();
    this.awarenessProviders.delete(path);
  }

  getDoc(path: string): Y.Doc | undefined {
    return this.docs.get(path);
  }

  destroy(): void {
    for (const path of [...this.docs.keys()]) {
      this.closeDocument(path);
    }
  }
}

function encodePath(path: string): string {
  return btoa(path).replace(/\+/g, '-').replace(/\//g, '_');
}

function encodeUpdate(update: Uint8Array): string {
  return btoa(String.fromCharCode(...update));
}

function decodeUpdate(data: string): Uint8Array {
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
