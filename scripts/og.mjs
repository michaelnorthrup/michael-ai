// Renders the social preview. Run: pnpm og
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="10" fill="#1d2bd8"/>
  <text x="68" y="91" font-family="Georgia, serif" font-size="30" fill="#1a2030">Michael Northrup<tspan fill="#1d2bd8">.</tspan></text>
  <text x="68" y="174" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#596274">AI engineer &amp; tech lead · Salt Lake City</text>
  <g font-family="Georgia, serif" font-size="74" fill="#1a2030" letter-spacing="-2">
    <text x="64" y="280">I build AI with</text>
    <text x="64" y="365">the people</text>
    <text x="64" y="450">who use it.</text>
  </g>
  <rect x="718" y="153" width="416" height="345" rx="12" fill="#f3f5fb" stroke="#dce1ec"/>
  <text x="746" y="198" font-family="Helvetica, Arial, sans-serif" font-size="17" fill="#1d2bd8">DOCUMENT AI</text>
  <text x="746" y="244" font-family="Georgia, serif" font-size="32" fill="#1a2030">A finding you can check.</text>
  <rect x="746" y="273" width="360" height="185" rx="6" fill="#ffffff" stroke="#dce1ec"/>
  <text x="768" y="309" font-family="Helvetica, Arial, sans-serif" font-size="17" fill="#596274">Source document</text>
  <rect x="768" y="330" width="310" height="7" fill="#e1e5ef"/>
  <rect x="768" y="348" width="200" height="7" fill="#e1e5ef"/>
  <rect x="768" y="378" width="310" height="37" fill="#e2e7ff"/>
  <text x="780" y="403" font-family="Helvetica, Arial, sans-serif" font-size="18" fill="#1d2bd8">Evidence stays with the finding.</text>
  <line x1="68" y1="539" x2="1134" y2="539" stroke="#dce1ec"/>
  <text x="68" y="581" font-family="Helvetica, Arial, sans-serif" font-size="21" fill="#596274">Payroll AI · Shared platforms · Applied machine learning</text>
  <text x="1134" y="581" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#1d2bd8">mnorthrup.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('Wrote public/og.png');
