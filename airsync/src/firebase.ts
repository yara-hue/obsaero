import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  Database,
  getDatabase,
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

  async initialize(settings: AirsyncSettings): Promise<void> {
    if (
      !settings.firebaseApiKey ||
      !settings.firebaseAuthDomain ||
      !settings.firebaseDatabaseURL ||
      !settings.firebaseProjectId
    ) {
      throw new Error('Firebase configuration incomplete');
    }

    const firebaseConfig = {
      apiKey: settings.firebaseApiKey,
      authDomain: settings.firebaseAuthDomain,
      databaseURL: settings.firebaseDatabaseURL,
      projectId: settings.firebaseProjectId,
    };

    this.app = initializeApp(firebaseConfig, 'airsync');
    this.auth = getAuth(this.app);
    this.db = getDatabase(this.app);

    await signInAnonymously(this.auth);
  }

  onAuthChanged(callback: (user: User | null) => void): () => void {
    if (!this.auth) return () => {};
    return onAuthStateChanged(this.auth, callback);
  }

  async checkFirstTimeUser(uid: string): Promise<boolean> {
    if (!this.db) return false;
    const snapshot = await get(child(ref(this.db), `users/${uid}/displayName`));
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

  dispose(): void {
    if (this.auth) {
      this.auth.signOut();
    }
    this.app = null;
    this.auth = null;
    this.db = null;
    this.user = null;
  }
}
