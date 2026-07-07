import * as Y from 'yjs';
import {
  Database,
  ref,
  set,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onDisconnect,
} from 'firebase/database';

function encodePath(path: string): string {
  return btoa(path).replace(/\+/g, '-').replace(/\//g, '_');
}

type AwarenessState = Record<string, unknown>;

export class AwarenessProvider {
  private _doc: Y.Doc;
  private _localState: AwarenessState = {};
  private _states: Map<number, AwarenessState> = new Map();
  private _uidToClientId: Map<string, number> = new Map();
  private _listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  private _db: Database;
  private _parentRef: ReturnType<typeof ref>;
  private _myRef: ReturnType<typeof ref>;
  private _userId: string;
  private _unsubs: (() => void)[] = [];
  private _disconnect: ReturnType<typeof onDisconnect>;

  get doc(): Y.Doc {
    return this._doc;
  }

  get clientID(): number {
    return this._doc.clientID;
  }

  constructor(
    doc: Y.Doc,
    db: Database,
    path: string,
    userId: string,
    displayName: string,
    color: string,
  ) {
    this._doc = doc;
    this._db = db;
    this._userId = userId;

    const encoded = encodePath(path);
    this._parentRef = ref(db, `docs/${encoded}/awareness`);
    this._myRef = ref(db, `docs/${encoded}/awareness/${userId}`);

    this._localState = {
      user: { name: displayName, color },
      cursor: null,
    };
    this._states.set(doc.clientID, this._localState);

    const unsubAdded = onChildAdded(this._parentRef, (snapshot) => {
      if (snapshot.key === userId) return;
      const data = snapshot.val() as { state?: AwarenessState; clientId?: number } | null;
      if (data?.state && typeof data.clientId === 'number') {
        this._setRemoteState(data.clientId, snapshot.key!, data.state);
      }
    });
    this._unsubs.push(unsubAdded);

    const unsubChanged = onChildChanged(this._parentRef, (snapshot) => {
      if (snapshot.key === userId) return;
      const data = snapshot.val() as { state?: AwarenessState; clientId?: number } | null;
      if (data?.state && typeof data.clientId === 'number') {
        this._setRemoteState(data.clientId, snapshot.key!, data.state);
      }
    });
    this._unsubs.push(unsubChanged);

    const unsubRemoved = onChildRemoved(this._parentRef, (snapshot) => {
      if (snapshot.key === userId) return;
      this._removeRemoteState(snapshot.key!);
    });
    this._unsubs.push(unsubRemoved);

    this._disconnect = onDisconnect(this._myRef);
    this._disconnect.remove();
    set(this._myRef, {
      state: this._localState,
      clientId: doc.clientID,
    });
  }

  setLocalState(state: AwarenessState | null): void {
    this._localState = state ?? {};
    this._states.set(this._doc.clientID, this._localState);
    this._broadcast();
    this._emit('change', { added: [] as number[], removed: [] as number[], updated: [this._doc.clientID] });
  }

  setLocalStateField(field: string, value: unknown): void {
    this._localState = { ...this._localState, [field]: value };
    this._states.set(this._doc.clientID, this._localState);
    this._broadcast();
    this._emit('change', { added: [] as number[], removed: [] as number[], updated: [this._doc.clientID] });
  }

  getLocalState(): AwarenessState | null {
    return this._localState;
  }

  getStates(): Map<number, AwarenessState> {
    return new Map(this._states);
  }

  on(event: string, handler: (...args: unknown[]) => void): void {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event)!.add(handler);
  }

  off(event: string, handler: (...args: unknown[]) => void): void {
    this._listeners.get(event)?.delete(handler);
  }

  destroy(): void {
    this._disconnect.cancel();
    set(this._myRef, null).catch(() => {});
    for (const unsub of this._unsubs) {
      unsub();
    }
    this._unsubs.length = 0;
    this._listeners.clear();
    this._states.clear();
    this._uidToClientId.clear();
  }

  private _setRemoteState(clientId: number, uid: string, state: AwarenessState): void {
    if (clientId === this._doc.clientID) return;

    const oldCid = this._uidToClientId.get(uid);
    if (oldCid !== undefined && oldCid !== clientId) {
      this._states.delete(oldCid);
    }

    this._uidToClientId.set(uid, clientId);
    const had = this._states.has(clientId);
    this._states.set(clientId, state);

    const added = had ? [] : [clientId];
    const updated = had ? [clientId] : [];
    if (added.length > 0 || updated.length > 0) {
      this._emit('change', { added, removed: [] as number[], updated });
    }
  }

  private _removeRemoteState(uid: string): void {
    const clientId = this._uidToClientId.get(uid);
    if (clientId !== undefined) {
      this._uidToClientId.delete(uid);
      if (this._states.has(clientId)) {
        this._states.delete(clientId);
        this._emit('change', { added: [] as number[], removed: [clientId], updated: [] as number[] });
      }
    }
  }

  private _broadcast(): void {
    set(this._myRef, {
      state: this._localState,
      clientId: this._doc.clientID,
    }).catch(() => {});
  }

  private _emit(event: string, ...args: unknown[]): void {
    this._listeners.get(event)?.forEach((handler) => {
      handler(...args);
    });
  }
}
