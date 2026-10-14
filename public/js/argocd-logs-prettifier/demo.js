// Interactive demo for the Argo CD Logs Prettifier project page. Uses the extension's
// real parser (parser.js); the rendering is a small page-local version of the panel.
(function () {
  const P = window.ArgoLogsPrettifier;
  const root = document.getElementById('ajl-demo');
  if (!P || !root) return;

  // --- synthetic log stream (same shape as the logs the extension was built on) ---
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const hex = (n) => Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(rnd() * 16)]).join('');
  const workflows = ['ClaimWorkflowV1', 'RefundWorkflow', 'CloseDeliveredActivity'];
  const users = ['mariana', 'tomas', 'lucia', 'pedro'];
  let seq = 4100;
  let t = Date.now() - 120000;
  function gen() {
    const n = rnd();
    const ts = new Date(t).toISOString();
    t += 300 + rnd() * 1200;
    if (n < 0.42) {
      const claim = 'CLM-' + seq++;
      const pol = 'POL-' + (1000 + (seq % 900));
      const w = rnd();
      const m = w < 0.5 ? ['Information', 'Claim.Api.ClaimsController', `Claim ${claim} received for policy ${pol}`, { ClaimId: claim, PolicyId: pol, Channel: 'web' }]
        : w < 0.7 ? ['Information', 'Dapr.Workflow.Worker', `Workflow ${pick(workflows)} started for ${claim}`, { ClaimId: claim, WorkflowName: pick(workflows) }]
        : w < 0.85 ? ['Debug', 'Claim.Rules.Engine', `Evaluated 14 rules for ${claim} in 23 ms`, { ClaimId: claim, RuleSet: 'auto-v7', DurationMs: 23 }]
        : w < 0.95 ? ['Warning', 'Claim.Payments.Gateway', `Retry 2/3 for payout ${claim}: upstream timeout`, { ClaimId: claim, Attempt: 2, UpstreamMs: 5012 }]
        : ['Error', 'Claim.Payments.Gateway', `Payout failed for ${claim}: insufficient data from bank API`, { ClaimId: claim, StatusCode: 502, Bank: 'ACME' }];
      const obj = { EventId: 1000000 + Math.floor(rnd() * 9e6), LogLevel: m[0], Category: m[1], Message: m[2], State: Object.assign({}, m[3], { '{OriginalFormat}': m[2].replace(/CLM-\d+/, '{ClaimId}') }), Scopes: [{ TraceId: hex(32), SpanId: hex(16), RequestPath: '/api/claims' }] };
      return { pod: 'claim-service', text: `${ts} ${JSON.stringify(obj)}` };
    }
    if (n < 0.72) {
      const warn = rnd() > 0.85;
      const msg = warn ? 'app channel is not initialized. did you make sure to configure an app-port?' : 'HTTP API Called: POST /v1.0/invoke/claim-rules/method/evaluate';
      return { pod: 'daprd', text: `${ts} time="${ts}" level=${warn ? 'warning' : 'info'} msg="${msg}" app_id=claim-service instance=claim-service-7d9f6c4b8-xk2lp scope=dapr.runtime.http type=log ver=1.14.4` };
    }
    if (n < 0.9) {
      const lv = rnd() < 0.8 ? 30 : 50;
      return { pod: 'claim-service', text: `${ts} ${JSON.stringify({ level: lv, time: t, pid: 17, hostname: 'claim-service-7d9f6c4b8-xk2lp', reqId: hex(8), req: { method: 'GET', url: '/api/claims?owner=' + pick(users) + '@example.com' }, res: { statusCode: lv === 30 ? 200 : 500 }, responseTime: Math.round(rnd() * 120), msg: lv === 30 ? 'request completed' : 'request errored' })}` };
    }
    return { pod: 'claim-service', text: `${ts} ${rnd() < 0.5 ? 'warn: Application started. Press Ctrl+C to shut down.' : 'Hosting environment: Production'}` };
  }

  // --- state ---
  const LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'none'];
  const state = { on: false, playing: true, query: '', levels: new Set(LEVELS), wrap: false, recs: [], expanded: new Set(), max: 250 };
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  root.innerHTML = '';
  root.classList.add('ajl-demo');
  const chrome = el('div', 'ajl-demo-chrome');
  chrome.append(el('span', 'ajl-demo-dot'), el('span', 'ajl-demo-dot'), el('span', 'ajl-demo-dot'));
  const addr = el('span', 'ajl-demo-addr', 'argocd.example.internal/applications/claim-service · Logs');
  chrome.appendChild(addr);
  const argoBar = el('div', 'ajl-demo-argobar');
  const toggle = el('button', 'ajl-demo-toggle', '{ } JSON');
  toggle.type = 'button';
  toggle.title = 'Toggle structured view (this is the button the extension adds to Argo CD)';
  const play = el('button', 'ajl-demo-btn', 'Pause stream');
  play.type = 'button';
  ['Containers ▾', 'Follow', 'Tail 1000 lines ▾', 'Since ▾'].forEach((s) => argoBar.appendChild(el('span', 'ajl-demo-argobtn', s)));
  argoBar.append(toggle, play);
  const body = el('div', 'ajl-demo-body');
  const rawView = el('div', 'ajl-demo-raw');
  const panel = el('div', 'ajl-demo-panel');
  const toolbar = el('div', 'ajl-demo-toolbar');
  const search = el('input', 'ajl-demo-search');
  search.type = 'search';
  search.placeholder = 'Filter parsed rows (message, logger, fields)…';
  search.setAttribute('aria-label', 'Filter rows');
  const chips = el('div', 'ajl-demo-chips');
  const chipEls = {};
  LEVELS.forEach((lvl) => {
    const c = el('button', `ajl-demo-chip ajl-demo-chip-${lvl} is-on`);
    c.type = 'button';
    c.title = 'Click: toggle level. Ctrl/⌘-click: only this level';
    c.append(el('span', null, lvl === 'none' ? 'other' : lvl), el('b', null, '0'));
    c.addEventListener('click', (ev) => {
      if (ev.ctrlKey || ev.metaKey || ev.altKey) { state.levels = new Set([lvl]); }
      else if (state.levels.has(lvl)) state.levels.delete(lvl);
      else state.levels.add(lvl);
      render();
    });
    chipEls[lvl] = c;
    chips.appendChild(c);
  });
  const wrapBtn = el('button', 'ajl-demo-btn', 'Wrap');
  wrapBtn.type = 'button';
  const stats = el('span', 'ajl-demo-stats');
  toolbar.append(search, chips, wrapBtn, stats);
  const rows = el('div', 'ajl-demo-rows');
  const hint = el('p', 'ajl-demo-hint', 'Click a row to expand the full record. Everything here runs in this page; it is the same parser the extension ships.');
  panel.append(toolbar, rows, hint);
  body.append(rawView, panel);
  root.append(chrome, argoBar, body);

  // --- rendering ---
  function matches(rec) {
    if (!state.levels.has(rec.level)) return false;
    if (!state.query) return true;
    return rec.hay.indexOf(state.query) >= 0;
  }
  function jsonHtml(value, indent) {
    const pad = '  '.repeat(indent);
    if (value === null) return '<i class="j-null">null</i>';
    if (typeof value === 'number') return `<i class="j-num">${value}</i>`;
    if (typeof value === 'boolean') return `<i class="j-bool">${value}</i>`;
    if (typeof value === 'string') return `<i class="j-str">"${esc(value)}"</i>`;
    if (Array.isArray(value)) {
      if (!value.length) return '[]';
      return `[\n${value.map((v) => `${pad}  ${jsonHtml(v, indent + 1)}`).join(',\n')}\n${pad}]`;
    }
    const keys = Object.keys(value);
    if (!keys.length) return '{}';
    return `{\n${keys.map((k) => `${pad}  <i class="j-key">"${esc(k)}"</i>: ${jsonHtml(value[k], indent + 1)}`).join(',\n')}\n${pad}}`;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function rowFor(rec) {
    if (rec.row) return rec.row;
    const r = el('div', `ajl-demo-row ajl-demo-lvl-${rec.level}${rec.p.format === 'raw' ? ' is-raw' : ''}`);
    r.tabIndex = 0;
    r.setAttribute('role', 'button');
    r.append(el('span', 'ajl-demo-time', P.formatTime(rec.p.time)));
    r.append(el('span', `ajl-demo-level ajl-demo-level-${rec.level}`, rec.level === 'none' ? '–' : rec.level));
    r.append(el('span', 'ajl-demo-pod', rec.pod));
    if (rec.p.logger) r.append(el('span', 'ajl-demo-logger', rec.p.logger));
    r.append(el('span', 'ajl-demo-msg', rec.p.message));
    const ex = Object.keys(rec.p.extras || {}).slice(0, 4);
    if (ex.length) {
      const x = el('span', 'ajl-demo-extras');
      ex.forEach((k) => { const v = rec.p.extras[k]; x.append(el('b', null, k + '='), el('span', null, typeof v === 'object' ? JSON.stringify(v) : String(v)), ' '); });
      r.append(x);
    }
    const open = () => { if (state.expanded.has(rec.id)) state.expanded.delete(rec.id); else state.expanded.add(rec.id); render(); };
    r.addEventListener('click', open);
    r.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    rec.row = r;
    return r;
  }
  function detailFor(rec) {
    if (rec.detail) return rec.detail;
    const d = el('div', 'ajl-demo-detail');
    const pre = el('pre');
    pre.innerHTML = rec.p.record ? jsonHtml(rec.p.record, 0) : esc(rec.text);
    d.appendChild(pre);
    rec.detail = d;
    return d;
  }

  let raf = 0;
  function render() {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; paint(); });
  }
  function paint() {
    root.classList.toggle('is-on', state.on);
    toggle.classList.toggle('is-active', state.on);
    toggle.setAttribute('aria-pressed', String(state.on));
    play.textContent = state.playing ? 'Pause stream' : 'Resume stream';
    panel.classList.toggle('is-wrap', state.wrap);
    wrapBtn.classList.toggle('is-active', state.wrap);
    if (!state.on) {
      const frag = document.createDocumentFragment();
      state.recs.slice(-80).forEach((rec) => {
        const line = el('div', 'ajl-demo-rawline');
        line.append(el('span', 'ajl-demo-rawpod', rec.pod), el('span', null, rec.text));
        frag.appendChild(line);
      });
      rawView.replaceChildren(frag);
      rawView.scrollTop = rawView.scrollHeight;
      return;
    }
    const counts = {};
    LEVELS.forEach((l) => (counts[l] = 0));
    const frag = document.createDocumentFragment();
    let shown = 0;
    const atBottom = rows.scrollHeight - rows.scrollTop - rows.clientHeight < 40;
    state.recs.forEach((rec) => {
      counts[rec.level]++;
      if (!matches(rec)) return;
      shown++;
      frag.appendChild(rowFor(rec));
      if (state.expanded.has(rec.id)) frag.appendChild(detailFor(rec));
    });
    LEVELS.forEach((l) => {
      chipEls[l].classList.toggle('is-on', state.levels.has(l));
      chipEls[l].querySelector('b').textContent = counts[l];
      chipEls[l].setAttribute('aria-pressed', String(state.levels.has(l)));
    });
    if (!shown) frag.appendChild(el('div', 'ajl-demo-empty', 'No rows match the current filters.'));
    rows.replaceChildren(frag);
    stats.textContent = `${shown} / ${state.recs.length} lines`;
    if (atBottom) rows.scrollTop = rows.scrollHeight;
  }

  let id = 0;
  function push() {
    const l = gen();
    const p = P.parseLine(l.text);
    const rec = { id: id++, pod: l.pod, text: l.text, p, level: p.level || 'none' };
    rec.hay = (l.text + ' ' + l.pod).toLowerCase();
    state.recs.push(rec);
    if (state.recs.length > state.max) {
      const gone = state.recs.splice(0, state.recs.length - state.max);
      gone.forEach((g) => state.expanded.delete(g.id));
    }
  }
  for (let i = 0; i < 60; i++) push();

  toggle.addEventListener('click', () => { state.on = !state.on; render(); });
  play.addEventListener('click', () => { state.playing = !state.playing; render(); });
  wrapBtn.addEventListener('click', () => { state.wrap = !state.wrap; render(); });
  search.addEventListener('input', () => { state.query = search.value.trim().toLowerCase(); render(); });
  search.addEventListener('keydown', (e) => { if (e.key === 'Escape') { search.value = ''; state.query = ''; render(); } });

  let timer = setInterval(() => { if (state.playing && !document.hidden) { push(); render(); } }, 1100);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      if (!visible && timer) { clearInterval(timer); timer = 0; }
      else if (visible && !timer) timer = setInterval(() => { if (state.playing && !document.hidden) { push(); render(); } }, 1100);
    }).observe(root);
  }
  render();
})();
