const { Plugin, PluginSettingTab, Setting, Notice, MarkdownView, normalizePath } = require('obsidian');

const ROLES = {
  t1: { emoji: '✈︎', name: 'Teammate 1', cls: 'contrib-t1' },
  t2: { emoji: '⌕',  name: 'Teammate 2', cls: 'contrib-t2' },
  t3: { emoji: '✧',  name: 'Teammate 3', cls: 'contrib-t3' },
};

const ROLE_ORDER = ['t1', 't2', 't3'];
const COLORS = { t1: '#F4D03F', t2: '#5DADE2', t3: '#AF7AC5' };
const DRAFT_DIR = '40_Team_Journey/Drafts';
const DEFAULT_SETTINGS = { currentRole: '', autostamp: false };

class RoleStamperSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'Teammate Stamper Settings' });
    new Setting(containerEl)
      .setName('Current Teammate')
      .setDesc('Select your teammate number for color-coded contributions')
      .addDropdown(cb => {
        cb.addOption('', '— None —');
        for (const k of ROLE_ORDER) {
          const r = ROLES[k];
          cb.addOption(k, `${r.emoji} ${r.name}`);
        }
        cb.setValue(this.plugin.settings.currentRole);
        cb.onChange(async v => {
          this.plugin.settings.currentRole = v;
          await this.plugin.saveSettings();
          this.plugin._updateStatusBar();
        });
      });
    new Setting(containerEl)
      .setName('Autostamp')
      .setDesc('Automatically stamp new lines you type or paste with current teammate color (600ms pause)')
      .addToggle(tb => tb
        .setValue(this.plugin.settings.autostamp)
        .onChange(async v => {
          this.plugin.settings.autostamp = v;
          await this.plugin.saveSettings();
        }));
  }
}

module.exports = class RoleStamperPlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this._addRibbon();
    this._addStatusBar();
    this._addCommands();
    this._addContextMenu();
    this.addSettingTab(new RoleStamperSettingTab(this.app, this));
    this._addAutoStamp();
  }

  /* ── Ribbon (sidebar button) ───────────────── */
  _addRibbon() {
    const icon = this.addRibbonIcon('bar-chart', 'Update contribution bar', () => {
      this._updateBarInHomePage();
    });
    icon.style.color = 'var(--text-muted)';
  }

  /* ── Status Bar ────────────────────────────── */
  _addStatusBar() {
    this.statusBar = this.addStatusBarItem();
    this.statusBar.classList.add('role-stamper-status');
    this.statusBar.style.cursor = 'pointer';
    this.statusBar.onclick = () => this._cycleRole();
    this._updateStatusBar();
  }

  _updateStatusBar() {
    const role = this.settings.currentRole;
    if (!role) {
      this.statusBar.textContent = ' No Teammate ';
      this.statusBar.style.color = '';
      return;
    }
    const r = ROLES[role];
    if (!r) return;
    this.statusBar.textContent = ` ${r.emoji} ${r.name} `;
    this.statusBar.style.color = COLORS[role];
  }

  _cycleRole() {
    const cur = this.settings.currentRole;
    let next;
    if (!cur) {
      next = 't1';
    } else {
      const idx = ROLE_ORDER.indexOf(cur);
      if (idx === -1 || idx === ROLE_ORDER.length - 1) {
        next = '';
      } else {
        next = ROLE_ORDER[idx + 1];
      }
    }
    this.settings.currentRole = next;
    this.saveSettings();
    this._updateStatusBar();
    new Notice(next ? `Teammate: ${ROLES[next].emoji} ${ROLES[next].name}` : 'Teammate cleared');
  }

  /* ── Commands ──────────────────────────────── */
  _addCommands() {
    this.addCommand({
      id: 'stamp-role',
      name: 'Stamp selection / paragraph with current teammate',
      hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'L' }],
      callback: () => this._stampRole(),
    });
    this.addCommand({
      id: 'cycle-role',
      name: 'Cycle teammate',
      callback: () => this._cycleRole(),
    });
    this.addCommand({
      id: 'open-draft',
      name: 'Open personal draft (color-coded)',
      hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'D' }],
      callback: () => this._openDraft(),
    });
    this.addCommand({
      id: 'update-bar',
      name: 'Update contribution bar on Home page',
      callback: () => this._updateBarInHomePage(),
    });
  }

  /* ── Context Menu ─────────────────────────── */
  _addContextMenu() {
    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, editor, view) => {
        if (!editor.getSelection()) return;
        menu.addSeparator();
        for (const k of ROLE_ORDER) {
          const r = ROLES[k];
          const color = COLORS[k];
          menu.addItem(item => {
            item.setTitle(`Stamp as ${r.emoji} ${r.name}`);
            item.setIcon('pencil');
            item.onClick(() => this._stampRole(k));
            item.dom.style.borderLeft = `3px solid ${color}`;
          });
        }
      })
    );
  }

  _stampRole(overrideKey) {
    const roleKey = overrideKey || this.settings.currentRole;
    if (!roleKey) {
      new Notice('Select a teammate first — click the status bar or open Settings');
      return;
    }
    const role = ROLES[roleKey];
    if (!role) return;

    const editor = this._editor();
    if (!editor) return;

    const sel = editor.getSelection();
    if (sel) {
      editor.replaceSelection(`<span class="${role.cls}">${sel}</span>`);
    } else {
      const line = editor.getCursor().line;
      const text = editor.getLine(line);
      if (text.trim()) {
        editor.setLine(line, `<span class="${role.cls}">${text}</span>`);
      }
    }
  }

  async _openDraft() {
    const roleKey = this.settings.currentRole;
    if (!roleKey) {
      new Notice('Select a teammate first — click the status bar or open Settings');
      return;
    }
    const role = ROLES[roleKey];
    if (!role) return;

    const fileName = `Draft - ${role.name}.md`;
    const filePath = normalizePath(`${DRAFT_DIR}/${fileName}`);

    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (!existing) {
      try {
        if (!this.app.vault.getAbstractFileByPath(DRAFT_DIR)) {
          await this.app.vault.createFolder(DRAFT_DIR);
        }
      } catch (_) {}
      const content = `<span class="${role.cls}">\n\n## ✎ Personal Draft — ${role.emoji} ${role.name}\n\n*Use this page for brainstorming, notes, and drafts. Every entry is auto-colored with your teammate color.*\n\n---\n\n\n\n</span>`;
      try {
        await this.app.vault.create(filePath, content);
      } catch (_) {}
    }

    this.app.workspace.openLinkText(filePath, '');
  }

  async _countContribs() {
    const files = this.app.vault.getMarkdownFiles();
    let c1 = 0, c2 = 0, c3 = 0;
    for (const f of files) {
      const text = await this.app.vault.read(f);
      c1 += (text.match(/class="contrib-t1"/g) || []).length;
      c2 += (text.match(/class="contrib-t2"/g) || []).length;
      c3 += (text.match(/class="contrib-t3"/g) || []).length;
    }
    return { c1, c2, c3 };
  }

  _barHTML(c1, c2, c3) {
    const total = c1 + c2 + c3;
    if (!total) return null;
    const p1 = Math.round((c1 / total) * 100);
    const p2 = Math.round((c2 / total) * 100);
    const p3 = 100 - p1 - p2;
    return `<div class="contrib-bar-container">\n  <div class="contrib-bar-t1" style="width: ${p1}%"></div>\n  <div class="contrib-bar-t2" style="width: ${p2}%"></div>\n  <div class="contrib-bar-t3" style="width: ${p3}%"></div>\n</div>\n\n<div class="contrib-legend">\n  <span class="contrib-legend-item">\n    <span class="contrib-legend-dot t1"></span> ✈︎ Teammate 1 — <strong>${p1}%</strong>\n  </span>\n  <span class="contrib-legend-item">\n    <span class="contrib-legend-dot t2"></span> ⌕ Teammate 2 — <strong>${p2}%</strong>\n  </span>\n  <span class="contrib-legend-item">\n    <span class="contrib-legend-dot t3"></span> ✧ Teammate 3 — <strong>${p3}%</strong>\n  </span>\n</div>`;
  }

  async _updateBarInHomePage() {
    const homeFile = this.app.vault.getAbstractFileByPath('Home.md');
    if (!homeFile) {
      new Notice('00 🏠 Home.md not found!');
      return;
    }

    const { c1, c2, c3 } = await this._countContribs();
    const total = c1 + c2 + c3;
    if (!total) {
      new Notice('No contributions found. Start stamping with Ctrl+Shift+L!');
      return;
    }

    const content = await this.app.vault.read(homeFile);
    const newBar = this._barHTML(c1, c2, c3);

    const pattern = /<div class="contrib-bar-container">[\s\S]*?<\/div>\n\n<div class="contrib-legend">[\s\S]*?<\/div>/;
    if (!pattern.test(content)) {
      new Notice('Could not find the bar section in 🏠 Home.md');
      return;
    }

    const updated = content.replace(pattern, newBar);
    await this.app.vault.modify(homeFile, updated);
    new Notice(`📊 Bar updated! T1: ${c1}, T2: ${c2}, T3: ${c3} (${total} total)`);
  }

  /* ── Autostamp ─────────────────────────────── */
  _addAutoStamp() {
    let timer = null;
    this.registerEvent(
      this.app.workspace.on('editor-change', () => {
        if (!this.settings.autostamp || !this.settings.currentRole) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          const view = this.app.workspace.getActiveViewOfType(MarkdownView);
          if (!view || !view.file) return;
          const editor = view.editor;
          if (!editor) return;
          const role = ROLES[this.settings.currentRole];
          if (!role) return;

          const cursor = editor.getCursor();
          const line = editor.getLine(cursor.line);
          const t = line.trim();
          if (!t) return;
          if (line.includes(`class="${role.cls}"`)) return;

          editor.setLine(cursor.line, `<span class="${role.cls}">${t}</span>`);
          editor.setCursor({ line: cursor.line, ch: t.length + 33 });
        }, 600);
      })
    );
  }

  _editor() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    return view ? view.editor : null;
  }

  /* ── Settings ──────────────────────────────── */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
