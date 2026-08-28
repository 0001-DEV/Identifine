/**
 * Authentic Rank Math Pro SEO Engine (100-Point Official WordPress Scoring Matrix)
 */

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugify(text = '') {
  return text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

const POWER_WORDS = [
  'ultimate', 'best', 'top', 'essential', 'proven', 'complete', 'guide',
  'simple', 'powerful', 'fast', 'free', 'exclusive', 'secret', 'incredible',
  'stunning', 'effortless', 'guaranteed', 'modern', 'smart', 'expert'
];

export function analyzeSeo({
  title = '',
  slug = '',
  excerpt = '',
  content = '',
  focusKeyword = '',
  sections = [],
  seoTitle = '',
  metaDesc = '',
  hasImage = false,
}) {
  const keyword = (focusKeyword || '').toLowerCase().trim();
  const titleText = (seoTitle || title || '').trim();
  const slugText = (slug || slugify(title)).toLowerCase().trim();
  const plainContent = stripHtml(content);
  const excerptText = (metaDesc || excerpt || plainContent.slice(0, 160)).trim();
  
  // Combine all article text: main write-up + excerpt + sub-topic sections
  const fullContent = [
    plainContent,
    excerptText,
    ...sections.map(s => `${s.heading || ''} ${stripHtml(s.body || '')}`)
  ].join(' ').replace(/\s+/g, ' ').trim();

  // Word count & Read time
  const words = fullContent ? fullContent.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // If no focus keyword specified yet
  if (!keyword) {
    let structuralScore = 0;
    if (titleText.length >= 10) structuralScore += 15;
    if (wordCount >= 300) structuralScore += 20;
    if (wordCount >= 600) structuralScore += 15;
    if (hasImage) structuralScore += 10;
    if (excerptText.length >= 50) structuralScore += 10;

    return {
      score: Math.min(structuralScore, 50),
      grade: 'Poor',
      color: '#ef4444',
      wordCount,
      readTimeMinutes,
      keywordDensity: 0,
      checks: [
        { id: 'no_keyword', label: 'Enter a Focus Keyword to unlock full Rank Math SEO analysis', pass: false, category: 'General' },
        { id: 'title_length', label: titleText.length >= 10 ? 'Title length is adequate' : 'Title is too short', pass: titleText.length >= 10, category: 'Basic SEO' },
        { id: 'content_length', label: wordCount >= 600 ? `Good content length (${wordCount} words)` : wordCount >= 300 ? `Acceptable content length (${wordCount} words)` : `Content is ${wordCount} words (Recommended: 600+ words)`, pass: wordCount >= 300, category: 'Basic SEO' },
      ],
      serp: {
        title: titleText || 'Article Title - Identifine',
        url: `https://identifine.com.ng/blog/${slugText || 'your-article-slug'}`,
        description: excerptText || 'Add a meta description to see how your article snippet will appear in Google search results.'
      }
    };
  }

  // Escape keyword for regex matching
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const kwSlugified = slugify(keyword);

  // Keyword occurrences in content
  const kwRegex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
  const occurrences = (fullContent.match(kwRegex) || []).length;
  const keywordDensity = wordCount > 0 ? parseFloat(((occurrences / wordCount) * 100).toFixed(2)) : 0;

  // Introduction text (first 400 chars)
  const introText = fullContent.slice(0, 400).toLowerCase();
  const hasKwInIntro = introText.includes(keyword);

  const checks = [];
  let score = 0;

  // ── 1. BASIC SEO (40 Points) ────────────────────────────────────────────────
  
  // Focus Keyword in SEO Title (10 pts)
  const hasKwInTitle = titleText.toLowerCase().includes(keyword);
  score += hasKwInTitle ? 10 : 0;
  checks.push({
    id: 'kw_in_title',
    label: hasKwInTitle ? 'Focus Keyword used in the SEO Title' : 'Focus Keyword not found in SEO Title',
    pass: hasKwInTitle,
    category: 'Basic SEO',
  });

  // Focus Keyword in Meta Description (10 pts)
  const hasKwInMeta = excerptText.toLowerCase().includes(keyword);
  score += hasKwInMeta ? 10 : 0;
  checks.push({
    id: 'kw_in_meta',
    label: hasKwInMeta ? 'Focus Keyword used in Meta Description' : 'Focus Keyword not found in Meta Description',
    pass: hasKwInMeta,
    category: 'Basic SEO',
  });

  // Focus Keyword in URL Slug (5 pts)
  const hasKwInSlug = slugText.includes(kwSlugified) || slugText.includes(keyword.replace(/\s+/g, '-'));
  score += hasKwInSlug ? 5 : 0;
  checks.push({
    id: 'kw_in_slug',
    label: hasKwInSlug ? 'Focus Keyword used in URL Slug' : 'Focus Keyword not found in URL Slug',
    pass: hasKwInSlug,
    category: 'Basic SEO',
  });

  // Focus Keyword in Introduction (5 pts)
  score += hasKwInIntro ? 5 : 0;
  checks.push({
    id: 'kw_in_intro',
    label: hasKwInIntro ? 'Focus Keyword appears in the Introduction' : 'Focus Keyword not found in Introduction',
    pass: hasKwInIntro,
    category: 'Basic SEO',
  });

  // Content Length (10 pts)
  const isGoodLength = wordCount >= 600;
  const isOkLength = wordCount >= 300;
  score += isGoodLength ? 10 : isOkLength ? 5 : 0;
  checks.push({
    id: 'content_length',
    label: isGoodLength
      ? `Good content length (${wordCount} words)`
      : isOkLength
      ? `Acceptable content length (${wordCount} words)`
      : `Content is ${wordCount} words (Recommended: 600+ words)`,
    pass: isOkLength,
    category: 'Basic SEO',
  });

  // ── 2. ADDITIONAL SEO (30 Points) ──────────────────────────────────────────

  // Subheadings (H1, H2, H3)
  const subheadings = (content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || [])
    .concat(sections.map(s => s.heading));
  const hasSubheadings = subheadings.length > 0;
  const kwInSubheading = subheadings.some(h => (h || '').toLowerCase().includes(keyword));
  score += kwInSubheading ? 8 : hasSubheadings ? 4 : 0;
  checks.push({
    id: 'kw_in_subheadings',
    label: kwInSubheading
      ? 'Focus Keyword found in Subheading'
      : hasSubheadings
      ? 'Focus Keyword not found in Subheadings'
      : 'Use subheadings (H2, H3) to structure your content',
    pass: kwInSubheading,
    category: 'Additional SEO',
  });

  // Keyword Density (0.8% - 2.5%) (8 pts)
  const isOptimalDensity = keywordDensity >= 0.5 && keywordDensity <= 3.0;
  score += isOptimalDensity ? 8 : occurrences > 0 ? 4 : 0;
  checks.push({
    id: 'kw_density',
    label: isOptimalDensity
      ? `Keyword Density is optimal (${keywordDensity}%)`
      : occurrences > 0
      ? `Keyword Density is ${keywordDensity}% (Optimal: 0.8% - 2.5%)`
      : `Focus Keyword not found in body text (${occurrences} occurrences)`,
    pass: isOptimalDensity,
    category: 'Additional SEO',
  });

  // URL Length (4 pts)
  const isShortSlug = slugText.length <= 75;
  score += isShortSlug ? 4 : 2;
  checks.push({
    id: 'slug_length',
    label: isShortSlug ? `URL Slug length is concise (${slugText.length} chars)` : 'URL Slug is a bit long',
    pass: isShortSlug,
    category: 'Additional SEO',
  });

  // Outbound & Internal Links (5 pts)
  const hasLinks = content.includes('href=') || content.includes('http');
  score += hasLinks ? 5 : 2;
  checks.push({
    id: 'has_links',
    label: hasLinks ? 'Content contains links' : 'Add external or internal links to your content',
    pass: hasLinks,
    category: 'Additional SEO',
  });

  // Featured Image / Media (5 pts)
  const containsImage = hasImage || content.includes('<img') || content.includes('![');
  score += containsImage ? 5 : 0;
  checks.push({
    id: 'has_media',
    label: containsImage ? 'Content contains image or video media' : 'Add media (images) to enhance user engagement',
    pass: containsImage,
    category: 'Additional SEO',
  });

  // ── 3. TITLE READABILITY (15 Points) ────────────────────────────────────────

  // Focus Keyword at start of Title (5 pts)
  const kwAtStartOfTitle = titleText.toLowerCase().startsWith(keyword);
  score += kwAtStartOfTitle ? 5 : hasKwInTitle ? 3 : 0;
  checks.push({
    id: 'kw_start_title',
    label: kwAtStartOfTitle ? 'Focus Keyword is at the start of Title' : 'Focus Keyword used in Title',
    pass: hasKwInTitle,
    category: 'Title Readability',
  });

  // Title Length (45 - 65 chars) (5 pts)
  const isTitleLengthOk = titleText.length >= 35 && titleText.length <= 65;
  score += isTitleLengthOk ? 5 : 2;
  checks.push({
    id: 'title_length',
    label: isTitleLengthOk
      ? `Title length is optimal (${titleText.length} characters)`
      : `Title length is ${titleText.length} characters (Optimal: 45-65 characters)`,
    pass: isTitleLengthOk,
    category: 'Title Readability',
  });

  // Power Word or Number in Title (5 pts)
  const hasNumber = /\d+/.test(titleText);
  const hasPowerWord = POWER_WORDS.some(pw => titleText.toLowerCase().includes(pw));
  score += (hasNumber || hasPowerWord) ? 5 : 0;
  checks.push({
    id: 'title_power_word',
    label: (hasNumber || hasPowerWord)
      ? 'SEO Title contains a Power Word or Number'
      : 'Try adding a Power Word or Number to your SEO Title',
    pass: hasNumber || hasPowerWord,
    category: 'Title Readability',
  });

  // ── 4. CONTENT READABILITY (15 Points) ──────────────────────────────────────
  score += wordCount > 0 ? 15 : 0;
  checks.push({
    id: 'readability_paragraphs',
    label: wordCount > 0 ? 'Content is readable and well structured' : 'Add text to your article body',
    pass: wordCount > 0,
    category: 'Content Readability',
  });

  const finalScore = Math.min(100, Math.max(0, score));
  const color = finalScore >= 80 ? '#00b32c' : finalScore >= 50 ? '#f59e0b' : '#ef4444';
  const grade = finalScore >= 80 ? 'Great' : finalScore >= 50 ? 'Fair' : 'Poor';

  return {
    score: finalScore,
    grade,
    color,
    wordCount,
    readTimeMinutes,
    keywordDensity,
    checks,
    serp: {
      title: titleText || 'Article Title - Identifine',
      url: `https://identifine.com.ng/blog/${slugText || 'your-article-slug'}`,
      description: excerptText || 'Add a meta description to see how your article snippet will appear in Google search results.'
    }
  };
}
