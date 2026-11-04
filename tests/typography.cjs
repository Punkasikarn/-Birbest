const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'typography.css'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(html.indexOf('href="typography.css"') > html.indexOf('href="home-chapters-brand-accents.css"'));
const blocks = [...css.matchAll(/:root\{([^}]+)\}/g)];
const values = {};
for (const [, block] of blocks) {
  for (const [, name, value] of block.matchAll(/--type-([\w-]+):([\d.]+)rem/g)) values[name] = Number(value);
  assert.ok(values.page > values.section && values.section > values.card);
  assert.ok(values.card > values['small-heading'] && values['small-heading'] > values.body);
  assert.ok(values.body >= 1 && values.action >= .9375 && values.label >= .8125);
}
assert.equal(blocks.length, 2);
assert.doesNotMatch(css, /font-size:[^;}]*\b(?:vw|cqw)\b|letter-spacing:\s*-/);
assert.doesNotMatch(css, /(?:transform|position|animation|background|font-family)\s*:/);
assert.ok(css.includes('overflow-wrap:anywhere'));
assert.ok(css.includes('min-height:48px'));
console.log('PASS: desktop/mobile type hierarchy, readable body, preserved art and motion; visual review pending.');
