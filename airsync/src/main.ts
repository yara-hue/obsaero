import { Plugin, Modal, App, Notice } from 'obsidian';
import type { AirsyncSettings } from './types';
import { DEFAULT_SETTINGS } from './types';
import { AirsyncSettingTab } from './settings';
import { FirebaseService } from './firebase';

export default class AirsyncPlugin extends Plugin {
  settings: AirsyncSettings;
  firebase: FirebaseService;
  private authUnsub: () => void = () => {};

  async onload(): Promise<void> {
    await this.loadSettings();

    this.firebase = new FirebaseService();

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

    await this.tryInitializeFirebase();
  }

  async tryInitializeFirebase(): Promise<void> {
    if (
      !this.settings.firebaseApiKey ||
      !this.settings.firebaseAuthDomain ||
      !this.settings.firebaseDatabaseURL ||
      !this.settings.firebaseProjectId
    ) {
      return;
    }

    try {
      await this.firebase.initialize(this.settings);

      this.authUnsub = this.firebase.onAuthChanged(async (user) => {
        if (user) {
          this.firebase.user = user;
          const isFirstTime =
            await this.firebase.checkFirstTimeUser(user.uid);
          if (isFirstTime) {
            new DisplayNameModal(this.app, this).open();
          } else if (this.settings.displayName) {
            new Notice(`Airsync: Connected as ${this.settings.displayName}`);
            this.app.workspace.trigger('airsync:ready');
          } else {
            const profile = await this.firebase.getUserProfile(user.uid);
            if (profile) {
              this.settings.displayName = profile.displayName;
              await this.saveSettings();
              new Notice(`Airsync: Connected as ${profile.displayName}`);
              this.app.workspace.trigger('airsync:ready');
            }
          }
        }
      });
    } catch (err) {
      console.error('Airsync: Firebase init failed', err);
      new Notice('Airsync: Failed to connect to Firebase. Check settings.');
    }
  }

  onunload(): void {
    this.authUnsub();
    this.firebase.dispose();
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
