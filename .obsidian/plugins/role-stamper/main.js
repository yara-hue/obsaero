const { Plugin, PluginSettingTab, Setting, Notice, MarkdownView, normalizePath, Platform } = require('obsidian');
const { exec } = require('child_process');
const { ViewPlugin, Decoration } = require('@codemirror/view');
const { RangeSetBuilder } = require('@codemirror/state');

const ROLES = {
  t1: { emoji: '✈︎', name: 'Seif', cls: 'contrib-t1' },
  t2: { emoji: '⌕',  name: 'Marwan', cls: 'contrib-t2' },
  t3: { emoji: '✧',  name: 'Yara', cls: 'contrib-t3' },
};

const ROLE_ORDER = ['t1', 't2', 't3'];
const COLORS = { t1: '#F4D03F', t2: '#5DADE2', t3: '#AF7AC5' };
const DRAFT_DIR = '40_Team_Journey/Drafts';
const DEFAULT_SETTINGS = { currentRole: '', autostamp: false };

/* ── Regex patterns ──────────────────────────────── */
const INLINE_RE = /::(t[123]):(.*?)::/gs;
const MARKER_RE = /<!--\s*(\/?)(t[123]):?(.*?)-->/g;

/* ── CM6 decoration ──────────────────────────── */
const teammateDecorationPlugin = ViewPlugin.fromClass(class {
  decorations;
  constructor(view) { this.decorations = this.buildDecorations(view); }
  update(update) {
    if (update.docChanged || update.viewportChanged)
      this.decorations = this.buildDecorations(update.view);
  }
  buildDecorations(view) {
    const builder = new RangeSetBuilder();
    const doc = view.state.doc;

    for (const { from, to } of view.visibleRanges) {
      const text = doc.sliceString(from, to);

      /* ── Box markers: find all ────────────────── */
      const markers = [];
      MARKER_RE.lastIndex = 0;
      let m;
      while ((m = MARKER_RE.exec(text)) !== null) {
        const absFrom = from + m.index;
        const absTo = absFrom + m[0].length;
        const isOpen = m[1] !== '/';
        const role = m[2];
        markers.push({ from: absFrom, to: absTo, isOpen, role });
      }

      // Hide ALL markers
      for (const mk of markers) {
        builder.add(mk.from, mk.to, Decoration.replace({}));
      }

      // Match pairs & add line-level box styling to content lines between them
      markers.sort((a, b) => a.from - b.from);
      const stack = [];
      for (const mk of markers) {
        if (mk.isOpen) {
          stack.push(mk);
        } else {
          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].role === mk.role) {
              const open = stack.splice(i, 1)[0];
              const startLine = doc.lineAt(open.to).number + 1;
              const endLine = doc.lineAt(mk.from).number - 1;
              if (startLine <= endLine) {
                for (let ln = startLine; ln <= endLine; ln++) {
                  const line = doc.line(ln);
                  builder.add(line.from, line.from, Decoration.line({
                    attributes: {
                      style: `background: ${COLORS[mk.role]}15; border-left: 3px solid ${COLORS[mk.role]};`
                    }
                  }));
                }
              }
              break;
            }
          }
        }
      }

      /* ── Inline ::t1:content:: stamps ──────────── */
      INLINE_RE.lastIndex = 0;
      while ((m = INLINE_RE.exec(text)) !== null) {
        const tagLen = `::${m[1]}:`.length;
        const s = from + m.index;
        const se = s + tagLen;
        const ce = se + m[2].length;
        const ee = ce + 2;
        builder.add(s, se, Decoration.replace({}));
        builder.add(se, ce, Decoration.mark({
          attributes: { style: `color: ${COLORS[m[1]]}` }
        }));
        builder.add(ce, ee, Decoration.replace({}));
      }
    }
    return builder.finish();
  }
}, { decorations: v => v.decorations });

/* ── Settings tab ────────────────────────────── */
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

    this.registerEditorExtension(teammateDecorationPlugin);

    this.registerMarkdownPostProcessor(async (el, ctx) => {
      // Inline stamps → colored spans
      el.innerHTML = el.innerHTML.replace(
        /::(t[123]):(.*?)::/gs,
        (_, role, text) => `<span style="color: ${COLORS[role]}">${text}</span>`
      );
      // Box markers → bordered containers
      await this._processBoxMarkers(el, ctx);
    });
  }

  /* ── Reading-mode marker processing ────────── */
  async _processBoxMarkers(el, ctx) {
    const walker = document.createNodeIterator(el, NodeFilter.SHOW_COMMENT, null);
    const boxes = [];
    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue.trim();
      const openM = text.match(/^(t[123]):(.+)$/);
      const closeM = text.match(/^\/(t[123])$/);
      if (openM) {
        boxes.push({ type: 'open', role: openM[1], label: openM[2].trim(), node });
      } else if (closeM) {
        boxes.push({ type: 'close', role: closeM[1], node });
      }
    }

    const stack = [];
    for (const b of boxes) {
      if (b.type === 'open') {
        stack.push(b);
      } else if (b.type === 'close') {
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].role === b.role) {
            const open = stack.splice(i, 1)[0];
            await this._replaceBoxWithTextarea(open, b, el, ctx);
            break;
          }
        }
      }
    }
  }

  async _replaceBoxWithTextarea(open, close, el, ctx) {
    let cur = open.node.nextSibling;
    const contentNodes = [];
    while (cur && cur !== close.node) {
      contentNodes.push(cur);
      cur = cur.nextSibling;
    }

    const role = open.role;
    const label = open.label;
    const roleInfo = ROLES[role];

    const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
    if (!file) return;
    let rawContent;
    try {
      rawContent = await this.app.vault.cachedRead(file);
    } catch { return; }

    const openPat = `<!-- ${role}:${label}-->`;
    const closePat = `<!-- /${role}-->`;
    const openIdx = rawContent.indexOf(openPat);
    const closeIdx = rawContent.indexOf(closePat, openIdx + openPat.length);
    if (openIdx === -1 || closeIdx === -1) return;
    const innerRaw = rawContent.slice(openIdx + openPat.length, closeIdx).trim();

    const container = createDiv({ cls: `board-section ${roleInfo.cls}` });
    const header = container.createDiv({ cls: 'board-section-header' });
    const hLeft = header.createSpan({ cls: 'board-section-role' });
    hLeft.textContent = `${roleInfo.emoji} ${roleInfo.name}`;
    const hRight = header.createSpan({ cls: 'board-section-label' });
    hRight.textContent = label;

    const textarea = container.createEl('textarea', {
      cls: 'board-section-textarea',
      attr: { 'data-role': role, 'data-label': label }
    });
    textarea.value = innerRaw;

    const doSave = async () => {
      const currentFile = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
      if (!currentFile) return;
      try {
        const currentRaw = await this.app.vault.read(currentFile);
        const oi = currentRaw.indexOf(openPat);
        const ci = currentRaw.indexOf(closePat, oi + openPat.length);
        if (oi === -1 || ci === -1) return;
        const updated = currentRaw.slice(0, oi + openPat.length) + '\n' + textarea.value + '\n' + currentRaw.slice(ci);
        await this.app.vault.modify(currentFile, updated);
      } catch {}
    };

    textarea.addEventListener('blur', () => doSave());
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        doSave();
      }
    });

    for (const cn of contentNodes) {
      cn.remove();
    }
    open.node.parentNode.insertBefore(container, close.node);
    open.node.remove();
    close.node.remove();
  }

  /* ── Ribbon ────────────────────────────────── */
  _addRibbon() {
    const barIcon = this.addRibbonIcon('bar-chart', 'Update contribution bar', () => {
      this._updateBarInHomePage();
    });
    barIcon.style.color = 'var(--text-muted)';

    const gitIcon = this.addRibbonIcon('git-commit', 'Commit & push to GitHub', () => {
      this._commitAndPush();
    });
    gitIcon.style.color = 'var(--text-muted)';
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
    this.addCommand({
      id: 'commit-push',
      name: 'Commit & push to GitHub',
      hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'G' }],
      callback: () => this._commitAndPush(),
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
      editor.replaceSelection(`::${roleKey}:${sel}::`);
    } else {
      const line = editor.getCursor().line;
      const text = editor.getLine(line);
      if (text.trim()) {
        editor.setLine(line, `::${roleKey}:${text.trim()}::`);
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
      const content = `## ✎ Personal Draft — ${role.emoji} ${role.name}\n\n*Use this page for brainstorming, notes, and drafts.*\n\n---\n\n`;
      try { await this.app.vault.create(filePath, content); } catch (_) {}
    }
    this.app.workspace.openLinkText(filePath, '');
  }

  async _countContribs() {
    const files = this.app.vault.getMarkdownFiles();
    let c1 = 0, c2 = 0, c3 = 0;
    for (const f of files) {
      const text = await this.app.vault.read(f);
      c1 += (text.match(/::t1:.*?::/gs) || []).length;
      c2 += (text.match(/::t2:.*?::/gs) || []).length;
      c3 += (text.match(/::t3:.*?::/gs) || []).length;
    }
    return { c1, c2, c3 };
  }

  _barHTML(c1, c2, c3) {
    const total = c1 + c2 + c3;
    if (!total) return null;
    const p1 = Math.round((c1 / total) * 100);
    const p2 = Math.round((c2 / total) * 100);
    const p3 = 100 - p1 - p2;
    return `<div class="contrib-bar-container">\n  <div class="contrib-bar-t1" style="width: ${p1}%"></div>\n  <div class="contrib-bar-t2" style="width: ${p2}%"></div>\n  <div class="contrib-bar-t3" style="width: ${p3}%"></div>\n</div>\n\n<div class="contrib-legend">\n  <span class="contrib-legend-item">\n    <span class="contrib-legend-dot t1"></span> ✈︎ Seif — <strong>${p1}%</strong>\n  </span>\n  <span class="contrib-legend-item">\n    <span class="contrib-legend-dot t2"></span> ⌕ Marwan — <strong>${p2}%</strong>\n  </span>\n  <span class="contrib-legend-item">\n    <span class="contrib-legend-dot t3"></span> ✧ Yara — <strong>${p3}%</strong>\n  </span>\n</div>`;
  }

  async _updateBarInHomePage() {
    const homeFile = this.app.vault.getAbstractFileByPath('_Home.md');
    if (!homeFile) { new Notice('00 🏠 _Home.md not found!'); return; }
    const { c1, c2, c3 } = await this._countContribs();
    const total = c1 + c2 + c3;
    if (!total) { new Notice('No contributions found. Start stamping with Ctrl+Shift+L!'); return; }
    const content = await this.app.vault.read(homeFile);
    const newBar = this._barHTML(c1, c2, c3);
    const pattern = /<div class="contrib-bar-container">[\s\S]*?<\/div>\n\n<div class="contrib-legend">[\s\S]*?<\/div>/;
    if (!pattern.test(content)) { new Notice('Could not find the bar section in 🏠 _Home.md'); return; }
    const updated = content.replace(pattern, newBar);
    await this.app.vault.modify(homeFile, updated);
    new Notice(`📊 Bar updated! T1: ${c1}, T2: ${c2}, T3: ${c3} (${total} total)`);
  }

  /* ── Autostamp (skip box markers) ──────────── */
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
          // Don't stamp lines that already have stamps or contain box markers
          if (t.startsWith('::') || t.includes('<!--') || t.includes('-->')) return;
          editor.setLine(cursor.line, `::${this.settings.currentRole}:${t}::`);
          editor.setCursor({ line: cursor.line, ch: `::${this.settings.currentRole}:${t}::`.length });
        }, 600);
      })
    );
  }

  _editor() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    return view ? view.editor : null;
  }

  /* ── Git commit & push ─────────────────────── */
  _commitAndPush() {
    const vaultPath = (this.app.vault.adapter).getBasePath ? this.app.vault.adapter.getBasePath() : this.app.vault.adapter.basePath;
    if (!vaultPath) {
      new Notice('Could not find vault path');
      return;
    }
    new Notice('Committing & pushing to GitHub...');
    const now = new Date();
    const msg = `vault update ${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    exec(`git -C "${vaultPath}" add -A`, (errAdd) => {
      if (errAdd) { new Notice('Git add failed: ' + (errAdd.message || 'unknown')); return; }
      exec(`git -C "${vaultPath}" commit -m "${msg}"`, (errCommit) => {
        if (errCommit) {
          if (errCommit.message && errCommit.message.includes('nothing to commit')) {
            new Notice('Nothing to commit — everything is up to date');
          } else {
            new Notice('Git commit failed: ' + (errCommit.message || 'unknown'));
          }
          return;
        }
        exec(`git -C "${vaultPath}" pull --rebase`, (errPull) => {
          if (errPull) { new Notice('Git pull failed: ' + (errPull.message || 'unknown')); return; }
          exec(`git -C "${vaultPath}" push`, (errPush) => {
            if (errPush) { new Notice('Git push failed: ' + (errPush.message || 'unknown')); return; }
            new Notice('Pushed to GitHub!');
          });
        });
      });
    });
  }

  /* ── Settings ──────────────────────────────── */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }

  /* ── Board data helpers ────────────────────── */
  _parseBoardBlocks(content) {
    const blocks = [];
    const re = /<!--\s*(t[123]):(.+?)-->([\s\S]*?)<!--\s*\/(t[123])\s*-->/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      blocks.push({ role: m[1], label: m[2].trim(), content: m[3].trim() });
    }
    return blocks;
  }

  _serializeBoardBlocks(blocks) {
    return blocks.map(b =>
      `<!-- ${b.role}:${b.label}-->\n${b.content}\n<!-- /${b.role}-->`
    ).join('\n\n');
  }
}
