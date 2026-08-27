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

/**
 * Fetch list of published posts from WordPress
 */
export async function fetchWpPosts(page = 1, perPage = 12) {
  try {
    const res = await fetch(`${WP_BASE_URL}/posts?_embed=true&page=${page}&per_page=${perPage}&status=publish`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.map(formatPost);
  } catch (error) {
    console.warn('Could not fetch posts from WordPress API, using fallback data.', error);
    return null; // Return null so UI can fallback
  }
}

/**
 * Fetch a single post by slug from WordPress
 */
export async function fetchWpPostBySlug(slug) {
  try {
    const res = await fetch(`${WP_BASE_URL}/posts?_embed=true&slug=${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data && data.length > 0) {
      return formatPost(data[0]);
    }
    return null;
  } catch (error) {
    console.warn(`Could not fetch post '${slug}' from WordPress API:`, error);
    return null;
  }
}
