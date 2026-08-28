/**
 * Rank Math equivalent Real-Time SEO Analyzer Engine
 */

export function analyzeSeo({ title = '', slug = '', excerpt = '', content = '', focusKeyword = '', sections = [] }) {
  const keyword = (focusKeyword || '').toLowerCase().trim();
  const titleText = (title || '').trim();
  const slugText = (slug || '').toLowerCase().trim();
  const excerptText = (excerpt || '').trim();
  
  // Combine all section bodies into full text
  const fullContent = [
    excerptText,
    ...sections.map(s => `${s.heading || ''} ${s.body || ''}`)
  ].join(' ').trim();

  // Word count & Read time
  const words = fullContent ? fullContent.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  if (!keyword) {
    return {
      score: 0,
      grade: 'Poor',
      color: '#ef4444',
      wordCount,
      readTimeMinutes,
      keywordDensity: 0,
      checks: [
        { id: 'no_keyword', label: 'Enter a Focus Keyword to begin live Rank Math SEO analysis', status: 'warning', category: 'General' }
      ],
      serp: {
        title: titleText || 'Article Title - Identifine',
        url: `https://identifine.com.ng/blog/${slugText || 'your-article-slug'}`,
        description: excerptText || 'Add a meta description to see how your article snippet will appear in Google search results.'
      }
    };
  }

  // Helper for keyword frequency
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const keywordRegex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
  const occurrences = (fullContent.match(keywordRegex) || []).length;
  const keywordDensity = wordCount > 0 ? parseFloat(((occurrences / wordCount) * 100).toFixed(2)) : 0;

  // Initialize checks
  const checks = [];
  let totalScore = 0;

  // 1. BASIC SEO TESTS (40 Points)
  // -------------------------------------------------------------
  
  // Focus keyword in Title
  const hasKwInTitle = titleText.toLowerCase().includes(keyword);
  checks.push({
    id: 'kw_in_title',
    label: hasKwInTitle ? 'Focus Keyword used in the SEO Title' : 'Focus Keyword not found in SEO Title',
    status: hasKwInTitle ? 'pass' : 'fail',
    category: 'Basic SEO',
    points: 10
  });
  if (hasKwInTitle) totalScore += 10;

  // Focus keyword in URL Slug
  const hasKwInSlug = slugText.replace(/-/g, ' ').includes(keyword.replace(/-/g, ' '));
  checks.push({
    id: 'kw_in_slug',
    label: hasKwInSlug ? 'Focus Keyword used in URL Slug' : 'Focus Keyword not found in URL Slug',
    status: hasKwInSlug ? 'pass' : 'fail',
    category: 'Basic SEO',
    points: 10
  });
  if (hasKwInSlug) totalScore += 10;

  // Focus keyword in Meta Description (Excerpt)
  const hasKwInExcerpt = excerptText.toLowerCase().includes(keyword);
  checks.push({
    id: 'kw_in_excerpt',
    label: hasKwInExcerpt ? 'Focus Keyword used in Meta Description' : 'Focus Keyword not found in Meta Description',
    status: hasKwInExcerpt ? 'pass' : 'fail',
    category: 'Basic SEO',
    points: 10
  });
  if (hasKwInExcerpt) totalScore += 10;

  // Focus keyword in Introduction (First 10% of content)
  const introText = fullContent.slice(0, Math.max(200, Math.floor(fullContent.length * 0.15))).toLowerCase();
  const hasKwInIntro = introText.includes(keyword);
  checks.push({
    id: 'kw_in_intro',
    label: hasKwInIntro ? 'Focus Keyword used in the first 10% of content' : 'Focus Keyword not found in Introduction',
    status: hasKwInIntro ? 'pass' : 'warning',
    category: 'Basic SEO',
    points: 10
  });
  if (hasKwInIntro) totalScore += 10;

  // 2. ADDITIONAL SEO TESTS (30 Points)
  // -------------------------------------------------------------

  // Content Length (Target: 300+ words minimum, 600+ recommended)
  let lengthStatus = 'fail';
  let lengthMsg = `Content is ${wordCount} words (Recommended: 600+ words)`;
  if (wordCount >= 600) {
    lengthStatus = 'pass';
    lengthMsg = `Content is ${wordCount} words (Good length)`;
    totalScore += 15;
  } else if (wordCount >= 300) {
    lengthStatus = 'warning';
    lengthMsg = `Content is ${wordCount} words (Acceptable, but 600+ is ideal)`;
    totalScore += 8;
  }
  checks.push({
    id: 'content_length',
    label: lengthMsg,
    status: lengthStatus,
    category: 'Additional SEO',
    points: 15
  });

  // Keyword Density (Target: 0.8% - 2.5%)
  let densityStatus = 'fail';
  let densityMsg = `Keyword density is ${keywordDensity}% (Optimal: 0.8% - 2.5%)`;
  if (keywordDensity >= 0.8 && keywordDensity <= 2.5) {
    densityStatus = 'pass';
    densityMsg = `Keyword density is optimal (${keywordDensity}%)`;
    totalScore += 15;
  } else if (keywordDensity > 0 && keywordDensity < 0.8) {
    densityStatus = 'warning';
    densityMsg = `Keyword density is low (${keywordDensity}%). Consider using keyword more often.`;
    totalScore += 7;
  } else if (keywordDensity > 2.5) {
    densityStatus = 'warning';
    densityMsg = `Keyword density is high (${keywordDensity}%). Avoid keyword stuffing.`;
    totalScore += 5;
  }
  checks.push({
    id: 'kw_density',
    label: densityMsg,
    status: densityStatus,
    category: 'Additional SEO',
    points: 15
  });

  // 3. TITLE & META READABILITY (30 Points)
  // -------------------------------------------------------------

  // Title Length (Target: 40 - 60 characters)
  const titleLen = titleText.length;
  let titleLenStatus = 'fail';
  let titleLenMsg = `Title is ${titleLen} characters (Optimal: 40-60 characters)`;
  if (titleLen >= 40 && titleLen <= 65) {
    titleLenStatus = 'pass';
    titleLenMsg = `Title length is optimal (${titleLen} characters)`;
    totalScore += 10;
  } else if (titleLen > 0) {
    titleLenStatus = 'warning';
    totalScore += 5;
  }
  checks.push({
    id: 'title_length',
    label: titleLenMsg,
    status: titleLenStatus,
    category: 'Title Readability',
    points: 10
  });

  // Focus Keyword at beginning of Title
  const kwAtStart = titleText.toLowerCase().startsWith(keyword);
  checks.push({
    id: 'kw_title_start',
    label: kwAtStart ? 'Focus Keyword is near the beginning of SEO Title' : 'Focus Keyword is not at the start of Title',
    status: kwAtStart ? 'pass' : 'warning',
    category: 'Title Readability',
    points: 10
  });
  if (kwAtStart) totalScore += 10;

  // Meta Description Length (Target: 120 - 160 characters)
  const metaLen = excerptText.length;
  let metaLenStatus = 'fail';
  let metaLenMsg = `Meta Description is ${metaLen} characters (Optimal: 120-160 characters)`;
  if (metaLen >= 120 && metaLen <= 165) {
    metaLenStatus = 'pass';
    metaLenMsg = `Meta Description length is optimal (${metaLen} characters)`;
    totalScore += 10;
  } else if (metaLen > 0) {
    metaLenStatus = 'warning';
    totalScore += 5;
  }
  checks.push({
    id: 'meta_length',
    label: metaLenMsg,
    status: metaLenStatus,
    category: 'Title Readability',
    points: 10
  });

  // Final score clamping
  const finalScore = Math.min(100, Math.max(0, totalScore));

  let grade = 'Poor';
  let color = '#ef4444'; // Red
  if (finalScore >= 80) {
    grade = 'Great';
    color = '#10b981'; // Green
  } else if (finalScore >= 50) {
    grade = 'Needs Improvement';
    color = '#f59e0b'; // Yellow
  }

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
