import fs from 'fs';
import path from 'path';

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  let issues = [];

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      issues = issues.concat(scanDir(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        // Check hardcoded px margins without responsive prefix
        if (/\bmargin-left:\s*\d+px/i.test(line) || (/\bml-\[\d+px\]/.test(line) && !/sm:|md:|lg:|xl:/.test(line))) {
          issues.push({ file: fullPath, line: idx + 1, type: 'Fixed Left Margin without Mobile Breakpoint', code: line.trim() });
        }
        // Check fixed widths over 300px without max-w-full or responsive prefix
        const matchWidth = line.match(/\bw-\[(\d+)px\]/);
        if (matchWidth && parseInt(matchWidth[1]) > 300 && !/sm:|md:|lg:|xl:/.test(line) && !/max-w/.test(line)) {
          issues.push({ file: fullPath, line: idx + 1, type: 'Large Fixed Width (' + matchWidth[1] + 'px)', code: line.trim() });
        }
        // Check fixed min-widths over 280px without responsive prefix
        const matchMinWidth = line.match(/\bmin-w-\[(\d+)px\]/);
        if (matchMinWidth && parseInt(matchMinWidth[1]) > 280 && !/sm:|md:|lg:|xl:/.test(line)) {
          issues.push({ file: fullPath, line: idx + 1, type: 'Large Fixed Min Width (' + matchMinWidth[1] + 'px)', code: line.trim() });
        }
      });
    }
  });

  return issues;
}

const issues = scanDir('./src');
console.log('SCAN RESULTS:', JSON.stringify(issues, null, 2));
