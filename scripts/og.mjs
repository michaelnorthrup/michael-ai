// Renders public/og.png (1200x630), the link-preview card for LinkedIn, Slack, etc.
// Run: pnpm og
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="13" cy="13" r="1.1" fill="#2a2b32"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#131318"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect x="80" y="84" width="64" height="64" rx="16" fill="#f0a93a"/>
  <text x="112" y="126" font-family="Avenir Next, Avenir, Helvetica" font-size="26" font-weight="700" fill="#1a1206" text-anchor="middle">MN</text>
  <text x="168" y="125" font-family="SF Mono, Menlo, monospace" font-size="20" letter-spacing="4" fill="#f0a93a">APPLIED AI · SALT LAKE CITY</text>
  <text x="80" y="268" font-family="Avenir Next, Avenir, Helvetica" font-size="84" font-weight="600" fill="#f1f0ea" letter-spacing="-2">Michael Northrup</text>
  <text x="80" y="340" font-family="Avenir Next, Avenir, Helvetica" font-size="40" font-weight="500" fill="#f0a93a">Forward-deployed AI engineer &amp; tech lead</text>
  <text x="80" y="410" font-family="Charter, Georgia, serif" font-size="30" fill="#9698a0">Production AI systems, from discovery to adoption.</text>
  <rect x="80" y="476" width="520" height="70" rx="35" fill="#1f2027" stroke="#383941"/>
  <circle cx="118" cy="511" r="8" fill="#3fb26b"/>
  <text x="140" y="521" font-family="Avenir Next, Avenir, Helvetica" font-size="27" font-weight="600" fill="#f1f0ea">Ask my AI · paste a job description</text>
  <text x="1120" y="530" font-family="Avenir Next, Avenir, Helvetica" font-size="34" font-weight="700" fill="#f0a93a" text-anchor="end">$3M/mo</text>
  <text x="1120" y="560" font-family="Avenir Next, Avenir, Helvetica" font-size="18" fill="#9698a0" text-anchor="end">revenue from models I shipped</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('Wrote public/og.png');
