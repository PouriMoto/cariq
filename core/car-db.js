/**
 * CarIQ — core/car-db.js
 * دیتابیس خودروها — قابل ویرایش از پنل ادمین
 * ------------------------------------------------
 * برای صنایع دیگر این فایل را جایگزین کنید:
 *   auto     → car-db.js
 *   مسکن     → property-db.js
 *   موبایل   → phone-db.js
 */

const CarIQDB = (() => {
  const STORAGE_KEY = 'cariq_cars_v1';
  const API_URL = 'https://script.google.com/macros/s/AKfycbyL_sJdA1uMzEjaw4TVpup-JmbWT0L4WgaVUVZGOoXB3IwhtFkuNbLYj6fUSWr3N9KX/exec';

  function postToSheet(action, payload) {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, payload }),
    }).catch(() => {});
  }

  function rowToCar(row) {
    const splitNum = s => (s || '').toString().split(',').map(x => parseInt(x.trim())).filter(n => !isNaN(n));
    const splitStr = s => (s || '').toString().split(',').map(x => x.trim()).filter(Boolean);
    return {
      id: row.id, name: row.name, brand: row.brand, year: row.year,
      tag: row.tag, origin: row.origin, img: row.img,
      price_iran: parseInt(row.price_iran) || 0,
      price_label: row.price_label,
      price_opts: splitStr(row.price_opts),
      price_vals: splitNum(row.price_vals),
      hints: splitStr(row.hints),
      personality: { type: row.personality_type, emoji: row.personality_emoji, desc: row.personality_desc },
      blur_opts: splitStr(row.blur_opts),
      fun_fact: row.fun_fact,
      dims: row.dims_json ? JSON.parse(row.dims_json) : undefined,
    };
  }

  function syncFromSheet() {
    return fetch(`${API_URL}?type=cars`)
      .then(r => r.json())
      .then(res => {
        if (res.status === 'ok' && Array.isArray(res.data)) {
          save(res.data.map(rowToCar));
        }
      })
      .catch(() => {});
  }

  const DEFAULTS = [
    {
      id: 'lc300', name: 'تویوتا لندکروزر ۳۰۰', brand: 'Toyota', year: '2024',
      tag: 'شاسی‌بلند افسانه‌ای', origin: 'ژاپن/امارات',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/2022_Toyota_Land_Cruiser_300_GR_Sport_%28J300%3B_facelift%2C_red%29%2C_front_8.3.22.jpg/960px-2022_Toyota_Land_Cruiser_300_GR_Sport_%28J300%3B_facelift%2C_red%29%2C_front_8.3.22.jpg',
      price_iran: 18000, price_label: '۱۸ میلیارد',
      price_opts: ['۱۲ میلیارد','۱۵ میلیارد','۱۸ میلیارد','۲۴ میلیارد'],
      price_vals: [12000, 15000, 18000, 24000],
      hints: ['V6 هیبرید','4WD','7 نفره','آفرود حرفه‌ای'],
      dims: { luxury:8, offroad:9, family:9, tech:7, economy:3, sport:5 },
      personality: { type:'adventurer', emoji:'🏔️', desc:'تو ماجراجوی واقعی هستی. قدرت و اطمینان در هر مسیری برات اولویته.' },
      blur_opts: ['تویوتا لندکروزر ۳۰۰','تویوتا پرادو','لکسوس LX','میتسوبیشی پاجرو'],
      fun_fact: 'پرفروش‌ترین SUV لوکس در بازار ایران!',
    },
    {
      id: 'prado', name: 'تویوتا پرادو ۲۰۲۵', brand: 'Toyota', year: '2025',
      tag: 'خانوادگی کوه‌نشین', origin: 'ژاپن',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/2023_Toyota_Land_Cruiser_Prado_%28J250%3B_Australia%29%2C_front_8.3.24.jpg/960px-2023_Toyota_Land_Cruiser_Prado_%28J250%3B_Australia%29%2C_front_8.3.24.jpg',
      price_iran: 8500, price_label: '۸.۵ میلیارد',
      price_opts: ['۶ میلیارد','۸.۵ میلیارد','۱۱ میلیارد','۱۴ میلیارد'],
      price_vals: [6000, 8500, 11000, 14000],
      hints: ['۲.۴ توربو','J250','۲۸۰ اسب','AWD'],
      dims: { luxury:7, offroad:8, family:9, tech:7, economy:4, sport:5 },
      personality: { type:'family', emoji:'👨‍👩‍👧', desc:'خانواده‌دوست و باوقار. ماشینی که هم آبرو داره هم برای سفر مطمئنه.' },
      blur_opts: ['تویوتا پرادو ۲۰۲۵','تویوتا لندکروزر','هیوندای سانتافه','کیا سورنتو'],
      fun_fact: 'نسل جدید پرادو با موتور توربو ۴ سیلندر!',
    },
    {
      id: 'bmw_x5', name: 'بی‌ام‌و X5', brand: 'BMW', year: '2023',
      tag: 'شاسی‌بلند اسپرت آلمانی', origin: 'آلمان',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/2019_BMW_X5_xDrive30d_%28G05%29%2C_front_8.4.19.jpg/960px-2019_BMW_X5_xDrive30d_%28G05%29%2C_front_8.4.19.jpg',
      price_iran: 7200, price_label: '۷.۲ میلیارد',
      price_opts: ['۵ میلیارد','۷.۲ میلیارد','۹ میلیارد','۱۲ میلیارد'],
      price_vals: [5000, 7200, 9000, 12000],
      hints: ['3.0L توربو','xDrive','پانوراما','هارمن‌کاردن'],
      dims: { luxury:9, offroad:6, family:7, tech:9, economy:3, sport:9 },
      personality: { type:'urbanpro', emoji:'🏙️', desc:'شهری، باکلاس و اسپرت‌پسند. لوکس بودن برات مهمه ولی نه به قیمت هیجان رانندگی.' },
      blur_opts: ['بی‌ام‌و X5','مرسدس GLE','آئودی Q7','پورشه کاین'],
      fun_fact: 'جواهر آلمانی بازار ایران!',
    },
    {
      id: 'gclass', name: 'مرسدس G500', brand: 'Mercedes', year: '2023',
      tag: 'آیکون لوکس آفرود', origin: 'آلمان',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/2018_Mercedes-Benz_G_350d_Professional_Line%2C_front_8.4.19.jpg/960px-2018_Mercedes-Benz_G_350d_Professional_Line%2C_front_8.4.19.jpg',
      price_iran: 35000, price_label: '۳۵ میلیارد',
      price_opts: ['۲۰ میلیارد','۲۸ میلیارد','۳۵ میلیارد','۴۵ میلیارد'],
      price_vals: [20000, 28000, 35000, 45000],
      hints: ['V8 4.0L','500 اسب','آیکونیک','آفرود+شهر'],
      dims: { luxury:10, offroad:8, family:5, tech:8, economy:1, sport:7 },
      personality: { type:'elite', emoji:'👑', desc:'جایگاه و پرستیژ برات اولویت اوله. G-Class فقط یه ماشین نیست، یه بیانیه‌ست.' },
      blur_opts: ['مرسدس G500','لندرور دیفندر','بی‌ام‌و X7','جیپ رانگلر'],
      fun_fact: 'آرزوی ابدی ایرانیان!',
    },
    {
      id: 'tucson', name: 'هیوندای توسان ۲۰۲۴', brand: 'Hyundai', year: '2024',
      tag: 'کراس‌اور هوشمند', origin: 'کره جنوبی',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/2022_Hyundai_Tucson_1.6_T-GDi_hybrid_%28NX4%3B_facelift%2C_UK%29%2C_front_8.4.24.jpg/960px-2022_Hyundai_Tucson_1.6_T-GDi_hybrid_%28NX4%3B_facelift%2C_UK%29%2C_front_8.4.24.jpg',
      price_iran: 1950, price_label: '۱.۹۵ میلیارد',
      price_opts: ['۱.۳ میلیارد','۱.۹۵ میلیارد','۲.۸ میلیارد','۳.۵ میلیارد'],
      price_vals: [1300, 1950, 2800, 3500],
      hints: ['۱.۶ توربو','هیبرید','AWD','طراحی جدید'],
      dims: { luxury:6, offroad:5, family:8, tech:8, economy:7, sport:5 },
      personality: { type:'balanced', emoji:'🛣️', desc:'تعادل دوست داری: بین لوکس و اقتصادی، شهر و سفر. انتخاب هوشمندانه.' },
      blur_opts: ['هیوندای توسان ۲۰۲۴','کیا اسپورتیج','هیوندای سانتافه','رنو کپچر'],
      fun_fact: 'محبوب‌ترین کراس‌اور بازار ایران!',
    },
    {
      id: 'tesla3', name: 'تسلا مدل ۳ هایلند', brand: 'Tesla', year: '2024',
      tag: 'الکتریکی هوشمند', origin: 'آمریکا',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_%28facelift%2C_red%29%2C_front_8.4.21.jpg/960px-2019_Tesla_Model_3_Performance_AWD_%28facelift%2C_red%29%2C_front_8.4.21.jpg',
      price_iran: 4500, price_label: '۴.۵ میلیارد',
      price_opts: ['۲.۸ میلیارد','۴.۵ میلیارد','۶ میلیارد','۸ میلیارد'],
      price_vals: [2800, 4500, 6000, 8000],
      hints: ['برقی ۱۰۰٪','AWD','آتوپایلت','۵۷۶km رنج'],
      dims: { luxury:7, offroad:2, family:6, tech:10, economy:9, sport:8 },
      personality: { type:'techie', emoji:'⚡', desc:'آینده‌نگر و تکنولوژی‌دوست. نوآوری و طراحی مینیمال برات اهمیت داره.' },
      blur_opts: ['تسلا مدل ۳ هایلند','تسلا مدل Y','بی‌ام‌و i4','مرسدس EQC'],
      fun_fact: 'اولین ماشین برقی محبوب بازار ایران!',
    },
    {
      id: 'lx600', name: 'لکسوس LX600', brand: 'Lexus', year: '2024',
      tag: 'ژاپنی مجلل', origin: 'ژاپن',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/2022_Lexus_LX_600_Ultra_Luxury_AWD_%28US%29%2C_front_8.1.23.jpg/960px-2022_Lexus_LX_600_Ultra_Luxury_AWD_%28US%29%2C_front_8.1.23.jpg',
      price_iran: 22000, price_label: '۲۲ میلیارد',
      price_opts: ['۱۵ میلیارد','۱۸ میلیارد','۲۲ میلیارد','۳۰ میلیارد'],
      price_vals: [15000, 18000, 22000, 30000],
      hints: ['توین‌توربو','۴۱۵ اسب','Ultra Luxury','VIP 4 نفره'],
      dims: { luxury:9, offroad:8, family:9, tech:8, economy:3, sport:6 },
      personality: { type:'quality', emoji:'🍃', desc:'کیفیت ساخت و اطمینان بلندمدت برات مهمه. لکسوس آرامش خیال ژاپنیه.' },
      blur_opts: ['لکسوس LX600','تویوتا لندکروزر','رنج‌روور','کادیلاک اسکالید'],
      fun_fact: 'نهایت لاکچری ژاپنی!',
    },
    {
      id: 'sportage', name: 'کیا اسپورتیج ۲۰۲۳', brand: 'Kia', year: '2023',
      tag: 'کراس‌اور طراحی‌محور', origin: 'کره جنوبی',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/2022_Kia_Sportage_GT-Line_1.6_T-GDi_hybrid_%28NQ5%3B_Australia%29%2C_front_8.3.24.jpg/960px-2022_Kia_Sportage_GT-Line_1.6_T-GDi_hybrid_%28NQ5%3B_Australia%29%2C_front_8.3.24.jpg',
      price_iran: 1800, price_label: '۱.۸ میلیارد',
      price_opts: ['۱.۲ میلیارد','۱.۸ میلیارد','۲.۴ میلیارد','۳ میلیارد'],
      price_vals: [1200, 1800, 2400, 3000],
      hints: ['۱.۶ توربو','طراحی فضایی','AWD','آپشن کامل'],
      dims: { luxury:6, offroad:4, family:7, tech:8, economy:7, sport:7 },
      personality: { type:'trendy', emoji:'🎨', desc:'به طراحی و سبک اهمیت می‌دی. می‌خوای بین جمع دیده بشی.' },
      blur_opts: ['کیا اسپورتیج ۲۰۲۳','هیوندای توسان','کیا سورنتو','مزدا CX-5'],
      fun_fact: 'فضاپیمای جاده‌های ایران!',
    },
    {
      id: 'cayenne', name: 'پورشه کاین', brand: 'Porsche', year: '2023',
      tag: 'SUV اسپرت', origin: 'آلمان',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Porsche_Cayenne_Coupe_%28III%29%2C_Heck_8.4.19.jpg/960px-Porsche_Cayenne_Coupe_%28III%29%2C_Heck_8.4.19.jpg',
      price_iran: 19000, price_label: '۱۹ میلیارد',
      price_opts: ['۱۳ میلیارد','۱۶ میلیارد','۱۹ میلیارد','۲۵ میلیارد'],
      price_vals: [13000, 16000, 19000, 25000],
      hints: ['V6 3.0L','340 اسب','اسپرت','AWD'],
      dims: { luxury:9, offroad:5, family:6, tech:9, economy:2, sport:10 },
      personality: { type:'sporty', emoji:'🏎️', desc:'اهل اجرایی. سرعت، کنترل و زیبایی آئرودینامیک برات ضروری‌ان.' },
      blur_opts: ['پورشه کاین','بی‌ام‌و X6','مرسدس GLE کوپه','آئودی Q8'],
      fun_fact: 'هیبرید ورزش و لوکس!',
    },
  ];

  function load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULTS;
    } catch { return DEFAULTS; }
  }

  function save(cars) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cars)); return true; }
    catch { return false; }
  }

  function reset() { localStorage.removeItem(STORAGE_KEY); }

  function getAll() { return load(); }
  function getById(id) { return load().find(c => c.id === id) || null; }
  function add(car) {
    const cars = load(); cars.unshift(car); save(cars);
    postToSheet('add_car', car);
  }
  function update(id, patch) {
    const cars = load();
    const idx = cars.findIndex(c => c.id === id);
    if (idx >= 0) { cars[idx] = { ...cars[idx], ...patch }; save(cars); }
    const sheetPatch = { ...patch };
    if (sheetPatch.personality) {
      sheetPatch.personality_type  = sheetPatch.personality.type;
      sheetPatch.personality_emoji = sheetPatch.personality.emoji;
      sheetPatch.personality_desc  = sheetPatch.personality.desc;
      delete sheetPatch.personality;
    }
    postToSheet('update_car', { id, patch: sheetPatch });
  }
  function remove(id) {
    save(load().filter(c => c.id !== id));
    postToSheet('remove_car', { id });
  }

  return { getAll, getById, add, update, remove, save, reset, DEFAULTS, syncFromSheet };
})();

// alias برای راحتی
window.CAR_DB = CarIQDB.getAll();
CarIQDB.syncFromSheet();
