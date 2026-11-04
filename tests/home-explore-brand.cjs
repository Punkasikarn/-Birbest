const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'home-explore-brand-preview.css'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(html.indexOf('href="home-explore-brand-preview.css"') > html.indexOf('href="home-chapters.css"'));
for (const color of ['#39d4df', '#c3f532', '#ff80b7', '#ffe34b', '#ffab39']) assert.ok(css.includes(color));
assert.ok(css.includes('min-height:48px'));
assert.ok(css.includes('prefers-reduced-motion:reduce'));
assert.ok(css.includes('object-fit:contain'));
const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g);
for (const [, selectors] of rules) {
  if (selectors.trim().startsWith('@')) continue;
  selectors.split(',').forEach(selector => assert.ok(selector.includes('#today .world-path'), selector));
}
const luminance = hex => {
  const channels = hex.match(/[a-f\d]{2}/gi).map(v => parseInt(v,16)/255)
    .map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
  return channels[0]*.2126 + channels[1]*.7152 + channels[2]*.0722;
};
for (const background of ['39d4df','ff80b7','ffab39']) {
  assert.ok((luminance(background)+.05)/(luminance('202124')+.05) >= 4.5);
}
console.log('PASS: paired Home destination accents, scoped selectors, button contrast and reduced motion; rendered review pending.');
