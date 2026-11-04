const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'home-products-brand-preview.css'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(html.indexOf('href="home-products-brand-preview.css"') > html.indexOf('href="home-products.css"'));
assert.ok(css.includes('--chapter-edge:url(\'assets/transition-chapter-white.svg\')'));
assert.ok(css.includes('background:#fff'));
for (const color of ['#c3f532', '#ff80b7', '#ffab39', '#39d4df']) assert.ok(css.includes(color));
assert.ok(css.includes('object-fit:contain'));
assert.ok(css.includes('prefers-reduced-motion:reduce'));
assert.ok(css.includes('@media(max-width:520px)'));
// Every style rule is scoped to Home's product section, never the hero or Shop.
const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g);
for (const [,selectors] of rules) {
  if (selectors.trim().startsWith('@')) continue;
  selectors.split(',').forEach(selector => assert.ok(selector.includes('#home-shop'), selector));
}
console.log('PASS: reversible Home-only brand preview, original media, responsive and reduced-motion guards. Visual acceptance pending.');
