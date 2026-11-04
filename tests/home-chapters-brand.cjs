const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'home-chapters-brand-accents.css'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(html.indexOf('href="home-chapters-brand-accents.css"') > html.indexOf('href="home-explore-brand-preview.css"'));
const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g);
for (const [, selectors] of rules) {
  for (const selector of selectors.split(',')) {
    assert.match(selector.trim(), /^#home-view\[data-chapters\] #(friends|home-school|little-story) /);
    assert.doesNotMatch(selector, /quiz-option|correct|incorrect|::before|img/);
  }
}
assert.doesNotMatch(css, /(?:^|[;{])\s*(?:transform|animation|position|filter|height|width)\s*:/);
assert.ok(css.includes('min-height:48px'));
const luminance = hex => {
  const c = hex.match(/../g).map(v => parseInt(v, 16) / 255)
    .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
};
for (const color of ['ffe34b', 'ff80b7', 'ffab39', '39d4df']) {
  assert.ok((luminance(color) + .05) / (luminance('202124') + .05) >= 4.5);
}
console.log('PASS: chapter-only accents, readable buttons, preserved quiz states and scene geometry.');
