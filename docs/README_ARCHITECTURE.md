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
