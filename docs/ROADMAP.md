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
