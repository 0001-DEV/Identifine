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

  // Extract excerpt
  let rawExcerpt = post.excerpt ? post.excerpt.rendered.replace(/<[^>]+>/g, '') : '';
  let cleanExcerpt = decodeEntities(rawExcerpt).trim() || textContent.trim().slice(0, 120);

  return {
    id: post.id,
    slug: post.slug || `post-${post.id}`,
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

  // 1. Check in-memory or sessionStorage cache first for instant load
  if (memoryCache[cacheKey]) {
    // Return cached immediately, trigger background refresh silently
    revalidateWpPosts(cacheKey, query);
    return memoryCache[cacheKey];
  }

  try {
    const saved = sessionStorage.getItem(cacheKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      memoryCache[cacheKey] = parsed;
      revalidateWpPosts(cacheKey, query);
      return parsed;
    }
  } catch (e) {
    // Ignore storage quota errors
  }

  // 2. Network fetch if no cache exists
  return await revalidateWpPosts(cacheKey, query);
}

async function revalidateWpPosts(cacheKey, query) {
  try {
    let res = await fetch(`${WP_BASE_URL}${query}`);
    if (!res.ok && WP_BASE_URL !== 'https://identifine.com.ng/wp-json/wp/v2') {
      res = await fetch(`https://identifine.com.ng/wp-json/wp/v2${query}`);
    }
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    const formatted = data.map(formatPost);
    
    memoryCache[cacheKey] = formatted;
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
    } catch (e) {}

    return formatted;
  } catch (error) {
    try {
      const directRes = await fetch(`https://identifine.com.ng/wp-json/wp/v2${query}`);
      if (directRes.ok) {
        const data = await directRes.json();
        const formatted = data.map(formatPost);
        memoryCache[cacheKey] = formatted;
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
        } catch (e) {}
        return formatted;
      }
    } catch (err) {
      console.warn('Could not fetch posts from WordPress API:', err);
    }
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
    const saved = sessionStorage.getItem(cacheKey);
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
    let res = await fetch(`${WP_BASE_URL}${query}`);
    if (!res.ok && WP_BASE_URL !== 'https://identifine.com.ng/wp-json/wp/v2') {
      res = await fetch(`https://identifine.com.ng/wp-json/wp/v2${query}`);
    }
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data && data.length > 0) {
      const formatted = formatPost(data[0]);
      memoryCache[cacheKey] = formatted;
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
      } catch (e) {}
      return formatted;
    }
    return memoryCache[cacheKey] || null;
  } catch (error) {
    try {
      const directRes = await fetch(`https://identifine.com.ng/wp-json/wp/v2${query}`);
      if (directRes.ok) {
        const data = await directRes.json();
        if (data && data.length > 0) {
          const formatted = formatPost(data[0]);
          memoryCache[cacheKey] = formatted;
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(formatted));
          } catch (e) {}
          return formatted;
        }
      }
    } catch (err) {
      console.warn(`Could not fetch post '${slug}' from WordPress API:`, err);
    }
    return memoryCache[cacheKey] || null;
  }
}
