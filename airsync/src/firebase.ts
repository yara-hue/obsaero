import { FirebaseApp, initializeApp, deleteApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  Database,
  getDatabase,
  forceWebSockets,
  ref,
  set,
  get,
  child,
} from 'firebase/database';
import type { AirsyncSettings, UserProfile } from './types';
import { assignColor } from './color-utils';

export class FirebaseService {
  app: FirebaseApp | null = null;
  auth: Auth | null = null;
  db: Database | null = null;
  user: User | null = null;
  private _authUnsub: (() => void) | null = null;

  get isConnected(): boolean {
    return this.app !== null && this.auth !== null && this.user !== null;
  }

  initApp(settings: AirsyncSettings): void {
    if (this.app) {
      throw new Error('Firebase already initialized');
    }
    forceWebSockets();

    if (
      !settings.firebaseApiKey ||
      !settings.firebaseAuthDomain ||
      !settings.firebaseDatabaseURL ||
      !settings.firebaseProjectId
    ) {
      throw new Error('Firebase configuration incomplete');
    }

    const config = {
      apiKey: settings.firebaseApiKey,
      authDomain: settings.firebaseAuthDomain,
      databaseURL: settings.firebaseDatabaseURL,
      projectId: settings.firebaseProjectId,
    };

    this.app = initializeApp(config, 'airsync');
    this.auth = getAuth(this.app);
    this.db = getDatabase(this.app);
  }

  async signIn(): Promise<User> {
    if (!this.auth) throw new Error('Firebase not initialized');
    const cred = await signInAnonymously(this.auth);
    this.user = cred.user;
    return cred.user;
  }

  onAuthChanged(callback: (user: User | null) => void): () => void {
    if (!this.auth) return () => {};
    this._authUnsub?.();
    this._authUnsub = onAuthStateChanged(this.auth, callback);
    return this._authUnsub;
  }

  async disconnect(): Promise<void> {
    this._authUnsub?.();

    if (this.auth) {
      await signOut(this.auth);
    }
    if (this.app) {
      await deleteApp(this.app);
    }

    this.app = null;
    this.auth = null;
    this.db = null;
    this.user = null;
    this._authUnsub = null;
  }

  async checkFirstTimeUser(uid: string): Promise<boolean> {
    if (!this.db) return false;
    const snapshot = await get(
      child(ref(this.db), `users/${uid}/displayName`),
    );
    return !snapshot.exists();
  }

  async saveUserProfile(uid: string, displayName: string): Promise<void> {
    if (!this.db) return;
    const color = assignColor(uid);
    const profile: UserProfile = {
      displayName,
      color,
      joinedAt: Date.now(),
    };
    await set(ref(this.db, `users/${uid}`), profile);
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    if (!this.db) return null;
    const snapshot = await get(child(ref(this.db), `users/${uid}`));
    if (!snapshot.exists()) return null;
    return snapshot.val() as UserProfile;
  }

  getUserId(): string | null {
    return this.user?.uid ?? null;
  }
}
