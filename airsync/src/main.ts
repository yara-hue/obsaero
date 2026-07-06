import { Plugin, Modal, App, Notice } from 'obsidian';
import type { AirsyncSettings, ConnectionState } from './types';
import { DEFAULT_SETTINGS } from './types';
import { AirsyncSettingTab } from './settings';
import { FirebaseService } from './firebase';

export default class AirsyncPlugin extends Plugin {
  settings: AirsyncSettings;
  firebase: FirebaseService;
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

    if (this.settings.firebaseApiKey) {
      await this.tryInitializeFirebase();
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
      await this.firebase.initialize(this.settings);

      this.firebase.onAuthChanged(async (user) => {
        if (user) {
          this.firebase.user = user;
          const uid = user.uid;
          const isFirstTime = await this.firebase.checkFirstTimeUser(uid);

          if (isFirstTime) {
            this.setConnectionState('connected');
            new DisplayNameModal(this.app, this).open();
          } else if (this.settings.displayName) {
            this.setConnectionState('connected');
            new Notice(`Airsync: Connected as ${this.settings.displayName}`);
            this.app.workspace.trigger('airsync:ready');
          } else {
            const profile = await this.firebase.getUserProfile(uid);
            if (profile) {
              this.settings.displayName = profile.displayName;
              await this.saveSettings();
              this.setConnectionState('connected');
              new Notice(`Airsync: Connected as ${profile.displayName}`);
              this.app.workspace.trigger('airsync:ready');
            } else {
              this.setConnectionState('disconnected');
              new Notice(
                'Airsync: No profile found. Set a display name to continue.',
              );
            }
          }
        } else {
          this.setConnectionState('disconnected');
        }
      });
    } catch (err) {
      console.error('Airsync: Connection failed', err);
      new Notice('Airsync: Failed to connect. Check Firebase settings.');
      this.setConnectionState('disconnected');
    }
  }

  async disconnectFirebase(): Promise<void> {
    this.setConnectionState('connecting');
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
      this.plugin.app.workspace.trigger('airsync:ready');
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
