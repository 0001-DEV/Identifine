/**
 * WordPress REST API Integration for Identifine.com.ng
 */

// Use local Vite proxy during local dev to bypass browser CORS rules
const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const WP_BASE_URL = isLocal ? '/wp-api' : 'https://identifine.com.ng/wp-json/wp/v2';

/**
 * Utility to decode HTML entities (e.g. &#8217; -> ', &amp; -> &)
 */
function decodeEntities(html) {
  if (!html) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

/**
 * Helper to convert title into clean URL slug (e.g. "How NFC Cards Work" -> "how-nfc-cards-work")
 */
function slugifyTitle(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format WordPress Post object into React clean structure
 */
function formatPost(post) {
  if (!post) return null;

  // Extract featured image URL if present
  let featuredImage = null;
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
  }

  // Extract category name
  let categoryName = 'Article';
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0]) {
    categoryName = post._embedded['wp:term'][0][0].name;
  }

  // Format date
  const postDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate read time based on word count
  const textContent = post.content ? post.content.rendered.replace(/<[^>]+>/g, '') : '';
  const wordCount = textContent.trim().split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Extract clean title
  let rawTitle = post.title ? post.title.rendered : '';
  let cleanTitle = decodeEntities(rawTitle).trim();
  if (!cleanTitle) {
    cleanTitle = textContent.trim().slice(0, 40) || 'Untitled Post';
  }

  // Ensure slug is always a human-readable title slug, never raw numbers like '3988-2' or '1234'
  const isNumericOrDefaultSlug = !post.slug || /^\d+(-\d+)?$/.test(post.slug) || post.slug.startsWith('post-');
  const finalSlug = isNumericOrDefaultSlug && cleanTitle ? slugifyTitle(cleanTitle) : post.slug;

  // Extract excerpt
  let rawExcerpt = post.excerpt ? post.excerpt.rendered.replace(/<[^>]+>/g, '') : '';
  let cleanExcerpt = decodeEntities(rawExcerpt).trim() || textContent.trim().slice(0, 120);

  return {
    id: post.id,
    slug: finalSlug,
    title: cleanTitle,
    date: postDate,
    rawDate: post.date,
    modifiedDate: post.modified || post.date,
    readTime: `${readTimeMinutes} min read`,
    category: decodeEntities(categoryName),
    featured: false,
    image: featuredImage,
    excerpt: cleanExcerpt,
    contentHtml: post.content ? post.content.rendered : '',
    // Rank Math / Yoast SEO Meta Tags if available
    yoastHead: post.yoast_head || null,
    yoastHeadJson: post.yoast_head_json || null,
    rankMathSeo: post.rank_math_seo || null,
    link: post.link
  };
}

// In-memory cache for instant response within session
const memoryCache = {};

/**
 * Fetch list of published posts from WordPress (Latest updated/modified first)
 * Uses instant cache + background revalidation for maximum speed
 */
export async function fetchWpPosts(page = 1, perPage = 12) {
  const cacheKey = `wp_posts_${page}_${perPage}`;
  const query = `/posts?_embed=true&page=${page}&per_page=${perPage}&status=publish&orderby=modified&order=desc`;

  // 1. Check in-memory, localStorage, or sessionStorage cache first for instant load
  if (memoryCache[cacheKey]) {
    revalidateWpPosts(cacheKey, query);
    return memoryCache[cacheKey];
  }

  try {
    const saved = localStorage.getItem(cacheKey) || sessionStorage.getItem(cacheKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.length > 0) {
        memoryCache[cacheKey] = parsed;
        revalidateWpPosts(cacheKey, query);
        return parsed;
      }
    }
  } catch (e) {
    // Ignore storage quota errors
  }

  // 2. Network fetch if no cache exists
  return await revalidateWpPosts(cacheKey, query);
}

/**
 * Utility function to fetch with a strict timeout to prevent long hangs
 * Default 9000ms gives shared hosting WordPress sufficient time without aborting early
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 9000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

async function revalidateWpPosts(cacheKey, query) {
  try {
    const res = await fetchWithTimeout(`${WP_BASE_URL}${query}`, {}, 9000);
    if (!res.ok) throw new Error(`HTTP status ${res.status}`);
    const data = await res.json();
    const formatted = data.map(formatPost);
    
    memoryCache[cacheKey] = formatted;
    try {
      localStorage.setItem(cacheKey, JSON.stringify(formatted));
      sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
    } catch (e) {}

    // Notify React components in real time so UI updates without requiring page refresh
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('identifine_wp_posts_updated', { detail: formatted }));
    }

    return formatted;
  } catch (error) {
    if (WP_BASE_URL !== 'https://identifine.com.ng/wp-json/wp/v2') {
      try {
        const directRes = await fetchWithTimeout(`https://identifine.com.ng/wp-json/wp/v2${query}`, {}, 9000);
        if (directRes.ok) {
          const data = await directRes.json();
          const formatted = data.map(formatPost);
          memoryCache[cacheKey] = formatted;
          try {
            localStorage.setItem(cacheKey, JSON.stringify(formatted));
            sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
          } catch (e) {}
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('identifine_wp_posts_updated', { detail: formatted }));
          }
          return formatted;
        }
      } catch (err) {}
    }
    console.warn('WordPress API unreachable, using local fallback:', error?.message || error);
    return memoryCache[cacheKey] || null;
  }
}

/**
 * Fetch a single post by slug from WordPress with instant cache
 */
export async function fetchWpPostBySlug(slug) {
  const cacheKey = `wp_post_${slug}`;
  const query = `/posts?_embed=true&slug=${encodeURIComponent(slug)}`;

  if (memoryCache[cacheKey]) {
    revalidateWpPostBySlug(cacheKey, query, slug);
    return memoryCache[cacheKey];
  }

  try {
    const saved = localStorage.getItem(cacheKey) || sessionStorage.getItem(cacheKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      memoryCache[cacheKey] = parsed;
      revalidateWpPostBySlug(cacheKey, query, slug);
      return parsed;
    }
  } catch (e) {}

  return await revalidateWpPostBySlug(cacheKey, query, slug);
}

async function revalidateWpPostBySlug(cacheKey, query, slug) {
  try {
    const res = await fetchWithTimeout(`${WP_BASE_URL}${query}`, {}, 9000);
    if (!res.ok) throw new Error(`HTTP status ${res.status}`);
    const data = await res.json();
    if (data && data.length > 0) {
      const formatted = formatPost(data[0]);
      memoryCache[cacheKey] = formatted;
      try {
        localStorage.setItem(cacheKey, JSON.stringify(formatted));
        sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
      } catch (e) {}
      return formatted;
    }

    // Fallback: If WP single-slug query returns 0 items (because WP slug is numeric e.g. 3988-2),
    // search the recent posts list where formatPost converted numeric slugs to title slugs!
    const allPosts = await fetchWpPosts(1, 20);
    if (allPosts && allPosts.length > 0) {
      const found = allPosts.find(
        (p) => p.slug === slug || String(p.id) === String(slug) || (p.link && p.link.includes(slug))
      );
      if (found) {
        memoryCache[cacheKey] = found;
        try {
          localStorage.setItem(cacheKey, JSON.stringify(found));
          sessionStorage.setItem(cacheKey, JSON.stringify(found));
        } catch (e) {}
        return found;
      }
    }

    return memoryCache[cacheKey] || null;
  } catch (error) {
    if (WP_BASE_URL !== 'https://identifine.com.ng/wp-json/wp/v2') {
      try {
        const directRes = await fetchWithTimeout(`https://identifine.com.ng/wp-json/wp/v2${query}`, {}, 9000);
        if (directRes.ok) {
          const data = await directRes.json();
          if (data && data.length > 0) {
            const formatted = formatPost(data[0]);
            memoryCache[cacheKey] = formatted;
            try {
              localStorage.setItem(cacheKey, JSON.stringify(formatted));
              sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
            } catch (e) {}
            return formatted;
          }
        }
      } catch (err) {}
    }

    // Fallback search direct
    try {
      const allPosts = await fetchWpPosts(1, 20);
      if (allPosts && allPosts.length > 0) {
        const found = allPosts.find(
          (p) => p.slug === slug || String(p.id) === String(slug) || (p.link && p.link.includes(slug))
        );
        if (found) {
          memoryCache[cacheKey] = found;
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(found));
          } catch (e) {}
          return found;
        }
      }
    } catch (e) {}

    console.warn(`WordPress API unreachable for '${slug}', using local fallback:`, error?.message || error);
    return memoryCache[cacheKey] || null;
  }
}

