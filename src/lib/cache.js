// src/lib/cache.js
const CACHE_TTL = 10 * 60 * 1000; // 10 min localStorage cache

export function cacheSet(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch (_) {}
}

export function cacheGet(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    return Date.now() - ts > CACHE_TTL ? null : data;
  } catch (_) { return null; }
}