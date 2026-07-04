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
