const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(root, 'home-mascots.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'home-mascots.css'), 'utf8');
const start = js.indexOf('  const residents=');
const end = js.indexOf('  residents.forEach', start);
const context = {};
vm.createContext(context);
vm.runInContext(js.slice(start, end) + '\nthis.items=residents;', context);
assert.equal(context.items.length, 5);
assert.equal(new Set(context.items.map(item => item.id)).size, 5);
for (const {id, crop: [x, y, w, h], foot: [fx, fy], at: [left, top], size} of context.items) {
  assert.ok(x >= 0 && y >= 0 && x + w <= 1448 && y + h <= 1086, id + ' sprite bounds');
  const height = size * h / w * 1.5;
  assert.ok(left - size * fx / 100 >= 0 && left + size * (1 - fx / 100) <= 100, id + ' scene width');
  assert.ok(top - height * fy / 100 >= 0 && top + height * (1 - fy / 100) <= 100, id + ' scene height');
}
assert.match(css, /#friends \.portrait-button img\{border-radius:0;object-fit:contain/);
assert.match(css, /transform-origin:var\(--foot-x\) var\(--foot-y\)/);
assert.match(css, /prefers-reduced-motion:reduce.*\.resident-art.*animation:none/);
console.log('PASS: five independent sprites inside sheet/scene bounds; uncropped portrait rule; foot-pivot and reduced-motion rules. Visual placement still requires browser review.');
