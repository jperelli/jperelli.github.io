// Volatile vs persistent demo for the "spreadsheet to Claude tracker" post.
// Left list keeps its rows in page memory only; right list writes to this browser's
// storage, so a real reload of this page keeps what the reader added.
(function () {
  const root = document.getElementById('crm-demo');
  if (!root) return;
  const KEY = 'jperelli-crm-demo-v1';
  const seed = [
    ['Marta R.', 'Visit scheduled'],
    ['Puig family', 'Contacted'],
    ['Daniel K.', 'New'],
  ];
  const pool = [
    ['Núria and Pau', 'Visited'], ['Mr Soler (investor)', 'Offer made'], ['Laia M.', 'New'],
    ['Jordi V.', 'Contacted'], ['The Ferrer couple', 'Visit scheduled'], ['Anna S.', 'New'],
    ['Hassan B.', 'Contacted'], ['Clara and Marc', 'Visited'], ['Mrs Roca', 'New'],
  ];
  let memory = seed.map((r) => ({ name: r[0], status: r[1], mine: false }));
  let stored = load();
  let picked = 0;
  let closedOnce = false;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return seed.map((r) => ({ name: r[0], status: r[1], mine: false }));
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(stored)); } catch (e) {}
  }

  const T = {
    en: {
      title: 'Try it: the same tracker, two ways of keeping data', add: 'Add a buyer', close: 'Close the tab and open it again', reset: 'Start over',
      vTitle: 'Artifact that only remembers while open', vHint: 'The rows live in the open window. Closing the window is closing the notebook and burning it.',
      pTitle: 'Artifact with saved data', pHint: 'Every change is written to storage outside the window. Closing and reopening finds it there.',
      foot: 'The right column really uses this browser\'s storage: reload this page and the buyers added here are still in the list. Nothing is sent anywhere.',
      closed: 'Tab closed…', count: (n, m) => '<b>' + n + '</b> buyers, <b>' + m + '</b> added by you',
      lost: (n, l) => '<b>' + n + '</b> buyers. Back to the sample Claude wrote; <b>' + l + '</b> you added are gone',
      kept: (n, m) => '<b>' + n + '</b> buyers, <b>' + m + '</b> added by you, all still here', copied: 'Copied',
      status: {},
    },
    es: {
      title: 'Pruébalo: el mismo seguimiento, dos formas de guardar los datos', add: 'Añadir un comprador', close: 'Cerrar la pestaña y volver a abrirla', reset: 'Empezar de nuevo',
      vTitle: 'Artefacto que solo recuerda mientras está abierto', vHint: 'Las filas viven en la ventana abierta. Cerrar la ventana es cerrar la libreta y quemarla.',
      pTitle: 'Artefacto con datos guardados', pHint: 'Cada cambio se escribe en un almacén fuera de la ventana. Al cerrar y volver a abrir, sigue ahí.',
      foot: 'La columna derecha usa de verdad el almacenamiento de este navegador: recarga esta página y los compradores añadidos siguen en la lista. No se envía nada a ningún sitio.',
      closed: 'Pestaña cerrada…', count: (n, m) => '<b>' + n + '</b> compradores, <b>' + m + '</b> añadidos por ti',
      lost: (n, l) => '<b>' + n + '</b> compradores. Vuelve la muestra que escribió Claude; los <b>' + l + '</b> que añadiste han desaparecido',
      kept: (n, m) => '<b>' + n + '</b> compradores, <b>' + m + '</b> añadidos por ti, todos siguen aquí', copied: 'Copiado',
      status: { 'Visit scheduled': 'Visita programada', 'Contacted': 'Contactado', 'New': 'Nuevo', 'Visited': 'Visitó', 'Offer made': 'Oferta hecha' },
    },
    ca: {
      title: 'Prova-ho: el mateix seguiment, dues maneres de desar les dades', add: 'Afegir un comprador', close: 'Tancar la pestanya i tornar a obrir-la', reset: 'Començar de nou',
      vTitle: 'Artefacte que només recorda mentre és obert', vHint: 'Les files viuen a la finestra oberta. Tancar la finestra és tancar la llibreta i cremar-la.',
      pTitle: 'Artefacte amb dades desades', pHint: 'Cada canvi s\'escriu en un magatzem fora de la finestra. En tancar i tornar a obrir, continua allà.',
      foot: 'La columna dreta fa servir de debò l\'emmagatzematge d\'aquest navegador: recarrega aquesta pàgina i els compradors afegits continuen a la llista. No s\'envia res a cap lloc.',
      closed: 'Pestanya tancada…', count: (n, m) => '<b>' + n + '</b> compradors, <b>' + m + '</b> afegits per tu',
      lost: (n, l) => '<b>' + n + '</b> compradors. Torna la mostra que va escriure Claude; els <b>' + l + '</b> que vas afegir han desaparegut',
      kept: (n, m) => '<b>' + n + '</b> compradors, <b>' + m + '</b> afegits per tu, tots continuen aquí', copied: 'Copiat',
      status: { 'Visit scheduled': 'Visita programada', 'Contacted': 'Contactat', 'New': 'Nou', 'Visited': 'Va visitar', 'Offer made': 'Oferta feta' },
    },
  };
  const t = T[root.dataset.lang] || T.en;
  const st = (s) => t.status[s] || s;

  root.innerHTML =
    '<div class="crm-demo-bar"><span class="crm-demo-title">' + t.title + '</span>' +
    '<button type="button" class="crm-primary" data-act="add">' + t.add + '</button>' +
    '<button type="button" data-act="close">' + t.close + '</button>' +
    '<button type="button" class="crm-danger" data-act="reset">' + t.reset + '</button></div>' +
    '<div class="crm-demo-cols">' +
    col('volatile', t.vTitle, t.vHint) +
    col('persistent', t.pTitle, t.pHint) +
    '</div>' +
    '<p class="crm-demo-foot">' + t.foot + '</p>';

  function col(kind, title, hint) {
    return '<section class="crm-demo-col" data-kind="' + kind + '"><h4>' + title + '<small>' + hint + '</small></h4>' +
      '<ul></ul><p class="crm-demo-count"></p><div class="crm-demo-closed">' + t.closed + '</div></section>';
  }

  function render(kind, rows, newIndex) {
    const sec = root.querySelector('[data-kind="' + kind + '"]');
    const ul = sec.querySelector('ul');
    ul.innerHTML = rows.map((r, i) =>
      '<li class="' + (r.mine ? 'is-mine ' : '') + (i === newIndex ? 'is-new' : '') + '"><span>' + r.name + '</span><span>' + st(r.status) + '</span></li>'
    ).join('');
    const mine = rows.filter((r) => r.mine).length;
    const p = sec.querySelector('.crm-demo-count');
    p.className = 'crm-demo-count';
    if (!closedOnce) {
      p.innerHTML = t.count(rows.length, mine);
    } else if (kind === 'volatile') {
      p.className += ' is-bad';
      p.innerHTML = t.lost(rows.length, lostCount);
    } else {
      p.className += ' is-good';
      p.innerHTML = t.kept(rows.length, mine);
    }
  }
  let lostCount = 0;

  function renderAll(newIdx) {
    render('volatile', memory, newIdx === undefined ? -1 : memory.length - 1);
    render('persistent', stored, newIdx === undefined ? -1 : stored.length - 1);
  }

  root.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'add') {
      const r = pool[picked++ % pool.length];
      const row = { name: r[0], status: r[1], mine: true };
      memory = memory.concat([row]);
      stored = stored.concat([row]);
      save();
      closedOnce = false;
      renderAll(true);
    } else if (act === 'close') {
      root.classList.add('is-closed');
      root.querySelectorAll('button').forEach((x) => (x.disabled = true));
      setTimeout(() => {
        lostCount = memory.filter((r) => r.mine).length;
        memory = seed.map((r) => ({ name: r[0], status: r[1], mine: false }));
        stored = load();
        closedOnce = true;
        root.classList.remove('is-closed');
        root.querySelectorAll('button').forEach((x) => (x.disabled = false));
        renderAll();
      }, 900);
    } else if (act === 'reset') {
      try { localStorage.removeItem(KEY); } catch (e) {}
      memory = seed.map((r) => ({ name: r[0], status: r[1], mine: false }));
      stored = load();
      picked = 0;
      closedOnce = false;
      renderAll();
    }
  });

  renderAll();

  // Copy button for the prompt block.
  document.querySelectorAll('.crm-prompt').forEach((box) => {
    const btn = box.querySelector('.crm-copy');
    const pre = box.querySelector('pre');
    if (!btn || !pre) return;
    btn.addEventListener('click', () => {
      const text = pre.innerText;
      const label = btn.textContent;
      const done = () => { btn.textContent = t.copied; setTimeout(() => (btn.textContent = label), 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
      else done();
    });
  });
})();
