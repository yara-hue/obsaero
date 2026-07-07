import { Plugin, Modal, App, Notice, MarkdownView } from 'obsidian';
import type { AirsyncSettings, ConnectionState, UserProfile } from './types';
import { DEFAULT_SETTINGS } from './types';
import { AirsyncSettingTab } from './settings';
import { FirebaseService } from './firebase';
import { CollaborationManager } from './collaboration';
import { assignColor } from './color-utils';

export default class AirsyncPlugin extends Plugin {
  settings: AirsyncSettings;
  firebase: FirebaseService;
  collaboration: CollaborationManager;
  connectionState: ConnectionState = 'disconnected';
  private statusBarEl: HTMLElement;

  async onload(): Promise<void> {
    await this.loadSettings();

    this.firebase = new FirebaseService();

    this.statusBarEl = this.addStatusBarItem();
    this.updateStatusBar();

    this.addSettingTab(new AirsyncSettingTab(this.app, this));

    this.addCommand({
      id: 'open-airsync-settings',
      name: 'Open Airsync Settings',
      callback: () => {
        const setting = (this.app as any).setting;
        setting.open();
        setting.openTabById('airsync');
      },
    });

    this.addCommand({
      id: 'set-display-name',
      name: 'Set Display Name',
      callback: () => {
        new DisplayNameModal(this.app, this).open();
      },
    });

    this.addCommand({
      id: 'toggle-airsync-connection',
      name: 'Toggle Airsync Connection',
      callback: async () => {
        if (this.connectionState === 'connected') {
          await this.disconnectFirebase();
        } else if (this.connectionState === 'disconnected') {
          await this.tryInitializeFirebase();
        }
      },
    });

    this.registerEvent(
      this.app.workspace.on('active-leaf-change', () => {
        this.handleActiveFileChange();
      }),
    );

    this.registerEvent(
      this.app.workspace.on('file-open', () => {
        this.handleActiveFileChange();
      }),
    );

    if (this.settings.firebaseApiKey) {
      await this.tryInitializeFirebase();
    }
  }

  private handleActiveFileChange(): void {
    if (this.connectionState !== 'connected' || !this.collaboration) return;

    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    const file = view?.file;
    if (!file || file.extension !== 'md') return;

    const path = file.path;
    this.collaboration.openDocument(path);

    const cm = (view!.editor as any).cm;
    if (cm) {
      this.collaboration.bindEditor(path, cm);
    }
  }

  async tryInitializeFirebase(): Promise<void> {
    if (this.connectionState !== 'disconnected') return;

    if (
      !this.settings.firebaseApiKey ||
      !this.settings.firebaseAuthDomain ||
      !this.settings.firebaseDatabaseURL ||
      !this.settings.firebaseProjectId
    ) {
      new Notice('Airsync: Configure Firebase settings first');
      return;
    }

    this.setConnectionState('connecting');

    try {
      this.firebase.initApp(this.settings);

      this.firebase.onAuthChanged((user) => {
        this.firebase.user = user;
      });

      await this.firebase.signIn();
      await this.connectAndSetup();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Airsync:', msg);
      new Notice(`Airsync: ${msg}`);
      await this.firebase.disconnect().catch(() => {});
      this.setConnectionState('disconnected');
    }
  }

  private async connectAndSetup(): Promise<void> {
    const uid = this.firebase.getUserId();
    if (!uid) throw new Error('Not authenticated');

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out')), 30000),
    );

    await Promise.race([
      this.finishSetup(uid),
      timeout,
    ]);
  }

  private async finishSetup(uid: string): Promise<void> {
    const isFirstTime = await this.firebase.checkFirstTimeUser(uid);

    if (isFirstTime) {
      this.setConnectionState('connected');
      new DisplayNameModal(this.app, this).open();
    } else if (this.settings.displayName) {
      this.afterConnected();
      new Notice(`Airsync: Connected as ${this.settings.displayName}`);
    } else {
      const profile = await this.firebase.getUserProfile(uid);
      if (profile) {
        this.settings.displayName = profile.displayName;
        await this.saveSettings();
        this.afterConnected();
        new Notice(`Airsync: Connected as ${profile.displayName}`);
      } else {
        this.setConnectionState('connected');
        new DisplayNameModal(this.app, this).open();
      }
    }
  }

  private afterConnected(): void {
    const uid = this.firebase.getUserId();
    if (!uid) return;
    const color = assignColor(uid);
    this.collaboration = new CollaborationManager(
      this.firebase.db!, this.settings.displayName, color, uid,
    );
    this.setConnectionState('connected');
    this.app.workspace.trigger('airsync:ready');
    this.handleActiveFileChange();
  }

  async disconnectFirebase(): Promise<void> {
    this.collaboration?.destroy();
    try {
      await this.firebase.disconnect();
    } catch (err) {
      console.error('Airsync: Disconnect error', err);
    }
    this.setConnectionState('disconnected');
    new Notice('Airsync: Disconnected');
  }

  private setConnectionState(state: ConnectionState): void {
    this.connectionState = state;
    this.updateStatusBar();
    this.app.workspace.trigger('airsync:state-changed');
  }

  private updateStatusBar(): void {
    this.statusBarEl.empty();
    this.statusBarEl.addClass('airsync-status');

    const dot = this.statusBarEl.createSpan();
    dot.style.cssText =
      'width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px;';

    switch (this.connectionState) {
      case 'disconnected':
        dot.style.background = 'var(--color-red, #e06c75)';
        this.statusBarEl.appendText('Airsync');
        break;
      case 'connecting':
        dot.style.background = 'var(--color-yellow, #e5c07b)';
        this.statusBarEl.appendText('Airsync...');
        break;
      case 'connected':
        dot.style.background = 'var(--color-green, #7ecf6b)';
        this.statusBarEl.appendText('Airsync');
        break;
    }
  }

  onunload(): void {
    this.collaboration?.destroy();
    this.firebase.disconnect().catch(() => {});
  }

  async loadSettings(): Promise<void> {
    const data = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}

class DisplayNameModal extends Modal {
  plugin: AirsyncPlugin;
  nameInput: HTMLInputElement;

  constructor(app: App, plugin: AirsyncPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen(): void {
    const { contentEl, titleEl } = this;
    titleEl.setText('Welcome to Airsync');

    contentEl.createEl('p', {
      text: 'Enter your display name to appear as in collaborative sessions.',
    });

    this.nameInput = contentEl.createEl('input', {
      type: 'text',
      placeholder: 'Your display name...',
      value: this.plugin.settings.displayName,
    });
    this.nameInput.style.width = '100%';
    this.nameInput.style.marginBottom = '1em';

    const submitBtn = contentEl.createEl('button', {
      text: 'Save & Connect',
    });
    submitBtn.onclick = async () => {
      const name = this.nameInput.value.trim();
      if (!name) {
        new Notice('Please enter a display name');
        return;
      }

      this.plugin.settings.displayName = name;
      await this.plugin.saveSettings();

      const uid = this.plugin.firebase.getUserId();
      if (uid) {
        await this.plugin.firebase.saveUserProfile(uid, name);
      }

      new Notice(`Airsync: Connected as ${name}`);
      this.plugin.afterConnected();
      this.close();
    };

    this.nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submitBtn.click();
      }
    });

    setTimeout(() => this.nameInput.focus(), 100);
  }

  onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
  }
}
