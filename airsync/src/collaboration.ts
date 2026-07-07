import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { Database, ref, push, onChildAdded } from 'firebase/database';
import { EditorView } from '@codemirror/view';
import { Compartment, Extension } from '@codemirror/state';

export class CollaborationManager {
  private docs = new Map<string, Y.Doc>();
  private ytexts = new Map<string, Y.Text>();
  private unsubs = new Map<string, () => void>();
  private compartments = new Map<string, Compartment>();
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  openDocument(path: string): void {
    if (this.docs.has(path)) return;

    const doc = new Y.Doc();
    const ytext = doc.getText('content');
    const updatesRef = ref(this.db, `docs/${encodePath(path)}/updates`);

    const unsub = onChildAdded(updatesRef, (snapshot) => {
      const val = snapshot.val();
      if (typeof val !== 'string') return;
      try {
        Y.applyUpdate(doc, decodeUpdate(val));
      } catch (e) {
        console.error('Airsync: Failed to apply update', e);
      }
    });

    doc.on('update', (update: Uint8Array, origin: any) => {
      if (origin === 'firebase') return;
      push(updatesRef, encodeUpdate(update));
    });

    this.docs.set(path, doc);
    this.ytexts.set(path, ytext);
    this.unsubs.set(path, unsub);
    this.compartments.set(path, new Compartment());
  }

  bindEditor(path: string, editorView: EditorView): void {
    const ytext = this.ytexts.get(path);
    const comp = this.compartments.get(path);
    if (!ytext || !comp) return;

    const ext = yCollab(ytext, null, { undoManager: false });

    editorView.dispatch({
      effects: comp.reconfigure(ext as Extension[]),
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
    this.compartments.delete(path);
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
