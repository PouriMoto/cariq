/**
 * CarIQ — core/shared.js
 * توابع مشترک همه بازی‌ها
 * ------------------------------------------------
 * شامل: DOM builder، Router، Share Card (Canvas)، Share Modal، Lead Box
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

  /* svg placeholder سبک — برای <img> معمولی در UI (نسبت 16:9) */
  function svgPlaceholder(label) {
    const txt = encodeURIComponent(String(label || 'CarIQ').slice(0, 20));
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'><rect width='400' height='225' fill='%23f2ead8'/><text x='200' y='105' font-size='30' text-anchor='middle' font-family='sans-serif'>🚗</text><text x='200' y='140' font-size='13' fill='%238a7060' text-anchor='middle' font-family='sans-serif'>${txt}</text></svg>`;
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

  /* ══════════════════════════════════════════════
     Share Card — کارت اشتراک‌گذاری با ابعاد استوری اینستاگرام (1080×1920 = 9:16)
     ------------------------------------------------------------
     نکته‌ی کلیدی: عکس ماشین همیشه داخل یک "باکس ثابت" با
     object-fit:cover دستی روی canvas رسم می‌شه (crop از مرکز)،
     نه این‌که کل بوم رو پر کنه. این یعنی صرف‌نظر از نسبت ابعاد
     عکس اصلی (چهارگوش، عریض، بلند و ...)، همیشه داخل قاب مشخص
     و تمیز جا می‌گیره و به بقیه‌ی طرح تجاوز نمی‌کنه.
     ══════════════════════════════════════════════ */

  const SHARE_W = 1080, SHARE_H = 1920; // نسبت استوری اینستاگرام 9:16

  /**
   * رسم یک تصویر داخل یک ناحیه‌ی مستطیلی با افکت object-fit:cover
   * (کراپ از مرکز) — مستقل از نسبت ابعاد تصویر ورودی.
   */
  function drawImageCover(ctx, img, x, y, w, h) {
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio  = w / h;
    let sx, sy, sw, sh;
    if (imgRatio > boxRatio) {
      // تصویر نسبت به باکس عریض‌تره → کراپ از چپ/راست
      sh = img.naturalHeight;
      sw = sh * boxRatio;
      sy = 0;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      // تصویر نسبت به باکس بلندتره → کراپ از بالا/پایین
      sw = img.naturalWidth;
      sh = sw / boxRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y,     x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x,     y + h, r);
    ctx.arcTo(x,     y + h, x,     y,     r);
    ctx.arcTo(x,     y,     x + w, y,     r);
    ctx.closePath();
  }

  function wrapCanvasText(ctx, text, maxWidth) {
    const words = String(text || '').split(' ');
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  /**
   * می‌سازه و برمی‌گردونه یک <canvas> با ابعاد استوری اینستاگرام.
   * options:
   *   img          — HTMLImageElement (اختیاری؛ اگر ندی فقط پس‌زمینه رنگی رسم می‌شه)
   *   colorFrom/colorTo — گرادیان پس‌زمینه
   *   emoji        — ایموجی بزرگ بالای باکس عکس
   *   kicker       — خط کوچک بالای عنوان (مثل "نتیجه‌ی بازی Blur")
   *   title        — عنوان اصلی (اسم ماشین / نتیجه)
   *   subtitle     — زیرعنوان (مثل نوع شخصیت یا امتیاز)
   *   desc         — توضیح کوتاه (۲ خط)
   *   stats        — آرایه‌ی [{label,val}] که به صورت چیپ نمایش داده می‌شه
   *   phone        — شماره تماس که پایین کارت چاپ می‌شه
   *   brand        — نام برند / آیدی تلگرام
   *   onReady(canvas) — وقتی عکس لود و کارت کامل رسم شد صدا زده می‌شه (برای عکس async)
   */
  function buildShareCard(opts) {
    const {
      imgSrc, colorFrom = '#2c1810', colorTo = '#4a3020',
      emoji = '🚗', kicker = 'CarIQ', title = '', subtitle = '',
      desc = '', stats = [], phone = '', brand = 'CarIQ',
      onReady,
    } = opts;

    const canvas = document.createElement('canvas');
    canvas.width = SHARE_W;
    canvas.height = SHARE_H;
    canvas.style.cssText = 'width:100%;height:auto;display:block;border-radius:20px;';
    const ctx = canvas.getContext('2d');

    const pad = 64;

    function drawBase() {
      // پس‌زمینه گرادیان
      const grd = ctx.createLinearGradient(0, 0, 0, SHARE_H);
      grd.addColorStop(0, colorFrom);
      grd.addColorStop(1, colorTo);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, SHARE_W, SHARE_H);

      // بافت نویز ملایم
      ctx.globalAlpha = 0.035;
      for (let i = 0; i < 6000; i++) {
        ctx.fillStyle = Math.random() > .5 ? '#fff' : '#000';
        ctx.fillRect(Math.random() * SHARE_W, Math.random() * SHARE_H, 2, 2);
      }
      ctx.globalAlpha = 1;
    }

    function drawHeaderBrand() {
      ctx.textAlign = 'center';
      ctx.font = '600 34px Vazirmatn, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillText(kicker, SHARE_W / 2, pad + 40);
    }

    /* ── باکس عکس با ابعاد ثابت (نه کل صفحه) ─────────
       این باکس همیشه یک نسبت ثابت (۴:۳) و موقعیت مشخص داره،
       صرف‌نظر از این‌که عکس ورودی چه ابعادی داشته باشه. */
    const imgBoxX = pad;
    const imgBoxY = pad + 90;
    const imgBoxW = SHARE_W - pad * 2;
    const imgBoxH = Math.round(imgBoxW * 0.72); // نسبت نمایشی ثابت داخل کارت

    function drawImageBox(img) {
      ctx.save();
      roundRectPath(ctx, imgBoxX, imgBoxY, imgBoxW, imgBoxH, 32);
      ctx.clip();
      // زمینه‌ی پشت عکس (برای موقعی که عکس شفافیت داره یا لود نشده)
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH);
      if (img) drawImageCover(ctx, img, imgBoxX, imgBoxY, imgBoxW, imgBoxH);
      // سایه‌ی ظریف پایین عکس برای خوانایی بهتر لبه
      const shadow = ctx.createLinearGradient(0, imgBoxY + imgBoxH - 120, 0, imgBoxY + imgBoxH);
      shadow.addColorStop(0, 'rgba(0,0,0,0)');
      shadow.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = shadow;
      ctx.fillRect(imgBoxX, imgBoxY + imgBoxH - 120, imgBoxW, 120);
      ctx.restore();
      // قاب دور باکس
      ctx.save();
      roundRectPath(ctx, imgBoxX, imgBoxY, imgBoxW, imgBoxH, 32);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }

    /* ── اطلاعات زیر باکس عکس ───────────────────── */
    function drawInfoSection() {
      let cy = imgBoxY + imgBoxH + 70;

      // ایموجی
      ctx.textAlign = 'center';
      ctx.font = '92px serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(emoji, SHARE_W / 2, cy);
      cy += 78;

      // subtitle (نوع شخصیت / برچسب)
      if (subtitle) {
        ctx.font = '700 40px Vazirmatn, sans-serif';
        ctx.fillStyle = 'rgba(255,220,100,0.95)';
        ctx.fillText(subtitle, SHARE_W / 2, cy);
        cy += 62;
      }

      // title (اسم ماشین / نتیجه اصلی)
      if (title) {
        ctx.font = '900 60px Vazirmatn, sans-serif';
        ctx.fillStyle = '#ffffff';
        const titleLines = wrapCanvasText(ctx, title, SHARE_W - pad * 2);
        titleLines.slice(0, 2).forEach(line => {
          ctx.fillText(line, SHARE_W / 2, cy);
          cy += 68;
        });
        cy += 10;
      }

      // desc
      if (desc) {
        ctx.font = '400 32px Vazirmatn, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.68)';
        const descLines = wrapCanvasText(ctx, desc, SHARE_W - pad * 2 - 40);
        descLines.slice(0, 3).forEach(line => {
          ctx.fillText(line, SHARE_W / 2, cy);
          cy += 44;
        });
        cy += 20;
      }

      // stats chips
      if (stats.length) {
        const chipGap = 20;
        ctx.font = '700 30px Vazirmatn, sans-serif';
        const chipWidths = stats.map(s => ctx.measureText(`${s.val} ${s.label}`).width + 56);
        const totalW = chipWidths.reduce((a, b) => a + b, 0) + chipGap * (stats.length - 1);
        let cx = SHARE_W / 2 - totalW / 2;
        const chipY = cy;
        const chipH = 64;
        stats.forEach((s, i) => {
          const w = chipWidths[i];
          ctx.save();
          roundRectPath(ctx, cx, chipY, w, chipH, chipH / 2);
          ctx.fillStyle = 'rgba(255,255,255,0.12)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,0.25)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
          ctx.textAlign = 'center';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${s.val} ${s.label}`, cx + w / 2, chipY + chipH / 2 + 10);
          cx += w + chipGap;
        });
        cy = chipY + chipH + 40;
      }

      return cy;
    }

    /* ── فوتر: تماس + برند ───────────────────────── */
    function drawFooter() {
      const footY = SHARE_H - pad - 30;

      // خط جداکننده
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pad, footY - 66);
      ctx.lineTo(SHARE_W - pad, footY - 66);
      ctx.stroke();

      // برند سمت راست (RTL → متن راست‌چین بصری با textAlign)
      ctx.textAlign = 'right';
      ctx.font = '700 34px Vazirmatn, sans-serif';
      ctx.fillStyle = 'rgba(255,220,100,0.95)';
      ctx.fillText('🚗 ' + brand, SHARE_W - pad, footY);

      // شماره تماس سمت چپ
      if (phone) {
        ctx.textAlign = 'left';
        ctx.font = '600 32px Vazirmatn, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.direction = 'ltr';
        ctx.fillText('📞 ' + phone, pad, footY);
        ctx.direction = 'inherit';
      }
    }

    function renderAll(img) {
      drawBase();
      drawHeaderBrand();
      drawImageBox(img);
      drawInfoSection();
      drawFooter();
      if (typeof onReady === 'function') onReady(canvas);
    }

    if (imgSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => renderAll(img);
      img.onerror = () => renderAll(null);
      img.src = imgSrc;
      // رسم اولیه بدون عکس تا کارت فوری قابل مشاهده باشه (بعد از لود دوباره رسم می‌شه)
      renderAll(null);
    } else {
      renderAll(null);
    }

    return canvas;
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

    const previewWrap = el('div', { class: 'share-card-preview-wrap' });

    const channels = el('div', { class: 'share-channels' });
    const chDefs = [
      { id: 'dl', icon: '💾', label: 'دانلود کارت (استوری)', sub: 'ذخیره کن و در استوری بذار' },
      { id: 'ig', icon: '📸', label: 'اینستاگرام استوری',    sub: 'کپی متن برای کپشن' },
      { id: 'tg', icon: '✈️', label: 'تلگرام',                sub: 'ارسال به دوستان' },
      { id: 'wa', icon: '💬', label: 'واتساپ',                sub: 'اشتراک از واتساپ' },
      { id: 'cp', icon: '📋', label: 'کپی متن',               sub: 'کپی لینک و نتیجه' },
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
    sheet.append(handle, title, sub, previewWrap, channels, closeBtn);
    overlay.appendChild(sheet);
    document.body.appendChild(overlay);
    _shareModal = { overlay, previewWrap };

    let _payload = {};
    let _canvas = null;

    overlay._setPayload = (p) => {
      _payload = p;
      previewWrap.innerHTML = '';
      const cfg = CarIQConfig.get();
      _canvas = buildShareCard({
        imgSrc: p.imgSrc,
        colorFrom: p.colorFrom, colorTo: p.colorTo,
        emoji: p.emoji || '🚗',
        kicker: p.kicker || cfg.brand_name || 'CarIQ',
        title: p.title || '',
        subtitle: p.subtitle || '',
        desc: p.desc || '',
        stats: p.stats || [],
        phone: cfg.contact.phone,
        brand: cfg.brand_name || 'CarIQ',
        onReady: (canvas) => {
          // بعد از لود کامل عکس، پیش‌نمایش رو رفرش کن
          if (previewWrap.firstChild === canvas || !previewWrap.contains(canvas)) return;
        },
      });
      previewWrap.appendChild(_canvas);
    };

    document.getElementById('cariq-share-dl').addEventListener('click', () => {
      if (!_canvas) return;
      const link = document.createElement('a');
      link.download = `cariq_${Date.now()}.png`;
      link.href = _canvas.toDataURL('image/png');
      link.click();
      const s = document.getElementById('cariq-share-dl-sub');
      s.textContent = '✅ دانلود شد! در استوری بذار';
      setTimeout(() => { s.textContent = 'ذخیره کن و در استوری بذار'; }, 3000);
    });
    document.getElementById('cariq-share-ig').addEventListener('click', () => {
      const t = `${_payload.emoji || ''} ${_payload.text || ''}\n\n🔗 CarIQ`;
      navigator.clipboard?.writeText(t).catch(() => {});
      document.getElementById('cariq-share-ig-sub').textContent = '✅ کپی شد! الان در استوری بذار';
      setTimeout(() => { document.getElementById('cariq-share-ig-sub').textContent = 'کپی متن برای کپشن'; }, 3000);
    });
    document.getElementById('cariq-share-tg').addEventListener('click', () => {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent((_payload.emoji||'') + ' ' + (_payload.text||''))}`, '_blank');
    });
    document.getElementById('cariq-share-wa').addEventListener('click', () => {
      window.open(`https://wa.me/?text=${encodeURIComponent((_payload.emoji||'') + ' ' + (_payload.text||'') + ' | CarIQ: ' + location.href)}`, '_blank');
    });
    document.getElementById('cariq-share-cp').addEventListener('click', () => {
      navigator.clipboard?.writeText(`${_payload.emoji||''} ${_payload.text||''} | CarIQ | ${location.href}`).catch(() => {});
      document.getElementById('cariq-share-cp-sub').textContent = '✅ کپی شد!';
      setTimeout(() => { document.getElementById('cariq-share-cp-sub').textContent = 'کپی لینک و نتیجه'; }, 2500);
    });

    return _shareModal;
  }

  function openShare(payload) {
    buildShareModal();
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
    shareBtn.addEventListener('click', () => openShare(sharePayload || {}));
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
    buildShareCard, drawImageCover,
    openShare, closeShare, buildShareModal,
    buildLeadBox, buildGameHeader,
    buildProgress, buildResultRing, buildStatRow,
    initStandaloneGame,
  };
})();
