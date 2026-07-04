/**
 * CarIQ — core/config.js
 * تنظیمات مرکزی — قابل ویرایش از پنل ادمین
 * ------------------------------------------------
 * این فایل را مستقیم ویرایش نکنید.
 * از admin/index.html استفاده کنید.
 */

const CarIQConfig = (() => {
  const STORAGE_KEY = 'cariq_config_v1';

  const DEFAULTS = {
    brand_name: 'CarIQ',
    industry: 'auto',          // auto | real_estate | mobile | travel | fashion
    contact: {
      telegram: '@pouriabh',
      phone: '09172079245',
      whatsapp: '989172079245',
    },
    cta_message: 'سلام! از بازی CarIQ اومدم و می‌خوام درباره واردات ماشین مشورت کنم.',
    share_template: '{emoji} تو {game} نتیجه‌ام {result} شد! تو هم امتحان کن 🚗',
    admin_pass_hash: 'cariq2025',   // در پروداکشن hash کنید
    games_enabled: ['blur', 'speed', 'price', 'personality', 'wheel', 'compare'],
    games_order:   ['personality', 'blur', 'price', 'speed', 'wheel', 'compare'],
    lobby_title: 'تو چه جور ماشین‌بازی؟',
    lobby_subtitle: 'بازی کن — یاد بگیر — ماشین بخر',
  };

  function load() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return deepMerge(DEFAULTS, stored);
    } catch { return DEFAULTS; }
  }

  function save(cfg) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); return true; }
    catch { return false; }
  }

  function reset() { localStorage.removeItem(STORAGE_KEY); }

  function deepMerge(base, override) {
    const result = { ...base };
    for (const k of Object.keys(override)) {
      if (override[k] && typeof override[k] === 'object' && !Array.isArray(override[k])) {
        result[k] = deepMerge(base[k] || {}, override[k]);
      } else {
        result[k] = override[k];
      }
    }
    return result;
  }

  // نمونه singleton برای استفاده در همه بازی‌ها
  let _cfg = null;
  function get() { if (!_cfg) _cfg = load(); return _cfg; }
  function set(key, val) {
    const c = get();
    const keys = key.split('.');
    let obj = c;
    for (let i = 0; i < keys.length - 1; i++) { obj = obj[keys[i]] = obj[keys[i]] || {}; }
    obj[keys[keys.length-1]] = val;
    save(c);
    _cfg = c;
  }

  return { get, set, save, reset, DEFAULTS };
})();

// دسترسی سریع (legacy alias)
window.CFG = CarIQConfig.get();
