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
  const manualKeyword = (focusKeyword || '').toLowerCase().trim();
  const titleText = (seoTitle || title || '').trim();
  const slugText = (slug || slugify(title)).toLowerCase().trim();
  const plainContent = stripHtml(content);
  const excerptText = (metaDesc || excerpt || '').trim();

  // If no manual keyword is entered, infer keyword from title words
  const inferredKw = titleText
    ? titleText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3).slice(0, 2).join(' ')
    : '';
  const keyword = manualKeyword || inferredKw;
  
  // Combine all article text
  const fullContent = [
    plainContent,
    ...sections.map(s => `${s.heading || ''} ${stripHtml(s.body || '')}`)
  ].join(' ').replace(/\s+/g, ' ').trim();

  // Word count & Read time (Continually read live)
  const words = fullContent ? fullContent.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Escape keyword for regex matching
  const escapedKeyword = keyword ? keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
  const kwSlugified = keyword ? slugify(keyword) : '';

  // Keyword occurrences in content
  const kwRegex = escapedKeyword ? new RegExp(`\\b${escapedKeyword}\\b`, 'gi') : null;
  const occurrences = kwRegex ? (fullContent.match(kwRegex) || []).length : 0;
  const keywordDensity = (wordCount > 0 && occurrences > 0) ? parseFloat(((occurrences / wordCount) * 100).toFixed(2)) : 0;

  // Introduction text (first 10% of content or first 250 chars)
  const introCutoff = Math.max(200, Math.floor(fullContent.length * 0.1));
  const introText = fullContent.slice(0, introCutoff).toLowerCase();
  const hasKwInIntro = Boolean(keyword && introText.includes(keyword));

  const checks = [];
  let score = 0;

  // ── 1. BASIC SEO (40 Points Max) ───────────────────────────────────────────
  
  // 1. Focus Keyword in SEO Title (10 pts)
  const hasKwInTitle = Boolean(keyword && titleText.toLowerCase().includes(keyword));
  if (hasKwInTitle) score += 10;
  checks.push({
    id: 'kw_in_title',
    label: hasKwInTitle
      ? 'Focus Keyword used in the SEO Title'
      : keyword
      ? 'Focus Keyword not found in SEO Title'
      : 'Add a Focus Keyword to your SEO Title',
    pass: hasKwInTitle,
    status: hasKwInTitle ? 'pass' : 'fail',
    category: 'Basic SEO',
  });

  // 2. Focus Keyword in Meta Description (10 pts)
  const hasKwInMeta = Boolean(keyword && excerptText.toLowerCase().includes(keyword));
  if (hasKwInMeta) score += 10;
  checks.push({
    id: 'kw_in_meta',
    label: hasKwInMeta
      ? 'Focus Keyword used in Meta Description'
      : keyword
      ? 'Focus Keyword not found in Meta Description'
      : 'Add a Focus Keyword to Meta Description',
    pass: hasKwInMeta,
    status: hasKwInMeta ? 'pass' : 'fail',
    category: 'Basic SEO',
  });

  // 3. Focus Keyword in URL Slug (5 pts)
  const hasKwInSlug = Boolean(keyword && (slugText.includes(kwSlugified) || slugText.includes(keyword.replace(/\s+/g, '-'))));
  if (hasKwInSlug) score += 5;
  checks.push({
    id: 'kw_in_slug',
    label: hasKwInSlug
      ? 'Focus Keyword used in URL Slug'
      : keyword
      ? 'Focus Keyword not found in URL Slug'
      : 'Add Focus Keyword to URL Slug',
    pass: hasKwInSlug,
    status: hasKwInSlug ? 'pass' : 'fail',
    category: 'Basic SEO',
  });

  // 4. Focus Keyword in First 10% / Intro (5 pts)
  if (hasKwInIntro) score += 5;
  checks.push({
    id: 'kw_in_intro',
    label: hasKwInIntro
      ? 'Focus Keyword appears in the first 10% of content'
      : keyword
      ? 'Focus Keyword not found in the first 10% of content'
      : 'Include Focus Keyword near the beginning of article',
    pass: hasKwInIntro,
    status: hasKwInIntro ? 'pass' : 'fail',
    category: 'Basic SEO',
  });

  // 5. Content Length (10 pts)
  const isGoodLength = wordCount >= 600;
  const isMediumLength = wordCount >= 300;
  if (isGoodLength) score += 10;
  else if (isMediumLength) score += 5;
  checks.push({
    id: 'content_length',
    label: isGoodLength
      ? `Content is ${wordCount} words long. Good job!`
      : wordCount > 0
      ? `Content is ${wordCount} words long. Consider using at least 600 words.`
      : 'Add content text to your article body',
    pass: isGoodLength,
    status: isGoodLength ? 'pass' : isMediumLength ? 'warning' : 'fail',
    category: 'Basic SEO',
  });

  // ── 2. ADDITIONAL SEO (30 Points Max) ──────────────────────────────────────

  // 1. Focus Keyword in Subheadings (H2, H3) (10 pts)
  const subheadings = (content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || [])
    .concat(sections.map(s => s.heading || ''));
  const kwInSubheading = Boolean(keyword && subheadings.some(h => (h || '').toLowerCase().includes(keyword)));
  if (kwInSubheading) score += 10;
  checks.push({
    id: 'kw_in_subheadings',
    label: kwInSubheading
      ? 'Focus Keyword found in Subheading(s)'
      : subheadings.length > 0
      ? 'Focus Keyword not found in Subheadings (H2, H3)'
      : 'Use subheadings (H2, H3) to structure your content',
    pass: kwInSubheading,
    status: kwInSubheading ? 'pass' : 'fail',
    category: 'Additional SEO',
  });

  // 2. Focus Keyword in Image ALT text (5 pts)
  const imgAltMatches = content.match(/alt="([^"]*)"/gi) || [];
  const kwInAlt = Boolean(keyword && imgAltMatches.some(alt => alt.toLowerCase().includes(keyword)));
  if (kwInAlt) score += 5;
  checks.push({
    id: 'kw_in_image_alt',
    label: kwInAlt
      ? 'Focus Keyword found in image ALT attribute(s)'
      : 'Add Focus Keyword to image ALT text',
    pass: kwInAlt,
    status: kwInAlt ? 'pass' : 'fail',
    category: 'Additional SEO',
  });

  // 3. Keyword Density (0.8% - 2.5%) (5 pts)
  const isOptimalDensity = keyword ? (keywordDensity >= 0.8 && keywordDensity <= 2.5) : false;
  if (isOptimalDensity) score += 5;
  checks.push({
    id: 'kw_density',
    label: isOptimalDensity
      ? `Keyword Density is ${keywordDensity}%, which is optimal`
      : keyword && occurrences > 0
      ? `Keyword Density is ${keywordDensity}%, which is outside optimal range (0.8% - 2.5%)`
      : keyword
      ? 'Focus Keyword density is 0%'
      : 'Enter a Focus Keyword to calculate keyword density',
    pass: isOptimalDensity,
    status: isOptimalDensity ? 'pass' : 'fail',
    category: 'Additional SEO',
  });

  // 4. URL Length (4 pts)
  const isShortSlug = slugText.length >= 10 && slugText.length <= 75;
  if (isShortSlug) score += 4;
  checks.push({
    id: 'slug_length',
    label: isShortSlug ? `URL is ${slugText.length} characters long` : 'URL is too long or empty',
    pass: isShortSlug,
    status: isShortSlug ? 'pass' : 'fail',
    category: 'Additional SEO',
  });

  // 5. Outbound Links (3 pts) & Internal Links (3 pts)
  const hasOutbound = /href="https?:\/\/(?!identifine\.com\.ng)/i.test(content);
  const hasInternal = /href="(https?:\/\/identifine\.com\.ng|\/)/i.test(content) || content.includes('href=');
  if (hasOutbound) score += 3;
  if (hasInternal) score += 3;
  checks.push({
    id: 'has_links',
    label: (hasOutbound || hasInternal) ? 'Link(s) found in your content' : 'Add outbound or internal links to your content',
    pass: hasOutbound || hasInternal,
    status: (hasOutbound || hasInternal) ? 'pass' : 'fail',
    category: 'Additional SEO',
  });

  // ── 3. TITLE READABILITY (15 Points Max) ────────────────────────────────────

  // 1. Focus Keyword at start of Title (5 pts)
  const kwAtStartOfTitle = Boolean(keyword && titleText.toLowerCase().startsWith(keyword));
  if (kwAtStartOfTitle) score += 5;
  checks.push({
    id: 'kw_start_title',
    label: kwAtStartOfTitle
      ? 'Focus Keyword is at the beginning of the SEO Title'
      : hasKwInTitle
      ? 'Place Focus Keyword closer to the beginning of the SEO Title'
      : 'Add Focus Keyword to the SEO Title',
    pass: kwAtStartOfTitle,
    status: kwAtStartOfTitle ? 'pass' : 'fail',
    category: 'Title Readability',
  });

  // 2. Power Word in Title (5 pts)
  const hasPowerWord = POWER_WORDS.some(pw => titleText.toLowerCase().includes(pw));
  if (hasPowerWord) score += 5;
  checks.push({
    id: 'title_power_word',
    label: hasPowerWord ? 'Title contains at least one Power Word' : 'Add a Power Word to your SEO Title',
    pass: hasPowerWord,
    status: hasPowerWord ? 'pass' : 'fail',
    category: 'Title Readability',
  });

  // 3. Number in Title (5 pts)
  const hasNumber = /\d+/.test(titleText);
  if (hasNumber) score += 5;
  checks.push({
    id: 'title_number',
    label: hasNumber ? 'Title contains a number' : 'Add a number to your SEO Title for higher CTR',
    pass: hasNumber,
    status: hasNumber ? 'pass' : 'fail',
    category: 'Title Readability',
  });

  // ── 4. CONTENT READABILITY (15 Points Max) ──────────────────────────────────

  // 1. Paragraph Length Check (5 pts)
  const paragraphs = content.split(/<\/?p>/gi).map(p => stripHtml(p)).filter(Boolean);
  const hasLongParagraphs = paragraphs.some(p => p.split(/\s+/).filter(Boolean).length > 120);
  const goodParagraphs = wordCount > 0 && !hasLongParagraphs;
  if (goodParagraphs) score += 5;
  checks.push({
    id: 'short_paragraphs',
    label: goodParagraphs ? 'Paragraphs are concise and easy to read' : 'Break up long paragraphs into shorter ones (under 120 words)',
    pass: goodParagraphs,
    status: goodParagraphs ? 'pass' : 'fail',
    category: 'Content Readability',
  });

  // 2. Media included (5 pts)
  const containsMedia = hasImage || content.includes('<img') || content.includes('<figure') || content.includes('<iframe');
  if (containsMedia) score += 5;
  checks.push({
    id: 'has_media',
    label: containsMedia ? 'Content contains image or video media' : 'Add images or videos to make content engaging',
    pass: containsMedia,
    status: containsMedia ? 'pass' : 'fail',
    category: 'Content Readability',
  });

  // 3. Subheading Distribution (5 pts)
  const goodSubheadingStructure = subheadings.length >= 2 || (wordCount < 400 && subheadings.length >= 1);
  if (goodSubheadingStructure) score += 5;
  checks.push({
    id: 'subheading_structure',
    label: goodSubheadingStructure ? 'Content uses subheadings effectively' : 'Add more subheadings (H2, H3) to break up the text',
    pass: goodSubheadingStructure,
    status: goodSubheadingStructure ? 'pass' : 'fail',
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
