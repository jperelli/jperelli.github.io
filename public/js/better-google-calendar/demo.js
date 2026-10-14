// Interactive demo for the Better Google Calendar page: the extension's real Quick Add
// parser (quickadd.js) and Google URL builder (gcal-url.js) running in the page.
(function () {
  const BGC = globalThis.BGC;
  const root = document.getElementById('bgc-demo');
  if (!BGC || !BGC.quickadd || !BGC.gcal || !root) return;
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  const examples = [
    'Lunch with ana@example.com tomorrow 1-2pm at Bar Lobo every friday',
    'Dentist next tuesday at 9:30 for 45 min',
    'Reunión de equipo mañana a las 17 en la oficina cada lunes',
    'Team offsite 14 nov all day',
    'Gym every weekday 7am for 1 hour',
    'Cumple de Lucía 3 de diciembre todo el día',
  ];

  root.classList.add('bgc-demo');
  const head = el('div', 'bgc-demo-head');
  head.append('Quick add ', el('kbd', null, 'q'), ' — type an event in plain English or Spanish');
  const body = el('div', 'bgc-demo-body');
  const input = el('input', 'bgc-demo-input');
  input.type = 'text';
  input.setAttribute('aria-label', 'Quick add text');
  input.placeholder = examples[0];
  input.value = examples[0];
  const ex = el('div', 'bgc-demo-examples');
  examples.forEach((t) => { const b = el('button', null, t); b.type = 'button'; b.addEventListener('click', () => { input.value = t; update(); input.focus(); }); ex.appendChild(b); });
  const card = el('div', 'bgc-demo-card');
  const url = el('div', 'bgc-demo-url');
  body.append(input, ex, card, url);
  const foot = el('div', 'bgc-demo-foot', 'Dates are relative to now, in your browser\'s time zone. The link opens Google Calendar\'s own event form with the fields filled in; nothing is saved until you press Save there.');
  root.append(head, body, foot);

  const fmtDate = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtTime = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
  const toDate = (c) => new Date(c.year, c.month - 1, c.day, c.hour || 0, c.minute || 0, c.second || 0);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function update() {
    const text = input.value.trim();
    let res = null;
    try { res = text ? BGC.quickadd.parseQuickAdd(text, { now: new Date(), defaultMinutes: 60, dateOrder: 'dmy' }) : null; } catch (e) { res = null; }
    card.className = 'bgc-demo-card';
    card.replaceChildren();
    url.replaceChildren();
    if (!res) {
      card.classList.add('is-empty');
      card.textContent = text ? 'Could not understand that yet.' : 'Type something above.';
      return;
    }
    const { event, meta } = res;
    const s = toDate(event.start), e = toDate(event.end);
    card.appendChild(el('h4', null, event.summary || '(No title)'));
    const meta1 = el('div', 'meta');
    if (meta.allDay) {
      const days = Math.round((e - s) / 86400000);
      meta1.appendChild(el('span', null, `${fmtDate.format(s)}${days > 1 ? ' – ' + fmtDate.format(new Date(e - 86400000)) : ''} · all day`));
    } else meta1.appendChild(el('span', null, `${fmtDate.format(s)} · ${fmtTime.format(s)} – ${fmtTime.format(e)}`));
    if (event.location) meta1.appendChild(el('span', null, event.location));
    if (event.attendees && event.attendees.length) meta1.appendChild(el('span', null, `${event.attendees.length} guest${event.attendees.length > 1 ? 's' : ''}`));
    if (event.rrule) meta1.appendChild(el('span', null, `repeats (${event.rrule.replace('FREQ=', '').toLowerCase().replace(/;/g, ', ')})`));
    card.appendChild(meta1);
    const dl = el('dl', 'bgc-demo-fields');
    const add = (k, v) => { if (v == null || v === '' || (Array.isArray(v) && !v.length)) return; dl.append(el('dt', null, k), el('dd', null, Array.isArray(v) ? v.join(', ') : String(v))); };
    add('summary', event.summary);
    add('start', s.toString().slice(0, 24));
    add('end', e.toString().slice(0, 24));
    add('location', event.location);
    add('attendees', (event.attendees || []).map((a) => a.email));
    add('rrule', event.rrule);
    add('allDay', meta.allDay ? 'true' : null);
    card.appendChild(dl);
    let href = '';
    try { href = BGC.gcal.buildEventEditUrl(event, res.ctx, { base: 'https://calendar.google.com/calendar/u/0/r/eventedit' }); } catch (err) { href = ''; }
    if (href) {
      const u = new URL(href);
      const code = el('code');
      code.innerHTML = esc(u.origin + u.pathname) + '?' + Array.from(u.searchParams.entries()).map(([k, v]) => `<span class="accent-key">${esc(k)}</span>=${esc(decodeURIComponent(v))}`).join('\n&amp;');
      url.append(el('div', null, 'Google Calendar URL the extension opens:'), code);
      const a = el('a', null, 'Open this in Google Calendar ↗');
      a.href = href; a.target = '_blank'; a.rel = 'noopener';
      url.appendChild(a);
    }
  }
  input.addEventListener('input', update);
  update();
})();
