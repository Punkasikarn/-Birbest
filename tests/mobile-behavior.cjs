const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

// Small DOM doubles exercise the production handlers, not browser layout/network.
class Element {
  constructor(tag = 'div', className = '') {
    this.tag = tag; this.className = className; this.children = []; this.style = {}; this.attrs = {}; this.hidden = false;
    this.classList = {toggle: (name, on) => {
      const classes = new Set(this.className.split(' ').filter(Boolean));
      if (on) classes.add(name); else classes.delete(name);
      this.className = [...classes].join(' ');
    }};
  }
  append(child) { child.parent = this; this.children.push(child); }
  prepend(child) { child.parent = this; this.children.unshift(child); }
  before(child) { child.parent = this.parent; this.parent.children.splice(this.parent.children.indexOf(this), 0, child); }
  remove() { this.parent.children = this.parent.children.filter(child => child !== this); }
  setAttribute(key, value) { this.attrs[key] = value; }
  removeAttribute(key) { delete this.attrs[key]; }
  getBoundingClientRect() { return {top: 0}; }
  querySelectorAll(selector) {
    if (selector.includes(' ')) {
      const [parent, child] = selector.split(' ');
      return this.querySelectorAll(parent).flatMap(el => el.querySelectorAll(child));
    }
    return this.children.flatMap(child => [
      ...(selector.startsWith('.') ? child.className.split(' ').includes(selector.slice(1)) : child.tag === selector) ? [child] : [],
      ...child.querySelectorAll(selector)
    ]);
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
}
const hub = new Element();
for (let i = 0; i < 3; i++) {
  const stage = new Element('section', 'learning-stage');
  if (!i) stage.append(new Element('img', 'learning-scene'));
  stage.append(new Element('div', 'learning-cards'));
  hub.append(stage);
}
const media = {matches: false, addEventListener: (_, fn) => { media.change = fn; }};
const reduced = {matches: false, addEventListener() {}};
const events = {};
const frames = [];
const context = {
  matchMedia: query => query.includes('min-width') ? media : reduced,
  innerHeight: 800,
  requestAnimationFrame: fn => { frames.push(fn); return frames.length; },
  window: {addEventListener: (name, fn) => { events[name] = fn; }},
  document: {createElement: tag => new Element(tag), querySelector: selector => selector === '#route-view' || hub.className.includes('school-scenic') ? hub : null}
};
vm.runInNewContext(fs.readFileSync(path.join(root, 'school-scene.js'), 'utf8'), context);
const flush = () => { while (frames.length) frames.shift()(); };
flush();
assert.equal(hub.querySelectorAll('.school-backdrop').length, 0);
assert.equal(hub.querySelectorAll('.learning-scene').length, 3);
assert.ok(hub.querySelectorAll('.learning-scene').slice(1).every(img => img.loading === 'lazy'));
media.matches = true; media.change(); flush();
assert.equal(hub.querySelectorAll('.school-backdrop img').length, 3);
media.change(); flush();
assert.equal(hub.querySelectorAll('.school-backdrop img').length, 3);
media.matches = false; media.change(); flush();
assert.equal(hub.querySelectorAll('.school-backdrop').length, 0);
assert.equal(hub.querySelectorAll('.learning-scene').length, 3);
hub.hidden = true; events.hashchange(); flush();
media.matches = true; media.change(); flush();
assert.equal(hub.querySelectorAll('.school-backdrop').length, 0);
hub.hidden = false; events.hashchange(); flush();
assert.equal(hub.querySelectorAll('.school-backdrop img').length, 3);

const menu = new Element();
const nav = new Element('nav');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const menuContext = {menu, document: {querySelector: () => nav}};
vm.createContext(menuContext);
vm.runInContext(js.slice(js.indexOf('function setMainMenuOpen('), js.indexOf("menu.addEventListener('click'")), menuContext);
for (const open of [true, false, true, false]) {
  menuContext.setMainMenuOpen(open);
  assert.equal(menu.attrs['aria-expanded'], String(open));
  assert.equal(menu.attrs['aria-label'], open ? 'ปิดเมนู' : 'เปิดเมนู');
  assert.equal(nav.className.includes('open'), open);
}
const flow = fs.readFileSync(path.join(root, 'flow.js'), 'utf8');
assert.ok(flow.indexOf('setMainMenuOpen(false)') < flow.indexOf('if(!route)'));
console.log('PASS: mobile has no backdrop; inline images lazy/idempotent; breakpoint and hidden-route transitions; menu label/expanded/class synchronization including home.');
const readingCss=fs.readFileSync(path.join(root,'flow.css'),'utf8');
assert.ok(readingCss.includes('.route-view .learning-shortcuts{background:#f8fbf8}'));
assert.ok(readingCss.includes('.route-view .learning-shortcuts{position:static}'));
assert.ok(readingCss.includes('.route-view .learning-shortcuts{grid-template-columns:minmax(0,1fr)}'));
assert.ok(readingCss.includes('.route-view .lesson-navigation a{min-height:44px}'));
assert.ok(readingCss.includes('.route-view .breadcrumbs a{display:inline-flex;align-items:center;min-height:44px}'));
assert.ok(readingCss.includes('.route-view .food-question-body a{overflow-wrap:anywhere}'));
console.log('PASS: responsive CSS guards for opaque shortcuts, nonsticky mobile, narrow single column, touch targets and long references. Not a rendered viewport test.');
