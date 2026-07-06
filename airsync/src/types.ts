export interface AirsyncSettings {
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseDatabaseURL: string;
  firebaseProjectId: string;
  displayName: string;
}

export const DEFAULT_SETTINGS: AirsyncSettings = {
  firebaseApiKey: '',
  firebaseAuthDomain: '',
  firebaseDatabaseURL: '',
  firebaseProjectId: '',
  displayName: '',
};

export interface UserProfile {
  displayName: string;
  color: string;
  joinedAt: number;
}

export interface PresenceData {
  online: boolean;
  activeNote: string;
  color: string;
  lastSeen: number;
}
