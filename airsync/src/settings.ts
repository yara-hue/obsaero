import { App, PluginSettingTab, Setting } from 'obsidian';
import AirsyncPlugin from './main';

export class AirsyncSettingTab extends PluginSettingTab {
  plugin: AirsyncPlugin;

  constructor(app: App, plugin: AirsyncPlugin) {
    super(app, plugin);
    this.plugin = plugin;
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
          })
      );

    containerEl.createEl('h3', { text: 'Connection' });

    new Setting(containerEl)
      .setName('Reconnect')
      .setDesc('Attempt to reconnect to Firebase with current settings')
      .addButton((btn) =>
        btn
          .setButtonText('Connect')
          .setCta()
          .onClick(async () => {
            btn.setDisabled(true);
            btn.setButtonText('Connecting...');
            await this.plugin.tryInitializeFirebase();
            btn.setDisabled(false);
            btn.setButtonText('Connect');
          })
      );

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
}
