# PROJECT SUMMARY

Project: cariq
Generated: 2026-07-09T17:51:20
Total files: 20
Approx Tokens: 50413

Languages:
- CSS
- HTML
- JavaScript
- Markdown
- Text

---

# DIRECTORY TREE

├── README.md
    ├── index.html
        ├── base.css
        ├── components.css
        ├── tokens.css
        ├── utils.js
    ├── app_script_code_gs_for_google_sheet.md.txt
    ├── car-db.js
    ├── config.js
    ├── lead-engine.js
    ├── shared.js
    ├── ADMIN_GUIDE.md
    ├── GAME_SPEC.md
    ├── README_ARCHITECTURE.md
    ├── ROADMAP.md
        ├── index.html
        ├── index.html
        ├── index.html
        ├── index.html
├── index.html

---

# FILE INDEX

001. README.md
002. admin/index.html
003. assets/css/base.css
004. assets/css/components.css
005. assets/css/tokens.css
006. assets/js/utils.js
007. core/app_script_code_gs_for_google_sheet.md.txt
008. core/car-db.js
009. core/config.js
010. core/lead-engine.js
011. core/shared.js
012. docs/ADMIN_GUIDE.md
013. docs/GAME_SPEC.md
014. docs/README_ARCHITECTURE.md
015. docs/ROADMAP.md
016. games/blur/index.html
017. games/compare/index.html
018. games/personality/index.html
019. games/price/index.html
020. index.html

---

# FILES

---

<FILE path="README.md" tokens="3" lines="1">

```md
# cariq_game
```

</FILE>

---

<FILE path="admin/index.html" tokens="9449" lines="736">

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Admin Panel — CarIQ</title>
  <link rel="stylesheet" href="../assets/css/tokens.css"/>
  <link rel="stylesheet" href="../assets/css/base.css"/>
  <link rel="stylesheet" href="../assets/css/components.css"/>
  <style>
    body { background:#1e130a; color:#f0e8d8; direction:rtl; }
    body::before { display:none; }

    /* ── Layout ── */
    .admin-layout { display:flex; min-height:100vh; }
    .sidebar {
      width:230px; flex-shrink:0;
      background:#150d05;
      padding:0; position:fixed;
      right:0; top:0; bottom:0; z-index:50;
      border-left:1px solid rgba(184,134,11,0.15);
      display:flex; flex-direction:column;
    }
    .sidebar-logo {
      padding:20px 16px; border-bottom:1px solid rgba(184,134,11,0.15);
      display:flex; align-items:center; gap:10px;
    }
    .sidebar-logo-icon { font-size:28px; }
    .sidebar-logo-text { font-size:16px; font-weight:900; color:var(--c-gold2); }
    .sidebar-logo-sub  { font-size:10px; color:rgba(255,255,255,0.3); }
    .sidebar-nav { flex:1; padding:12px 0; overflow-y:auto; }
    .nav-item {
      display:flex; align-items:center; gap:10px;
      padding:11px 18px; color:rgba(255,255,255,0.55);
      font-size:13px; font-weight:600; cursor:pointer;
      border-right:3px solid transparent;
      transition:all var(--t-fast);
    }
    .nav-item:hover { background:rgba(255,255,255,0.04); color:rgba(255,255,255,0.85); }
    .nav-item.active { color:var(--c-gold2); border-right-color:var(--c-gold2); background:rgba(184,134,11,0.08); }
    .nav-icon { font-size:18px; width:24px; text-align:center; flex-shrink:0; }
    .sidebar-footer { padding:14px 16px; border-top:1px solid rgba(184,134,11,0.1); font-size:11px; color:rgba(255,255,255,0.25); }

    .main-content { margin-right:230px; padding:24px 28px; flex:1; overflow-y:auto; min-height:100vh; }

    /* ── Header ── */
    .page-header { margin-bottom:24px; }
    .page-title   { font-size:22px; font-weight:900; color:#fff; margin-bottom:4px; }
    .page-sub     { font-size:13px; color:rgba(255,255,255,0.4); }

    /* ── Panels ── */
    .panel { display:none; }
    .panel.active { display:block; animation:fadeIn var(--t-med) ease; }

    /* ── KPIs ── */
    .kpi-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:14px; margin-bottom:24px; }
    .kpi-box { background:#261508; border:1px solid rgba(184,134,11,0.2); border-radius:var(--r); padding:18px; text-align:center; }
    .kpi-val { font-size:34px; font-weight:900; color:var(--c-gold2); }
    .kpi-lbl { font-size:12px; color:rgba(255,255,255,0.4); margin-top:5px; }

    /* ── Cards ── */
    .admin-card { background:#1e1008; border:1px solid rgba(184,134,11,0.18); border-radius:var(--r); padding:20px; margin-bottom:16px; }
    .admin-card-title { font-size:16px; font-weight:800; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px; }

    /* ── Form elements ── */
    .field { margin-bottom:14px; }
    .field label { display:block; font-size:12px; font-weight:700; color:rgba(255,255,255,0.5); margin-bottom:6px; letter-spacing:.05em; text-transform:uppercase; }
    .field input, .field select, .field textarea {
      width:100%; padding:11px 13px;
      background:#2e1a08; border:1.5px solid rgba(184,134,11,0.2);
      border-radius:var(--r-sm); color:#f0e8d8;
      font-size:14px; font-family:inherit;
      transition:border-color var(--t-fast);
    }
    .field input:focus, .field select:focus, .field textarea:focus { outline:none; border-color:var(--c-gold); }
    .field input::placeholder { color:rgba(255,255,255,0.25); }
    .field-row { display:flex; gap:12px; }
    .field-row .field { flex:1; }

    /* ── Table ── */
    .data-table { width:100%; border-collapse:collapse; }
    .data-table th { padding:9px 12px; text-align:right; background:#261508; color:rgba(255,255,255,0.4); font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; border-bottom:1px solid rgba(184,134,11,0.15); }
    .data-table td { padding:10px 12px; font-size:13px; border-bottom:1px solid rgba(255,255,255,0.05); color:rgba(255,255,255,0.75); }
    .data-table tr:hover td { background:rgba(255,255,255,0.03); }

    /* ── Buttons ── */
    .adm-btn { display:inline-flex; align-items:center; gap:6px; padding:9px 16px; border-radius:var(--r-sm); font-weight:700; font-size:13px; cursor:pointer; border:none; transition:opacity var(--t-fast); font-family:inherit; }
    .adm-btn:hover { opacity:.85; }
    .adm-btn-gold   { background:linear-gradient(135deg,var(--c-gold2),var(--c-gold)); color:var(--c-on-gold); }
    .adm-btn-danger { background:rgba(184,50,50,0.2); color:var(--c-red); border:1px solid rgba(184,50,50,0.3); }
    .adm-btn-ghost  { background:rgba(255,255,255,0.07); color:rgba(255,255,255,0.6); }

    /* ── Toggle ── */
    .toggle-wrap { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
    .toggle-label { flex:1; font-size:13px; font-weight:600; color:rgba(255,255,255,0.75); }
    .toggle { position:relative; width:44px; height:24px; flex-shrink:0; }
    .toggle input { opacity:0; width:0; height:0; position:absolute; }
    .toggle-track { position:absolute; inset:0; background:rgba(255,255,255,0.15); border-radius:999px; cursor:pointer; transition:background var(--t-fast); }
    .toggle input:checked+.toggle-track { background:var(--c-gold); }
    .toggle-track::after { content:''; position:absolute; width:18px; height:18px; background:#fff; border-radius:50%; top:3px; right:3px; transition:transform var(--t-fast); }
    .toggle input:checked+.toggle-track::after { transform:translateX(-20px); }

    /* ── Badge ── */
    .badge-hot  { background:rgba(184,50,50,0.2);   color:var(--c-red);   border:1px solid rgba(184,50,50,0.3);   padding:2px 8px; border-radius:999px; font-size:10px; font-weight:700; }
    .badge-warm { background:rgba(184,134,11,0.2);  color:var(--c-gold);  border:1px solid rgba(184,134,11,0.3);  padding:2px 8px; border-radius:999px; font-size:10px; font-weight:700; }
    .badge-cold { background:rgba(44,95,138,0.2);   color:#6bb0d8;        border:1px solid rgba(44,95,138,0.3);   padding:2px 8px; border-radius:999px; font-size:10px; font-weight:700; }

    /* ── Login screen ── */
    .login-wrap { display:flex; align-items:center; justify-content:center; min-height:100vh; }
    .login-box { background:#1e1008; border:1px solid rgba(184,134,11,0.25); border-radius:var(--r-lg); padding:40px 32px; width:360px; text-align:center; }
    .login-logo { font-size:3rem; margin-bottom:10px; }
    .login-title { font-size:22px; font-weight:900; color:#fff; margin-bottom:4px; }
    .login-sub   { font-size:13px; color:rgba(255,255,255,0.4); margin-bottom:24px; }
    .login-error { color:var(--c-red); font-size:13px; margin-top:8px; }

    /* ── Modal برای فرم خودرو ── */
    .car-modal-overlay {
      position:fixed; top:0; left:0; right:0; bottom:0;
      background:rgba(0,0,0,0.7); backdrop-filter:blur(4px);
      display:flex; align-items:center; justify-content:center;
      z-index:200; opacity:0; visibility:hidden;
      transition:all var(--t-med);
    }
    .car-modal-overlay.open { opacity:1; visibility:visible; }
    .car-modal {
      background:#1e1008; border:1px solid rgba(184,134,11,0.3);
      border-radius:var(--r-lg); width:90%; max-width:700px;
      max-height:85vh; overflow-y:auto; padding:24px;
      transform:scale(0.95); transition:transform var(--t-med);
    }
    .car-modal-overlay.open .car-modal { transform:scale(1); }
    .car-modal-title { font-size:20px; font-weight:900; margin-bottom:20px; color:var(--c-gold2); border-right:3px solid var(--c-gold); padding-right:12px; }
    .car-modal-actions { display:flex; gap:12px; margin-top:24px; justify-content:flex-end; }
    .form-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    
    @media(max-width:700px){
      .sidebar { width:60px; }
      .nav-item span:last-child, .sidebar-logo-text, .sidebar-logo-sub, .sidebar-footer { display:none; }
      .main-content { margin-right:60px; padding:16px; }
      .field-row, .form-grid-2 { flex-direction:column; grid-template-columns:1fr; }
    }
  </style>
</head>
<body>

<!-- ── صفحه لاگین ── -->
<div id="login-screen" class="login-wrap">
  <div class="login-box">
    <div class="login-logo">🔐</div>
    <div class="login-title">پنل ادمین CarIQ</div>
    <div class="login-sub">رمز عبور را وارد کنید</div>
    <div class="field">
      <input type="password" id="pass-input" placeholder="رمز عبور" style="background:#2e1a08;border-color:rgba(184,134,11,0.2);color:#f0e8d8"/>
    </div>
    <button class="adm-btn adm-btn-gold w100" id="login-btn" style="width:100%;justify-content:center;padding:13px">ورود</button>
    <div class="login-error hidden" id="login-error">رمز اشتباه است!</div>
  </div>
</div>

<!-- ── پنل اصلی ── -->
<div id="admin-panel" class="admin-layout hidden">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">🚗</div>
      <div>
        <div class="sidebar-logo-text">CarIQ</div>
        <div class="sidebar-logo-sub">Admin Panel</div>
      </div>
    </div>
    <nav class="sidebar-nav" id="sidebar-nav">
      <div class="nav-item active" data-panel="dashboard"><span class="nav-icon">📊</span><span>داشبورد</span></div>
      <div class="nav-item" data-panel="settings"  ><span class="nav-icon">⚙️</span><span>تنظیمات تماس</span></div>
      <div class="nav-item" data-panel="games"     ><span class="nav-icon">🎮</span><span>مدیریت بازی‌ها</span></div>
      <div class="nav-item" data-panel="leads"     ><span class="nav-icon">👥</span><span>لیدها</span></div>
      <div class="nav-item" data-panel="cars"      ><span class="nav-icon">🚙</span><span>دیتابیس خودرو</span></div>
      <div class="nav-item" data-panel="security"  ><span class="nav-icon">🔐</span><span>امنیت</span></div>
    </nav>
    <div class="sidebar-footer">
      <a href="../index.html" style="color:rgba(255,255,255,0.3);font-size:11px">← بازگشت به لابی</a>
    </div>
  </aside>

  <!-- Main -->
  <main class="main-content">

    <!-- DASHBOARD -->
    <div class="panel active" id="panel-dashboard">
      <div class="page-header">
        <div class="page-title">📊 داشبورد</div>
        <div class="page-sub">خلاصه عملکرد پلتفرم</div>
      </div>
      <div class="kpi-grid" id="kpi-grid"></div>
      <div class="admin-card">
        <div class="admin-card-title">📋 آخرین لیدها</div>
        <div id="dash-leads"></div>
      </div>
    </div>

    <!-- SETTINGS -->
    <div class="panel" id="panel-settings">
      <div class="page-header">
        <div class="page-title">⚙️ تنظیمات تماس</div>
        <div class="page-sub">اطلاعات تماس نمایش داده شده در بازی‌ها</div>
      </div>
      <div class="admin-card">
        <div class="admin-card-title">📞 اطلاعات تماس</div>
        <div class="field"><label>آیدی تلگرام</label><input id="s-tg" placeholder="@pouriabh"/></div>
        <div class="field"><label>شماره تلفن</label><input id="s-phone" placeholder="09172079245" dir="ltr"/></div>
        <div class="field"><label>واتساپ (کد کشور)</label><input id="s-wa" placeholder="989172079245" dir="ltr"/></div>
        <div class="field"><label>پیام CTA پیش‌فرض</label><input id="s-cta" placeholder="سلام! از بازی CarIQ اومدم..."/></div>
      </div>
      <div class="admin-card">
        <div class="admin-card-title">🏷️ برندینگ</div>
        <div class="field"><label>نام برند</label><input id="s-brand" placeholder="CarIQ"/></div>
        <div class="field"><label>تیتر لابی</label><input id="s-lobby-title" placeholder="تو چه جور ماشین‌بازی؟"/></div>
        <div class="field"><label>زیرتیتر لابی</label><input id="s-lobby-sub" placeholder="بازی کن — یاد بگیر — ماشین بخر"/></div>
      </div>
      <button class="adm-btn adm-btn-gold" id="save-settings-btn" style="min-width:160px">💾 ذخیره تنظیمات</button>
      <div id="settings-saved" class="hidden" style="margin-top:10px;color:var(--c-gold);font-size:13px">✅ ذخیره شد!</div>
    </div>

    <!-- GAMES -->
    <div class="panel" id="panel-games">
      <div class="page-header">
        <div class="page-title">🎮 مدیریت بازی‌ها</div>
        <div class="page-sub">فعال/غیرفعال کردن و ترتیب نمایش بازی‌ها</div>
      </div>
      <div class="admin-card" id="games-list"></div>
    </div>

    <!-- LEADS -->
    <div class="panel" id="panel-leads">
      <div class="page-header">
        <div class="page-title">👥 لیدها</div>
        <div class="page-sub">همه درخواست‌های ثبت شده</div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        <button class="adm-btn adm-btn-ghost" id="leads-refresh">🔄 بروزرسانی</button>
        <button class="adm-btn adm-btn-gold"  id="leads-export" >📤 صادرات CSV</button>
        <button class="adm-btn adm-btn-danger" id="leads-clear" >🗑️ حذف همه</button>
        <select id="leads-filter" style="background:#2e1a08;border:1px solid rgba(184,134,11,0.2);border-radius:var(--r-sm);color:#f0e8d8;padding:9px 12px;font-family:inherit;font-size:13px">
          <option value="">همه بازی‌ها</option>
          <option value="blur">blur</option>
          <option value="speed">speed</option>
          <option value="price">price</option>
          <option value="personality">personality</option>
          <option value="wheel">wheel</option>
          <option value="compare">compare</option>
        </select>
      </div>
      <div class="admin-card" style="overflow-x:auto">
        <table class="data-table" id="leads-table">
          <thead><tr><th>زمان</th><th>بازی</th><th>نتیجه</th><th>نام</th><th>تلفن</th><th>بودجه</th><th>علاقه</th></tr></thead>
          <tbody id="leads-tbody"></tbody>
        </table>
        <div id="leads-empty" class="hidden" style="text-align:center;padding:40px;color:rgba(255,255,255,0.3)">هنوز لیدی ثبت نشده</div>
      </div>
    </div>

    <!-- CARS — با فرم کامل مدیریت -->
    <div class="panel" id="panel-cars">
      <div class="page-header">
        <div class="page-title">🚙 دیتابیس خودروها</div>
        <div class="page-sub">مدیریت لیست خودروهای نمایش داده شده در بازی‌ها</div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <button class="adm-btn adm-btn-gold" id="cars-add-btn">➕ افزودن خودرو</button>
        <button class="adm-btn adm-btn-danger" id="cars-reset-btn">🔄 بازگشت به پیش‌فرض</button>
      </div>
      <div id="cars-list"></div>
    </div>

    <!-- SECURITY -->
    <div class="panel" id="panel-security">
      <div class="page-header">
        <div class="page-title">🔐 امنیت</div>
        <div class="page-sub">تغییر رمز عبور و تنظیمات امنیتی</div>
      </div>
      <div class="admin-card">
        <div class="admin-card-title">تغییر رمز عبور</div>
        <div class="field"><label>رمز فعلی</label><input type="password" id="sec-old" placeholder="رمز فعلی"/></div>
        <div class="field"><label>رمز جدید</label><input type="password" id="sec-new" placeholder="رمز جدید"/></div>
        <div class="field"><label>تکرار رمز جدید</label><input type="password" id="sec-new2" placeholder="تکرار رمز جدید"/></div>
        <button class="adm-btn adm-btn-gold" id="sec-save-btn">💾 تغییر رمز</button>
        <div id="sec-msg" class="hidden" style="margin-top:10px;font-size:13px"></div>
      </div>
      <div class="admin-card">
        <div class="admin-card-title">داده‌ها</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="adm-btn adm-btn-ghost" id="export-all-btn">📦 صادرات همه داده‌ها</button>
          <button class="adm-btn adm-btn-danger" id="reset-all-btn">⚠️ پاک کردن همه داده‌ها</button>
        </div>
      </div>
    </div>

  </main>
</div>

<!-- ── مودال فرم خودرو (کامل) ── -->
<div id="car-modal" class="car-modal-overlay">
  <div class="car-modal">
    <div class="car-modal-title" id="car-modal-title">➕ خودرو جدید</div>
    
    <div class="form-grid-2">
      <div class="field"><label>شناسه (ID) *</label><input id="car-id" placeholder="یکتا و انگلیسی مثل lc300"/></div>
      <div class="field"><label>نام خودرو *</label><input id="car-name" placeholder="مثال: تویوتا لندکروزر ۳۰۰"/></div>
    </div>
    
    <div class="form-grid-2">
      <div class="field"><label>برند</label><input id="car-brand" placeholder="Toyota / BMW / ..."/></div>
      <div class="field"><label>سال</label><input id="car-year" placeholder="2024"/></div>
    </div>
    
    <div class="form-grid-2">
      <div class="field"><label>کشور/منشأ</label><input id="car-origin" placeholder="ژاپن/امارات"/></div>
      <div class="field"><label>آدرس تصویر (URL)</label><input id="car-img" placeholder="https://..."/></div>
    </div>
    
    <div class="form-grid-2">
      <div class="field"><label>برچسب قیمت نمایشی</label><input id="car-price-label" placeholder="۱۸ میلیارد"/></div>
      <div class="field"><label>قیمت پایه (میلیون تومان)</label><input id="car-price-iran" type="number" placeholder="18000"/></div>
    </div>
    
    <div class="field"><label>گزینه‌های قیمت (با کاما جداسازی)</label><input id="car-price-opts" placeholder="۱۲ میلیارد,۱۵ میلیارد,۱۸ میلیارد,۲۴ میلیارد"/></div>
    <div class="field"><label>مقادیر قیمت (میلیون تومان، با کاما)</label><input id="car-price-vals" placeholder="12000,15000,18000,24000"/></div>
    <div class="field"><label>Hint ها (با کاما)</label><input id="car-hints" placeholder="V6 هیبرید,4WD,7 نفره"/></div>
    
    <div class="admin-card-title" style="margin-top:12px">📐 ابعاد خودرو (۱-۱۰)</div>
    <div class="form-grid-2">
      <div class="field"><label>لوکس</label><input id="car-dim-luxury" type="number" min="0" max="10" value="5"/></div>
      <div class="field"><label>آفرود</label><input id="car-dim-offroad" type="number" min="0" max="10" value="5"/></div>
      <div class="field"><label>خانواده</label><input id="car-dim-family" type="number" min="0" max="10" value="5"/></div>
      <div class="field"><label>تکنولوژی</label><input id="car-dim-tech" type="number" min="0" max="10" value="5"/></div>
      <div class="field"><label>اقتصادی</label><input id="car-dim-economy" type="number" min="0" max="10" value="5"/></div>
      <div class="field"><label>اسپرت</label><input id="car-dim-sport" type="number" min="0" max="10" value="5"/></div>
    </div>
    
    <div class="admin-card-title" style="margin-top:12px">🧠 شخصیت خودرو</div>
    <div class="form-grid-2">
      <div class="field"><label>نوع شخصیت</label>
        <select id="car-personality-type">
          <option value="adventurer">adventurer — ماجراجو 🏔️</option>
          <option value="family">family — خانواده‌دوست 👨‍👩‍👧</option>
          <option value="urbanpro">urbanpro — شهری اسپرت 🏙️</option>
          <option value="elite">elite — ایت و پرستیژ 👑</option>
          <option value="balanced">balanced — متعادل 🛣️</option>
          <option value="techie">techie — تکنولوژی‌دوست ⚡</option>
          <option value="quality">quality — کیفیت ژاپنی 🍃</option>
          <option value="trendy">trendy — ترندی و شیک 🎨</option>
          <option value="sporty">sporty — اسپرت و سریع 🏎️</option>
        </select>
      </div>
      <div class="field"><label>اموجی شخصیت</label><input id="car-personality-emoji" placeholder="🏔️"/></div>
    </div>
    <div class="field"><label>توضیح شخصیت</label><textarea id="car-personality-desc" rows="2" placeholder="تو ماجراجوی واقعی هستی. قدرت و اطمینان در هر مسیری برات اولویته."></textarea></div>
    
    <div class="field"><label>گزینه‌های بازی Blur (با کاما)</label><input id="car-blur-opts" placeholder="تویوتا لندکروزر ۳۰۰,تویوتا پرادو,لکسوس LX,میتسوبیشی پاجرو"/></div>
    <div class="field"><label>Fun Fact</label><input id="car-fun-fact" placeholder="پرفروش‌ترین SUV لوکس در بازار ایران!"/></div>
    
    <div class="car-modal-actions">
      <button class="adm-btn adm-btn-ghost" id="car-modal-cancel">انصراف</button>
      <button class="adm-btn adm-btn-gold" id="car-modal-save">💾 ذخیره خودرو</button>
    </div>
  </div>
</div>

<script src="../core/config.js"></script>
<script src="../core/car-db.js"></script>
<script src="../core/shared.js"></script>
<script src="../core/lead-engine.js"></script>
<script src="../assets/js/utils.js"></script>
<script>
/* =============================================
   CarIQ Admin Panel — نسخه کامل با فرم خودرو
   ============================================= */

// ── متغیرهای وضعیت ──
let editingCarId = null;

// ── Login ──
function checkLogin() {
  const stored = sessionStorage.getItem('cariq_admin_ok');
  if (stored === '1') showAdmin();
}
function showAdmin() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('admin-panel').classList.remove('hidden');
  initAdmin();
}
document.getElementById('login-btn').addEventListener('click', () => {
  const pass = document.getElementById('pass-input').value;
  const cfg = CarIQConfig.get();
  if (pass === cfg.admin_pass_hash) {
    sessionStorage.setItem('cariq_admin_ok', '1');
    showAdmin();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
    document.getElementById('pass-input').classList.add('shake');
    setTimeout(() => document.getElementById('pass-input').classList.remove('shake'), 500);
  }
});
document.getElementById('pass-input').addEventListener('keydown', e => { if (e.key==='Enter') document.getElementById('login-btn').click(); });

// ── Nav ──
document.getElementById('sidebar-nav').addEventListener('click', e => {
  const item = e.target.closest('.nav-item');
  if (!item) return;
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  item.classList.add('active');
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + item.dataset.panel).classList.add('active');
});

// ── Main init ──
function initAdmin() {
  renderDashboard();
  renderSettings();
  renderGames();
  renderLeads();
  renderCars();
  initSecurity();
}

// ── Dashboard ──
async function renderDashboard() {
  const leads = await CarIQLeads.getAllRemote();
  const hot   = leads.filter(l => l.profile?.interest === '🔥 داغ' || l.profile?.interest === 'hot').length;
  const today = leads.filter(l => new Date(l.at).toDateString() === new Date().toDateString()).length;

  const kpiGrid = document.getElementById('kpi-grid');
  kpiGrid.innerHTML = '';
  [[leads.length,'کل لیدها'],[today,'امروز'],[hot,'لید داغ 🔥'],[CarIQDB.getAll().length,'خودروها']].forEach(([val,lbl]) => {
    kpiGrid.innerHTML += `<div class="kpi-box"><div class="kpi-val">${val}</div><div class="kpi-lbl">${lbl}</div></div>`;
  });

  const dashLeads = document.getElementById('dash-leads');
  if (!leads.length) { dashLeads.innerHTML = '<p style="color:rgba(255,255,255,0.3);text-align:center;padding:20px">هنوز لیدی ثبت نشده</p>'; return; }
  dashLeads.innerHTML = `<table class="data-table"><thead><tr><th>زمان</th><th>بازی</th><th>نام</th><th>تلفن</th><th>علاقه</th></tr></thead><tbody>${
    leads.slice(0,8).map(l => `<tr>
      <td>${CarIQUtils.timeAgo(l.at)}</td>
      <td>${l.source}</td>
      <td>${l.contact?.name || '—'}</td>
      <td dir="ltr">${l.contact?.phone || '—'}</td>
      <td><span class="badge-${l.profile?.interest==='hot'?'hot':l.profile?.interest==='warm'?'warm':'cold'}">${l.profile?.interest||'—'}</span></td>
    </tr>`).join('')
  }</tbody></table>`;
}

// ── Settings ──
function renderSettings() {
  const cfg = CarIQConfig.get();
  document.getElementById('s-tg').value          = cfg.contact.telegram;
  document.getElementById('s-phone').value        = cfg.contact.phone;
  document.getElementById('s-wa').value           = cfg.contact.whatsapp || '';
  document.getElementById('s-cta').value          = cfg.cta_message;
  document.getElementById('s-brand').value        = cfg.brand_name;
  document.getElementById('s-lobby-title').value  = cfg.lobby_title;
  document.getElementById('s-lobby-sub').value    = cfg.lobby_subtitle;
}
document.getElementById('save-settings-btn').addEventListener('click', () => {
  const cfg = CarIQConfig.get();
  cfg.contact.telegram  = document.getElementById('s-tg').value.trim();
  cfg.contact.phone     = document.getElementById('s-phone').value.trim();
  cfg.contact.whatsapp  = document.getElementById('s-wa').value.trim();
  cfg.cta_message       = document.getElementById('s-cta').value.trim();
  cfg.brand_name        = document.getElementById('s-brand').value.trim();
  cfg.lobby_title       = document.getElementById('s-lobby-title').value.trim();
  cfg.lobby_subtitle    = document.getElementById('s-lobby-sub').value.trim();
  CarIQConfig.save(cfg);
  const msg = document.getElementById('settings-saved');
  msg.classList.remove('hidden'); setTimeout(() => msg.classList.add('hidden'), 2500);
});

// ── Games ──
const ALL_GAMES = [
  { id:'personality', name:'🧬 تست شخصیت' },
  { id:'blur',        name:'🔍 ماشین از پشت مه' },
  { id:'price',       name:'💰 حدس قیمت' },
  { id:'speed',       name:'⚡ اسپید راند' },
  { id:'wheel',       name:'🎡 چرخ شانس' },
  { id:'compare',     name:'⚖️ کدوم گرون‌تره؟' },
];
function renderGames() {
  const cfg = CarIQConfig.get();
  const el = document.getElementById('games-list');
  el.innerHTML = '<div class="admin-card-title">فعال/غیرفعال کردن بازی‌ها</div>';
  ALL_GAMES.forEach(g => {
    const enabled = cfg.games_enabled.includes(g.id);
    const wrap = document.createElement('div');
    wrap.className = 'toggle-wrap';
    wrap.innerHTML = `<div class="toggle-label">${g.name}</div>
      <label class="toggle">
        <input type="checkbox" id="game-toggle-${g.id}" ${enabled?'checked':''}>
        <div class="toggle-track"></div>
      </label>`;
    wrap.querySelector('input').addEventListener('change', e => {
      const c = CarIQConfig.get();
      if (e.target.checked) { if (!c.games_enabled.includes(g.id)) c.games_enabled.push(g.id); }
      else c.games_enabled = c.games_enabled.filter(x => x !== g.id);
      CarIQConfig.save(c);
    });
    el.appendChild(wrap);
  });
}

// ── Leads ──
async function renderLeads(filter) {
  const all = await CarIQLeads.getAllRemote();
  const rows = filter ? all.filter(l => l.source === filter) : all;
  const tbody = document.getElementById('leads-tbody');
  const empty = document.getElementById('leads-empty');
  if (!rows.length) { tbody.innerHTML=''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  tbody.innerHTML = rows.map(l => `<tr>
    <td>${CarIQUtils.timeAgo(l.at)}</td>
    <td>${l.source}</td>
    <td>${l.game_result||'—'}</td>
    <td>${l.contact?.name||'—'}</td>
    <td dir="ltr">${l.contact?.phone||'—'}</td>
    <td>${l.profile?.budget||'—'}</td>
    <td><span class="badge-${l.profile?.interest==='hot'?'hot':l.profile?.interest==='warm'?'warm':'cold'}">${l.profile?.interest||'—'}</span></td>
  </tr>`).join('');
}
document.getElementById('leads-refresh').addEventListener('click', () => renderLeads(document.getElementById('leads-filter').value));
document.getElementById('leads-export').addEventListener('click', () => CarIQLeads.exportCSV());
document.getElementById('leads-filter').addEventListener('change', e => renderLeads(e.target.value));
document.getElementById('leads-clear').addEventListener('click', () => {
  if (confirm('آیا مطمئنی؟ همه لیدها حذف می‌شوند!')) { CarIQLeads.clear(); renderLeads(); renderDashboard(); }
});

// ── Cars ── با فرم کامل ──────────────────────────────────────
function openCarModal(car = null) {
  const modal = document.getElementById('car-modal');
  const title = document.getElementById('car-modal-title');
  
  if (car) {
    editingCarId = car.id;
    title.innerHTML = `✏️ ویرایش: ${car.name}`;
    document.getElementById('car-id').value = car.id;
    document.getElementById('car-name').value = car.name;
    document.getElementById('car-brand').value = car.brand || '';
    document.getElementById('car-year').value = car.year || '';
    document.getElementById('car-origin').value = car.origin || '';
    document.getElementById('car-img').value = car.img || '';
    document.getElementById('car-price-label').value = car.price_label || '';
    document.getElementById('car-price-iran').value = car.price_iran || 0;
    document.getElementById('car-price-opts').value = (car.price_opts || []).join(',');
    document.getElementById('car-price-vals').value = (car.price_vals || []).join(',');
    document.getElementById('car-hints').value = (car.hints || []).join(',');
    document.getElementById('car-dim-luxury').value = car.dims?.luxury || 5;
    document.getElementById('car-dim-offroad').value = car.dims?.offroad || 5;
    document.getElementById('car-dim-family').value = car.dims?.family || 5;
    document.getElementById('car-dim-tech').value = car.dims?.tech || 5;
    document.getElementById('car-dim-economy').value = car.dims?.economy || 5;
    document.getElementById('car-dim-sport').value = car.dims?.sport || 5;
    document.getElementById('car-personality-type').value = car.personality?.type || 'balanced';
    document.getElementById('car-personality-emoji').value = car.personality?.emoji || '🛣️';
    document.getElementById('car-personality-desc').value = car.personality?.desc || '';
    document.getElementById('car-blur-opts').value = (car.blur_opts || []).join(',');
    document.getElementById('car-fun-fact').value = car.fun_fact || '';
  } else {
    editingCarId = null;
    title.innerHTML = '➕ خودرو جدید';
    // پاک کردن همه فیلدها
    document.querySelectorAll('#car-modal input, #car-modal textarea, #car-modal select').forEach(f => {
      if (f.type !== 'submit' && f.id !== 'car-modal-save' && f.id !== 'car-modal-cancel') {
        f.value = '';
      }
    });
    document.getElementById('car-id').value = '';
    document.getElementById('car-price-iran').value = '0';
    document.getElementById('car-dim-luxury').value = '5';
    document.getElementById('car-dim-offroad').value = '5';
    document.getElementById('car-dim-family').value = '5';
    document.getElementById('car-dim-tech').value = '5';
    document.getElementById('car-dim-economy').value = '5';
    document.getElementById('car-dim-sport').value = '5';
    document.getElementById('car-personality-type').value = 'balanced';
    document.getElementById('car-personality-emoji').value = '🛣️';
  }
  
  modal.classList.add('open');
}

function closeCarModal() {
  document.getElementById('car-modal').classList.remove('open');
}

function saveCarFromModal() {
  // validation
  const id = document.getElementById('car-id').value.trim();
  const name = document.getElementById('car-name').value.trim();
  
  if (!id) { alert('شناسه (ID) اجباری است'); return; }
  if (!name) { alert('نام خودرو اجباری است'); return; }
  if (!/^[a-z0-9_]+$/.test(id)) { alert('شناسه فقط می‌تواند شامل حروف کوچک انگلیسی، اعداد و زیرخط باشد'); return; }
  
  const priceOptsRaw = document.getElementById('car-price-opts').value;
  const priceValsRaw = document.getElementById('car-price-vals').value;
  
  const carData = {
    id: id,
    name: name,
    brand: document.getElementById('car-brand').value.trim(),
    year: document.getElementById('car-year').value.trim(),
    origin: document.getElementById('car-origin').value.trim(),
    img: document.getElementById('car-img').value.trim(),
    price_label: document.getElementById('car-price-label').value.trim(),
    price_iran: parseInt(document.getElementById('car-price-iran').value) || 0,
    price_opts: priceOptsRaw ? priceOptsRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
    price_vals: priceValsRaw ? priceValsRaw.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)) : [],
    hints: document.getElementById('car-hints').value.split(',').map(s => s.trim()).filter(Boolean),
    dims: {
      luxury: parseInt(document.getElementById('car-dim-luxury').value) || 0,
      offroad: parseInt(document.getElementById('car-dim-offroad').value) || 0,
      family: parseInt(document.getElementById('car-dim-family').value) || 0,
      tech: parseInt(document.getElementById('car-dim-tech').value) || 0,
      economy: parseInt(document.getElementById('car-dim-economy').value) || 0,
      sport: parseInt(document.getElementById('car-dim-sport').value) || 0,
    },
    personality: {
      type: document.getElementById('car-personality-type').value,
      emoji: document.getElementById('car-personality-emoji').value.trim() || '🚗',
      desc: document.getElementById('car-personality-desc').value.trim(),
    },
    blur_opts: document.getElementById('car-blur-opts').value.split(',').map(s => s.trim()).filter(Boolean),
    fun_fact: document.getElementById('car-fun-fact').value.trim(),
  };
  
  if (editingCarId) {
    CarIQDB.update(editingCarId, carData);
  } else {
    CarIQDB.add(carData);
  }
  
  closeCarModal();
  renderCars();
}

function renderCars() {
  const cars = CarIQDB.getAll();
  const el = document.getElementById('cars-list');
  el.innerHTML = '';
  if (!cars.length) {
    el.innerHTML = '<div class="admin-card" style="text-align:center;color:rgba(255,255,255,0.4)">هیچ خودرویی ثبت نشده. دکمه افزودن را بزنید.</div>';
    return;
  }
  cars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.style.marginBottom = '10px';
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <img src="${car.img || '../assets/img/placeholder.jpg'}" alt="${car.name}" style="width:70px;height:50px;object-fit:cover;border-radius:var(--r-xs);" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 60%22%3E%3Crect width=%22100%22 height=%2260%22 fill=%223a2510%22/%3E%3Ctext x=%2250%22 y=%2235%22 text-anchor=%22middle%22 fill=%22%23b8860f%22 font-size=%2224%22%3E🚗%3C/text%3E%3C/svg%3E'"/>
        <div style="flex:1">
          <div style="font-weight:800;font-size:14px;margin-bottom:3px">${car.name} <span style="font-size:11px;color:rgba(255,255,255,0.4)">${car.year || '—'}</span></div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4)">${car.price_label || '—'} | ${car.origin || '—'}</div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="adm-btn adm-btn-ghost" data-edit-id="${car.id}">✏️ ویرایش</button>
          <button class="adm-btn adm-btn-danger" data-delete-id="${car.id}">🗑️ حذف</button>
        </div>
      </div>`;
    el.appendChild(card);
  });
  
  // attach events dynamically
  document.querySelectorAll('[data-edit-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-edit-id');
      const car = CarIQDB.getById(id);
      if (car) openCarModal(car);
    });
  });
  document.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-delete-id');
      if (confirm('آیا از حذف این خودرو مطمئن هستید؟')) {
        CarIQDB.remove(id);
        renderCars();
        renderDashboard();
      }
    });
  });
}

// رویدادهای Cars
document.getElementById('cars-add-btn').addEventListener('click', () => openCarModal(null));
document.getElementById('cars-reset-btn').addEventListener('click', () => {
  if (confirm('⚠️ هشدار: همه خودروها به لیست پیش‌فرض بازنشانی می‌شوند. ادامه می‌دهید؟')) {
    CarIQDB.reset();
    renderCars();
    renderDashboard();
  }
});
document.getElementById('car-modal-save').addEventListener('click', saveCarFromModal);
document.getElementById('car-modal-cancel').addEventListener('click', closeCarModal);
document.getElementById('car-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('car-modal')) closeCarModal();
});

// ── Security ──
function initSecurity() {
  document.getElementById('sec-save-btn').addEventListener('click', () => {
    const old = document.getElementById('sec-old').value;
    const n1  = document.getElementById('sec-new').value;
    const n2  = document.getElementById('sec-new2').value;
    const msg = document.getElementById('sec-msg');
    const cfg = CarIQConfig.get();
    if (old !== cfg.admin_pass_hash) { msg.textContent='رمز فعلی اشتباه است'; msg.style.color='var(--c-red)'; msg.classList.remove('hidden'); return; }
    if (n1 !== n2) { msg.textContent='رمزهای جدید یکسان نیستند'; msg.style.color='var(--c-red)'; msg.classList.remove('hidden'); return; }
    if (n1.length < 4) { msg.textContent='رمز باید حداقل ۴ کاراکتر باشد'; msg.style.color='var(--c-red)'; msg.classList.remove('hidden'); return; }
    cfg.admin_pass_hash = n1; CarIQConfig.save(cfg);
    msg.textContent='✅ رمز تغییر کرد'; msg.style.color='var(--c-gold)'; msg.classList.remove('hidden');
    document.getElementById('sec-old').value = '';
    document.getElementById('sec-new').value = '';
    document.getElementById('sec-new2').value = '';
  });
  document.getElementById('export-all-btn').addEventListener('click', () => {
    const data = { config: CarIQConfig.get(), leads: CarIQLeads.getAll(), cars: CarIQDB.getAll() };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `cariq_backup_${Date.now()}.json`; a.click();
  });
  document.getElementById('reset-all-btn').addEventListener('click', () => {
    if (confirm('⚠️ همه داده‌ها (تنظیمات، لیدها، خودروها) پاک می‌شوند! مطمئنی؟')) {
      CarIQConfig.reset(); CarIQLeads.clear(); CarIQDB.reset(); location.reload();
    }
  });
}

checkLogin();
</script>
</body>
</html>
```

</FILE>

---

<FILE path="assets/css/base.css" tokens="628" lines="52">

```css
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');

/* ── ریست ── */
*,*::before,*::after { box-sizing:border-box; -webkit-tap-highlight-color:transparent; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body {
  font-family: var(--font-body);
  background: var(--c-bg);
  color: var(--c-text);
  min-height: 100vh;
  overflow-x: hidden;
  direction: rtl;
}
body::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E"),
    radial-gradient(ellipse 600px 300px at 50% 0%, rgba(184,134,11,0.04), transparent 70%);
}
button { font-family:inherit; cursor:pointer; border:none; background:none; }
input, textarea, select { font-family:inherit; }
img { display:block; max-width:100%; }
a { text-decoration:none; color:inherit; }

/* ── پوسته اپ ── */
.app { max-width:480px; margin:0 auto; min-height:100vh; position:relative; z-index:1; }

/* ── صفحه‌ها ── */
.screen { display:none; padding:0 14px 80px; animation:screenIn var(--t-med) var(--ease-out); }
.screen.active { display:block; }
@keyframes screenIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }

/* ── ابزارها ── */
.mt8{margin-top:8px}  .mt12{margin-top:12px}  .mt16{margin-top:16px}
.mb8{margin-bottom:8px}  .flex{display:flex}  .gap8{gap:8px}
.tc{text-align:center}  .hidden{display:none!important}
.w100{width:100%}

/* ── انیمیشن‌ها ── */
@keyframes pop     { 0%{transform:scale(.8);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
@keyframes flyUp   { from{opacity:1;transform:translate(-50%,-50%)} to{opacity:0;transform:translate(-50%,-130%)} }
@keyframes shake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
@keyframes pulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
@keyframes spin    { to{transform:rotate(360deg)} }
@keyframes fadeIn  { from{opacity:0} to{opacity:1} }

.pop-in  { animation:pop .35s var(--ease-spring); }
.shake   { animation:shake .4s ease; }
.pulse   { animation:pulse 2s infinite; }
.fade-in { animation:fadeIn var(--t-med) ease; }

```

</FILE>

---

<FILE path="assets/css/components.css" tokens="2973" lines="188">

```css
/* ════════════════════════════════════
   CarIQ UI Kit — کامپوننت‌های مشترک
   ════════════════════════════════════ */

/* ── کارت ── */
.card { background:var(--c-card); border:1px solid var(--c-border); border-radius:var(--r); padding:18px; box-shadow:var(--shadow-sm); }
.card+.card { margin-top:10px; }
.card-gold { border-color:rgba(184,134,11,0.3); }

/* ── تیتر بخش ── */
.section-label {
  font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  color:var(--c-muted2); display:flex; align-items:center; gap:8px; margin-bottom:12px;
}
.section-label::after { content:''; flex:1; height:1px; background:var(--c-border); }

/* ── دکمه‌ها ── */
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:13px 18px; border-radius:var(--r-sm); font-weight:700; font-size:14px;
  width:100%; cursor:pointer; border:none;
  transition:transform var(--t-fast), box-shadow var(--t-med), opacity var(--t-med);
  position:relative; overflow:hidden;
}
.btn:active { transform:scale(0.97); }
.btn[disabled] { opacity:.4; pointer-events:none; }

.btn-gold   { background:linear-gradient(135deg,var(--c-gold2),var(--c-gold)); color:var(--c-on-gold); box-shadow:var(--shadow-gold); }
.btn-gold:hover { box-shadow:0 8px 32px rgba(184,134,11,0.5); transform:translateY(-1px); }
.btn-accent { background:linear-gradient(135deg,var(--c-accent2),var(--c-accent)); color:#fff8f0; box-shadow:var(--shadow-md); }
.btn-tg     { background:linear-gradient(135deg,#3ea8e0,#2196d3); color:#fff; box-shadow:0 4px 20px rgba(33,150,211,0.4); }
.btn-phone  { background:linear-gradient(135deg,var(--c-green),#1f5c3a); color:#fff; }
.btn-share  { background:linear-gradient(135deg,#e1306c,#833ab4); color:#fff; }
.btn-outline { background:transparent; border:1.5px solid var(--c-border2); color:var(--c-muted); }
.btn-outline:hover { border-color:var(--c-gold); color:var(--c-gold); }
.btn-sm { padding:10px 14px; font-size:12px; }
.btn-row { display:flex; gap:8px; }
.btn-row>.btn { flex:1; }

/* ── پیل / بج ── */
.pill { display:inline-flex; align-items:center; gap:4px; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; }
.pill-gold   { background:rgba(184,134,11,0.12); color:var(--c-gold);   border:1px solid rgba(184,134,11,0.25); }
.pill-green  { background:rgba(45,122,79,0.10);  color:var(--c-green);  border:1px solid rgba(45,122,79,0.20);  }
.pill-red    { background:rgba(184,50,50,0.10);  color:var(--c-red);    border:1px solid rgba(184,50,50,0.20);  }
.pill-muted  { background:var(--c-bg3);          color:var(--c-muted);  border:1px solid var(--c-border);       }
.pill-accent { background:rgba(124,74,30,0.10);  color:var(--c-accent); border:1px solid rgba(124,74,30,0.20);  }

/* ── نوار پیشرفت ── */
.progress-wrap { margin-bottom:14px; }
.progress-meta { display:flex; justify-content:space-between; font-size:12px; color:var(--c-muted); margin-bottom:6px; }
.progress-track { height:6px; background:var(--c-bg3); border-radius:999px; overflow:hidden; }
.progress-fill { height:100%; background:linear-gradient(90deg,var(--c-gold2),var(--c-gold3)); border-radius:999px; transition:width .45s cubic-bezier(.4,0,.2,1); }

/* ── HUD ── */
.hud { display:flex; gap:8px; margin-bottom:14px; }
.hud-item { flex:1; padding:10px 8px; background:var(--c-card); border:1px solid var(--c-border); border-radius:var(--r-sm); text-align:center; }
.hud-item .hv { font-size:20px; font-weight:900; color:var(--c-text); }
.hud-item .hl { font-size:10px; color:var(--c-muted2); margin-top:1px; }
.hud-item.ok  .hv { color:var(--c-green); }
.hud-item.bad .hv { color:var(--c-red); }
.hud-item.pts .hv { color:var(--c-gold); }

/* ── هدر بازی ── */
.game-header {
  display:flex; align-items:center; gap:10px;
  padding:14px 0 12px;
  border-bottom:1px solid var(--c-border);
  margin-bottom:16px;
  position:sticky; top:0; background:var(--c-bg); z-index:20;
}
.back-btn {
  width:36px; height:36px; background:var(--c-card2); border-radius:var(--r-xs);
  display:flex; align-items:center; justify-content:center; font-size:18px; cursor:pointer; flex-shrink:0;
}
.back-btn:hover { background:var(--c-bg3); }
.game-header-info { flex:1; }
.game-header-title { font-size:14px; font-weight:800; }
.game-header-sub { font-size:11px; color:var(--c-muted); margin-top:1px; }
.score-pill { background:rgba(184,134,11,0.12); border:1px solid rgba(184,134,11,0.25); color:var(--c-gold); border-radius:999px; padding:5px 12px; font-size:12px; font-weight:800; white-space:nowrap; }

/* ── قهرمان نتیجه ── */
.result-hero {
  background:linear-gradient(160deg,#2c1810 0%,#4a3020 100%);
  border-radius:var(--r-lg); padding:24px 18px; text-align:center;
  margin-bottom:12px; position:relative; overflow:hidden;
}
.result-hero::before {
  content:''; position:absolute; top:-40%; left:-20%; width:140%; height:200%;
  background:radial-gradient(ellipse at 50% 30%,rgba(184,134,11,0.15),transparent 65%);
  pointer-events:none;
}
.result-ring {
  width:108px; height:108px; border-radius:50%;
  background:conic-gradient(var(--c-gold3) var(--pct,0deg), rgba(255,255,255,0.1) 0deg);
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 14px; position:relative;
}
.result-ring::before { content:''; width:80px; height:80px; border-radius:50%; background:#3a2510; position:absolute; }
.result-ring-inner { position:relative; text-align:center; }
.result-ring-num { font-size:24px; font-weight:900; color:var(--c-gold3); display:block; }
.result-ring-lbl { font-size:10px; color:rgba(255,255,255,0.4); letter-spacing:.5px; }
.result-title { font-size:21px; font-weight:900; color:#fff; margin-bottom:5px; position:relative; }
.result-sub   { font-size:13px; color:rgba(255,255,255,0.55); line-height:1.7; position:relative; }
.result-car-img { width:100%; border-radius:var(--r-sm); margin-bottom:12px; object-fit:cover; max-height:160px; }
.stat-row { display:flex; gap:7px; margin:12px 0; }
.stat-box { flex:1; background:rgba(255,255,255,0.07); border-radius:var(--r-sm); padding:10px 5px; text-align:center; border:1px solid rgba(255,255,255,0.07); }
.stat-box .sv { font-size:19px; font-weight:900; color:var(--c-gold3); display:block; }
.stat-box .sl { font-size:10px; color:rgba(255,255,255,0.4); margin-top:2px; }
.score-chips { display:flex; gap:5px; flex-wrap:wrap; margin-top:10px; justify-content:center; }
.chip { padding:4px 9px; border-radius:999px; font-size:11px; font-weight:700; border:1px solid; }
.chip-ok  { background:rgba(45,122,79,0.15);   border-color:rgba(45,122,79,0.3);   color:var(--c-green); }
.chip-no  { background:rgba(184,50,50,0.12);   border-color:rgba(184,50,50,0.3);   color:var(--c-red);   }
.chip-mid { background:rgba(184,134,11,0.12);  border-color:rgba(184,134,11,0.3);  color:var(--c-gold);  }

/* ── لید باکس ── */
.lead-box {
  background:linear-gradient(135deg,rgba(184,134,11,0.08),rgba(124,74,30,0.04));
  border:1px dashed rgba(184,134,11,0.3); border-radius:var(--r);
  padding:20px; margin-top:16px;
}
.lead-box h3 { font-size:16px; font-weight:800; color:var(--c-accent); margin-bottom:4px; }
.lead-box p  { font-size:13px; color:var(--c-muted); margin-bottom:14px; line-height:1.65; }
.lead-box p strong { color:var(--c-text2); }
.lead-btn-row { display:flex; gap:8px; margin-bottom:10px; }
.lead-btn-row .btn { font-size:12px; padding:11px; }
.lead-divider { text-align:center; font-size:11px; color:var(--c-muted2); margin:10px 0; position:relative; }
.lead-divider::before,.lead-divider::after { content:''; position:absolute; top:50%; width:38%; height:1px; background:var(--c-border); }
.lead-divider::before { right:0; }
.lead-divider::after  { left:0; }
.inp { width:100%; padding:12px 14px; background:var(--c-surface); border:1.5px solid var(--c-border2); border-radius:var(--r-sm); color:var(--c-text); font-size:14px; font-family:inherit; transition:border-color var(--t-fast); margin-bottom:8px; }
.inp::placeholder { color:var(--c-muted2); }
.inp:focus { outline:none; border-color:var(--c-gold); }
.lead-success { padding:14px; text-align:center; font-size:14px; font-weight:600; background:rgba(45,122,79,0.10); border:1px solid rgba(45,122,79,0.25); border-radius:var(--r-sm); color:var(--c-green); }

/* ── مدال ── */
.modal-overlay { position:fixed; inset:0; background:rgba(44,24,16,0.55); backdrop-filter:blur(8px); z-index:100; display:flex; align-items:flex-end; opacity:0; pointer-events:none; transition:opacity var(--t-med); }
.modal-overlay.open { opacity:1; pointer-events:all; }
.modal-sheet { width:100%; max-width:480px; margin:0 auto; background:var(--c-surface); border-radius:var(--r-xl) var(--r-xl) 0 0; padding:22px 18px 40px; transform:translateY(100%); transition:transform var(--t-med) var(--ease-out); }
.modal-overlay.open .modal-sheet { transform:none; }
.modal-handle { width:40px; height:4px; background:var(--c-bg3); border-radius:999px; margin:0 auto 18px; }
.modal-title { font-size:19px; font-weight:900; text-align:center; margin-bottom:4px; }
.modal-sub   { font-size:12px; color:var(--c-muted); text-align:center; margin-bottom:18px; line-height:1.6; }
.modal-close { margin-top:12px; width:100%; padding:12px; background:var(--c-card2); border-radius:var(--r-sm); font-size:13px; font-weight:600; color:var(--c-muted); cursor:pointer; font-family:inherit; border:none; }

/* ── کانال‌های اشتراک‌گذاری ── */
.share-preview { background:linear-gradient(135deg,#2c1810,#4a3020); border-radius:var(--r-sm); padding:16px; text-align:center; margin-bottom:14px; }
.share-preview-emoji { font-size:36px; margin-bottom:6px; }
.share-preview-text  { font-size:13px; color:rgba(255,255,255,0.85); font-weight:700; line-height:1.6; }
.share-preview-brand { font-size:10px; color:rgba(255,255,255,0.3); margin-top:6px; letter-spacing:.5px; }
.share-channels { display:flex; flex-direction:column; gap:8px; }
.share-channel { display:flex; align-items:center; gap:12px; padding:12px 14px; background:var(--c-card); border:1.5px solid var(--c-border); border-radius:var(--r-sm); cursor:pointer; transition:all var(--t-fast); }
.share-channel:hover { border-color:var(--c-gold); background:var(--c-card2); }
.share-channel-icon  { font-size:22px; width:36px; text-align:center; flex-shrink:0; }
.share-channel-label { font-size:14px; font-weight:700; }
.share-channel-sub   { font-size:11px; color:var(--c-muted); margin-top:1px; }

/* ── دکمه‌های انتخاب بازی ── */
.opt-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:10px; }
.opt-btn { padding:14px 10px; background:var(--c-card); border:1.5px solid var(--c-border); border-radius:var(--r-sm); color:var(--c-text); font-weight:700; font-size:13px; text-align:center; cursor:pointer; transition:all var(--t-fast); font-family:inherit; }
.opt-btn:hover  { border-color:var(--c-gold2); background:var(--c-card2); }
.opt-btn:active { transform:scale(0.97); }
.opt-btn.correct { background:rgba(45,122,79,0.15);  border-color:var(--c-green); color:var(--c-green); }
.opt-btn.wrong   { background:rgba(184,50,50,0.12);  border-color:var(--c-red);   color:var(--c-red);   }
.opt-btn.close   { background:rgba(184,134,11,0.12); border-color:var(--c-gold);  color:var(--c-gold);  }

/* ── پرواز امتیاز ── */
.score-fly { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); font-size:36px; font-weight:900; color:var(--c-gold2); pointer-events:none; animation:flyUp .7s ease forwards; z-index:999; }

/* ════════════════════════════════════
   Share Card Preview — اضافه شده برای buildShareCard جدید
   این بلاک را به انتهای assets/css/components.css اضافه کن
   ════════════════════════════════════ */

.share-card-preview-wrap {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 14px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.share-card-preview-wrap canvas {
  width: 100%;
  height: auto;
  display: block;
}


```

</FILE>

---

<FILE path="assets/css/tokens.css" tokens="364" lines="47">

```css
:root {
  /* ── رنگ‌های اصلی ── */
  --c-bg:      #f5f0e8;   --c-bg2:     #ede7d9;   --c-bg3:     #e5ddc8;
  --c-surface: #fdfaf5;   --c-card:    #faf6ee;   --c-card2:   #f2ead8;

  /* ── طلایی ── */
  --c-gold:    #b8860f;   --c-gold2:   #d4a017;   --c-gold3:   #e8c060;
  --c-gold-glow: rgba(184,134,11,0.2);

  /* ── تأکیدی ── */
  --c-accent:  #7c4a1e;   --c-accent2: #9b5e2a;

  /* ── وضعیت ── */
  --c-green:   #2d7a4f;   --c-red:     #b83232;
  --c-blue:    #2c5f8a;   --c-teal:    #2e8b7a;

  /* ── متن ── */
  --c-text:    #2c1810;   --c-text2:   #4a3020;
  --c-muted:   #8a7060;   --c-muted2:  #b0987c;
  --c-on-gold: #2c1810;

  /* ── حاشیه ── */
  --c-border:  rgba(120,80,40,0.15);
  --c-border2: rgba(120,80,40,0.25);

  /* ── سایه ── */
  --shadow-sm:   0 2px 8px rgba(120,80,40,0.12);
  --shadow-md:   0 4px 20px rgba(120,80,40,0.15);
  --shadow-lg:   0 8px 40px rgba(120,80,40,0.20);
  --shadow-gold: 0 4px 24px rgba(184,134,11,0.35);

  /* ── گوشه‌گردی ── */
  --r-xs: 8px;   --r-sm: 12px;  --r: 18px;
  --r-lg: 24px;  --r-xl: 32px;

  /* ── تایپوگرافی ── */
  --font-body:    'Vazirmatn', system-ui, sans-serif;
  --font-display: 'Playfair Display', serif;
  --text-xs: 11px;  --text-sm: 13px;  --text-md: 15px;
  --text-lg: 18px;  --text-xl: 22px;  --text-2xl: 28px;

  /* ── انیمیشن ── */
  --ease-out:    cubic-bezier(.22,1,.36,1);
  --ease-spring: cubic-bezier(.34,1.2,.64,1);
  --t-fast: 150ms;  --t-med: 300ms;  --t-slow: 500ms;
}

```

</FILE>

---

<FILE path="assets/js/utils.js" tokens="301" lines="47">

```js
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

```

</FILE>

---

<FILE path="core/app_script_code_gs_for_google_sheet.md.txt" tokens="1529" lines="183">

```txt
/**
 * CarIQ Backend - Google Apps Script
 * این کد رو داخل Extensions > Apps Script شیت‌تون قرار بدید.
 *
 * پیش‌نیاز: توی همین Spreadsheet دو تب (sheet/tab) با این اسم‌های دقیق بسازید:
 *   1) Leads   -> ردیف اول (هدر): id, at, source, game_result, score, name, phone, budget, drive, focus, expertise, interest, games_played, utm_source, utm_medium, utm_campaign
 *   2) Cars    -> ردیف اول (هدر): id, name, brand, year, tag, origin, img, price_iran, price_label, price_opts, price_vals, hints, personality_type, personality_emoji, personality_desc, blur_opts, fun_fact, dims_json
 *
 * همه‌ی درخواست‌ها (لید و ماشین) از همین یک Web App URL رد می‌شن.
 */

const SPREADSHEET_ID = '1LUfz7Zbvddw5j2qve7jecpgffN7p3Df5SrURAQTgArs';

const TABLES = {
  Leads: [
    "id","at","source","game_result","score","name","phone",
    "budget","drive","focus","expertise","interest",
    "games_played","utm_source","utm_medium","utm_campaign"
  ],

  Cars: [
    "id","name","brand","year","tag","origin","img",
    "price_iran","price_label","price_opts","price_vals",
    "hints","personality_type","personality_emoji",
    "personality_desc","blur_opts","fun_fact","dims_json"
  ]
};

function getSheet(name) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);

  // اگر شیت وجود نداشت، بساز
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  // اگر هدر ندارد، هدر را ایجاد کن
  if (TABLES[name] && sheet.getLastRow() === 0) {
    sheet.appendRow(TABLES[name]);
  }

  return sheet;
}

function sheetToObjects(sheet) {
  var rows = sheet.getDataRange().getValues();
  var headers = rows.shift();
  return rows
    .filter(function(row) { return row.join('') !== ''; })
    .map(function(row) {
      var obj = {};
      headers.forEach(function(h, i) { obj[h] = row[i]; });
      return obj;
    });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ============ GET: خوندن داده (لیدها یا ماشین‌ها) ============ */
function doGet(e) {
  try {
    var type = (e.parameter.type || 'leads').toLowerCase();

    if (type === 'cars') {
      var carsSheet = getSheet('Cars');
      return jsonOut({ status: 'ok', data: sheetToObjects(carsSheet) });
    }

    var leadsSheet = getSheet('Leads');
    return jsonOut({ status: 'ok', data: sheetToObjects(leadsSheet) });

  } catch (err) {
    return jsonOut({ status: 'error', message: err.toString() });
  }
}

/* ============ POST: نوشتن داده ============ */
/*
  بدنه‌ی درخواست (JSON) باید یک فیلد action داشته باشه:
  - action: "add_lead"    -> payload = آبجکت لید (همون ساختار CarIQLeads.save)
  - action: "add_car"     -> payload = آبجکت ماشین
  - action: "update_car"  -> payload = { id, patch: {...} }
  - action: "remove_car"  -> payload = { id }
*/
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;
    var payload = body.payload || {};

    if (action === 'add_lead') {
      var leadsSheet = getSheet('Leads');
      leadsSheet.appendRow([
        payload.id || '',
        new Date(payload.at || Date.now()),
        payload.source || '',
        payload.game_result || '',
        payload.score || '',
        (payload.contact && payload.contact.name) || '',
        (payload.contact && payload.contact.phone) || '',
        (payload.profile && payload.profile.budget) || '',
        (payload.profile && payload.profile.drive) || '',
        (payload.profile && payload.profile.focus) || '',
        (payload.profile && payload.profile.expertise) || '',
        (payload.profile && payload.profile.interest) || '',
        (payload.profile && payload.profile.games_played) || '',
        (payload.utm && payload.utm.source) || '',
        (payload.utm && payload.utm.medium) || '',
        (payload.utm && payload.utm.campaign) || ''
      ]);
      return jsonOut({ status: 'ok' });
    }

    if (action === 'add_car') {
      var carsSheet = getSheet('Cars');
      carsSheet.appendRow([
        payload.id || '',
        payload.name || '',
        payload.brand || '',
        payload.year || '',
        payload.tag || '',
        payload.origin || '',
        payload.img || '',
        payload.price_iran || '',
        payload.price_label || '',
        (payload.price_opts || []).join(','),
        (payload.price_vals || []).join(','),
        (payload.hints || []).join(','),
        (payload.personality && payload.personality.type) || '',
        (payload.personality && payload.personality.emoji) || '',
        (payload.personality && payload.personality.desc) || '',
        (payload.blur_opts || []).join(','),
        payload.fun_fact || '',
        payload.dims ? JSON.stringify(payload.dims) : ''
      ]);
      return jsonOut({ status: 'ok' });
    }

    if (action === 'update_car') {
      var carsSheet2 = getSheet('Cars');
      var rows = carsSheet2.getDataRange().getValues();
      var headers = rows[0];
      var idCol = headers.indexOf('id');
      for (var i = 1; i < rows.length; i++) {
        if (String(rows[i][idCol]) === String(payload.id)) {
          var patch = payload.patch || {};
          headers.forEach(function(h, colIdx) {
            if (patch.hasOwnProperty(h)) {
              var val = patch[h];
              if (Array.isArray(val)) val = val.join(',');
              carsSheet2.getRange(i + 1, colIdx + 1).setValue(val);
            }
          });
          break;
        }
      }
      return jsonOut({ status: 'ok' });
    }

    if (action === 'remove_car') {
      var carsSheet3 = getSheet('Cars');
      var rows3 = carsSheet3.getDataRange().getValues();
      var idCol3 = rows3[0].indexOf('id');
      for (var j = 1; j < rows3.length; j++) {
        if (String(rows3[j][idCol3]) === String(payload.id)) {
          carsSheet3.deleteRow(j + 1);
          break;
        }
      }
      return jsonOut({ status: 'ok' });
    }

    return jsonOut({ status: 'error', message: 'Unknown action: ' + action });

  } catch (err) {
    return jsonOut({ status: 'error', message: err.toString() });
  }
}
```

</FILE>

---

<FILE path="core/car-db.js" tokens="2875" lines="216">

```js
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

```

</FILE>

---

<FILE path="core/config.js" tokens="561" lines="73">

```js
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

```

</FILE>

---

<FILE path="core/lead-engine.js" tokens="1391" lines="165">

```js
/**
 * CarIQ — core/lead-engine.js
 * موتور جمع‌آوری لید + پروفایل‌سازی کاربر
 * ------------------------------------------------
 * همه بازی‌ها داده‌های رفتاری کاربر را
 * به‌صورت خودکار ذخیره می‌کنند.
 */

const CarIQLeads = (() => {
  const LEAD_KEY    = 'cariq_leads_v1';
  const PROFILE_KEY = 'cariq_profile_v1';
  const API_URL = 'https://script.google.com/macros/s/AKfycbyL_sJdA1uMzEjaw4TVpup-JmbWT0L4WgaVUVZGOoXB3IwhtFkuNbLYj6fUSWr3N9KX/exec';

  function postToSheet(action, payload) {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, payload }),
    }).catch(() => {});
  }

  /* ── پروفایل کاربر ─────────────────────────── */
  function getProfile() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}'); }
    catch { return {}; }
  }
  function setProfile(key, value) {
    const p = getProfile();
    p[key] = value;
    p._updatedAt = Date.now();
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch {}
  }
  function mergeProfile(data) {
    const p = { ...getProfile(), ...data, _updatedAt: Date.now() };
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch {}
  }

  /* خلاصه پروفایل برای ادمین */
  function getProfileSummary() {
    const p = getProfile();
    const budget = { low:'زیر ۳م', mid:'۳-۷م', high:'۷-۱۵م', vhigh:'۱۵م+' };
    const drive  = { city:'شهری', road:'جاده', offroad:'آفرود', hardcore:'آفرود سخت' };
    const focus  = { price:'قیمت', reliability:'دوام', tech:'تکنولوژی', brand:'برند' };
    return {
      budget:  budget[p.budget]  || '—',
      drive:   drive[p.drive]    || '—',
      focus:   focus[p.focus]    || '—',
      expertise: p.expertise     || '—',
      interest:  p.interest_level|| '—',
      games_played: p.games_played || 0,
    };
  }

  /* تشخیص سطح علاقه */
  function calcInterestLevel(profile) {
    let score = 0;
    if (profile.budget === 'high' || profile.budget === 'vhigh') score += 3;
    if (profile.drive === 'offroad' || profile.drive === 'hardcore') score += 1;
    if (profile.games_played >= 2) score += 2;
    if (profile.games_played >= 4) score += 2;
    if (score >= 5) return 'hot';
    if (score >= 3) return 'warm';
    return 'cold';
  }

  /* ── لید ────────────────────────────────────── */
  function save(data) {
    const profile = getProfile();
    profile.interest_level = calcInterestLevel(profile);

    const lead = {
      id:          CarIQShared.uuid(),
      at:          Date.now(),
      source:      data.source      || 'unknown',
      game_result: data.result      || '',
      score:       data.score       || 0,
      contact:     { name: data.name || '', phone: data.phone || '' },
      profile:     { ...getProfileSummary() },
      utm:         getUTM(),
    };

    try {
      const all = JSON.parse(localStorage.getItem(LEAD_KEY) || '[]');
      all.unshift(lead);
      localStorage.setItem(LEAD_KEY, JSON.stringify(all));
    } catch {}

    postToSheet('add_lead', lead);
    return lead;
  }

  function getAll() {
    try { return JSON.parse(localStorage.getItem(LEAD_KEY) || '[]'); }
    catch { return []; }
  }

  function clear() { localStorage.removeItem(LEAD_KEY); }

  async function getAllRemote() {
    try {
      const res = await fetch(`${API_URL}?type=leads`);
      const json = await res.json();
      if (json.status !== 'ok') return [];
      return json.data.map(row => ({
        id: row.id,
        at: new Date(row.at).getTime(),
        source: row.source,
        game_result: row.game_result,
        score: row.score,
        contact: { name: row.name, phone: row.phone },
        profile: { budget: row.budget, drive: row.drive, focus: row.focus, expertise: row.expertise, interest: row.interest, games_played: row.games_played },
      }));
    } catch { return []; }
  }

  /* صادرات CSV */
  function exportCSV() {
    const leads = getAll();
    if (!leads.length) return;
    const headers = ['ID','تاریخ','بازی','نتیجه','نام','تلفن','بودجه','رانندگی','علاقه'];
    const rows = leads.map(l => [
      l.id, new Date(l.at).toLocaleDateString('fa'), l.source, l.game_result,
      l.contact.name, l.contact.phone,
      l.profile.budget, l.profile.drive, l.profile.interest,
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c || ''}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cariq_leads_${Date.now()}.csv`;
    a.click();
  }

  /* ── UTM ────────────────────────────────────── */
  function getUTM() {
    const p = new URLSearchParams(location.search);
    return {
      source:   p.get('utm_source')   || document.referrer || 'direct',
      medium:   p.get('utm_medium')   || '',
      campaign: p.get('utm_campaign') || '',
    };
  }

  /* ── پیگیری بازی ────────────────────────────── */
  function trackGameStart(gameId) {
    const p = getProfile();
    p.games_played = (p.games_played || 0) + 1;
    p.last_game = gameId;
    p.last_seen = Date.now();
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch {}
  }

  function trackGameEnd(gameId, result) {
    mergeProfile({
      [`result_${gameId}`]: result,
      interest_level: calcInterestLevel(getProfile()),
    });
  }

  return { 
    getProfile, setProfile, mergeProfile, getProfileSummary, 
    save, getAll, getAllRemote, clear, 
    exportCSV, trackGameStart, trackGameEnd };
})();

```

</FILE>

---

<FILE path="core/shared.js" tokens="5301" lines="544">

```js
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

```

</FILE>

---

<FILE path="docs/ADMIN_GUIDE.md" tokens="161" lines="39">

```md
# ADMIN_GUIDE — راهنمای پنل ادمین

## دسترسی
- آدرس: `/admin/index.html`
- رمز پیش‌فرض: `cariq2025`
- ⚠️ در اولین ورود رمز را تغییر دهید

## بخش‌ها

### ۱. داشبورد
- تعداد کل لیدها
- بازی‌های فعال
- آمار روزانه

### ۲. تنظیمات تماس
- آیدی تلگرام
- شماره تلفن
- لینک واتساپ
- پیام CTA پیش‌فرض

### ۳. مدیریت بازی‌ها
- فعال/غیرفعال کردن بازی
- ترتیب نمایش

### ۴. لیدها
- مشاهده تمام لیدها
- فیلتر بر اساس بازی
- صادرات CSV
- پروفایل کاربر

### ۵. دیتابیس خودروها
- افزودن / ویرایش / حذف خودرو
- آپلود تصویر (URL)
- تنظیم قیمت‌ها و ابعاد

## ذخیره‌سازی
همه داده‌ها در `localStorage` مرورگر هستند.
برای پشتیبان‌گیری از دکمه Export CSV استفاده کنید.

```

</FILE>

---

<FILE path="docs/GAME_SPEC.md" tokens="442" lines="74">

```md
# GAME_SPEC — قرارداد ساخت بازی جدید

## تمپلیت پایه

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[نام بازی] | CarIQ</title>
  <link rel="stylesheet" href="../../assets/css/tokens.css"/>
  <link rel="stylesheet" href="../../assets/css/base.css"/>
  <link rel="stylesheet" href="../../assets/css/components.css"/>
</head>
<body>
  <div class="app">
    <div id="game-root"></div>
  </div>

  <script src="../../core/config.js"></script>
  <script src="../../core/car-db.js"></script>
  <script src="../../core/shared.js"></script>
  <script src="../../core/lead-engine.js"></script>

  <script>
  window.GAME_META = {
    id: 'my-game',
    name: 'نام بازی',
    icon: '🎮',
    rounds: 6,
    estimatedTime: '۳ دقیقه',
    viralScore: 8,
    leadQuality: 7,
  };

  window.GAME_API = {
    _state: { score: 0, round: 0 },
    init(container) {
      this._state = { score: 0, round: 0 };
      this._render(container);
    },
    reset() { this.init(document.getElementById('game-root')); },
    getResult() {
      return {
        score: this._state.score,
        pct: Math.round(this._state.score / (6*100) * 100),
        summary: 'نتیجه بازی',
        profileData: {},
      };
    },
    destroy() {},
    _render(container) { /* منطق رندر */ },
  };

  document.addEventListener('DOMContentLoaded', () => {
    CarIQShared.initStandaloneGame('game-root');
  });
  </script>
</body>
</html>
```

## چک‌لیست قبل از انتشار

- [ ] GAME_META کامل
- [ ] GAME_API پیاده شده
- [ ] lead-box در صفحه نتیجه
- [ ] دکمه اشتراک‌گذاری
- [ ] ریسپانسیو (max-width: 480px)
- [ ] تست روی موبایل
- [ ] profileData ذخیره می‌شود
- [ ] دکمه بازگشت به لابی کار می‌کند

```

</FILE>

---

<FILE path="docs/README_ARCHITECTURE.md" tokens="3376" lines="288">

```md
# CarIQ — نقشه معماری (وضعیت فعلی، صادقانه)

> این سند وضعیت **واقعیِ الان** پروژه رو مستند می‌کنه، نه وضعیت ایده‌آل.
> هدف: قبل از هر تغییری، دقیقاً بدونیم داده از کجا میاد، کجا ذخیره می‌شه،
> و اگه بخوایم دیتابیس واقعی جایگزین localStorage کنیم، چند تا فایل باید عوض بشه.
>
> تاریخ تولید سند: بر اساس نسخه‌ی فعلی کد (`cariq_v1` + بازی‌های blur/price/compare اضافه‌شده)

---

## ۱. Architecture Map (لایه‌بندی فعلی — واقعی، نه ایده‌آل)

```
┌─────────────────────────────────────────┐
│              UI (HTML/JS)                │
│   index.html / admin/index.html /         │
│   games/*/index.html                      │
│                                            │
│   ⚠️ Business Logic هم همین‌جاست:          │
│   - محاسبه‌ی امتیاز شخصیت (personality)    │
│   - محاسبه‌ی hot/warm/cold lead            │
│   - محاسبه‌ی دقت قیمت (price game)         │
└──────────────────┬────────────────────────┘
                    │ فراخوانی مستقیم تابع (نه HTTP)
                    ▼
┌─────────────────────────────────────────┐
│         "Repository-like" Layer           │
│   core/car-db.js   → CarIQDB              │
│   core/config.js   → CarIQConfig          │
│   core/lead-engine.js → CarIQLeads        │
│                                            │
│   ⚠️ این لایه فقط اسم Repository رو نداره؛ │
│   توابعش sync هستن (نه async/Promise)      │
└──────────────────┬────────────────────────┘
                    │ localStorage.getItem/setItem مستقیم
                    ▼
┌─────────────────────────────────────────┐
│         Browser localStorage              │
│   کلیدها: cariq_cars_v1, cariq_config_v1, │
│   cariq_leads_v1, cariq_profile_v1        │
│                                            │
│   ⚠️ این "دیتابیس" فقط روی یک مرورگر        │
│   روی یک دستگاه وجود داره. هیچ Sync         │
│   بین کاربران/دستگاه‌ها/ادمین نیست.         │
└─────────────────────────────────────────┘
```

**نتیجه‌گیری صادقانه:** یک معماری واقعی سه‌لایه (UI → Service → Repository → DB) نداریم.
آنچه هست: **UI → شبه-Repository (sync, بدون validation) → localStorage**.
لایه‌ی Service (که باید business logic رو نگه داره) اصلاً وجود نداره — منطق تصمیم‌گیری
مستقیم داخل فایل‌های UI نوشته شده.

---

## ۲. Folder Map

```
cariq/
├── index.html                    [UI] لابی — می‌خونه از CarIQConfig, هیچ محاسبه‌ی حساسی نداره
├── admin/index.html              [UI + Business Logic ⚠️] پنل ادمین — dashboard KPI محاسبه اینجاست
├── core/
│   ├── config.js                 [شبه-Repository] تنظیمات — DEFAULTS هاردکد + localStorage
│   ├── car-db.js                 [شبه-Repository] خودروها — DEFAULTS هاردکد (۱۰ خودرو) + localStorage
│   ├── lead-engine.js             [شبه-Repository + Business Logic ⚠️] لید + محاسبه‌ی امتیاز علاقه
│   └── shared.js                  [UI Helper] DOM builder, Share Card, Lead Box — بدون داده
├── assets/
│   ├── css/                       ثابت، بدون داده
│   └── js/utils.js                توابع کمکی خالص (بدون state)
├── games/
│   ├── personality/index.html     [UI + Business Logic ⚠️⚠️] دیتای خودروی جداگانه (CAR_TYPES) + الگوریتم امتیازدهی
│   ├── blur/index.html            [UI + کمی Business Logic] از CarIQDB می‌خونه ✅ اما thresholds هاردکد
│   ├── price/index.html           [UI + Business Logic] از CarIQDB می‌خونه ✅ اما آستانه‌ی دقت هاردکد
│   └── compare/index.html         [UI] از CarIQDB می‌خونه ✅ اما ROUNDS هاردکد
└── docs/                          مستندات موجود قبلی (ADMIN_GUIDE, GAME_SPEC, ROADMAP)
```

علامت‌گذاری:
- ✅ = این بخش از منبع داده‌ی واحد (`CarIQDB`) استفاده می‌کنه، مشکل چندمنبعی نداره
- ⚠️ = Business logic داخل UI قرار داره (باید به Service منتقل بشه)
- ⚠️⚠️ = هم Business logic داخل UI است، هم منبع داده جدا و ناهماهنگ داره

---

## ۳. Data Flow Diagram (واقعی، فایل‌به‌فایل)

### جریان «ثبت لید» (Lead Capture)
```
[کاربر فرم رو پر می‌کنه در نتیجه‌ی بازی]
        ↓
CarIQShared.buildLeadBox() → subBtn.click handler (داخل shared.js، UI layer)
        ↓
CarIQLeads.save({source, result, name, phone})   (lead-engine.js)
        ↓
  ├─ getProfile() از localStorage['cariq_profile_v1']
  ├─ calcInterestLevel(profile)  ⚠️ Business logic اینجا اجرا می‌شه، داخل همون فایل
  └─ localStorage['cariq_leads_v1'].unshift(lead)
        ↓
[پنل ادمین بعداً می‌خونه]
CarIQLeads.getAll() → مستقیم از همون مرورگر/localStorage
        ↓
renderDashboard() در admin/index.html  ⚠️ فیلتر/شمارش KPI مستقیم داخل UI
```
**مشکل:** اگه کاربر از گوشی بازی کنه و ادمین از لپ‌تاپ پنل رو باز کنه، **هیچ داده‌ای منتقل نمی‌شه**
چون هر دو مرورگر localStorage جدا از هم دارن.

### جریان «داده‌ی خودرو» (Car Data) — نمونه‌ی چندمنبعی بودن
```
مسیر ۱ (صحیح):
admin/index.html (فرم ویرایش) → CarIQDB.update() → localStorage['cariq_cars_v1']
        ↓
blur/index.html, price/index.html, compare/index.html
→ CarIQDB.getAll() → همون localStorage همون مرورگر ✅

مسیر ۲ (مشکل‌دار):
games/personality/index.html
→ CAR_TYPES (آرایه‌ی هاردکد جداگانه داخل همون فایل HTML)
→ ⚠️ هیچ ارتباطی با CarIQDB یا localStorage['cariq_cars_v1'] نداره
```
**نتیجه:** اگه ادمین یک خودرو رو در پنل حذف/ویرایش کنه، بازی personality همچنان
داده‌ی قدیمی هاردکد رو نشون می‌ده — دو منبع حقیقت داریم که از هم بی‌خبرن.

### جریان «امتیازدهی شخصیت» (Personality Scoring) — Business logic در UI
```
games/personality/index.html
  QUESTIONS[].opts[].s = {tucson:3, sportage:2, ...}  ← امتیاز دستی و هاردکد به id
        ↓
selectOption() → state.scores[carId] += value   ⚠️ منطق تصمیم‌گیری کاملاً داخل HTML
        ↓
showResult() → sorted = Object.entries(state.scores)... → برنده تعیین می‌شه
        ↓
[هیچ اتصال به car.dims واقعی در CarIQDB نیست — امتیازها کاملاً دستی‌ان]
```

---

## ۴. Entity List (قرارداد فعلی — نه ایده‌آل)

### Entity: Car
**محل تعریف فعلی:** دو جای مستقل (مشکل‌دار!)
| فیلد | نوع | توضیح |
|---|---|---|
| `id` | string (دستی، توسط ادمین تایپ می‌شه) | باید یکتا باشه ولی تضمین نداره |
| `name`, `brand`, `year`, `origin` | string | |
| `img` | string (URL) | بدون اعتبارسنجی، اگه بمیره → `onerror` fallback |
| `price_iran` | number | قیمت مرجع (میلیون تومان) |
| `price_label` | string | نمایش فارسی («۱۸ میلیارد») — **مستقل از price_iran، دستی sync می‌شه** |
| `price_opts[]` / `price_vals[]` | string[] / number[] | باید هم‌طول باشن، اعتبارسنجی خودکار نداره |
| `hints[]`, `blur_opts[]` | string[] | |
| `dims` | `{luxury,offroad,family,tech,economy,sport}` (۰-۱۰) | فقط در `car-db.js`، در بازی personality استفاده نمی‌شه |
| `personality` | `{type, emoji, desc}` | در فرم ادمین هست، در بازی personality **دوباره جدا هاردکد شده** (`CAR_TYPES`) |
| `fun_fact` | string | |

⚠️ **این Entity هنوز رسمی/یکپارچه تعریف نشده** — یک نسخه در `car-db.js` (منبع رسمی)
و یک نسخه‌ی موازی و ناهماهنگ در `personality/index.html` (`CAR_TYPES`) وجود داره.

### Entity: Lead
**محل تعریف:** `lead-engine.js`
| فیلد | نوع |
|---|---|
| `id` | string (از `crypto.randomUUID()` — این بخش درسته ✅) |
| `at` | timestamp (number) |
| `source` | string (اسم بازی) |
| `game_result`, `score` | string / number |
| `contact.name`, `contact.phone` | string |
| `profile` | snapshot از پروفایل لحظه‌ی ثبت (نسخه‌ی کپی‌شده، نه رفرنس زنده) |
| `utm.source/medium/campaign` | string |

### Entity: Profile (رفتار کاربر، تجمیعی)
**محل تعریف:** `lead-engine.js` → `localStorage['cariq_profile_v1']`
فیلدهایی که هر بازی جدا اضافه می‌کنه (بدون schema رسمی، هرکی هرچی خواسته اضافه کرده):
`budget`, `drive`, `focus`, `expertise`, `games_played`, `interest_level`,
`persResult`, `persCar`, `blurScore`, `blurAccuracy`, `priceScore`, `priceAccuracy`,
`compareScore`, `compareAccuracy`

⚠️ این Entity **schema رسمی نداره** — هر بازی که ساختم (blur/price/compare) اسم فیلد
دلخواه خودش رو به پروفایل اضافه می‌کنه (`mergeProfile`). هیچ‌جا مستند نیست چه فیلدهایی
باید وجود داشته باشن.

### Entity: Config
**محل تعریف:** `config.js` — تک‌نسخه، مشکل چندمنبعی نداره ✅
اما شامل مقادیر حساس هاردکد (`admin_pass_hash: 'cariq2025'`) که در سورس کد قابل مشاهده‌ست.

---

## ۵. State List (جایی که وضعیت نگه‌داری می‌شه)

| State | محل | نوع پایداری | ریسک |
|---|---|---|---|
| `state` (هر بازی: blur/price/compare/personality) | متغیر JS در حافظه‌ی تب | فقط تا رفرش صفحه | با بستن تب از بین می‌ره (عمدی و درسته، چون بازیه) |
| Car DB | `localStorage['cariq_cars_v1']` | تا پاک شدن کش مرورگر | فقط روی یک دستگاه |
| Config | `localStorage['cariq_config_v1']` | تا پاک شدن کش | فقط روی یک دستگاه — یعنی تنظیمات ادمین از یک مرورگر خاص می‌مونه |
| Leads | `localStorage['cariq_leads_v1']` | تا پاک شدن کش | **بحرانی:** لیدهای واقعی مشتری فقط روی مرورگر خودشونه، نه پیش ادمین |
| Profile | `localStorage['cariq_profile_v1']` | تا پاک شدن کش | |
| Session ادمین | `sessionStorage['cariq_admin_ok']` | فقط تا بسته شدن تب | رمز عبور با plain-text مقایسه می‌شه (`pass === cfg.admin_pass_hash`) — اسمش hash است ولی هش نیست |

---

## ۶. API List (فعلی — همه Mock/Local، صفر HTTP واقعی)

هیچ endpoint واقعی HTTP در پروژه وجود نداره. معادل‌های Mock فعلی:

| عملیات | تابع فعلی (sync، بدون شبکه) | معادل API آینده (پیشنهادی) |
|---|---|---|
| گرفتن لیست خودرو | `CarIQDB.getAll()` | `GET /api/cars` |
| افزودن خودرو | `CarIQDB.add(car)` | `POST /api/cars` |
| ویرایش خودرو | `CarIQDB.update(id, patch)` | `PATCH /api/cars/:id` |
| حذف خودرو | `CarIQDB.remove(id)` | `DELETE /api/cars/:id` |
| ثبت لید | `CarIQLeads.save(data)` | `POST /api/leads` |
| گرفتن لیدها | `CarIQLeads.getAll()` | `GET /api/leads` |
| گرفتن/ذخیره‌ی تنظیمات | `CarIQConfig.get()/save()` | `GET/PUT /api/config` |
| لاگین ادمین | مقایسه‌ی plain-text در `admin/index.html` | `POST /api/auth/login` (با هش واقعی + session/JWT) |

---

## ۷. Database Mapping (اگه امروز به Supabase/Postgres مهاجرت کنیم)

| localStorage key فعلی | جدول پیشنهادی آینده |
|---|---|
| `cariq_cars_v1` | `cars` |
| `cariq_config_v1` | `app_config` (تک‌ردیفی یا key-value) |
| `cariq_leads_v1` | `leads` |
| `cariq_profile_v1` | `user_profiles` (باید به `session_id` یا `user_id` واقعی وصل بشه — الان اصلاً چنین شناسه‌ای نداریم) |

⚠️ **نکته‌ی مهم:** پروفایل کاربر الان به هیچ شناسه‌ی پایداری (نه cookie، نه user id) وصل نیست.
فقط در `localStorage` همون مرورگره. برای مهاجرت به دیتابیس واقعی، اول باید یک مفهوم
"session" یا "visitor id" واقعی معرفی کنیم، وگرنه نمی‌دونیم کدوم لید مال کدوم پروفایله.

---

## ۸. Temporary Items List (لیست کامل موقتی‌ها — برای جستجوی بعدی)

### 🔴 LocalStorage به‌جای Database
- `core/car-db.js` — تابع `load()`/`save()` → `localStorage['cariq_cars_v1']`
- `core/config.js` — تابع `load()`/`save()` → `localStorage['cariq_config_v1']`
- `core/lead-engine.js` — چند نقطه → `localStorage['cariq_leads_v1']`, `localStorage['cariq_profile_v1']`
- `admin/index.html` — `sessionStorage['cariq_admin_ok']` برای session لاگین

### 🔴 Hardcoded Data
- `core/car-db.js` → `DEFAULTS` (۱۰ خودروی کامل با تمام فیلدها)
- `core/config.js` → `DEFAULTS` (شماره تلفن، تلگرام، **رمز ادمین** به‌صورت plain-text)
- `games/personality/index.html` → `CAR_TYPES` (نسخه‌ی دوم و ناهماهنگ داده‌ی خودرو + امتیازهای دستی `opt.s`)

### 🟡 Business Logic داخل UI (باید به Service منتقل بشه)
- `games/personality/index.html` → `selectOption()`, `showResult()` — الگوریتم تعیین‌کننده‌ی شخصیت
- `core/lead-engine.js` → `calcInterestLevel()` — تصمیم‌گیری hot/warm/cold (فایلش core است ولی از UI مستقیم صدا زده می‌شه بدون validation سمت سرور)
- `admin/index.html` → `renderDashboard()` — محاسبه‌ی KPI مستقیم داخل تابع رندر

### 🟡 Magic Numbers / مقادیر ثابت (باید از Config خونده بشن)
- `games/blur/index.html`: `MAX_BLUR=22, MIN_BLUR=1, ROUNDS=6`, کاهش بلور `-8` در هر hint
- `games/price/index.html`: `ROUNDS=6`, آستانه‌ی دقیق `diffPct<=0.08`, آستانه‌ی نزدیک `diffPct<=0.2`, امتیازهای `50/25/0`
- `games/compare/index.html`: `ROUNDS=8`, امتیاز هر جواب درست `10`، آستانه‌ی فاصله‌ی قیمت برای انتخاب جفت `0.1`
- `games/personality/index.html`: تعداد سوالات (۶، ضمنی از طول آرایه)

### 🟡 IDهای دستی (نه auto-generate)
- `admin/index.html` → فیلد `car-id` در مودال افزودن خودرو، دستی توسط ادمین تایپ می‌شه، فقط regex چک می‌شه نه یکتایی واقعی در دیتابیس

### 🟢 قابل قبول برای MVP (نیازی به تغییر فوری نیست)
- `core/shared.js` → `uuid()` از `crypto.randomUUID()` واقعی استفاده می‌کنه ✅
- محاسبات آماری بازی‌ها (`ok`, `bad`, `score`) از آرایه‌ی state محاسبه می‌شن، نه از شمارش DOM ✅

---

## ۹. Migration Plan (پیش‌نویس اولیه — جزئیات در گام‌های بعدی)

این بخش فقط چارچوب کلیه؛ جزئیات اجرایی رو در مراحل بعدی (گام ۲ به بعد) دقیق می‌کنیم.

1. **معرفی Repository Pattern بدون تغییر رفتار** — توابع `CarIQDB`, `CarIQLeads`, `CarIQConfig`
   همچنان از localStorage استفاده کنن، ولی async بشن (`async function getAll()`)
   تا صداکننده‌ها از همین حالا با الگوی `await` بنویسیم.
2. **یکسان‌سازی منبع داده‌ی خودرو** — حذف `CAR_TYPES` از `personality/index.html`،
   جایگزینی با `CarIQDB.getAll()` + الگوریتم شباهت بر پایه‌ی `dims` (توافق‌شده در گفتگوی قبلی).
3. **استخراج Business Logic به Service لایه‌ی جدا** — `lead-scoring-service.js` برای
   `calcInterestLevel`، و یک `personality-matcher-service.js` برای الگوریتم شخصیت.
4. **جایگزینی localStorage با API واقعی** — فقط لایه‌ی Repository عوض می‌شه
   (fetch به‌جای localStorage.getItem)، بقیه‌ی پروژه دست‌نخورده می‌مونه اگه گام ۱ درست انجام شده باشه.
5. **معرفی هویت کاربر (session/visitor id)** — پیش‌نیاز اینکه پروفایل/لید به یک شناسه‌ی
   پایدار وصل بشه، نه فقط localStorage محلی.
6. **هش واقعی رمز ادمین + احراز هویت سمت سرور** — رفع مقایسه‌ی plain-text فعلی.

---

## جمع‌بندی یک‌خطی

پروژه در حال حاضر یک **UI با ظاهر کامل و منطق تجاری مخفی‌شده داخل همون UI** است،
روی یک "دیتابیس" که در واقع فقط حافظه‌ی محلی مرورگره. برای رفتن به نسخه‌ی واقعی،
مسیر روشنه (بخش ۹) و چون از همین امروز مستند شده، لازم نیست کل پروژه دوباره خونده بشه —
کافیه لیست بخش ۸ رو یکی‌یکی دنبال کنیم.

```

</FILE>

---

<FILE path="docs/ROADMAP.md" tokens="807" lines="141">

```md
# CarIQ — معماری ماژولار پلتفرم بازی‌های خودرو
> نسخه ۱.۰ | رویکرد: Component-Based + Domain-Driven

---

## ساختار دایرکتوری

```
cariq/
├── index.html                    ← لابی اصلی (انتخاب بازی)
├── admin/
│   └── index.html                ← پنل مدیریت کامل
├── games/
│   ├── blur/index.html           ← بازی ۱: ماشین از پشت مه
│   ├── speed/index.html          ← بازی ۲: اسپید راند
│   ├── price/index.html          ← بازی ۳: حدس قیمت
│   ├── personality/index.html    ← بازی ۴: تست شخصیت
│   ├── wheel/index.html          ← بازی ۵: چرخ شانس
│   └── compare/index.html        ← بازی ۶: کدوم گرون‌تره؟
├── core/
│   ├── config.js                 ← تنظیمات مرکزی (ویرایش از ادمین)
│   ├── shared.js                 ← توابع مشترک + Router
│   ├── lead-engine.js            ← موتور جمع‌آوری لید + پروفایل
│   └── car-db.js                 ← دیتابیس خودروها
├── assets/
│   ├── css/
│   │   ├── tokens.css            ← CSS Variables
│   │   ├── base.css              ← Reset + Layout
│   │   └── components.css        ← UI Kit مشترک
│   └── js/
│       └── utils.js              ← ابزارهای کمکی
└── docs/
    ├── ROADMAP.md                ← این فایل
    ├── GAME_SPEC.md              ← قرارداد ساخت بازی جدید
    └── ADMIN_GUIDE.md            ← راهنمای ادمین
```

---

## فازبندی پروژه

### فاز ۰ — معماری پایه ✅
- ساختار دایرکتوری
- مستندات (ROADMAP، GAME_SPEC، ADMIN_GUIDE)
- assets/css (tokens، base، components)
- core/config.js
- core/shared.js
- core/lead-engine.js
- core/car-db.js

### فاز ۱ — صفحه اصلی + ادمین 🔄
- index.html (لابی)
- admin/index.html
  - مدیریت تنظیمات تماس (تلگرام، تلفن)
  - مدیریت بازی‌های فعال
  - مشاهده و صادرات لیدها
  - ویرایش دیتابیس خودروها

### فاز ۲ — بازی‌ها (ترتیب اولویت)

| # | بازی | وضعیت | وایرال‌پذیری |
|---|------|--------|--------------|
| ۱ | 🧬 تست شخصیت | 📋 آماده | ⭐⭐⭐⭐⭐ |
| ۲ | 🔍 ماشین از پشت مه | 📋 آماده | ⭐⭐⭐⭐⭐ |
| ۳ | 💰 حدس قیمت | 📋 آماده | ⭐⭐⭐⭐ |
| ۴ | ⚡ اسپید راند | 📋 آماده | ⭐⭐⭐⭐ |
| ۵ | 🎡 چرخ شانس | 📋 آماده | ⭐⭐⭐ |
| ۶ | ⚖️ کدوم گرون‌تره؟ | 📋 آماده | ⭐⭐⭐ |

---

## قرارداد بازی (Game Contract)

```javascript
// هر بازی باید این دو شیء را expose کند:

window.GAME_META = {
  id: 'blur',
  name: 'ماشین از پشت مه',
  icon: '🔍',
  rounds: 6,
  estimatedTime: '۳ دقیقه',
  viralScore: 9,    // 1-10
  leadQuality: 8,   // 1-10
};

window.GAME_API = {
  init(container, config) {},
  reset() {},
  getResult() {
    return { score, pct, summary, profileData };
  },
  destroy() {},
};
```

---

## مدل داده‌ها

### Lead
```json
{
  "id": "uuid",
  "at": 1700000000000,
  "source": "personality",
  "game_result": "لندکروزر",
  "score": 85,
  "profile": { "budget": "high", "drive_style": "offroad" },
  "contact": { "name": "علی", "phone": "09171234567" },
  "utm": { "source": "instagram" }
}
```

### Config
```json
{
  "brand_name": "CarIQ",
  "contact": {
    "telegram": "@pouriabh",
    "phone": "09172079245"
  },
  "games_enabled": ["blur", "personality", "price"],
  "admin_pass_hash": "..."
}
```

---

## قابلیت توسعه در صنایع دیگر

| صنعت | تغییر لازم |
|------|------------|
| 🏠 مسکن | car-db.js → property-db.js |
| 📱 موبایل | car-db.js → phone-db.js |
| ✈️ توریسم | car-db.js → tour-db.js |
| 👗 مد | car-db.js → fashion-db.js |

---
*CarIQ Platform v1.0*

```

</FILE>

---

<FILE path="games/blur/index.html" tokens="3359" lines="375">

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
  <meta name="description" content="ماشین از پشت مه — حدس بزن قبل از واضح‌شدن! | CarIQ"/>
  <title>ماشین از پشت مه | CarIQ</title>
  <link rel="stylesheet" href="../../assets/css/tokens.css"/>
  <link rel="stylesheet" href="../../assets/css/base.css"/>
  <link rel="stylesheet" href="../../assets/css/components.css"/>
  <style>
    /* ── Intro Screen ── */
    .intro {
      min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 20px; text-align: center;
    }
    .intro-icon { font-size: 72px; margin-bottom: 16px; animation: pop .5s var(--ease-spring); }
    .intro-title {
      font-size: 26px; font-weight: 900; margin-bottom: 8px;
      background: linear-gradient(135deg, var(--c-gold), var(--c-accent));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .intro-sub { font-size: 14px; color: var(--c-muted); line-height: 1.8; margin-bottom: 28px; max-width: 340px; }
    .intro-chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
    .intro-meta { font-size: 12px; color: var(--c-muted2); margin-top: 14px; display: flex; gap: 16px; justify-content: center; }

    /* ── Blur Stage ── */
    .blur-stage {
      position: relative; aspect-ratio: 16/9;
      background: var(--c-bg3); border-radius: var(--r);
      overflow: hidden; border: 1px solid var(--c-border);
      margin-bottom: 12px;
    }
    .blur-stage img { width: 100%; height: 100%; object-fit: cover; transition: filter .7s ease; }
    .blur-stage-top {
      position: absolute; top: 10px; right: 10px; left: 10px;
      display: flex; justify-content: space-between; align-items: center;
      pointer-events: none;
    }
    .blur-stage-bottom {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 20px 12px 10px;
      background: linear-gradient(to top, rgba(44,24,16,0.6), transparent);
      font-size: 11px; color: rgba(245,240,232,0.8); text-align: center;
    }

    /* ── Dots ── */
    .dots-row { display: flex; gap: 5px; justify-content: center; margin-bottom: 12px; }
    .dot-step { height: 4px; border-radius: 4px; flex: 1; max-width: 46px; background: var(--c-bg3); transition: all .35s; }
    .dot-step.done { background: var(--c-gold2); }
    .dot-step.now  { background: var(--c-gold3); box-shadow: 0 0 6px var(--c-gold-glow); }

    /* ── Hint button ── */
    .hint-btn {
      width: 100%; padding: 11px;
      background: transparent; border: 1px dashed var(--c-border2);
      border-radius: var(--r-sm); color: var(--c-muted);
      font-size: 12px; font-weight: 600; font-family: inherit;
      transition: all .18s; margin-bottom: 8px; cursor: pointer;
    }
    .hint-btn:not([disabled]):hover { border-color: var(--c-accent2); color: var(--c-accent); }
    .hint-btn[disabled] { opacity: .5; cursor: default; }

    /* ── Options grid (reusing .opt-grid from components.css) ── */
    .opt-grid { margin-bottom: 10px; }

    /* ── Result screen reuse ── */
    .result-wrap { padding: 0 0 40px; }
  </style>
</head>
<body>
<div class="app" id="app">

  <!-- INTRO -->
  <div id="screen-intro" class="screen active">
    <div class="intro">
      <div class="intro-icon">🔍</div>
      <h1 class="intro-title">ماشین از پشت مه</h1>
      <p class="intro-sub">
        ۶ ماشین پشت مه قایم شدن — هرچی زودتر حدس بزنی امتیاز بیشتری می‌گیری!<br>
        می‌تونی هم واضح‌ترش کنی، هم امتیازت رو ببازی 😉
      </p>
      <div class="intro-chips">
        <span class="pill pill-gold">🔥 محبوب</span>
        <span class="pill pill-accent">👁️ دقت و سرعت</span>
        <span class="pill pill-muted">⏱️ ۳ دقیقه</span>
      </div>
      <button class="btn btn-gold" id="start-btn" style="max-width:280px;font-size:16px;padding:16px">
        🚀 شروع بازی
      </button>
      <div class="intro-meta">
        <span>🎯 ۶ دور</span>
        <span>🏆 امتیاز بیشتر با حدس سریع‌تر</span>
      </div>
    </div>
  </div>

  <!-- GAME -->
  <div id="screen-game" class="screen">
    <div class="game-header" id="game-header"></div>
    <div id="game-content"></div>
  </div>

  <!-- RESULT -->
  <div id="screen-result" class="screen">
    <div class="result-wrap" id="result-content"></div>
  </div>

</div>

<script src="../../core/config.js"></script>
<script src="../../core/car-db.js"></script>
<script src="../../core/shared.js"></script>
<script src="../../core/lead-engine.js"></script>
<script src="../../assets/js/utils.js"></script>
<script>
/* ════════════════════════════════════════
   GAME META
   ════════════════════════════════════════ */
window.GAME_META = {
  id: 'blur',
  name: 'ماشین از پشت مه',
  icon: '🔍',
  rounds: 6,
  estimatedTime: '۳ دقیقه',
  viralScore: 9,
  leadQuality: 8,
};

const MAX_BLUR = 22, MIN_BLUR = 1, ROUNDS = 6;

/* ════════════════════════════════════════
   STATE
   ════════════════════════════════════════ */
let state = {
  deck: [],
  idx: 0,
  score: 0,
  blur: MAX_BLUR,
  answered: false,
  hints: 0,
  results: [],
  opts: null,
};

function resetState() {
  const all = CarIQDB.getAll();
  const deck = CarIQShared.shuffle(all).slice(0, ROUNDS);
  state = { deck, idx: 0, score: 0, blur: MAX_BLUR, answered: false, hints: 0, results: [], opts: null };
}

function pickOpts(car) {
  const all = CarIQDB.getAll();
  const others = CarIQShared.pick(all.filter(c => c.id !== car.id), 3);
  return CarIQShared.shuffle([car, ...others]);
}

/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-btn').addEventListener('click', startGame);
  CarIQLeads.trackGameStart('blur');
});

function startGame() {
  resetState();
  showScreen('screen-game');
  renderRound();
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════════
   ROUND RENDER
   ════════════════════════════════════════ */
function renderRound() {
  if (state.idx >= state.deck.length) return showResult();

  const car = state.deck[state.idx];
  if (!state.opts) state.opts = pickOpts(car);

  // header
  const hRoot = document.getElementById('game-header');
  hRoot.innerHTML = '';
  const { header, score } = CarIQShared.buildGameHeader({
    title: '🔍 ماشین از پشت مه',
    sub: `دور ${state.idx + 1} از ${ROUNDS}`,
    onBack: () => { if (confirm('از بازی خارج بشی؟')) window.location.href = '../../index.html'; },
  });
  score.textContent = `⭐ ${state.score}`;
  hRoot.appendChild(header);

  // content
  const root = document.getElementById('game-content');
  root.innerHTML = '';

  root.appendChild(CarIQShared.buildProgress(state.idx, ROUNDS));

  // HUD
  const ok = state.results.filter(r => r.ok).length;
  const bad = state.results.filter(r => !r.ok).length;
  root.appendChild(CarIQShared.el('div', { class: 'hud' },
    CarIQShared.el('div', { class: 'hud-item ok' },
      CarIQShared.el('div', { class: 'hv' }, String(ok)),
      CarIQShared.el('div', { class: 'hl' }, 'درست')),
    CarIQShared.el('div', { class: 'hud-item bad' },
      CarIQShared.el('div', { class: 'hv' }, String(bad)),
      CarIQShared.el('div', { class: 'hl' }, 'اشتباه')),
    CarIQShared.el('div', { class: 'hud-item pts' },
      CarIQShared.el('div', { class: 'hv' }, String(state.score)),
      CarIQShared.el('div', { class: 'hl' }, 'امتیاز')),
  ));

  // dots
  const dotsRow = CarIQShared.el('div', { class: 'dots-row' });
  for (let i = 0; i < ROUNDS; i++) {
    dotsRow.appendChild(CarIQShared.el('div', {
      class: 'dot-step' + (i < state.idx ? ' done' : i === state.idx ? ' now' : ''),
    }));
  }
  root.appendChild(dotsRow);

  // stage
  const stage = CarIQShared.el('div', { class: 'blur-stage pop-in' });
  const img = CarIQShared.el('img', {
    src: car.img, alt: car.name,
    style: { filter: `blur(${state.blur}px) saturate(${state.blur > 12 ? 0.5 : 0.85})` },
  });
  img.onerror = () => { img.src = CarIQShared.svgPlaceholder(car.name); };
  const top = CarIQShared.el('div', { class: 'blur-stage-top' },
    CarIQShared.el('span', { class: 'pill pill-muted' }, car.tag || car.origin || ''),
    CarIQShared.el('span', { class: 'pill pill-gold' }, `⭐ ${state.score}`),
  );
  stage.append(img, top);
  if (state.blur <= MIN_BLUR) {
    stage.appendChild(CarIQShared.el('div', { class: 'blur-stage-bottom' }, 'تصویر واضحه — الان می‌دونی؟'));
  }
  root.appendChild(stage);

  // options
  const grid = CarIQShared.el('div', { class: 'opt-grid' });
  state.opts.forEach(o => {
    const btn = CarIQShared.el('button', { class: 'opt-btn' }, o.name);
    btn.addEventListener('click', () => answer(o, btn, grid, car));
    grid.appendChild(btn);
  });
  root.appendChild(grid);

  // hint
  const hintPts = state.hints === 0 ? 50 : state.hints === 1 ? 35 : state.hints === 2 ? 20 : 10;
  const hintBtn = CarIQShared.el('button', { class: 'hint-btn' },
    state.blur > MIN_BLUR
      ? `👁️ واضح‌تر کن — امتیازت می‌شه ${hintPts}`
      : '✅ تصویر کاملاً واضحه'
  );
  if (state.blur <= MIN_BLUR || state.answered) hintBtn.disabled = true;
  hintBtn.addEventListener('click', () => {
    state.blur = Math.max(MIN_BLUR, state.blur - 8);
    state.hints++;
    renderRound();
  });
  root.appendChild(hintBtn);
}

/* ════════════════════════════════════════
   ANSWER
   ════════════════════════════════════════ */
function answer(picked, btn, grid, car) {
  if (state.answered) return;
  state.answered = true;

  const ok = picked.id === car.id;
  const pts = ok ? (state.hints === 0 ? 50 : state.hints === 1 ? 35 : state.hints === 2 ? 20 : 10) : 0;
  state.score += pts;
  state.results.push({ name: car.name, ok, pts });

  [...grid.children].forEach(b => {
    b.disabled = true;
    if (b.textContent === car.name) b.classList.add('correct');
    else if (b === btn && !ok) b.classList.add('wrong');
  });

  const img = document.querySelector('.blur-stage img');
  if (img) { img.style.transition = 'filter .8s ease'; img.style.filter = 'none'; }

  if (ok) CarIQShared.showScoreFly(pts);

  setTimeout(() => {
    state.idx++;
    state.blur = MAX_BLUR;
    state.answered = false;
    state.hints = 0;
    state.opts = null;
    renderRound();
  }, 1600);
}

/* ════════════════════════════════════════
   RESULT
   ════════════════════════════════════════ */
function showResult() {
  const ok = state.results.filter(r => r.ok).length;
  const pct = Math.round((ok / ROUNDS) * 100);

  let emoji, rank, rankCls;
  if (pct >= 83) { emoji = '🏆'; rank = 'ماشین‌شناس افسانه‌ای!'; rankCls = 'pill-gold'; }
  else if (pct >= 50) { emoji = '🔥'; rank = 'خبره ماشین!'; rankCls = 'pill-green'; }
  else { emoji = '😅'; rank = 'تازه‌کاری — تمرین کن!'; rankCls = 'pill-muted'; }

  CarIQLeads.trackGameEnd('blur', `${ok}/${ROUNDS}`);
  CarIQLeads.mergeProfile({ blurScore: state.score, blurAccuracy: pct });

  showScreen('screen-result');
  const root = document.getElementById('result-content');
  root.innerHTML = '';

  const hero = CarIQShared.el('div', { class: 'result-hero pop-in' });
  hero.appendChild(CarIQShared.buildResultRing(pct));
  hero.appendChild(CarIQShared.el('div', { class: 'result-title' }, `${emoji} ${state.score} امتیاز`));
  hero.appendChild(CarIQShared.el('span', { class: 'pill ' + rankCls, style: { marginBottom: '10px', display: 'inline-flex' } }, rank));
  hero.appendChild(CarIQShared.el('div', { class: 'result-sub' }, `${ok} از ${ROUNDS} ماشین رو درست شناختی`));
  hero.appendChild(CarIQShared.buildStatRow([
    [ok, 'درست'],
    [ROUNDS - ok, 'اشتباه'],
    [state.score, 'امتیاز کل'],
  ]));

  // chips per round
  const chips = CarIQShared.el('div', { class: 'score-chips' });
  state.results.forEach((r, i) => {
    chips.appendChild(CarIQShared.el('span', { class: 'chip ' + (r.ok ? 'chip-ok' : 'chip-no') },
      `${i + 1}. ${r.ok ? '+' + r.pts : '✗'}`));
  });
  hero.appendChild(chips);

  root.appendChild(hero);

  // play again
  const pa = CarIQShared.el('button', { class: 'btn btn-outline mt12' }, '🔄 دوباره بازی کن');
  pa.addEventListener('click', () => { resetState(); showScreen('screen-game'); renderRound(); });
  root.appendChild(pa);

  // lead box
  const lastCarImg = state.deck.length ? state.deck[state.deck.length - 1].img : '';
  root.appendChild(CarIQShared.buildLeadBox({
    source: 'blur',
    resultText: `${ok}/${ROUNDS} — ${state.score}pts`,
    ctaMsg: `سلام! تو بازی «ماشین از پشت مه» ${ok} از ${ROUNDS} رو درست زدم و ${state.score} امتیاز گرفتم. می‌خوام درباره واردات مشورت کنم 🚗`,
    sharePayload: {
      emoji: emoji,
      imgSrc: lastCarImg,
      colorFrom: '#2c1810', colorTo: '#4a3020',
      kicker: 'نتیجه‌ی بازی «ماشین از پشت مه»',
      title: `${state.score} امتیاز`,
      subtitle: rank,
      desc: `${ok} از ${ROUNDS} ماشین رو درست شناختم`,
      stats: [
        { val: ok, label: 'درست' },
        { val: ROUNDS - ok, label: 'اشتباه' },
      ],
      text: `تو بازی «ماشین از پشت مه» ${state.score} امتیاز گرفتم و ${ok} از ${ROUNDS} ماشین رو درست شناختم! تو هم امتحان کن 🚗`,
    },
  }));
}
</script>
</body>
</html>

```

</FILE>

---

<FILE path="games/compare/index.html" tokens="3821" lines="400">

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
  <meta name="description" content="کدوم گرون‌تره؟ — حدس بزن کدوم ماشین قیمت بالاتری داره | CarIQ"/>
  <title>کدوم گرون‌تره؟ | CarIQ</title>
  <link rel="stylesheet" href="../../assets/css/tokens.css"/>
  <link rel="stylesheet" href="../../assets/css/base.css"/>
  <link rel="stylesheet" href="../../assets/css/components.css"/>
  <style>
    /* ── Intro Screen ── */
    .intro {
      min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 20px; text-align: center;
    }
    .intro-icon { font-size: 72px; margin-bottom: 16px; animation: pop .5s var(--ease-spring); }
    .intro-title {
      font-size: 26px; font-weight: 900; margin-bottom: 8px;
      background: linear-gradient(135deg, var(--c-gold), var(--c-accent));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .intro-sub { font-size: 14px; color: var(--c-muted); line-height: 1.8; margin-bottom: 28px; max-width: 340px; }
    .intro-chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
    .intro-meta { font-size: 12px; color: var(--c-muted2); margin-top: 14px; display: flex; gap: 16px; justify-content: center; }

    /* ── Dots ── */
    .dots-row { display: flex; gap: 5px; justify-content: center; margin-bottom: 12px; }
    .dot-step { height: 4px; border-radius: 4px; flex: 1; max-width: 46px; background: var(--c-bg3); transition: all .35s; }
    .dot-step.done { background: var(--c-gold2); }
    .dot-step.now  { background: var(--c-gold3); box-shadow: 0 0 6px var(--c-gold-glow); }

    /* ── VS layout ── */
    .compare-vs {
      display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px;
      align-items: center; margin-bottom: 12px;
    }
    .compare-card {
      background: var(--c-card); border: 2px solid var(--c-border);
      border-radius: var(--r); overflow: hidden;
      cursor: pointer; transition: all .2s var(--ease-out);
    }
    .compare-card:not(.locked):hover { transform: translateY(-3px); box-shadow: var(--shadow-gold); border-color: var(--c-gold2); }
    .compare-card img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
    .compare-card-body { padding: 10px; }
    .compare-car-name { font-size: 12px; font-weight: 800; color: var(--c-text); }
    .compare-car-tag { font-size: 10px; color: var(--c-muted); margin-top: 1px; }
    .compare-card.correct-pick { border-color: var(--c-green); background: rgba(45,122,79,0.06); }
    .compare-card.wrong-pick   { border-color: var(--c-red);   background: rgba(184,50,50,0.06); }
    .compare-card.locked { cursor: default; pointer-events: none; }

    .vs-badge {
      width: 36px; height: 36px; border-radius: 50%;
      background: linear-gradient(135deg, var(--c-gold2), var(--c-gold));
      color: var(--c-on-gold); font-weight: 900; font-size: 12px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: var(--shadow-gold); flex-shrink: 0;
    }

    .compare-hint { text-align: center; font-size: 12px; color: var(--c-muted); margin-bottom: 12px; }

    /* ── Feedback ── */
    .compare-feedback {
      text-align: center; padding: 12px; border-radius: var(--r-sm);
      font-size: 14px; font-weight: 700; margin-bottom: 10px;
    }
    .compare-feedback.ok  { background: rgba(45,122,79,0.1);  border: 1px solid rgba(45,122,79,0.25); color: var(--c-green); }
    .compare-feedback.bad { background: rgba(184,50,50,0.08); border: 1px solid rgba(184,50,50,0.2);  color: var(--c-red); }

    /* ── Price reveal ── */
    .compare-price-reveal { display: flex; gap: 8px; margin-bottom: 12px; }
    .price-reveal-box {
      flex: 1; background: var(--c-card2); border: 1px solid var(--c-border);
      border-radius: var(--r-sm); padding: 10px; text-align: center;
    }
    .price-reveal-box .pr-val { font-size: 14px; font-weight: 900; color: var(--c-gold); }
    .price-reveal-box .pr-lbl { font-size: 10px; color: var(--c-muted); margin-top: 2px; }
    .price-reveal-box.winner { border-color: var(--c-green); background: rgba(45,122,79,0.05); }
    .price-reveal-box.winner .pr-val { color: var(--c-green); }

    .result-wrap { padding: 0 0 40px; }

    @media(max-width:360px) {
      .compare-vs { gap: 6px; }
    }
  </style>
</head>
<body>
<div class="app" id="app">

  <!-- INTRO -->
  <div id="screen-intro" class="screen active">
    <div class="intro">
      <div class="intro-icon">⚖️</div>
      <h1 class="intro-title">کدوم گرون‌تره؟</h1>
      <p class="intro-sub">
        ۸ دور — دو ماشین رو می‌بینی، حدس بزن کدوم قیمتش بالاتره<br>
        بازار خودرو رو چقدر می‌شناسی؟
      </p>
      <div class="intro-chips">
        <span class="pill pill-gold">⚡ سریع</span>
        <span class="pill pill-accent">🧠 چالشی</span>
        <span class="pill pill-muted">⏱️ ۲ دقیقه</span>
      </div>
      <button class="btn btn-gold" id="start-btn" style="max-width:280px;font-size:16px;padding:16px">
        🚀 شروع بازی
      </button>
      <div class="intro-meta">
        <span>🎯 ۸ دور</span>
        <span>🏆 هر جواب درست ۱۰ امتیاز</span>
      </div>
    </div>
  </div>

  <!-- GAME -->
  <div id="screen-game" class="screen">
    <div class="game-header" id="game-header"></div>
    <div id="game-content"></div>
  </div>

  <!-- RESULT -->
  <div id="screen-result" class="screen">
    <div class="result-wrap" id="result-content"></div>
  </div>

</div>

<script src="../../core/config.js"></script>
<script src="../../core/car-db.js"></script>
<script src="../../core/shared.js"></script>
<script src="../../core/lead-engine.js"></script>
<script src="../../assets/js/utils.js"></script>
<script>
/* ════════════════════════════════════════
   GAME META
   ════════════════════════════════════════ */
window.GAME_META = {
  id: 'compare',
  name: 'کدوم گرون‌تره؟',
  icon: '⚖️',
  rounds: 8,
  estimatedTime: '۲ دقیقه',
  viralScore: 7,
  leadQuality: 6,
};

const ROUNDS = 8;

/* ════════════════════════════════════════
   STATE
   ════════════════════════════════════════ */
let state = {
  idx: 0,
  score: 0,
  results: [],
  answered: false,
  pair: null,
};

function carPrice(car) {
  if (car.price_iran) return car.price_iran;
  if (Array.isArray(car.price_vals) && car.price_vals.length) {
    return Math.round(car.price_vals.reduce((s, v) => s + v, 0) / car.price_vals.length);
  }
  return 0;
}

function resetState() {
  state = { idx: 0, score: 0, results: [], answered: false, pair: null };
}

function pickPair() {
  const all = CarIQDB.getAll().filter(c => carPrice(c) > 0);
  const shuffled = CarIQShared.shuffle(all);
  // avoid pairs with (near-)identical price so there's always a clear answer
  for (let i = 0; i < shuffled.length; i++) {
    for (let j = i + 1; j < shuffled.length; j++) {
      const a = shuffled[i], b = shuffled[j];
      const pa = carPrice(a), pb = carPrice(b);
      if (Math.abs(pa - pb) / Math.max(pa, pb) > 0.1) return [a, b];
    }
  }
  return [shuffled[0], shuffled[1]];
}

/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-btn').addEventListener('click', startGame);
  CarIQLeads.trackGameStart('compare');
});

function startGame() {
  resetState();
  const testPool = CarIQDB.getAll().filter(c => carPrice(c) > 0);
  if (testPool.length < 2) {
    alert('برای این بازی حداقل به ۲ خودرو با قیمت ثبت‌شده نیاز داریم. لطفاً از پنل ادمین قیمت‌ها رو تکمیل کن.');
    return;
  }
  showScreen('screen-game');
  renderRound();
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════════
   ROUND RENDER
   ════════════════════════════════════════ */
function renderRound() {
  if (state.idx >= ROUNDS) return showResult();
  if (!state.pair) state.pair = pickPair();
  const [a, b] = state.pair;

  // header
  const hRoot = document.getElementById('game-header');
  hRoot.innerHTML = '';
  const { header, score } = CarIQShared.buildGameHeader({
    title: '⚖️ کدوم گرون‌تره؟',
    sub: `دور ${state.idx + 1} از ${ROUNDS}`,
    onBack: () => { if (confirm('از بازی خارج بشی؟')) window.location.href = '../../index.html'; },
  });
  score.textContent = `⭐ ${state.score}`;
  hRoot.appendChild(header);

  // content
  const root = document.getElementById('game-content');
  root.innerHTML = '';

  root.appendChild(CarIQShared.buildProgress(state.idx, ROUNDS));

  // HUD
  const ok = state.results.filter(r => r.ok).length;
  const bad = state.results.filter(r => !r.ok).length;
  root.appendChild(CarIQShared.el('div', { class: 'hud' },
    CarIQShared.el('div', { class: 'hud-item ok' },
      CarIQShared.el('div', { class: 'hv' }, String(ok)),
      CarIQShared.el('div', { class: 'hl' }, 'درست')),
    CarIQShared.el('div', { class: 'hud-item bad' },
      CarIQShared.el('div', { class: 'hv' }, String(bad)),
      CarIQShared.el('div', { class: 'hl' }, 'اشتباه')),
    CarIQShared.el('div', { class: 'hud-item pts' },
      CarIQShared.el('div', { class: 'hv' }, String(state.score)),
      CarIQShared.el('div', { class: 'hl' }, 'امتیاز')),
  ));

  // dots
  const dotsRow = CarIQShared.el('div', { class: 'dots-row' });
  for (let i = 0; i < ROUNDS; i++) {
    dotsRow.appendChild(CarIQShared.el('div', {
      class: 'dot-step' + (i < state.idx ? ' done' : i === state.idx ? ' now' : ''),
    }));
  }
  root.appendChild(dotsRow);

  // VS cards
  const vs = CarIQShared.el('div', { class: 'compare-vs pop-in' });
  [a, b].forEach((car, ci) => {
    const img = CarIQShared.el('img', { src: car.img, alt: car.name });
    img.onerror = () => { img.src = CarIQShared.svgPlaceholder(car.name); };
    const card = CarIQShared.el('div', { class: 'compare-card' },
      img,
      CarIQShared.el('div', { class: 'compare-card-body' },
        CarIQShared.el('div', { class: 'compare-car-name' }, car.name),
        CarIQShared.el('div', { class: 'compare-car-tag' }, (car.year ? car.year + ' — ' : '') + (car.origin || car.brand || '')),
      ),
    );
    card.addEventListener('click', () => { if (!state.answered) answer(car, a, b); });
    vs.appendChild(card);
    if (ci === 0) vs.appendChild(CarIQShared.el('div', { class: 'vs-badge' }, 'VS'));
  });
  root.appendChild(vs);

  root.appendChild(CarIQShared.el('div', { class: 'compare-hint' }, '👆 روی ماشینی که فکر می‌کنی گرون‌تره بزن'));
}

/* ════════════════════════════════════════
   ANSWER
   ════════════════════════════════════════ */
function answer(picked, a, b) {
  if (state.answered) return;
  state.answered = true;

  const pa = carPrice(a), pb = carPrice(b);
  const expensive = pa > pb ? a : b;
  const ok = picked.id === expensive.id;
  const pts = ok ? 10 : 0;
  state.score += pts;
  state.results.push({ a: a.name, b: b.name, ok, picked: picked.name, correct: expensive.name });

  const root = document.getElementById('game-content');
  const cards = root.querySelectorAll('.compare-card');
  cards.forEach((card, i) => {
    card.classList.add('locked');
    const car = i === 0 ? a : b;
    card.classList.add(car.id === expensive.id ? 'correct-pick' : 'wrong-pick');
  });

  const fb = CarIQShared.el('div', { class: 'compare-feedback ' + (ok ? 'ok' : 'bad') },
    ok ? `✅ درسته! +${pts} امتیاز` : `❌ اشتباه! ${expensive.name} گرون‌تره`);

  const priceReveal = CarIQShared.el('div', { class: 'compare-price-reveal' });
  [a, b].forEach(car => {
    const p = carPrice(car);
    const box = CarIQShared.el('div', { class: 'price-reveal-box' + (car.id === expensive.id ? ' winner' : '') },
      CarIQShared.el('div', { class: 'pr-val' }, car.price_label || CarIQUtils.numFa(p) + ' م'),
      CarIQShared.el('div', { class: 'pr-lbl' }, car.name),
    );
    priceReveal.appendChild(box);
  });

  const hintEl = root.querySelector('.compare-hint');
  hintEl.replaceWith(fb);
  fb.insertAdjacentElement('afterend', priceReveal);

  const nextBtn = CarIQShared.el('button', { class: 'btn btn-gold mt8' }, 'سوال بعدی →');
  nextBtn.addEventListener('click', () => {
    state.idx++;
    state.answered = false;
    state.pair = null;
    renderRound();
  });
  root.appendChild(nextBtn);

  if (ok) CarIQShared.showScoreFly(pts);
}

/* ════════════════════════════════════════
   RESULT
   ════════════════════════════════════════ */
function showResult() {
  const ok = state.results.filter(r => r.ok).length;
  const pct = Math.round((ok / ROUNDS) * 100);

  let emoji, rank, rankCls;
  if (pct >= 80) { emoji = '🏆'; rank = 'کارشناس بازار!'; rankCls = 'pill-gold'; }
  else if (pct >= 50) { emoji = '👍'; rank = 'بد نبودی!'; rankCls = 'pill-green'; }
  else { emoji = '😅'; rank = 'بازار رو نمی‌شناسی!'; rankCls = 'pill-muted'; }

  CarIQLeads.trackGameEnd('compare', `${ok}/${ROUNDS}`);
  CarIQLeads.mergeProfile({ compareScore: state.score, compareAccuracy: pct });

  showScreen('screen-result');
  const root = document.getElementById('result-content');
  root.innerHTML = '';

  const hero = CarIQShared.el('div', { class: 'result-hero pop-in' });
  hero.appendChild(CarIQShared.buildResultRing(pct));
  hero.appendChild(CarIQShared.el('div', { class: 'result-title' }, `${emoji} ${state.score} امتیاز`));
  hero.appendChild(CarIQShared.el('span', { class: 'pill ' + rankCls, style: { marginBottom: '10px', display: 'inline-flex' } }, rank));
  hero.appendChild(CarIQShared.el('div', { class: 'result-sub' }, `${ok} از ${ROUNDS} درست حدس زدی`));
  hero.appendChild(CarIQShared.buildStatRow([
    [ok, 'درست'],
    [ROUNDS - ok, 'اشتباه'],
    [state.score, 'امتیاز کل'],
  ]));

  const chips = CarIQShared.el('div', { class: 'score-chips' });
  state.results.forEach((r, i) => {
    chips.appendChild(CarIQShared.el('span', { class: 'chip ' + (r.ok ? 'chip-ok' : 'chip-no') },
      `${i + 1}. ${r.ok ? '✓' : '✗'}`));
  });
  hero.appendChild(chips);

  root.appendChild(hero);

  const pa = CarIQShared.el('button', { class: 'btn btn-outline mt12' }, '🔄 دوباره بازی کن');
  pa.addEventListener('click', () => { resetState(); showScreen('screen-game'); renderRound(); });
  root.appendChild(pa);

  root.appendChild(CarIQShared.buildLeadBox({
    source: 'compare',
    resultText: `${ok}/${ROUNDS} — ${state.score}pts`,
    ctaMsg: `سلام! تو بازی «کدوم گرون‌تره» ${ok} از ${ROUNDS} رو درست زدم. می‌خوام قیمت واقعی واردات رو بدونم 💰`,
    sharePayload: {
      emoji: emoji,
      imgSrc: state.pair && state.pair.length ? state.pair[0].img : (CarIQDB.getAll()[0] || {}).img,
      colorFrom: '#1a2f3a', colorTo: '#2c4a5c',
      kicker: 'نتیجه‌ی بازی «کدوم گرون‌تره؟»',
      title: `${state.score} امتیاز`,
      subtitle: rank,
      desc: `${ok} از ${ROUNDS} قیمت رو درست حدس زدم`,
      stats: [
        { val: ok, label: 'درست' },
        { val: ROUNDS - ok, label: 'اشتباه' },
      ],
      text: `تو بازی «کدوم گرون‌تره؟» ${ok} از ${ROUNDS} رو درست حدس زدم! تو بهتر می‌زنی؟ ⚖️`,
    },
  }));
}
</script>
</body>
</html>

```

</FILE>

---

<FILE path="games/personality/index.html" tokens="7067" lines="779">

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
  <meta name="description" content="تست شخصیت — کدوم ماشین تویی؟ | CarIQ"/>
  <title>کدوم ماشین تویی؟ | CarIQ</title>
  <link rel="stylesheet" href="../../assets/css/tokens.css"/>
  <link rel="stylesheet" href="../../assets/css/base.css"/>
  <link rel="stylesheet" href="../../assets/css/components.css"/>
  <style>
    /* ── Intro Screen ── */
    .intro {
      min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 20px; text-align: center;
    }
    .intro-icon { font-size: 72px; margin-bottom: 16px; animation: pop .5s var(--ease-spring); }
    .intro-title {
      font-size: 26px; font-weight: 900; margin-bottom: 8px;
      background: linear-gradient(135deg, var(--c-gold), var(--c-accent));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .intro-sub { font-size: 14px; color: var(--c-muted); line-height: 1.8; margin-bottom: 28px; max-width: 340px; }
    .intro-chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
    .intro-meta {
      font-size: 12px; color: var(--c-muted2); margin-top: 14px;
      display: flex; gap: 16px; justify-content: center;
    }

    /* ── Quiz Screen ── */
    .quiz-wrap { padding: 0 0 40px; }
    .q-card {
      background: var(--c-card); border: 1.5px solid var(--c-border);
      border-radius: var(--r-lg); padding: 22px 18px;
      box-shadow: var(--shadow-md);
    }
    .q-number { font-size: 11px; font-weight: 700; color: var(--c-muted2); letter-spacing: .1em; margin-bottom: 12px; }
    .q-text { font-size: 18px; font-weight: 800; line-height: 1.65; color: var(--c-text); margin-bottom: 18px; }
    .q-options { display: flex; flex-direction: column; gap: 10px; }
    .q-opt {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; background: var(--c-surface);
      border: 1.5px solid var(--c-border); border-radius: var(--r-sm);
      cursor: pointer; transition: all .18s var(--ease-out);
      font-size: 14px; font-weight: 600; color: var(--c-text);
      text-align: right;
    }
    .q-opt:hover { border-color: var(--c-gold2); background: var(--c-card2); transform: translateX(-3px); }
    .q-opt:active { transform: scale(0.98); }
    .q-opt.selected { border-color: var(--c-gold); background: rgba(184,134,11,0.08); }
    .q-opt-icon { font-size: 22px; flex-shrink: 0; }
    .q-opt-text { flex: 1; }

    /* ── Result Screen ── */
    .result-wrap { padding: 0 0 40px; }

    /* کارت قابل اشتراک */
    .share-card-wrap {
      position: relative; border-radius: var(--r-lg);
      overflow: hidden; margin-bottom: 16px;
      box-shadow: var(--shadow-lg);
    }
    canvas#share-canvas {
      width: 100%; height: auto; display: block;
      border-radius: var(--r-lg);
    }
    .share-card-overlay {
      position: absolute; inset: 0;
      display: flex; align-items: flex-end;
      padding: 20px; pointer-events: none;
      background: linear-gradient(to top, rgba(44,24,16,.85) 0%, transparent 55%);
      border-radius: var(--r-lg);
    }

    /* ── Match Bars ── */
    .match-section { margin-top: 16px; }
    .match-title { font-size: 13px; font-weight: 700; color: var(--c-muted); margin-bottom: 12px; }
    .match-row { margin-bottom: 10px; }
    .match-header { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px; }
    .match-car-name { color: var(--c-text2); font-weight: 700; }
    .match-pct-val  { color: var(--c-gold); font-weight: 800; }
    .match-track { height: 6px; background: var(--c-bg3); border-radius: 999px; overflow: hidden; }
    .match-fill  { height: 100%; background: linear-gradient(90deg, var(--c-gold2), var(--c-gold3)); border-radius: 999px; width: 0; transition: width .8s var(--ease-out); }

    /* ── Trait Chips ── */
    .traits { display: flex; flex-wrap: wrap; gap: 7px; margin: 14px 0; justify-content: center; }
    .trait-chip {
      padding: 5px 13px; border-radius: 999px;
      background: rgba(184,134,11,0.12); color: var(--c-gold);
      border: 1px solid rgba(184,134,11,0.25);
      font-size: 12px; font-weight: 700;
    }

    /* ── Radar ── */
    .radar-wrap { display: flex; justify-content: center; margin: 16px 0; }
    canvas#radar-canvas { width: 200px; height: 200px; }
  </style>
</head>
<body>
<div class="app" id="app">

  <!-- INTRO -->
  <div id="screen-intro" class="screen active">
    <div class="intro">
      <div class="intro-icon">🧬</div>
      <h1 class="intro-title">کدوم ماشین تویی؟</h1>
      <p class="intro-sub">
        ۶ سوال هوشمند — نتیجه شخصی‌سازی شده<br>
        بفهم ماشین رویایی‌ات با شخصیتت چقدر هماهنگه
      </p>
      <div class="intro-chips">
        <span class="pill pill-gold">🔥 وایرال‌پذیر</span>
        <span class="pill pill-accent">🧠 علمی</span>
        <span class="pill pill-muted">⏱️ ۲ دقیقه</span>
      </div>
      <button class="btn btn-gold" id="start-btn" style="max-width:280px;font-size:16px;padding:16px">
        🚀 شروع تست
      </button>
      <div class="intro-meta">
        <span>🔒 اطلاعاتت محفوظه</span>
        <span>📊 بر اساس ۶ بُعد شخصیتی</span>
      </div>
    </div>
  </div>

  <!-- QUIZ -->
  <div id="screen-quiz" class="screen">
    <div class="game-header" id="quiz-header"></div>
    <div class="quiz-wrap" id="quiz-content"></div>
  </div>

  <!-- RESULT -->
  <div id="screen-result" class="screen">
    <div class="result-wrap" id="result-content"></div>
  </div>

</div>

<!-- Share Modal -->
<div class="modal-overlay" id="share-modal">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div class="modal-title">📤 اشتراک‌گذاری نتیجه</div>
    <div class="modal-sub">کارت شخصیتی‌ات رو با دوستات به اشتراک بذار</div>
    <div id="share-preview-wrap" style="margin-bottom:14px"></div>
    <div class="share-channels">
      <div class="share-channel" id="sh-download">
        <div class="share-channel-icon">💾</div>
        <div><div class="share-channel-label">دانلود کارت (استوری ۱۶:۹)</div><div class="share-channel-sub" id="sh-dl-sub">ذخیره کن و در استوری بذار</div></div>
      </div>
      <div class="share-channel" id="sh-tg">
        <div class="share-channel-icon">✈️</div>
        <div><div class="share-channel-label">تلگرام</div><div class="share-channel-sub">ارسال به دوستان</div></div>
      </div>
      <div class="share-channel" id="sh-wa">
        <div class="share-channel-icon">💬</div>
        <div><div class="share-channel-label">واتساپ</div><div class="share-channel-sub">استاتوس یا پیام</div></div>
      </div>
      <div class="share-channel" id="sh-copy">
        <div class="share-channel-icon">📋</div>
        <div><div class="share-channel-label">کپی متن</div><div class="share-channel-sub" id="sh-copy-sub">کپی نتیجه + لینک</div></div>
      </div>
    </div>
    <button class="modal-close" id="share-modal-close">بستن</button>
  </div>
</div>

<script src="../../core/config.js"></script>
<script src="../../core/car-db.js"></script>
<script src="../../core/shared.js"></script>
<script src="../../core/lead-engine.js"></script>
<script src="../../assets/js/utils.js"></script>
<script>
/* ════════════════════════════════════════
   GAME META — توسعه‌دهنده فقط این بخش را
   و بخش GAME_LOGIC نیاز دارد
   ════════════════════════════════════════ */
window.GAME_META = {
  id: 'personality',
  name: 'کدوم ماشین تویی؟',
  icon: '🧬',
  rounds: 6,
  estimatedTime: '۲ دقیقه',
  viralScore: 10,
  leadQuality: 9,
};

/* ════════════════════════════════════════
   QUESTIONS
   ════════════════════════════════════════ */
const QUESTIONS = [
  {
    q: '💰 بودجه‌ات برای ماشین رویاییت حدوداً چقدره؟',
    opts: [
      { t: 'تا ۳ میلیارد — عاقلانه',        i: '💵', s: { tucson:3, sportage:2 },                 profile: { budget:'low'   } },
      { t: '۳ تا ۸ میلیارد — معقول',         i: '💴', s: { tucson:2, tesla3:2, sportage:1 },        profile: { budget:'mid'   } },
      { t: '۸ تا ۱۵ میلیارد — لوکس',         i: '💶', s: { prado:2, bmw_x5:3, lx600:1 },           profile: { budget:'high'  } },
      { t: 'بالای ۱۵ میلیارد — بهترین',       i: '💎', s: { gclass:3, lc300:3, lx600:2, cayenne:2 }, profile: { budget:'vhigh' } },
    ]
  },
  {
    q: '🧬 اگه فقط یه کلمه شخصیتت رو توصیف کنه، کدومه؟',
    opts: [
      { t: 'رهبر — قوی و تأثیرگذار',    i: '🦁', s: { lc300:3, gclass:2 },          profile: { persona:'leader'   } },
      { t: 'کاشف — ماجراجو و آزاد',     i: '⛰️', s: { prado:3, lc300:2 },           profile: { persona:'explorer' } },
      { t: 'نوآور — تکنولوژی‌دوست',     i: '🚀', s: { tesla3:3, bmw_x5:2 },         profile: { persona:'innovator'} },
      { t: 'هوشمند — عملگرا و متعادل',  i: '🎯', s: { tucson:3, sportage:2 },       profile: { persona:'smart'    } },
    ]
  },
  {
    q: '🗺️ آخر هفته‌ات معمولاً کجاست؟',
    opts: [
      { t: 'کافه و مراکز خرید شهر',    i: '☕', s: { tesla3:2, bmw_x5:2, tucson:1 }, profile: { drive:'city'    } },
      { t: 'جاده و شهرهای اطراف',       i: '🛣️', s: { tucson:2, sportage:2 },        profile: { drive:'road'    } },
      { t: 'کمپ و طبیعت‌گردی',         i: '🏕️', s: { prado:3, lc300:2 },            profile: { drive:'offroad' } },
      { t: 'کوه و مسیرهای سخت',        i: '🏔️', s: { lc300:3, prado:2, gclass:1 },  profile: { drive:'extreme' } },
    ]
  },
  {
    q: '🌟 وقتی ماشین می‌بینی، اول چشمت کجاست؟',
    opts: [
      { t: 'قدرت موتور و عملکرد',       i: '⚙️', s: { lc300:2, bmw_x5:3, cayenne:3 }, profile: { focus:'performance' } },
      { t: 'طراحی و ظاهر مدرن',         i: '🎨', s: { tesla3:3, sportage:2 },          profile: { focus:'design'      } },
      { t: 'برند و اعتبار',             i: '🏆', s: { gclass:3, bmw_x5:2, lx600:2 },   profile: { focus:'brand'       } },
      { t: 'فضا، راحتی، امنیت',         i: '👨‍👩‍👧', s: { prado:3, tucson:2, lc300:1 },   profile: { focus:'family'      } },
    ]
  },
  {
    q: '⚡ به تکنولوژی ماشین چقدر اهمیت می‌دی؟',
    opts: [
      { t: 'همه‌چیز باید هوشمند باشه',  i: '🤖', s: { tesla3:3, bmw_x5:2 },           profile: { tech:'max'    } },
      { t: 'مهمه، ولی دوام مهم‌تره',    i: '⚖️', s: { lc300:2, prado:2, lx600:2 },    profile: { tech:'mid'    } },
      { t: 'برام اهمیت زیادی نداره',    i: '🔧', s: { gclass:2, tucson:1 },             profile: { tech:'low'    } },
      { t: 'تکنولوژی = آینده‌نگری',     i: '🌐', s: { tesla3:3, sportage:1 },          profile: { tech:'future' } },
    ]
  },
  {
    q: '🎭 دوستات چطور توصیفت می‌کنن؟',
    opts: [
      { t: 'باکلاس و شیک‌پوش',          i: '👑', s: { gclass:3, bmw_x5:2, lx600:2 }, profile: { image:'elite'    } },
      { t: 'ساده و بی‌تکلف',            i: '😊', s: { tucson:3, sportage:2 },          profile: { image:'simple'   } },
      { t: 'جسور و ماجراجو',            i: '🔥', s: { lc300:3, prado:2 },             profile: { image:'bold'     } },
      { t: 'خلاق و متفاوت',             i: '💡', s: { tesla3:3, sportage:1 },          profile: { image:'creative' } },
    ]
  },
];

/* ═══════════════════════════════════════
   CAR PERSONALITY TYPES
   ═══════════════════════════════════════ */
/* ═══════════════════════════════════════
   امتیازدهی بر اساس dims (نه شناسه ثابت)
   ═══════════════════════════════════════ */
const PROFILE_DIMS_WEIGHTS = {
  budget:  { low:{economy:3}, mid:{economy:1,luxury:1}, high:{luxury:2,family:1}, vhigh:{luxury:3,sport:1} },
  persona: { leader:{luxury:2,offroad:1}, explorer:{offroad:3}, innovator:{tech:3}, smart:{economy:2,tech:1} },
  drive:   { city:{tech:1,economy:1}, road:{economy:2}, offroad:{offroad:3}, extreme:{offroad:3,sport:1} },
  focus:   { performance:{sport:3}, design:{tech:2,sport:1}, brand:{luxury:3}, family:{family:3} },
  tech:    { max:{tech:3}, mid:{tech:1,family:1}, low:{economy:1}, future:{tech:3,economy:1} },
  image:   { elite:{luxury:3}, simple:{economy:2}, bold:{offroad:2,sport:1}, creative:{tech:2} },
};

const TYPE_LABELS = {
  adventurer:'ماجراجوی قدرتمند',
  family:'خانواده‌دوست وقور',
  urbanpro:'حرفه‌ای شهری',
  elite:'نخبه موفق',
  balanced:'متعادل هوشمند',
  techie:'آینده‌نگر تکنو',
  quality:'کیفیت‌دوست آرام',
  trendy:'خلاق و ترندی',
  sporty:'اسپرت‌پسند خاص',
};

const PALETTE = [
  ['#8B4513','#D2691E'],
  ['#2F4F2F','#3CB371'],
  ['#1a3a5c','#2e6da4'],
  ['#1a1a1a','#4a4a4a'],
  ['#2e6b5e','#4ab5a0'],
  ['#1a4a7c','#2e82c8'],
  ['#2d5a3d','#4a9e6a'],
  ['#5c2d6e','#9e4abf'],
  ['#6e1a1a','#bf2a2a'],
];

const DEFAULT_DIMS = {
  luxury:5,
  offroad:5,
  family:5,
  tech:5,
  economy:5,
  sport:5
};

function buildCarTypesFromDB() {
  const types = {};

  CarIQDB.getAll().forEach((car, i) => {

    const [cf, ct] = PALETTE[i % PALETTE.length];

    types[car.id] = {
      id: car.id,
      emoji: car.personality?.emoji || '🚗',
      name: car.name,
      type_name: TYPE_LABELS[car.personality?.type] || car.tag || 'خاص خودت',
      desc: car.personality?.desc || car.fun_fact || '',
      traits: (car.hints || []).slice(0, 4),
      color_from: cf,
      color_to: ct,
      radar: car.dims || DEFAULT_DIMS,
      dims: car.dims || DEFAULT_DIMS,
    };

  });

  return types;
}

/* ═══════════════════════════════════════
   STATE
   ═══════════════════════════════════════ */
let state = {
  qIndex: 0,
  scores: {},
  resultCar: null,
  canvas: null,
};

/* ═══════════════════════════════════════
   INIT
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  // اول از شیت آپدیت بگیر، بعد اجازه بده بازی شروع شه
  await CarIQDB.syncFromSheet();

  // init dims accumulator
  state.dimsWanted = { luxury:0, offroad:0, family:0, tech:0, economy:0, sport:0 };

  // start button
  document.getElementById('start-btn').addEventListener('click', startQuiz);

  // track
  CarIQLeads.trackGameStart('personality');
});

/* ═══════════════════════════════════════
   QUIZ
   ═══════════════════════════════════════ */
function startQuiz() {
  showScreen('screen-quiz');
  renderQuestion();
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top:0, behavior:'smooth' });
}

function renderQuestion() {
  const root  = document.getElementById('quiz-content');
  const hRoot = document.getElementById('quiz-header');
  const q     = QUESTIONS[state.qIndex];
  const pct   = (state.qIndex / QUESTIONS.length) * 100;

  // header
  hRoot.innerHTML = '';
  const { header, score } = CarIQShared.buildGameHeader({
    title: 'کدوم ماشین تویی؟',
    sub: `سوال ${state.qIndex + 1} از ${QUESTIONS.length}`,
    onBack: () => { if (confirm('از تست خارج بشی؟')) window.location.href='../../index.html'; },
  });
  hRoot.appendChild(header);

  // content
  root.innerHTML = '';
  root.appendChild(CarIQShared.buildProgress(state.qIndex, QUESTIONS.length));

  const card = CarIQShared.el('div', { class: 'q-card pop-in' });

  const qNum = CarIQShared.el('div', { class: 'q-number' },
    `سوال ${state.qIndex + 1} از ${QUESTIONS.length}`
  );
  const qText = CarIQShared.el('div', { class: 'q-text' }, q.q);

  const opts = CarIQShared.el('div', { class: 'q-options' });
  q.opts.forEach((opt, i) => {
    const b = CarIQShared.el('div', { class: 'q-opt' },
      CarIQShared.el('span', { class: 'q-opt-icon' }, opt.i),
      CarIQShared.el('span', { class: 'q-opt-text' }, opt.t),
    );
    b.addEventListener('click', () => selectOption(opt, b, opts));
    opts.appendChild(b);
  });

  card.append(qNum, qText, opts);
  root.appendChild(card);
}

function selectOption(opt, el, opts) {
  // visual feedback
  [...opts.children].forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  // score (بر اساس dims)
  Object.entries(opt.profile || {}).forEach(([key, val]) => {
    const weights = (PROFILE_DIMS_WEIGHTS[key] || {})[val] || {};
    Object.entries(weights).forEach(([dim, w]) => {
      state.dimsWanted[dim] = (state.dimsWanted[dim] || 0) + w;
    });
  });

  // profile
  CarIQLeads.mergeProfile(opt.profile || {});

  // next
  setTimeout(() => {
    state.qIndex++;
    if (state.qIndex >= QUESTIONS.length) showResult();
    else renderQuestion();
  }, 400);
}

/* ═══════════════════════════════════════
   RESULT
   ═══════════════════════════════════════ */
function showResult() {
  const CAR_TYPES = buildCarTypesFromDB();
  const DIM_KEYS = ['luxury','offroad','family','tech','economy','sport'];
  const sorted = CarIQDB.getAll().map(c => {
    const dims = c.dims || DEFAULT_DIMS;
    const score = DIM_KEYS.reduce((s, k) => s + (dims[k] || 0) * (state.dimsWanted[k] || 0), 0);
    return [c.id, score];
  }).sort((a, b) => b[1] - a[1]);
  const [winId] = sorted[0];
  const car = CAR_TYPES[winId];
  state.resultCar = car;

  // track
  CarIQLeads.trackGameEnd('personality', car.name);
  CarIQLeads.mergeProfile({ persResult: winId, persCar: car.name });

  showScreen('screen-result');
  const root = document.getElementById('result-content');
  root.innerHTML = '';

  // ── draw canvas card ──
  const canvasWrap = buildShareCardCanvas(car);
  root.appendChild(canvasWrap);

  // ── result hero text ──
  const hero = CarIQShared.el('div', { class: 'result-hero pop-in' });

  const carImg = CarIQDB.getById(car.id);
  if (carImg?.img) {
    const ci = CarIQShared.el('img', { class: 'result-car-img', src: carImg.img, alt: car.name });
    ci.onerror = () => ci.remove();
    hero.appendChild(ci);
  }

  const total = sorted.reduce((s,[,v]) => s+v, 0);
  const topPct = total > 0 ? Math.round(sorted[0][1] / total * 100) : 0;

  const ring = CarIQShared.buildResultRing(topPct);
  hero.appendChild(ring);
  hero.appendChild(CarIQShared.el('div', { class: 'result-title' }, `${car.emoji} ${car.name}`));

  const badge = CarIQShared.el('span', { class: 'pill pill-gold', style: { marginBottom:'10px', display:'inline-flex' } }, car.type_name);
  hero.appendChild(badge);
  hero.appendChild(CarIQShared.el('div', { class: 'result-sub' }, car.desc));

  // traits
  const traits = CarIQShared.el('div', { class: 'traits' });
  car.traits.forEach(t => {
    traits.appendChild(CarIQShared.el('span', { class: 'trait-chip' }, t));
  });
  hero.appendChild(traits);

  // match bars
  const matchSec = CarIQShared.el('div', { class: 'match-section' });
  matchSec.appendChild(CarIQShared.el('div', { class: 'match-title' }, '📊 تطابق شخصیت با ماشین‌ها'));
  sorted.slice(0, 4).forEach(([id, val]) => {
    const c = CAR_TYPES[id]; if (!c) return;
    const pct = total > 0 ? Math.round(val / total * 100) : 0;
    const row = CarIQShared.el('div', { class: 'match-row' });
    const hdr = CarIQShared.el('div', { class: 'match-header' });
    hdr.appendChild(CarIQShared.el('span', { class: 'match-car-name' }, `${c.emoji} ${c.name}`));
    hdr.appendChild(CarIQShared.el('span', { class: 'match-pct-val' }, pct + '%'));
    const track = CarIQShared.el('div', { class: 'match-track' });
    const fill  = CarIQShared.el('div', { class: 'match-fill' });
    track.appendChild(fill);
    row.append(hdr, track);
    matchSec.appendChild(row);
    setTimeout(() => { fill.style.width = pct + '%'; }, 100);
  });
  hero.appendChild(matchSec);

  // radar
  hero.appendChild(buildRadar(car.radar));

  root.appendChild(hero);

  // CTA
  const cfg = CarIQConfig.get();
  root.appendChild(CarIQShared.buildLeadBox({
    source: 'personality',
    resultText: car.name,
    ctaMsg: `سلام! تو تست شخصیت CarIQ نتیجه‌ام ${car.name} (${car.type_name}) شد. می‌خوام درباره واردات مشورت کنم.`,
    sharePayload: {
      emoji: car.emoji,
      text: `تو تست «کدوم ماشین تویی؟» نتیجه‌ام شد: ${car.name} (${car.type_name}) — تو هم ببین ماشین تو کیه 🚗`,
    },
  }));

  // play again
  const pa = CarIQShared.el('button', { class: 'btn btn-outline mt12' }, '🔄 دوباره تست کن');
  pa.addEventListener('click', () => {
    state = { qIndex:0, dimsWanted:{ luxury:0, offroad:0, family:0, tech:0, economy:0, sport:0 }, resultCar:null, canvas:null };
    showScreen('screen-intro');
  });
  root.appendChild(pa);

  // setup share modal
  setupShareModal(car);
}

/* ═══════════════════════════════════════
   CANVAS SHARE CARD (16:9)
   ═══════════════════════════════════════ */
function buildShareCardCanvas(car) {
  const W = 800, H = 450;   // 16:9
  const canvas = document.createElement('canvas');
  canvas.id = 'share-canvas';
  canvas.width = W; canvas.height = H;
  canvas.style.cssText = 'width:100%;height:auto;display:block;border-radius:14px;';

  const ctx = canvas.getContext('2d');

  // background gradient
  const grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, car.color_from);
  grd.addColorStop(1, car.color_to);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // subtle grain
  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 8000; i++) {
    ctx.fillStyle = Math.random() > .5 ? '#fff' : '#000';
    ctx.fillRect(Math.random()*W, Math.random()*H, 1, 1);
  }
  ctx.globalAlpha = 1;

  // left dark overlay
  const ov = ctx.createLinearGradient(0,0,W*0.55,0);
  ov.addColorStop(0, 'rgba(0,0,0,.65)');
  ov.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ov;
  ctx.fillRect(0,0,W,H);

  // car image (async — draw placeholder first)
  const carData = CarIQDB.getById(car.id);
  if (carData?.img) {
    const imgEl = new Image();
    imgEl.crossOrigin = 'anonymous';
    imgEl.onload = () => {
      ctx.save();
      ctx.globalAlpha = 0.55;
      // draw on right side
      const iH = H, iW = iH * 16/9;
      ctx.drawImage(imgEl, W - iW*0.7, 0, iW*0.7, iH);
      ctx.restore();
      // re-draw text on top
      drawCardText(ctx, car, W, H);
    };
    imgEl.src = carData.img;
  }
  drawCardText(ctx, car, W, H);

  state.canvas = canvas;
  const wrap = document.createElement('div');
  wrap.className = 'share-card-wrap';
  wrap.appendChild(canvas);
  return wrap;
}

function drawCardText(ctx, car, W, H) {
  const pad = 40;
  // brand
  ctx.font = 'bold 18px Vazirmatn, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.textAlign = 'right';
  ctx.fillText('CarIQ — تست شخصیت', W - pad, pad + 12);

  // emoji
  ctx.font = '64px serif';
  ctx.textAlign = 'right';
  ctx.fillText(car.emoji, W - pad, H * 0.38);

  // type name
  ctx.font = 'bold 22px Vazirmatn, sans-serif';
  ctx.fillStyle = 'rgba(255,220,100,0.9)';
  ctx.textAlign = 'right';
  ctx.fillText(car.type_name, W - pad, H * 0.52);

  // car name
  ctx.font = 'bold 30px Vazirmatn, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'right';
  ctx.fillText(car.name, W - pad, H * 0.65);

  // desc (wrap)
  ctx.font = '16px Vazirmatn, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  const descLines = wrapText(ctx, car.desc.slice(0, 80), W * 0.55, 16);
  descLines.forEach((line, i) => {
    ctx.fillText(line, W - pad, H * 0.75 + i * 22);
  });

  // watermark
  ctx.font = 'bold 14px Vazirmatn, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.textAlign = 'left';
  ctx.fillText('@pouriabh | cariq.ir', pad, H - 20);
}

function wrapText(ctx, text, maxWidth, fontSize) {
  const words = text.split(' '), lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line); line = w;
    } else { line = test; }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

/* ═══════════════════════════════════════
   RADAR CHART
   ═══════════════════════════════════════ */
function buildRadar(dims) {
  const W = 200, H = 200, R = 80, CX = W/2, CY = H/2;
  const labels  = ['لوکس','آفرود','خانواده','تکنو','اقتصادی','اسپرت'];
  const keys    = ['luxury','offroad','family','tech','economy','sport'];
  const maxVal  = 10;
  const angles  = keys.map((_, i) => (Math.PI * 2 * i / keys.length) - Math.PI/2);

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  canvas.style.cssText = 'width:200px;height:200px;';
  const ctx = canvas.getContext('2d');

  // grid
  [.2,.4,.6,.8,1].forEach(r => {
    ctx.beginPath();
    angles.forEach((a,i) => {
      const x = CX + Math.cos(a) * R * r;
      const y = CY + Math.sin(a) * R * r;
      i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(184,134,11,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // axes
  angles.forEach(a => {
    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.lineTo(CX + Math.cos(a)*R, CY + Math.sin(a)*R);
    ctx.strokeStyle = 'rgba(184,134,11,0.15)';
    ctx.stroke();
  });

  // data polygon
  ctx.beginPath();
  keys.forEach((k, i) => {
    const val = (dims[k] || 0) / maxVal;
    const x = CX + Math.cos(angles[i]) * R * val;
    const y = CY + Math.sin(angles[i]) * R * val;
    i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  });
  ctx.closePath();
  ctx.fillStyle   = 'rgba(184,134,11,0.2)';
  ctx.strokeStyle = 'rgba(184,134,11,0.8)';
  ctx.lineWidth   = 2;
  ctx.fill(); ctx.stroke();

  // labels
  ctx.font = '10px Vazirmatn, sans-serif';
  ctx.fillStyle = 'rgba(44,24,16,0.7)';
  ctx.textAlign = 'center';
  labels.forEach((lbl, i) => {
    const x = CX + Math.cos(angles[i]) * (R + 16);
    const y = CY + Math.sin(angles[i]) * (R + 16) + 4;
    ctx.fillText(lbl, x, y);
  });

  const wrap = document.createElement('div');
  wrap.className = 'radar-wrap';
  wrap.appendChild(canvas);
  return wrap;
}

/* ═══════════════════════════════════════
   SHARE MODAL
   ═══════════════════════════════════════ */
function setupShareModal(car) {
  const cfg = CarIQConfig.get();
  const shareText = `${car.emoji} من تو تست «کدوم ماشین تویی؟» ${car.name} (${car.type_name}) شدم!\nتو هم ببین ماشین تو کیه 🚗\n\nCarIQ | ${cfg.contact.telegram}`;

  // inject canvas preview
  const prevWrap = document.getElementById('share-preview-wrap');
  if (state.canvas) {
    const clone = document.createElement('canvas');
    clone.width = state.canvas.width; clone.height = state.canvas.height;
    clone.style.cssText = 'width:100%;height:auto;border-radius:10px;';
    clone.getContext('2d').drawImage(state.canvas, 0, 0);
    prevWrap.innerHTML = ''; prevWrap.appendChild(clone);
  }

  // open
  document.querySelectorAll('[data-open-share]').forEach(b => b.addEventListener('click', () => {
    document.getElementById('share-modal').classList.add('open');
  }));

  // find the btn built by lead-box
  setTimeout(() => {
    const shareBtns = document.querySelectorAll('.btn-share');
    shareBtns.forEach(b => {
      b.addEventListener('click', () => document.getElementById('share-modal').classList.add('open'));
    });
  }, 300);

  // download
  document.getElementById('sh-download').addEventListener('click', () => {
    if (!state.canvas) return;
    const link = document.createElement('a');
    link.download = `cariq_personality_${car.id}.png`;
    link.href = state.canvas.toDataURL('image/png');
    link.click();
    document.getElementById('sh-dl-sub').textContent = '✅ دانلود شد! در استوری بذار';
  });

  // telegram
  document.getElementById('sh-tg').addEventListener('click', () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(shareText)}`, '_blank');
  });

  // whatsapp
  document.getElementById('sh-wa').addEventListener('click', () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + location.href)}`, '_blank');
  });

  // copy
  document.getElementById('sh-copy').addEventListener('click', () => {
    navigator.clipboard?.writeText(shareText + '\n' + location.href).catch(() => {});
    document.getElementById('sh-copy-sub').textContent = '✅ کپی شد!';
    setTimeout(() => document.getElementById('sh-copy-sub').textContent = 'کپی نتیجه + لینک', 2500);
  });

  // close
  document.getElementById('share-modal-close').addEventListener('click', () => {
    document.getElementById('share-modal').classList.remove('open');
  });
  document.getElementById('share-modal').addEventListener('click', e => {
    if (e.target.id === 'share-modal') e.target.classList.remove('open');
  });
}
</script>
</body>
</html>
```

</FILE>

---

<FILE path="games/price/index.html" tokens="3959" lines="394">

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
  <meta name="description" content="حدس قیمت — قیمت واقعی خودرو رو حدس بزن! | CarIQ"/>
  <title>حدس قیمت | CarIQ</title>
  <link rel="stylesheet" href="../../assets/css/tokens.css"/>
  <link rel="stylesheet" href="../../assets/css/base.css"/>
  <link rel="stylesheet" href="../../assets/css/components.css"/>
  <style>
    /* ── Intro Screen ── */
    .intro {
      min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 32px 20px; text-align: center;
    }
    .intro-icon { font-size: 72px; margin-bottom: 16px; animation: pop .5s var(--ease-spring); }
    .intro-title {
      font-size: 26px; font-weight: 900; margin-bottom: 8px;
      background: linear-gradient(135deg, var(--c-gold), var(--c-accent));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .intro-sub { font-size: 14px; color: var(--c-muted); line-height: 1.8; margin-bottom: 28px; max-width: 340px; }
    .intro-chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
    .intro-meta { font-size: 12px; color: var(--c-muted2); margin-top: 14px; display: flex; gap: 16px; justify-content: center; }

    /* ── Car stage ── */
    .price-stage {
      position: relative; aspect-ratio: 16/9;
      background: var(--c-bg3); border-radius: var(--r);
      overflow: hidden; border: 1px solid var(--c-border);
      margin-bottom: 14px;
    }
    .price-stage img { width: 100%; height: 100%; object-fit: cover; }
    .price-stage-top {
      position: absolute; top: 10px; right: 10px; left: 10px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .price-stage-bottom {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 22px 14px 12px;
      background: linear-gradient(to top, rgba(44,24,16,0.75), transparent);
    }
    .price-car-name { font-size: 16px; font-weight: 800; color: #fff; }
    .price-car-hints { font-size: 11px; color: rgba(245,240,232,0.7); margin-top: 3px; }

    /* ── Question ── */
    .price-q-text { font-size: 15px; font-weight: 700; color: var(--c-text); margin-bottom: 12px; text-align:center; }

    /* ── Price options (vertical, distinct from opt-grid) ── */
    .price-opts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 10px; }
    .price-opt-btn {
      display: flex; align-items: center; justify-content: space-between;
      padding: 15px 18px; background: var(--c-card);
      border: 1.5px solid var(--c-border); border-radius: var(--r-sm);
      cursor: pointer; transition: all .18s var(--ease-out);
      font-family: inherit; text-align: right; width: 100%;
    }
    .price-opt-btn:not([disabled]):hover { border-color: var(--c-gold2); background: var(--c-card2); transform: translateX(-3px); }
    .price-opt-btn:active { transform: scale(0.98); }
    .price-opt-label { font-size: 15px; font-weight: 800; color: var(--c-text); }
    .price-opt-arrow { font-size: 14px; color: var(--c-muted2); }
    .price-opt-btn.correct { border-color: var(--c-green); background: rgba(45,122,79,0.1); }
    .price-opt-btn.correct .price-opt-label { color: var(--c-green); }
    .price-opt-btn.wrong { border-color: var(--c-red); background: rgba(184,50,50,0.08); }
    .price-opt-btn.wrong .price-opt-label { color: var(--c-red); }
    .price-opt-btn.close { border-color: var(--c-gold); background: rgba(184,134,11,0.08); }
    .price-opt-btn.close .price-opt-label { color: var(--c-gold); }
    .price-opt-btn[disabled] { cursor: default; }

    /* ── Feedback banner ── */
    .price-feedback {
      text-align: center; padding: 13px; border-radius: var(--r-sm);
      font-size: 14px; font-weight: 700; margin-bottom: 12px;
    }
    .price-feedback.exact { background: rgba(45,122,79,0.12); border: 1px solid rgba(45,122,79,0.3); color: var(--c-green); }
    .price-feedback.near  { background: rgba(184,134,11,0.12); border: 1px solid rgba(184,134,11,0.3); color: var(--c-gold); }
    .price-feedback.miss  { background: rgba(184,50,50,0.1);  border: 1px solid rgba(184,50,50,0.25); color: var(--c-red); }

    /* ── Dots ── */
    .dots-row { display: flex; gap: 5px; justify-content: center; margin-bottom: 12px; }
    .dot-step { height: 4px; border-radius: 4px; flex: 1; max-width: 46px; background: var(--c-bg3); transition: all .35s; }
    .dot-step.done { background: var(--c-gold2); }
    .dot-step.now  { background: var(--c-gold3); box-shadow: 0 0 6px var(--c-gold-glow); }

    .result-wrap { padding: 0 0 40px; }
  </style>
</head>
<body>
<div class="app" id="app">

  <!-- INTRO -->
  <div id="screen-intro" class="screen active">
    <div class="intro">
      <div class="intro-icon">💰</div>
      <h1 class="intro-title">حدس قیمت</h1>
      <p class="intro-sub">
        ۶ ماشین — قیمت واقعی بازار رو حدس بزن<br>
        هرچی دقیق‌تر باشی، امتیاز بیشتری می‌گیری!
      </p>
      <div class="intro-chips">
        <span class="pill pill-gold">💵 واقعی</span>
        <span class="pill pill-accent">🎯 دقت مهمه</span>
        <span class="pill pill-muted">⏱️ ۲ دقیقه</span>
      </div>
      <button class="btn btn-gold" id="start-btn" style="max-width:280px;font-size:16px;padding:16px">
        🚀 شروع بازی
      </button>
      <div class="intro-meta">
        <span>🎯 ۶ دور</span>
        <span>🏆 امتیاز بر اساس دقت حدس</span>
      </div>
    </div>
  </div>

  <!-- GAME -->
  <div id="screen-game" class="screen">
    <div class="game-header" id="game-header"></div>
    <div id="game-content"></div>
  </div>

  <!-- RESULT -->
  <div id="screen-result" class="screen">
    <div class="result-wrap" id="result-content"></div>
  </div>

</div>

<script src="../../core/config.js"></script>
<script src="../../core/car-db.js"></script>
<script src="../../core/shared.js"></script>
<script src="../../core/lead-engine.js"></script>
<script src="../../assets/js/utils.js"></script>
<script>
/* ════════════════════════════════════════
   GAME META
   ════════════════════════════════════════ */
window.GAME_META = {
  id: 'price',
  name: 'حدس قیمت',
  icon: '💰',
  rounds: 6,
  estimatedTime: '۲ دقیقه',
  viralScore: 8,
  leadQuality: 9,
};

const ROUNDS = 6;

/* ════════════════════════════════════════
   STATE
   ════════════════════════════════════════ */
let state = {
  deck: [],
  idx: 0,
  score: 0,
  answered: false,
  results: [],
};

function resetState() {
  const all = CarIQDB.getAll().filter(c => Array.isArray(c.price_opts) && c.price_opts.length >= 2 && Array.isArray(c.price_vals) && c.price_vals.length === c.price_opts.length);
  const deck = CarIQShared.shuffle(all).slice(0, ROUNDS);
  state = { deck, idx: 0, score: 0, answered: false, results: [] };
}

/* ════════════════════════════════════════
   INIT
   ════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-btn').addEventListener('click', startGame);
  CarIQLeads.trackGameStart('price');
});

function startGame() {
  resetState();
  if (!state.deck.length) {
    alert('در حال حاضر خودرویی با اطلاعات قیمتی کافی در دیتابیس ثبت نشده. لطفاً از پنل ادمین گزینه‌های قیمت رو تکمیل کن.');
    return;
  }
  showScreen('screen-game');
  renderRound();
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ════════════════════════════════════════
   ROUND RENDER
   ════════════════════════════════════════ */
function renderRound() {
  if (state.idx >= state.deck.length) return showResult();

  const car = state.deck[state.idx];

  // header
  const hRoot = document.getElementById('game-header');
  hRoot.innerHTML = '';
  const { header, score } = CarIQShared.buildGameHeader({
    title: '💰 حدس قیمت',
    sub: `دور ${state.idx + 1} از ${ROUNDS}`,
    onBack: () => { if (confirm('از بازی خارج بشی؟')) window.location.href = '../../index.html'; },
  });
  score.textContent = `⭐ ${state.score}`;
  hRoot.appendChild(header);

  // content
  const root = document.getElementById('game-content');
  root.innerHTML = '';

  root.appendChild(CarIQShared.buildProgress(state.idx, ROUNDS));

  // HUD
  const ok = state.results.filter(r => r.tier === 'exact').length;
  const near = state.results.filter(r => r.tier === 'near').length;
  root.appendChild(CarIQShared.el('div', { class: 'hud' },
    CarIQShared.el('div', { class: 'hud-item ok' },
      CarIQShared.el('div', { class: 'hv' }, String(ok)),
      CarIQShared.el('div', { class: 'hl' }, 'دقیق')),
    CarIQShared.el('div', { class: 'hud-item' },
      CarIQShared.el('div', { class: 'hv' }, String(near)),
      CarIQShared.el('div', { class: 'hl' }, 'نزدیک')),
    CarIQShared.el('div', { class: 'hud-item pts' },
      CarIQShared.el('div', { class: 'hv' }, String(state.score)),
      CarIQShared.el('div', { class: 'hl' }, 'امتیاز')),
  ));

  // dots
  const dotsRow = CarIQShared.el('div', { class: 'dots-row' });
  for (let i = 0; i < ROUNDS; i++) {
    dotsRow.appendChild(CarIQShared.el('div', {
      class: 'dot-step' + (i < state.idx ? ' done' : i === state.idx ? ' now' : ''),
    }));
  }
  root.appendChild(dotsRow);

  // car stage
  const stage = CarIQShared.el('div', { class: 'price-stage pop-in' });
  const img = CarIQShared.el('img', { src: car.img, alt: car.name });
  img.onerror = () => { img.src = CarIQShared.svgPlaceholder(car.name); };
  const top = CarIQShared.el('div', { class: 'price-stage-top' },
    CarIQShared.el('span', { class: 'pill pill-muted' }, car.origin || car.brand || ''),
    CarIQShared.el('span', { class: 'pill pill-gold' }, `⭐ ${state.score}`),
  );
  const bottom = CarIQShared.el('div', { class: 'price-stage-bottom' },
    CarIQShared.el('div', { class: 'price-car-name' }, car.name),
    CarIQShared.el('div', { class: 'price-car-hints' }, (car.hints || []).slice(0, 3).join(' · ')),
  );
  stage.append(img, top, bottom);
  root.appendChild(stage);

  root.appendChild(CarIQShared.el('div', { class: 'price-q-text' }, '💵 قیمت واقعی این خودرو در بازار چقدره؟'));

  // options — shuffle order once per round but keep mapping to correct value
  if (!state.optOrder) {
    state.optOrder = CarIQShared.shuffle(car.price_opts.map((label, i) => ({ label, val: car.price_vals[i] })));
  }

  const opts = CarIQShared.el('div', { class: 'price-opts' });
  state.optOrder.forEach(o => {
    const btn = CarIQShared.el('button', { class: 'price-opt-btn' },
      CarIQShared.el('span', { class: 'price-opt-label' }, o.label),
      CarIQShared.el('span', { class: 'price-opt-arrow' }, '←'),
    );
    btn.addEventListener('click', () => answer(o, btn, opts, car));
    opts.appendChild(btn);
  });
  root.appendChild(opts);
}

/* ════════════════════════════════════════
   ANSWER — scoring by distance to real price
   ════════════════════════════════════════ */
function answer(picked, btn, opts, car) {
  if (state.answered) return;
  state.answered = true;

  const realVal = car.price_iran || Math.round(
    car.price_vals.reduce((s, v) => s + v, 0) / car.price_vals.length
  );

  // rank all options by closeness to real price
  const sorted = [...state.optOrder].sort((a, b) => Math.abs(a.val - realVal) - Math.abs(b.val - realVal));
  const closestVal = sorted[0].val;
  const diffPct = Math.abs(picked.val - realVal) / realVal;

  let tier, pts, feedbackCls, feedbackText;
  if (picked.val === closestVal && diffPct <= 0.08) {
    tier = 'exact'; pts = 50; feedbackCls = 'exact'; feedbackText = `🎯 دقیق زدی! +${pts} امتیاز`;
  } else if (diffPct <= 0.2) {
    tier = 'near'; pts = 25; feedbackCls = 'near'; feedbackText = `👍 نزدیک بود! +${pts} امتیاز`;
  } else {
    tier = 'miss'; pts = 0; feedbackCls = 'miss'; feedbackText = `❌ فاصله زیاد بود`;
  }

  state.score += pts;
  state.results.push({ name: car.name, tier, pts, picked: picked.label });

  [...opts.children].forEach((b, i) => {
    b.disabled = true;
    const o = state.optOrder[i];
    if (o.val === closestVal) b.classList.add('correct');
    else if (o === picked && tier !== 'exact') b.classList.add(tier === 'near' ? 'close' : 'wrong');
  });

  const root = document.getElementById('game-content');
  const fb = CarIQShared.el('div', { class: 'price-feedback ' + feedbackCls }, feedbackText);
  root.insertBefore(fb, root.querySelector('.price-opts'));

  if (tier !== 'miss') CarIQShared.showScoreFly(pts);

  setTimeout(() => {
    state.idx++;
    state.answered = false;
    state.optOrder = null;
    renderRound();
  }, 1800);
}

/* ════════════════════════════════════════
   RESULT
   ════════════════════════════════════════ */
function showResult() {
  const exact = state.results.filter(r => r.tier === 'exact').length;
  const near = state.results.filter(r => r.tier === 'near').length;
  const miss = state.results.filter(r => r.tier === 'miss').length;
  const pct = Math.round((exact / ROUNDS) * 100);

  let emoji, rank, rankCls;
  if (exact >= 5) { emoji = '🏆'; rank = 'کارشناس بازار خودرو!'; rankCls = 'pill-gold'; }
  else if (exact + near >= 4) { emoji = '🔥'; rank = 'اهل بازاری!'; rankCls = 'pill-green'; }
  else { emoji = '😅'; rank = 'بازار رو نمی‌شناسی — تمرین کن!'; rankCls = 'pill-muted'; }

  CarIQLeads.trackGameEnd('price', `${exact}/${ROUNDS} دقیق`);
  CarIQLeads.mergeProfile({ priceScore: state.score, priceAccuracy: pct });

  showScreen('screen-result');
  const root = document.getElementById('result-content');
  root.innerHTML = '';

  const hero = CarIQShared.el('div', { class: 'result-hero pop-in' });
  hero.appendChild(CarIQShared.buildResultRing(pct));
  hero.appendChild(CarIQShared.el('div', { class: 'result-title' }, `${emoji} ${state.score} امتیاز`));
  hero.appendChild(CarIQShared.el('span', { class: 'pill ' + rankCls, style: { marginBottom: '10px', display: 'inline-flex' } }, rank));
  hero.appendChild(CarIQShared.el('div', { class: 'result-sub' }, `${exact} حدس دقیق، ${near} نزدیک، ${miss} دور از واقعیت`));
  hero.appendChild(CarIQShared.buildStatRow([
    [exact, 'دقیق'],
    [near, 'نزدیک'],
    [state.score, 'امتیاز کل'],
  ]));

  const chips = CarIQShared.el('div', { class: 'score-chips' });
  state.results.forEach((r, i) => {
    const cls = r.tier === 'exact' ? 'chip-ok' : r.tier === 'near' ? 'chip-mid' : 'chip-no';
    chips.appendChild(CarIQShared.el('span', { class: 'chip ' + cls },
      `${i + 1}. ${r.tier === 'miss' ? '✗' : '+' + r.pts}`));
  });
  hero.appendChild(chips);

  root.appendChild(hero);

  const pa = CarIQShared.el('button', { class: 'btn btn-outline mt12' }, '🔄 دوباره بازی کن');
  pa.addEventListener('click', () => { resetState(); showScreen('screen-game'); renderRound(); });
  root.appendChild(pa);

  root.appendChild(CarIQShared.buildLeadBox({
    source: 'price',
    resultText: `${exact}/${ROUNDS} دقیق — ${state.score}pts`,
    ctaMsg: `سلام! تو بازی «حدس قیمت» ${exact} از ${ROUNDS} رو دقیق زدم و ${state.score} امتیاز گرفتم. می‌خوام قیمت واقعی واردات رو بدونم 💰`,
    sharePayload: {
      emoji: emoji,
      imgSrc: state.deck.length ? state.deck[state.deck.length - 1].img : '',
      colorFrom: '#3a2508', colorTo: '#5c3d10',
      kicker: 'نتیجه‌ی بازی «حدس قیمت»',
      title: `${state.score} امتیاز`,
      subtitle: rank,
      desc: `${exact} حدس دقیق، ${near} نزدیک از ${ROUNDS} دور`,
      stats: [
        { val: exact, label: 'دقیق' },
        { val: near, label: 'نزدیک' },
      ],
      text: `تو بازی «حدس قیمت» ${state.score} امتیاز گرفتم و ${exact} از ${ROUNDS} قیمت رو دقیق زدم! تو چند تا رو درست می‌زنی؟ 💰`,
    },
  }));
}
</script>
</body>
</html>

```

</FILE>

---

<FILE path="index.html" tokens="2046" lines="167">

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
  <title>CarIQ — بازی‌های ماشین</title>
  <link rel="stylesheet" href="assets/css/tokens.css"/>
  <link rel="stylesheet" href="assets/css/base.css"/>
  <link rel="stylesheet" href="assets/css/components.css"/>
  <style>
    .lobby-header { padding:28px 14px 20px; text-align:center; }
    .lobby-logo {
      display:inline-flex; align-items:center; gap:10px;
      background:linear-gradient(135deg,var(--c-gold2),var(--c-gold));
      border-radius:var(--r-sm); padding:10px 22px; margin-bottom:14px;
      box-shadow:var(--shadow-gold);
    }
    .lobby-logo-txt { font-size:22px; font-weight:900; color:var(--c-on-gold); letter-spacing:.05em; }
    .lobby-title  { font-size:24px; font-weight:900; margin-bottom:4px; }
    .lobby-sub    { font-size:13px; color:var(--c-muted); }
    .lobby-chips  { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-top:12px; }

    .games-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:0 14px 14px; }
    .game-card  {
      background:var(--c-card); border:1.5px solid var(--c-border); border-radius:var(--r);
      padding:18px 14px; cursor:pointer; text-decoration:none; color:inherit;
      transition:all .22s var(--ease-spring); position:relative; overflow:hidden; display:block;
    }
    .game-card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,var(--c-gold3),transparent); opacity:0; transition:opacity .22s; }
    .game-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-gold); border-color:var(--c-gold2); }
    .game-card:hover::before { opacity:.06; }
    .game-card:active { transform:scale(0.97); }
    .game-card .gc-icon { font-size:2.4rem; margin-bottom:10px; }
    .game-card .gc-name { font-size:14px; font-weight:800; margin-bottom:4px; }
    .game-card .gc-desc { font-size:11px; color:var(--c-muted); line-height:1.5; }
    .game-card .gc-badge { position:absolute; top:10px; left:10px; font-size:9px; font-weight:700; padding:3px 8px; border-radius:999px; background:rgba(184,134,11,0.15); color:var(--c-gold); border:1px solid rgba(184,134,11,0.25); }
    .game-card.featured { grid-column:1/-1; display:flex; align-items:center; gap:16px; padding:20px; }
    .game-card.featured .gc-icon { font-size:3rem; margin-bottom:0; flex-shrink:0; }
    .game-card.featured .gc-name { font-size:16px; }
    .game-card.disabled { opacity:.45; pointer-events:none; }

    .contact-strip {
      margin:4px 14px 14px; padding:16px;
      background:linear-gradient(135deg,#2c1810,#4a3020);
      border-radius:var(--r); display:flex; align-items:center; gap:14px;
      cursor:pointer; box-shadow:var(--shadow-lg);
    }
    .contact-strip-text { flex:1; }
    .contact-strip-title { font-size:14px; font-weight:800; color:#fff; margin-bottom:2px; }
    .contact-strip-sub   { font-size:12px; color:rgba(255,255,255,0.5); }
    .contact-strip-icon  { font-size:28px; }
    .lobby-footer { padding:14px; text-align:center; font-size:11px; color:var(--c-muted2); }
  </style>
</head>
<body>
<div class="app" id="app">
  <!-- هدر -->
  <div class="lobby-header" id="lobby-header"></div>

  <!-- گرید بازی‌ها -->
  <div class="games-grid" id="games-grid"></div>

  <!-- نوار تماس -->
  <div class="contact-strip" id="contact-strip">
    <span class="contact-strip-icon">🚀</span>
    <div class="contact-strip-text">
      <div class="contact-strip-title">ماشین وارداتی می‌خوای؟</div>
      <div class="contact-strip-sub">مشاوره رایگان — قشم و دبی</div>
    </div>
    <span style="color:rgba(255,255,255,0.3);font-size:18px">›</span>
  </div>

  <div class="lobby-footer" id="lobby-footer">CarIQ Platform v1.0</div>
</div>

<!-- مدال تماس -->
<div class="modal-overlay" id="contact-modal">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div class="modal-title">مشاوره رایگان خودرو</div>
    <div class="modal-sub">با کارشناسان قشم کار تماس بگیر<br>واردات مستقیم از قشم و دبی</div>
    <div id="contact-modal-body"></div>
    <button class="modal-close" id="contact-modal-close">بستن</button>
  </div>
</div>

<script src="core/config.js"></script>
<script src="core/car-db.js"></script>
<script src="core/shared.js"></script>
<script src="core/lead-engine.js"></script>
<script src="assets/js/utils.js"></script>
<script>
const GAME_CATALOG = [
  { id:'personality', icon:'🧬', name:'کدوم ماشین تویی؟',  desc:'تست شخصیت — دقیق و وایرال',       badge:'🔥 وایرال', featured:true  },
  { id:'blur',        icon:'🔍', name:'ماشین از پشت مه',    desc:'تصویر تار — با هر جواب واضح‌تر', badge:'محبوب',     featured:false },
  { id:'price',       icon:'💰', name:'حدس قیمت',           desc:'قیمت واقعی از قشم و دبی رو بزن',   badge:'جدید',      featured:false },
  { id:'speed',       icon:'⚡', name:'اسپید راند',         desc:'۱۰ ثانیه برای هر جواب!',           badge:'آدرنالین',  featured:false },
  { id:'wheel',       icon:'🎡', name:'چرخ شانس',           desc:'بچرخون و جایزه ببر',               badge:'هیجانی',    featured:false },
  { id:'compare',     icon:'⚖️', name:'کدوم گرون‌تره؟',     desc:'حدس بزن کدوم ماشین گرون‌تره',      badge:'چالشی',     featured:false },
];

document.addEventListener('DOMContentLoaded', () => {
  const cfg = CarIQConfig.get();

  // هدر
  const hdr = document.getElementById('lobby-header');
  hdr.innerHTML = `
    <div class="lobby-logo"><span style="font-size:20px">🚗</span><span class="lobby-logo-txt">CarIQ</span></div>
    <div class="lobby-title">${cfg.lobby_title}</div>
    <div class="lobby-sub">${cfg.lobby_subtitle}</div>
    <div class="lobby-chips">
      <a class="pill pill-muted" href="https://t.me/${cfg.contact.telegram.replace('@','')}" target="_blank">📱 ${cfg.contact.telegram}</a>
      <a class="pill pill-muted" href="tel:${cfg.contact.phone}">📞 تماس مستقیم</a>
    </div>`;

  // بازی‌ها
  const grid = document.getElementById('games-grid');
  const enabled = cfg.games_enabled;
  const ordered = cfg.games_order.map(id => GAME_CATALOG.find(g => g.id === id)).filter(Boolean);
  const rest     = GAME_CATALOG.filter(g => !cfg.games_order.includes(g.id));
  const catalog  = [...ordered, ...rest];

  catalog.forEach(game => {
    const isEnabled = enabled.includes(game.id);
    const card = document.createElement('a');
    card.href = `games/${game.id}/index.html`;
    card.className = `game-card${game.featured ? ' featured' : ''}${!isEnabled ? ' disabled' : ''}`;
    card.innerHTML = `
      <div class="gc-badge">${game.badge}</div>
      <div class="gc-icon">${game.icon}</div>
      <div>
        <div class="gc-name">${game.name}</div>
        <div class="gc-desc">${game.desc}${!isEnabled ? '<br><em style="color:var(--c-red)">به زودی...</em>' : ''}</div>
      </div>`;
    grid.appendChild(card);
  });

  // فوتر
  document.getElementById('lobby-footer').textContent = `${cfg.brand_name} v1.0 | ${cfg.contact.telegram}`;

  // نوار تماس
  document.getElementById('contact-strip').addEventListener('click', () => {
    document.getElementById('contact-modal').classList.add('open');
  });

  // مدال تماس
  const body = document.getElementById('contact-modal-body');
  body.innerHTML = `
    <a href="https://t.me/${cfg.contact.telegram.replace('@','')}" target="_blank" class="share-channel" style="margin-bottom:8px">
      <div class="share-channel-icon">✈️</div>
      <div><div class="share-channel-label">تلگرام</div><div class="share-channel-sub">${cfg.contact.telegram}</div></div>
    </a>
    <a href="tel:${cfg.contact.phone}" class="share-channel">
      <div class="share-channel-icon">📞</div>
      <div><div class="share-channel-label">تماس مستقیم</div><div class="share-channel-sub">${cfg.contact.phone}</div></div>
    </a>`;
  document.getElementById('contact-modal-close').addEventListener('click', () => {
    document.getElementById('contact-modal').classList.remove('open');
  });
  document.getElementById('contact-modal').addEventListener('click', e => {
    if (e.target.id === 'contact-modal') e.target.classList.remove('open');
  });
});
</script>
</body>
</html>

```

</FILE>
