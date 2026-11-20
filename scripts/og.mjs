// Renders public/og.png (1200x630), the link-preview card for LinkedIn, Slack, etc.
// Run: pnpm og
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1d2bd8"/>
  <text x="80" y="110" font-family="Spectral, Georgia, serif" font-size="30" font-weight="600" fill="#ffffff">Michael Northrup</text>
  <text x="80" y="268" font-family="Spectral, Georgia, serif" font-size="86" font-weight="500" fill="#ffffff" letter-spacing="-2">I build production AI</text>
  <text x="80" y="362" font-family="Spectral, Georgia, serif" font-size="86" font-weight="500" fill="#ffffff" letter-spacing="-2">with the teams who use it.</text>
  <line x1="80" y1="452" x2="1120" y2="452" stroke="#ffffff" stroke-opacity="0.3"/>
  <text x="80" y="510" font-family="Inter, Helvetica, Arial, sans-serif" font-size="28" fill="#d2d5fb">Forward-deployed AI engineer and tech lead</text>
  <rect x="826" y="476" width="294" height="56" rx="28" fill="#ffffff"/>
  <text x="973" y="513" font-family="Inter, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#1d2bd8" text-anchor="middle">mnorthrup.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('Wrote public/og.png');
