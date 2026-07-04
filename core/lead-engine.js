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
