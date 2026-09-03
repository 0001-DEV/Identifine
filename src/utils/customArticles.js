const LOCAL_STORAGE_KEY = 'identifine_custom_articles';

export function getCustomArticles() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function saveCustomArticles(articles) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event('identifine_articles_updated'));
  } catch (e) {}
}
