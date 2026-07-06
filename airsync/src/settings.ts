import { App, PluginSettingTab, Setting } from 'obsidian';
import AirsyncPlugin from './main';
import type { ConnectionState } from './types';

export class AirsyncSettingTab extends PluginSettingTab {
  plugin: AirsyncPlugin;
  private connectBtn: Setting | null = null;
  private connectBtnEl: HTMLButtonElement | null = null;

  constructor(app: App, plugin: AirsyncPlugin) {
    super(app, plugin);
    this.plugin = plugin;

    this.app.workspace.on('airsync:state-changed', () => {
      this.updateConnectButton();
    });
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Airsync Settings' });

    containerEl.createEl('h3', { text: 'Firebase Configuration' });
    containerEl.createEl('p', {
      text: 'Create a Firebase project and enable Anonymous Authentication. Enter the config values from Project Settings > General > Your apps > Web app.',
      cls: 'setting-item-description',
    });

    new Setting(containerEl)
      .setName('API Key')
      .setDesc('Firebase Web API Key')
      .addText((text) =>
      text
        .setPlaceholder('AIzaSy...')
        .setValue(this.plugin.settings.firebaseApiKey)
        .onChange(async (val) => {
          this.plugin.settings.firebaseApiKey = val;
          await this.plugin.saveSettings();
          this.updateConnectButton();
        })
    );

    new Setting(containerEl)
      .setName('Auth Domain')
      .setDesc('Firebase Auth Domain')
      .addText((text) =>
      text
        .setPlaceholder('your-project.firebaseapp.com')
        .setValue(this.plugin.settings.firebaseAuthDomain)
        .onChange(async (val) => {
          this.plugin.settings.firebaseAuthDomain = val;
          await this.plugin.saveSettings();
          this.updateConnectButton();
        })
    );

    new Setting(containerEl)
      .setName('Database URL')
      .setDesc('Firebase Realtime Database URL')
      .addText((text) =>
      text
        .setPlaceholder('https://your-project-default-rtdb.firebaseio.com')
        .setValue(this.plugin.settings.firebaseDatabaseURL)
        .onChange(async (val) => {
          this.plugin.settings.firebaseDatabaseURL = val;
          await this.plugin.saveSettings();
          this.updateConnectButton();
        })
    );

    new Setting(containerEl)
      .setName('Project ID')
      .setDesc('Firebase Project ID')
      .addText((text) =>
      text
        .setPlaceholder('your-project')
        .setValue(this.plugin.settings.firebaseProjectId)
        .onChange(async (val) => {
          this.plugin.settings.firebaseProjectId = val;
          await this.plugin.saveSettings();
          this.updateConnectButton();
        })
    );

    containerEl.createEl('h3', { text: 'Connection' });

    this.connectBtn = new Setting(containerEl)
      .setName('Connection')
      .setDesc(this.getConnectionDesc())
      .addButton((btn) => {
        btn.onClick(async () => {
          const state = this.plugin.connectionState;
          if (state === 'connected') {
            await this.plugin.disconnectFirebase();
          } else if (state === 'disconnected') {
            await this.plugin.tryInitializeFirebase();
          }
        });
        this.connectBtnEl = btn.buttonEl;
        this.updateButtonState(btn.buttonEl);
      });

    containerEl.createEl('h3', { text: 'Profile' });

    new Setting(containerEl)
      .setName('Display Name')
      .setDesc('Your name shown to collaborators')
      .addText((text) =>
      text
        .setPlaceholder('Enter your display name')
        .setValue(this.plugin.settings.displayName)
        .onChange(async (val) => {
          this.plugin.settings.displayName = val;
          await this.plugin.saveSettings();
        })
    );
  }

  private getConnectionDesc(): string {
    switch (this.plugin.connectionState) {
      case 'disconnected':
        return 'Not connected';
      case 'connecting':
        return 'Connecting to Firebase...';
      case 'connected':
        return `Connected as ${this.plugin.settings.displayName || 'Unknown'}`;
    }
  }

  private updateButtonState(btn: HTMLButtonElement): void {
    switch (this.plugin.connectionState) {
      case 'disconnected': {
        const hasConfig =
          !!this.plugin.settings.firebaseApiKey &&
          !!this.plugin.settings.firebaseAuthDomain &&
          !!this.plugin.settings.firebaseDatabaseURL &&
          !!this.plugin.settings.firebaseProjectId;
        btn.textContent = 'Connect';
        btn.className = hasConfig
          ? 'mod-cta'
          : '';
        btn.disabled = !hasConfig;
        break;
      }
      case 'connecting':
        btn.textContent = 'Connecting...';
        btn.className = 'mod-cta';
        btn.disabled = true;
        break;
      case 'connected':
        btn.textContent = 'Disconnect';
        btn.className = '';
        btn.disabled = false;
        break;
    }
  }

  private updateConnectButton(): void {
    if (this.connectBtn) {
      this.connectBtn.setDesc(this.getConnectionDesc());
    }
    if (this.connectBtnEl) {
      this.updateButtonState(this.connectBtnEl);
    }
  }
}
