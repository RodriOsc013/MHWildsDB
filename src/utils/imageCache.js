const cache = new Set();
export function preloadImage(url) {
  if (!url || cache.has(url)) return;
  const img = new Image();
  img.src = url;
  cache.add(url);
}