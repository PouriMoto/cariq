/**
 * CarIQ — core/shared.js
 * توابع مشترک همه بازی‌ها
 * ------------------------------------------------
 * شامل: DOM builder، Router، Share Modal، Lead Box
 */

const CarIQShared = (() => {

  /* ── DOM builder ───────────────────────────── */
  function el(tag, props={}, ...ch) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if      (k === 'class')                   e.className = v;
      else if (k === 'html')                    e.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function')
                                                e.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'style' && typeof v === 'object')
                                                Object.assign(e.style, v);
      else                                      e.setAttribute(k, v);
    }
    ch.flat().forEach(c => {
      if (c == null || c === false) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  /* ── ابزارها ───────────────────────────────── */
  function shuffle(arr) { return [...arr].sort(() => Math.random() - .5); }
  function pick(arr, n) { return shuffle(arr).slice(0, n); }
  function uuid() { return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2); }
  function svgPlaceholder(label) {
    const txt = encodeURIComponent(label.slice(0, 20));
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'><rect width='400' height='225' fill='%23f2ead8'/><text x='200' y='110' font-size='28' fill='%23b8860f' text-anchor='middle' font-family='sans-serif'>🚗</text><text x='200' y='150' font-size='13' fill='%238a7060' text-anchor='middle' font-family='sans-serif'>${txt}</text></svg>`;
  }

  /* ── امتیاز پرنده ──────────────────────────── */
  function showScoreFly(pts) {
    const f = el('div', { class: 'score-fly' }, '+' + pts);
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 750);
  }

  /* ── Telegram link ─────────────────────────── */
  function tgLink(msg) {
    const cfg = CarIQConfig.get();
    const tg = cfg.contact.telegram.replace('@', '');
    return `https://t.me/${encodeURIComponent(tg)}?text=${encodeURIComponent(msg || cfg.cta_message)}`;
  }

  /* ── Share Modal ───────────────────────────── */
  let _shareModal = null;
  function buildShareModal() {
    if (_shareModal) return _shareModal;
    const overlay = el('div', { class: 'modal-overlay', id: 'cariq-share-modal' });
    const sheet = el('div', { class: 'modal-sheet' });
    const handle = el('div', { class: 'modal-handle' });
    const title = el('div', { class: 'modal-title' }, '📤 اشتراک‌گذاری نتیجه');
    const sub   = el('div', { class: 'modal-sub'   }, 'نتیجه‌ات رو با دوستات به اشتراک بذار');
    const preview = el('div', { class: 'share-preview' });
    const pEmoji = el('div', { class: 'share-preview-emoji' }, '🚗');
    const pText  = el('div', { class: 'share-preview-text'  }, '...');
    const pBrand = el('div', { class: 'share-preview-brand' }, 'CarIQ | @pouriabh');
    preview.append(pEmoji, pText, pBrand);

    const channels = el('div', { class: 'share-channels' });
    const chDefs = [
      { id: 'ig', icon: '📸', label: 'اینستاگرام استوری', sub: 'کپی کن و در استوری بذار' },
      { id: 'tg', icon: '✈️', label: 'تلگرام',            sub: 'ارسال به دوستان'         },
      { id: 'wa', icon: '💬', label: 'واتساپ',            sub: 'اشتراک از واتساپ'        },
      { id: 'cp', icon: '📋', label: 'کپی متن',           sub: 'کپی لینک و نتیجه'        },
    ];
    chDefs.forEach(c => {
      const ch = el('div', { class: 'share-channel', id: `cariq-share-${c.id}` });
      ch.append(
        el('div', { class: 'share-channel-icon' }, c.icon),
        el('div', {},
          el('div', { class: 'share-channel-label' }, c.label),
          el('div', { class: 'share-channel-sub',  id: `cariq-share-${c.id}-sub` }, c.sub),
        ),
      );
      channels.appendChild(ch);
    });

    const closeBtn = el('button', { class: 'modal-close' }, 'بستن');
    closeBtn.addEventListener('click', closeShare);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeShare(); });
    sheet.append(handle, title, sub, preview, channels, closeBtn);
    overlay.appendChild(sheet);
    document.body.appendChild(overlay);
    _shareModal = { overlay, pEmoji, pText, pBrand };

    // Wire channels
    let _payload = {};
    overlay._setPayload = (p) => { _payload = p; pEmoji.textContent = p.emoji || '🚗'; pText.textContent = p.text || ''; };

    document.getElementById('cariq-share-ig').addEventListener('click', () => {
      const t = `${_payload.emoji} ${_payload.text}\n\n🔗 CarIQ | @pouriabh`;
      navigator.clipboard?.writeText(t).catch(() => {});
      document.getElementById('cariq-share-ig-sub').textContent = '✅ کپی شد! الان در استوری بذار';
      setTimeout(() => { document.getElementById('cariq-share-ig-sub').textContent = 'کپی کن و در استوری بذار'; }, 3000);
    });
    document.getElementById('cariq-share-tg').addEventListener('click', () => {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(_payload.emoji + ' ' + _payload.text)}`, '_blank');
    });
    document.getElementById('cariq-share-wa').addEventListener('click', () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(_payload.emoji + ' ' + _payload.text + ' | CarIQ: ' + location.href)}`, '_blank');
    });
    document.getElementById('cariq-share-cp').addEventListener('click', () => {
      navigator.clipboard?.writeText(`${_payload.emoji} ${_payload.text} | CarIQ | ${location.href}`).catch(() => {});
      document.getElementById('cariq-share-cp-sub').textContent = '✅ کپی شد!';
      setTimeout(() => { document.getElementById('cariq-share-cp-sub').textContent = 'کپی لینک و نتیجه'; }, 2500);
    });

    return _shareModal;
  }

  function openShare(payload) {
    const m = buildShareModal();
    _shareModal.overlay._setPayload(payload);
    _shareModal.overlay.classList.add('open');
  }
  function closeShare() {
    if (_shareModal) _shareModal.overlay.classList.remove('open');
  }

  /* ── Lead Box ──────────────────────────────── */
  function buildLeadBox({ source, resultText, ctaMsg, sharePayload }) {
    const cfg = CarIQConfig.get();
    const wrap = el('div', { class: 'lead-box' });

    wrap.appendChild(el('h3', {}, '🎯 ماشین رویاییت رو با قیمت قشم پیدا کنیم؟'));
    wrap.appendChild(el('p', { html: 'مشاوره رایگان واردات از <strong>دبی و قشم</strong> — لیست ماشین‌های زیر قیمت بازار' }));

    // Share button
    const shareBtn = el('button', { class: 'btn btn-share mb8' }, '📤 اشتراک‌گذاری نتیجه‌ام');
    shareBtn.addEventListener('click', () => openShare(sharePayload));
    wrap.appendChild(shareBtn);

    // Contact buttons
    const row = el('div', { class: 'lead-btn-row' });
    const tgA = el('a', { class: 'btn btn-tg', href: tgLink(ctaMsg), target: '_blank', rel: 'noopener' }, '✈️ تلگرام');
    const phA = el('a', { class: 'btn btn-phone', href: `tel:${cfg.contact.phone}` }, '📞 تماس');
    row.append(tgA, phA);
    wrap.appendChild(row);

    // Form
    wrap.appendChild(el('div', { class: 'lead-divider' }, 'یا شماره بذار'));
    const nameInp  = el('input',  { class: 'inp', type: 'text', placeholder: '👤 نام (اختیاری)' });
    const phoneInp = el('input',  { class: 'inp', type: 'tel', placeholder: '📱 شماره موبایل', inputmode: 'tel' });
    const subBtn   = el('button', { class: 'btn btn-gold mt8' }, '📩 ثبت درخواست رایگان');

    subBtn.addEventListener('click', () => {
      const name = nameInp.value.trim(), phone = phoneInp.value.trim();
      if (!phone) { phoneInp.classList.add('shake'); setTimeout(() => phoneInp.classList.remove('shake'), 500); return; }
      CarIQLeads.save({ source, result: resultText, name, phone });
      [nameInp, phoneInp, subBtn].forEach(x => x.remove());
      wrap.appendChild(el('div', { class: 'lead-success' }, '✅ ثبت شد! به‌زودی باهات در ارتباط می‌گیریم 🚗'));
    });
    wrap.append(nameInp, phoneInp, subBtn);

    return wrap;
  }

  /* ── Game Header ───────────────────────────── */
  function buildGameHeader({ title, sub, onBack, scoreEl }) {
    const header = el('div', { class: 'game-header' });
    const backBtn = el('div', { class: 'back-btn' }, '←');
    backBtn.addEventListener('click', onBack || (() => window.location.href = '../../index.html'));
    const info = el('div', { class: 'game-header-info' },
      el('div', { class: 'game-header-title' }, title),
      el('div', { class: 'game-header-sub'   }, sub || 'CarIQ'),
    );
    const score = scoreEl || el('div', { class: 'score-pill' }, '⭐ 0');
    header.append(backBtn, info, score);
    return { header, score };
  }

  /* ── Progress Bar ──────────────────────────── */
  function buildProgress(current, total, label) {
    const pct = Math.round(current / total * 100);
    const wrap = el('div', { class: 'progress-wrap' });
    const meta = el('div', { class: 'progress-meta' },
      el('span', {}, label || `دور ${current} از ${total}`),
      el('span', {}, pct + '%'),
    );
    const track = el('div', { class: 'progress-track' });
    const fill  = el('div', { class: 'progress-fill', style: { width: pct + '%' } });
    track.appendChild(fill);
    wrap.append(meta, track);
    return wrap;
  }

  /* ── Result Ring ───────────────────────────── */
  function buildResultRing(pct) {
    const ring = el('div', { class: 'result-ring' });
    ring.style.setProperty('--pct', (pct * 3.6) + 'deg');
    const inner = el('div', { class: 'result-ring-inner' },
      el('span', { class: 'result-ring-num' }, pct + '%'),
      el('span', { class: 'result-ring-lbl' }, 'امتیاز'),
    );
    ring.appendChild(inner);
    return ring;
  }

  /* ── Stat Row ──────────────────────────────── */
  function buildStatRow(items) {
    const row = el('div', { class: 'stat-row' });
    items.forEach(([val, lbl]) => {
      const box = el('div', { class: 'stat-box' });
      box.append(el('span', { class: 'sv' }, String(val)), el('div', { class: 'sl' }, lbl));
      row.appendChild(box);
    });
    return row;
  }

  /* ── Standalone init (بازی مستقل) ─────────── */
  function initStandaloneGame(rootId) {
    const root = document.getElementById(rootId);
    if (!root || !window.GAME_API) return;
    // لود کانفیگ
    window.CFG = CarIQConfig.get();
    window.CAR_DB = CarIQDB.getAll();
    // اجرای بازی
    window.GAME_API.init(root, window.CFG);
  }

  return {
    el, shuffle, pick, uuid, svgPlaceholder,
    showScoreFly, tgLink,
    openShare, closeShare, buildShareModal,
    buildLeadBox, buildGameHeader,
    buildProgress, buildResultRing, buildStatRow,
    initStandaloneGame,
  };
})();
