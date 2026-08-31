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
  const excerptText = (metaDesc || excerpt || '').trim();
  
  // Combine all article text
  const fullContent = [
    plainContent,
    ...sections.map(s => `${s.heading || ''} ${stripHtml(s.body || '')}`)
  ].join(' ').replace(/\s+/g, ' ').trim();

  // Word count & Read time
  const words = fullContent ? fullContent.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // If no focus keyword specified yet (Authentic Rank Math gives 0 / 100)
  if (!keyword) {
    return {
      score: 0,
      grade: 'Poor',
      color: '#ef4444',
      wordCount,
      readTimeMinutes,
      keywordDensity: 0,
      checks: [
        { id: 'no_keyword', label: 'Add a Focus Keyword to see your Rank Math SEO score', pass: false, category: 'Basic SEO' },
        { id: 'content_length', label: wordCount >= 600 ? `Content length: ${wordCount} words` : `Content is ${wordCount} words (Recommended: 600+ words)`, pass: wordCount >= 600, category: 'Basic SEO' },
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

  // Introduction text (first 10% of content or first 250 chars)
  const introCutoff = Math.max(200, Math.floor(fullContent.length * 0.1));
  const introText = fullContent.slice(0, introCutoff).toLowerCase();
  const hasKwInIntro = introText.includes(keyword);

  const checks = [];
  let score = 0;

  // ── 1. BASIC SEO (40 Points Max) ───────────────────────────────────────────
  
  // 1. Focus Keyword in SEO Title (10 pts)
  const hasKwInTitle = titleText.toLowerCase().includes(keyword);
  if (hasKwInTitle) score += 10;
  checks.push({
    id: 'kw_in_title',
    label: hasKwInTitle ? 'Focus Keyword used in the SEO Title' : 'Focus Keyword not found in SEO Title',
    pass: hasKwInTitle,
    category: 'Basic SEO',
  });

  // 2. Focus Keyword in Meta Description (10 pts)
  const hasKwInMeta = excerptText.toLowerCase().includes(keyword);
  if (hasKwInMeta) score += 10;
  checks.push({
    id: 'kw_in_meta',
    label: hasKwInMeta ? 'Focus Keyword used in Meta Description' : 'Focus Keyword not found in Meta Description',
    pass: hasKwInMeta,
    category: 'Basic SEO',
  });

  // 3. Focus Keyword in URL Slug (5 pts)
  const hasKwInSlug = slugText.includes(kwSlugified) || slugText.includes(keyword.replace(/\s+/g, '-'));
  if (hasKwInSlug) score += 5;
  checks.push({
    id: 'kw_in_slug',
    label: hasKwInSlug ? 'Focus Keyword used in URL Slug' : 'Focus Keyword not found in URL Slug',
    pass: hasKwInSlug,
    category: 'Basic SEO',
  });

  // 4. Focus Keyword in First 10% / Intro (5 pts)
  if (hasKwInIntro) score += 5;
  checks.push({
    id: 'kw_in_intro',
    label: hasKwInIntro ? 'Focus Keyword appears in the first 10% of content' : 'Focus Keyword not found in the first 10% of content',
    pass: hasKwInIntro,
    category: 'Basic SEO',
  });

  // 5. Content Length (10 pts)
  const isGoodLength = wordCount >= 600;
  const isMediumLength = wordCount >= 350;
  if (isGoodLength) score += 10;
  else if (isMediumLength) score += 4;
  checks.push({
    id: 'content_length',
    label: isGoodLength
      ? `Content is ${wordCount} words long. Good job!`
      : `Content is ${wordCount} words long. Consider using at least 600 words.`,
    pass: isGoodLength,
    category: 'Basic SEO',
  });

  // ── 2. ADDITIONAL SEO (30 Points Max) ──────────────────────────────────────

  // 1. Focus Keyword in Subheadings (H2, H3) (10 pts)
  const subheadings = (content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || [])
    .concat(sections.map(s => s.heading || ''));
  const kwInSubheading = subheadings.some(h => (h || '').toLowerCase().includes(keyword));
  if (kwInSubheading) score += 10;
  checks.push({
    id: 'kw_in_subheadings',
    label: kwInSubheading
      ? 'Focus Keyword found in Subheading(s)'
      : 'Focus Keyword not found in Subheadings (H2, H3)',
    pass: kwInSubheading,
    category: 'Additional SEO',
  });

  // 2. Focus Keyword in Image ALT text (5 pts)
  const imgAltMatches = content.match(/alt="([^"]*)"/gi) || [];
  const kwInAlt = imgAltMatches.some(alt => alt.toLowerCase().includes(keyword));
  if (kwInAlt) score += 5;
  checks.push({
    id: 'kw_in_image_alt',
    label: kwInAlt
      ? 'Focus Keyword found in image ALT attribute(s)'
      : 'Add Focus Keyword to image ALT text',
    pass: kwInAlt,
    category: 'Additional SEO',
  });

  // 3. Keyword Density (0.8% - 2.5%) (5 pts)
  const isOptimalDensity = keywordDensity >= 0.8 && keywordDensity <= 2.5;
  if (isOptimalDensity) score += 5;
  checks.push({
    id: 'kw_density',
    label: isOptimalDensity
      ? `Keyword Density is ${keywordDensity}%, which is optimal`
      : occurrences > 0
      ? `Keyword Density is ${keywordDensity}%, which is outside optimal range (0.8% - 2.5%)`
      : 'Focus Keyword density is 0%',
    pass: isOptimalDensity,
    category: 'Additional SEO',
  });

  // 4. URL Length (4 pts)
  const isShortSlug = slugText.length >= 10 && slugText.length <= 75;
  if (isShortSlug) score += 4;
  checks.push({
    id: 'slug_length',
    label: isShortSlug ? `URL is ${slugText.length} characters long` : 'URL is too long or empty',
    pass: isShortSlug,
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
    category: 'Additional SEO',
  });

  // ── 3. TITLE READABILITY (15 Points Max) ────────────────────────────────────

  // 1. Focus Keyword at start of Title (5 pts)
  const kwAtStartOfTitle = titleText.toLowerCase().startsWith(keyword);
  if (kwAtStartOfTitle) score += 5;
  checks.push({
    id: 'kw_start_title',
    label: kwAtStartOfTitle ? 'Focus Keyword is at the beginning of the SEO Title' : 'Place Focus Keyword near the beginning of the SEO Title',
    pass: kwAtStartOfTitle,
    category: 'Title Readability',
  });

  // 2. Power Word in Title (5 pts)
  const hasPowerWord = POWER_WORDS.some(pw => titleText.toLowerCase().includes(pw));
  if (hasPowerWord) score += 5;
  checks.push({
    id: 'title_power_word',
    label: hasPowerWord ? 'Title contains at least one Power Word' : 'Add a Power Word to your SEO Title',
    pass: hasPowerWord,
    category: 'Title Readability',
  });

  // 3. Number in Title (5 pts)
  const hasNumber = /\d+/.test(titleText);
  if (hasNumber) score += 5;
  checks.push({
    id: 'title_number',
    label: hasNumber ? 'Title contains a number' : 'Add a number to your SEO Title for higher CTR',
    pass: hasNumber,
    category: 'Title Readability',
  });

  // ── 4. CONTENT READABILITY (15 Points Max) ──────────────────────────────────

  // 1. Paragraph Length Check (No monster paragraphs > 120 words) (5 pts)
  const paragraphs = content.split(/<\/?p>/gi).map(p => stripHtml(p)).filter(Boolean);
  const hasLongParagraphs = paragraphs.some(p => p.split(/\s+/).filter(Boolean).length > 120);
  const goodParagraphs = wordCount > 0 && !hasLongParagraphs;
  if (goodParagraphs) score += 5;
  checks.push({
    id: 'short_paragraphs',
    label: goodParagraphs ? 'Paragraphs are concise and easy to read' : 'Break up long paragraphs into shorter ones (under 120 words)',
    pass: goodParagraphs,
    category: 'Content Readability',
  });

  // 2. Media included (5 pts)
  const containsMedia = hasImage || content.includes('<img') || content.includes('<figure') || content.includes('<iframe');
  if (containsMedia) score += 5;
  checks.push({
    id: 'has_media',
    label: containsMedia ? 'Content contains image or video media' : 'Add images or videos to make content engaging',
    pass: containsMedia,
    category: 'Content Readability',
  });

  // 3. Subheading Distribution (5 pts)
  const goodSubheadingStructure = subheadings.length >= 2 || (wordCount < 400 && subheadings.length >= 1);
  if (goodSubheadingStructure) score += 5;
  checks.push({
    id: 'subheading_structure',
    label: goodSubheadingStructure ? 'Content uses subheadings effectively' : 'Add more subheadings (H2, H3) to break up the text',
    pass: goodSubheadingStructure,
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
