const { Plugin, PluginSettingTab, Setting, Notice, MarkdownView, ItemView, normalizePath, Platform } = require('obsidian');
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
const DEFAULT_SETTINGS = { currentRole: '', autostamp: false, autoBoard: true };

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
    new Setting(containerEl)
      .setName('Auto-open Research Board')
      .setDesc('Automatically open the native Board view when opening files with teammate markers')
      .addToggle(tb => tb
        .setValue(this.plugin.settings.autoBoard)
        .onChange(async v => {
          this.plugin.settings.autoBoard = v;
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

    // ── Auto-open board for files with markers ──
    const tryOpenBoard = async (file, leaf) => {
      if (!file || file.extension !== 'md' || !this.settings.autoBoard) return;
      if (leaf?.view?.getViewState()?.state?.skipAutoBoard) return;
      if (this.app.workspace.getLeavesOfType('research-board')
        .some(l => l.view && l.view.file && l.view.file.path === file.path)) return;
      const peek = await this.app.vault.cachedRead(file);
      if (!/<!--\s*t[123]:/.test(peek.slice(0, 3000))) return;
      const boardLeaf = this.app.workspace.getLeaf('tab');
      await boardLeaf.setViewState({
        type: 'research-board',
        state: { file: file.path },
      });
      this.app.workspace.setActiveLeaf(boardLeaf);
      if (leaf && boardLeaf && leaf.view?.getViewType() === 'markdown') {
        setTimeout(() => {
          try {
            if (leaf.view?.file?.path === file.path) this.app.workspace.detachLeaf(leaf);
          } catch {}
        }, 80);
      }
    };
    this.registerEvent(this.app.workspace.on('file-open', (file) => {
      if (!file || file.extension !== 'md') return;
      const leaf = this.app.workspace.getActiveViewOfType(MarkdownView)?.leaf;
      tryOpenBoard(file, leaf);
    }));
    // Scan existing leaves on load (covers workspace restore)
    for (const leaf of this.app.workspace.getLeavesOfType('markdown')) {
      if (leaf.view?.file) tryOpenBoard(leaf.view.file, leaf);
    }

    this.registerMarkdownPostProcessor((el, ctx) => {
      // Inline stamps → colored spans
      el.innerHTML = el.innerHTML.replace(
        /::(t[123]):(.*?)::/gs,
        (_, role, text) => `<span style="color: ${COLORS[role]}">${text}</span>`
      );
      // Box markers → textarea
      this._processBoxMarkers(el, ctx);
    });

    // ── Research Board view ─────────────────────
    this.registerView('research-board', (leaf) => new ResearchBoardView(leaf, this));
    this.addCommand({
      id: 'open-research-board',
      name: 'Open Research Board for current file',
      hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'B' }],
      callback: () => this._openBoardView(),
    });
    this.addCommand({
      id: 'close-research-board',
      name: 'Close Research Board',
      callback: () => this._closeBoardView(),
    });
  }

  /* ── Open board view for current file ────────── */
  async _openBoardView() {
    const file = this.app.workspace.getActiveFile();
    if (!file) { new Notice('No active file'); return; }
    // Check if board already exists for this file
    const existing = this.app.workspace.getLeavesOfType('research-board')
      .find(l => l.view && l.view.file && l.view.file.path === file.path);
    if (existing) {
      this.app.workspace.setActiveLeaf(existing);
      return;
    }
    const content = await this.app.vault.read(file);
    if (!/<!--\s*t[123]:/.test(content)) {
      new Notice('No marker pairs found — open a collaborative file first');
      return;
    }
    const boardLeaf = this.app.workspace.getLeaf('tab');
    await boardLeaf.setViewState({
      type: 'research-board',
      state: { file: file.path },
    });
    this.app.workspace.setActiveLeaf(boardLeaf);
  }

  async _closeBoardView() {
    this.app.workspace.getLeavesOfType('research-board').forEach(l => l.detach());
  }

  /* ── Reading-mode textarea rendering ────────── */
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
            this._replaceBoxWithTextarea(open, b, el, ctx);
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

    const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
    if (!file) return;
    let rawContent;
    try {
      rawContent = await this.app.vault.read(file);
    } catch { return; }

    const openPat = `<!-- ${open.role}:${open.label}-->`;
    const closePat = `<!-- /${open.role}-->`;
    const openIdx = rawContent.indexOf(openPat);
    const closeIdx = rawContent.indexOf(closePat, openIdx + openPat.length);
    if (openIdx === -1 || closeIdx === -1) return;

    const innerRaw = rawContent.slice(openIdx + openPat.length, closeIdx).trim();

    const container = createDiv({ cls: `teammate-box ${ROLES[open.role].cls}` });
    const header = container.createDiv({ cls: 'teammate-box-header' });
    header.textContent = open.label;
    const textarea = container.createEl('textarea', {
      cls: 'teammate-box-textarea',
      attr: { 'data-role': open.role, 'data-label': open.label }
    });
    textarea.value = innerRaw;

    const saveBtn = container.createEl('button', {
      cls: 'teammate-box-save',
      text: 'Update'
    });
    saveBtn.addEventListener('click', async () => {
      const newContent = textarea.value;
      const currentFile = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
      if (!currentFile) return;
      try {
        const currentRaw = await this.app.vault.read(currentFile);
        const oldOpen = `<!-- ${open.role}:${open.label}-->`;
        const oldClose = `<!-- /${open.role}-->`;
        const oi = currentRaw.indexOf(oldOpen);
        const ci = currentRaw.indexOf(oldClose, oi + oldOpen.length);
        if (oi === -1 || ci === -1) {
          new Notice('Could not find box in file — maybe it moved?');
          return;
        }
        const updated = currentRaw.slice(0, oi + oldOpen.length) + '\n' + newContent + '\n' + currentRaw.slice(ci);
        await this.app.vault.modify(currentFile, updated);
        new Notice(`Saved ${ROLES[open.role].emoji} ${open.label}`);
      } catch (e) {
        new Notice('Save failed: ' + e.message);
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
};

/* =====================================================================
 * RESEARCH BOARD VIEW — vault-wide native UI for marker-based files
 * ===================================================================== */

class ResearchBoardView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this._boardFile = null;
    this.blocks = [];
    this._saveTimer = null;
  }

  get file() { return this._boardFile; }
  getViewType() { return 'research-board'; }
  getDisplayText() { return this.file ? `${this.file.basename} — Board` : 'Research Board'; }
  getIcon() { return 'layout-dashboard'; }

  async onOpen() {
    this.containerEl.empty();
    this.containerEl.addClass('rb-container');

    const state = this.leaf.getViewState().state;
    if (state && state.file) {
      const file = this.app.vault.getAbstractFileByPath(state.file);
      if (file) await this.setFile(file);
    }
  }

  onClose() {
    this.containerEl.empty();
  }

  async onunload() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
  }

  async setFile(file) {
    this._boardFile = file;
    if (!file) return;
    const content = await this.app.vault.read(file);
    this.blocks = this.plugin._parseBoardBlocks(content);
    this.render();
  }

  /* ── SAVE ────────────────────────────────────── */
  async save(delay = 0) {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    if (delay) {
      this._saveTimer = setTimeout(() => this._doSave(), delay);
    } else {
      await this._doSave();
    }
  }

  async _doSave() {
    if (!this.file) return;
    const content = await this.app.vault.read(this.file);
    const newContent = this.plugin._serializeBoardBlocks(this.blocks);
    const firstIdx = content.indexOf('<!-- t');
    const lastIdx = content.lastIndexOf('-->') + 3;
    if (firstIdx === -1) return;
    const updated = content.slice(0, firstIdx) + newContent + content.slice(lastIdx);
    await this.app.vault.modify(this.file, updated);
  }

  /* ── RENDER ───────────────────────────────────── */
  render() {
    const container = this.containerEl;
    container.empty();

    // ── Header ──────────────────────────────────
    const header = container.createDiv({ cls: 'rb-header' });
    const title = header.createEl('h1', { text: this.file ? this.file.basename : 'Research Board' });
    const actions = header.createDiv({ cls: 'rb-header-actions' });
    const sourceBtn = actions.createEl('button', { cls: 'clickable-icon', text: '📝 Source' });
    sourceBtn.addEventListener('click', () => {
      if (!this.file) return;
      this.app.workspace.openLinkText(this.file.path, this.file.path, 'tab', { active: true, state: { skipAutoBoard: true } });
    });
    const saveBtn = actions.createEl('button', { cls: 'clickable-icon', text: '💾 Save' });
    saveBtn.addEventListener('click', () => this.save());

    // ── Group blocks by role ────────────────────
    const groups = {};
    const order = [];
    for (const b of this.blocks) {
      if (!groups[b.role]) { groups[b.role] = []; order.push(b.role); }
      groups[b.role].push(b);
    }

    // ── Board ──────────────────────────────────
    const board = container.createDiv({ cls: 'rb-board' });

    for (const role of order) {
      const roleBlocks = groups[role];
      const r = ROLES[role];
      const color = COLORS[role];
      this._renderCard(board, role, r, color, roleBlocks);
    }
  }

  _renderCard(board, role, roleInfo, color, blocks) {
    const card = board.createDiv({ cls: 'rb-card' });
    card.style.setProperty('--card-color', color);
    card.style.setProperty('--card-rgb', this._hexToRgb(color));

    // ── Card header ────────────────────────────
    const header = card.createDiv({ cls: 'rb-card-header' });
    header.createSpan({ text: `${roleInfo.emoji} ${roleInfo.name}` });
    header.createSpan({ cls: 'rb-status-chip', text: 'Researching' });

    const body = card.createDiv({ cls: 'rb-card-body' });

    // Classify blocks
    const qBlocks = blocks.filter(b => /question/i.test(b.label));
    const fBlocks = blocks.filter(b => /findings|answer|answered/i.test(b.label));
    const otherBlocks = blocks.filter(b =>
      !/question|findings|answer|answered|source/i.test(b.label)
    );

    if (fBlocks.length) body.addClass('has-findings');

    // ── Questions column ───────────────────────
    if (qBlocks.length || otherBlocks.length) {
      const col = body.createDiv({ cls: 'rb-col rb-col-questions' });
      col.createDiv({ cls: 'rb-section-header', text: '🔵 Questions' });

      if (qBlocks.length) {
        for (const qb of qBlocks) {
          this._renderQuestionBlock(col, qb);
        }
      }
      if (otherBlocks.length) {
        for (const ob of otherBlocks) {
          this._renderNotesBlock(col, ob);
        }
      }
    }

    // ── Findings column ────────────────────────
    if (fBlocks.length) {
      const col = body.createDiv({ cls: 'rb-col rb-col-findings' });
      col.createDiv({ cls: 'rb-section-header', text: '🟢 Findings' });
      for (const fb of fBlocks) {
        this._renderFindingsBlock(col, fb);
      }
    }

    // ── Sources ────────────────────────────────
    const sourcesBlock = blocks.find(b => /source/i.test(b.label));
    if (sourcesBlock) {
      const srcSec = body.createDiv({ cls: 'rb-sources' });
      this._renderSourcesBlock(srcSec, sourcesBlock);
    }
  }

  /* ── Question Block ──────────────────────────── */
  _renderQuestionBlock(container, block) {
    const items = this._parseQuestionItems(block.content);
    const list = container.createDiv({ cls: 'rb-questions' });

    const renderItems = () => {
      list.empty();
      const filtered = items.filter(it => !it._deleted);
      for (let i = 0; i < filtered.length; i++) {
        this._renderQuestionItem(list, filtered[i], i, () => {
          block.content = this._serializeQuestionItems(filtered);
          this.save(600);
        }, (idx) => {
          filtered[idx]._deleted = true;
          block.content = this._serializeQuestionItems(filtered.filter(it => !it._deleted));
          renderItems();
          this.save(600);
        });
      }
      // Add question button
      const addBtn = list.createDiv({ cls: 'rb-add-question', text: '+ Add Question' });
      addBtn.addEventListener('click', () => {
        items.push({ title: '', status: 'todo', priority: 'medium', notes: '' });
        block.content = this._serializeQuestionItems(items.filter(it => !it._deleted));
        renderItems();
        this.save(600);
      });
    };
    renderItems();
  }

  _parseQuestionItems(content) {
    const items = [];
    if (!content || !content.trim()) return items;
    const parts = content.split(/(?=^##\s)/m);
    for (const part of parts) {
      const tMatch = part.match(/^##\s*(.+)/m);
      if (!tMatch) continue;
      const title = tMatch[1].trim();
      const statusM = part.match(/Status:\s*(todo|researching|complete|blocked)/i);
      const priorityM = part.match(/Priority:\s*(low|medium|high)/i);
      const notesM = part.match(/Notes:\s*(.+)/i);
      items.push({
        title,
        status: statusM ? statusM[1].toLowerCase() : 'todo',
        priority: priorityM ? priorityM[1].toLowerCase() : 'medium',
        notes: notesM ? notesM[1].trim() : '',
      });
    }
    return items;
  }

  _serializeQuestionItems(items) {
    return items.map(it => {
      let s = `## ${it.title}\n`;
      s += `Status: ${it.status}\n`;
      s += `Priority: ${it.priority}\n`;
      if (it.notes) s += `Notes: ${it.notes}\n`;
      return s;
    }).join('\n');
  }

  _renderQuestionItem(list, item, idx, onChange, onDelete) {
    const el = list.createDiv({ cls: 'rb-question' });

    // Header row
    const hdr = el.createDiv({ cls: 'rb-question-header' });

    const titleInput = hdr.createEl('input', {
      cls: 'rb-question-title',
      attr: { type: 'text', placeholder: 'e.g. What is CO2 per passenger-mile?' }
    });
    titleInput.value = item.title;
    titleInput.addEventListener('input', () => {
      item.title = titleInput.value;
      onChange();
    });

    const statusBtn = hdr.createEl('button', {
      cls: `rb-question-status s-${item.status}`,
      text: this._statusLabel(item.status),
    });
    statusBtn.addEventListener('click', () => {
      const cycle = ['todo', 'researching', 'complete', 'blocked'];
      const i = cycle.indexOf(item.status);
      item.status = cycle[(i + 1) % 4];
      statusBtn.textContent = this._statusLabel(item.status);
      statusBtn.className = `rb-question-status s-${item.status}`;
      onChange();
    });

    const priorityBtn = hdr.createEl('button', {
      cls: `rb-question-priority p-${item.priority}`,
      text: this._priorityLabel(item.priority),
    });
    priorityBtn.addEventListener('click', () => {
      const cycle = ['low', 'medium', 'high'];
      const i = cycle.indexOf(item.priority);
      item.priority = cycle[(i + 1) % 3];
      priorityBtn.textContent = this._priorityLabel(item.priority);
      priorityBtn.className = `rb-question-priority p-${item.priority}`;
      onChange();
    });

    // Notes
    const notesWrap = el.createDiv({ cls: 'rb-question-notes' });
    const notesInput = notesWrap.createEl('textarea', {
      attr: { rows: 1, placeholder: 'Notes...' }
    });
    notesInput.value = item.notes || '';
    notesInput.addEventListener('input', () => {
      item.notes = notesInput.value;
      onChange();
      notesInput.style.height = 'auto';
      notesInput.style.height = Math.max(24, notesInput.scrollHeight) + 'px';
    });
    setTimeout(() => {
      notesInput.style.height = 'auto';
      notesInput.style.height = Math.max(24, notesInput.scrollHeight) + 'px';
    }, 0);

    // Footer
    const footer = el.createDiv({ cls: 'rb-question-footer' });
    const delBtn = footer.createEl('button', { text: '🗑 Delete' });
    delBtn.addEventListener('click', () => {
      if (onDelete) onDelete(idx);
    });
  }

  _statusLabel(s) {
    return { todo: '⚪ Todo', researching: '🟡 Researching', complete: '🟢 Complete', blocked: '🔴 Blocked' }[s] || s;
  }

  _priorityLabel(p) {
    return { low: '↓ Low', medium: '— Med', high: '↑ High' }[p] || p;
  }

  /* ── Findings Block ──────────────────────────── */
  _renderFindingsBlock(container, block) {
    const panel = container.createDiv({ cls: 'rb-findings-panel' });
    const editor = panel.createEl('textarea', { cls: 'rb-editor' });
    editor.value = block.content || '';
    editor.addEventListener('input', () => {
      block.content = editor.value;
      this.save(600);
    });
  }

  /* ── Notes Block (for non-Q/F blocks) ───────── */
  _renderNotesBlock(container, block) {
    container.createDiv({ cls: 'rb-section-header', text: `📝 ${block.label}` });
    this._renderMiniEditor(container, block);
  }

  _renderMiniEditor(container, block) {
    const panel = container.createDiv({
      cls: 'rb-findings-panel',
      attr: { style: 'min-height: 80px; margin-bottom: 12px;' }
    });
    const editor = panel.createEl('textarea', { cls: 'rb-editor' });
    editor.value = block.content || '';
    editor.addEventListener('input', () => {
      block.content = editor.value;
      this.save(600);
      editor.style.height = 'auto';
      editor.style.height = Math.max(60, editor.scrollHeight) + 'px';
    });
    setTimeout(() => {
      editor.style.height = 'auto';
      editor.style.height = Math.max(60, editor.scrollHeight) + 'px';
    }, 0);
  }

  /* ── Sources Block ───────────────────────────── */
  _renderSourcesBlock(container, block) {
    const header = container.createDiv({ cls: 'rb-section-header', text: '📚 Sources' });
    const items = this._parseSourceItems(block.content);
    const list = container.createDiv({ cls: 'rb-source-list' });

    const renderItems = () => {
      list.empty();
      const filtered = items.filter(it => !it._deleted);
      for (let i = 0; i < filtered.length; i++) {
        this._renderSourceItem(list, filtered[i], i, () => {
          block.content = this._serializeSourceItems(filtered.filter(it => !it._deleted));
          this.save(600);
        }, (idx) => {
          filtered[idx]._deleted = true;
          block.content = this._serializeSourceItems(filtered.filter(it => !it._deleted));
          renderItems();
          this.save(600);
        });
      }
      const addBtn = list.createDiv({ cls: 'rb-add-source', text: '+ Add Source' });
      addBtn.addEventListener('click', () => {
        items.push({ title: '', url: '', type: 'other', notes: '' });
        block.content = this._serializeSourceItems(items.filter(it => !it._deleted));
        renderItems();
        this.save(600);
      });
    };
    renderItems();
  }

  _parseSourceItems(content) {
    const items = [];
    if (!content || !content.trim()) return items;
    const parts = content.split(/(?=^##\s)/m);
    for (const part of parts) {
      const tMatch = part.match(/^##\s*(.+)/m);
      if (!tMatch) continue;
      items.push({
        title: tMatch[1].trim(),
        url: (part.match(/URL:\s*(.+)/i) || [])[1] || '',
        type: (part.match(/Type:\s*(.+)/i) || [])[1] || 'other',
        notes: (part.match(/Notes:\s*(.+)/i) || [])[1] || '',
      });
    }
    return items;
  }

  _serializeSourceItems(items) {
    return items.map(it => {
      let s = `## ${it.title}\n`;
      s += `URL: ${it.url}\n`;
      s += `Type: ${it.type}\n`;
      if (it.notes) s += `Notes: ${it.notes}\n`;
      return s;
    }).join('\n');
  }

  _renderSourceItem(list, item, idx, onChange, onDelete) {
    const el = list.createDiv({ cls: 'rb-source-item' });
    const titleInput = el.createEl('input', { attr: { type: 'text', placeholder: 'Source title...' } });
    titleInput.value = item.title;
    titleInput.addEventListener('input', () => { item.title = titleInput.value; onChange(); });

    const urlInput = el.createEl('input', { attr: { type: 'text', placeholder: 'URL...' } });
    urlInput.value = item.url;
    urlInput.addEventListener('input', () => { item.url = urlInput.value; onChange(); });

    const typeSelect = el.createEl('select');
    for (const t of ['report', 'paper', 'interview', 'dataset', 'other']) {
      const opt = typeSelect.createEl('option', { value: t, text: t.charAt(0).toUpperCase() + t.slice(1) });
      if (t === item.type) opt.selected = true;
    }
    typeSelect.addEventListener('change', () => { item.type = typeSelect.value; onChange(); });

    const delBtn = el.createEl('button', { cls: 'rb-source-del', text: '✕' });
    delBtn.addEventListener('click', () => {
      if (onDelete) onDelete(idx);
    });
  }

  /* ── Utility ────────────────────────────────── */
  _hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }
}
