import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { Database, ref, push, onChildAdded } from 'firebase/database';
import { EditorView } from '@codemirror/view';
import { StateEffect, Extension } from '@codemirror/state';

export class CollaborationManager {
  private docs = new Map<string, Y.Doc>();
  private ytexts = new Map<string, Y.Text>();
  private unsubs = new Map<string, () => void>();
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  openDocument(path: string): void {
    if (this.docs.has(path)) {
      console.log('Airsync: openDocument already open:', path);
      return;
    }

    const doc = new Y.Doc();
    const ytext = doc.getText('content');
    const encoded = encodePath(path);
    const updatesRef = ref(this.db, `docs/${encoded}/updates`);
    console.log('Airsync: openDocument creating doc for:', path, 'firebase path: docs/' + encoded + '/updates');

    const unsub = onChildAdded(updatesRef, (snapshot) => {
      const val = snapshot.val();
      console.log('Airsync: onChildAdded fired, key:', snapshot.key, 'val type:', typeof val, 'length:', typeof val === 'string' ? val.length : 0);
      if (typeof val !== 'string') return;
      try {
        Y.applyUpdate(doc, decodeUpdate(val), 'firebase');
        console.log('Airsync: applied remote update successfully');
      } catch (e) {
        console.error('Airsync: Failed to apply update', e);
      }
    });

    doc.on('update', (update: Uint8Array, origin: any) => {
      if (origin === 'firebase') return;
      const encodedUpd = encodeUpdate(update);
      console.log('Airsync: local update, size:', update.length, 'origin:', origin, 'encoded length:', encodedUpd.length);
      push(updatesRef, encodedUpd)
        .then(() => console.log('Airsync: push succeeded'))
        .catch((err) => console.error('Airsync: push failed', err));
    });

    this.docs.set(path, doc);
    this.ytexts.set(path, ytext);
    this.unsubs.set(path, unsub);
  }

  bindEditor(path: string, editorView: EditorView): void {
    const ytext = this.ytexts.get(path);
    console.log('Airsync: bindEditor', path, 'ytext found:', !!ytext);
    if (!ytext) return;

    const ext = yCollab(ytext, null, { undoManager: false });

    editorView.dispatch({
      effects: StateEffect.appendConfig.of(ext as Extension[]),
    });
    console.log('Airsync: bindEditor dispatch completed');
  }

  closeDocument(path: string): void {
    const doc = this.docs.get(path);
    if (!doc) return;
    doc.destroy();
    this.docs.delete(path);
    this.ytexts.delete(path);
    this.unsubs.get(path)?.();
    this.unsubs.delete(path);
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
