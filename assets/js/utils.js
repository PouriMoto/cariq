/**
 * CarIQ — assets/js/utils.js
 * ابزارهای کمکی عمومی
 */

const CarIQUtils = {
  /* فرمت عدد فارسی */
  numFa: n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]),

  /* کوتاه‌کردن متن */
  truncate: (str, n) => str.length > n ? str.slice(0, n) + '...' : str,

  /* زمان نسبی فارسی */
  timeAgo: (ts) => {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m <  1)  return 'همین الان';
    if (m <  60) return `${m} دقیقه پیش`;
    const h = Math.floor(m / 60);
    if (h < 24)  return `${h} ساعت پیش`;
    return `${Math.floor(h / 24)} روز پیش`;
  },

  /* کپی در کلیپ‌بورد */
  copy: async (text) => {
    try { await navigator.clipboard.writeText(text); return true; }
    catch { return false; }
  },

  /* دیباؤنس */
  debounce: (fn, ms) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  },

  /* انیمیشن عدد */
  animateNumber: (el, from, to, duration = 800) => {
    const start = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      el.textContent = Math.round(from + (to - from) * p);
      if (p < 1) requestAnimationFrame(tick);
    };
    tick();
  },
};
