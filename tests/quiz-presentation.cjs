const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const source = read('script.js');
const css = read('flow.css');
const html = read('index.html');

class Element {
  constructor(tag = 'div') {
    this.tag = tag; this.children = []; this.handlers = {}; this.classes = new Set();
    this.textContent = ''; this.hidden = false;
    this.classList = {toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name)};
  }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children = []; }
  addEventListener(name, fn) { this.handlers[name] = fn; }
  focus() { this.focused = true; }
  querySelectorAll(tag) { return this.children.filter(child => child.tag === tag); }
}
const content = new Element();
const host = new Element();
const speech = new Element('p');
host.querySelector = () => speech;
const next = new Element('button');
const result = new Element();
const count = new Element();
const selectors = {'.quiz-next': next, '.quiz-host': host, '#quiz-content': content, '.quiz-result': result, '#quiz-count': count};
const context = {
  document: {
    querySelector: selector => selector === '#quiz-content h3'
      ? content.children.find(child => child.tag === 'h3') : selectors[selector],
    createElement: tag => new Element(tag)
  }
};
const start = source.indexOf('const questions=');
const end = source.indexOf('let saved=', start);
assert.ok(start >= 0 && end > start);
vm.runInNewContext(source.slice(start, end), context);
const choose = index => content.children.find(child => child.className === 'quiz-options').children[index].handlers.click();
assert.match(speech.textContent, /มาเล่นด้วยกัน/);
assert.equal(next.hidden, true);
choose(0);
assert.match(result.textContent, /คำตอบคือ/);
assert.match(speech.textContent, /ได้รู้จักน้องเพิ่ม/);
assert.ok(host.classes.has('is-cheering'));
const firstFeedback = result.textContent;
choose(1);
assert.equal(result.textContent, firstFeedback, 'An answered question cannot change its result');
next.handlers.click();
assert.equal(count.textContent, '02 / 03');
assert.ok(!host.classes.has('is-cheering'));
assert.equal(next.hidden, true);
choose(0);
assert.equal(speech.textContent, 'ใช่เลยค้าบ!');
next.handlers.click();
choose(2);
next.handlers.click();
assert.equal(count.textContent, 'ครบ 3 เรื่องแล้ว');
assert.match(speech.textContent, /ขอบคุณ/);
assert.match(content.innerHTML, /#\/learn\/cockatiel/);
next.handlers.click();
assert.equal(count.textContent, '01 / 03');
assert.match(speech.textContent, /มาเล่นด้วยกัน/);
assert.equal(next.hidden, true);

assert.match(html, /class="quiz-host" aria-hidden="true"><div class="art-placeholder quiz-host-art" data-art-needed="home-quiz-raptor"/);
assert.ok(!html.includes('class="wonder-sticker"'));
assert.match(css, /prefers-reduced-motion:reduce\)\{\.quiz-host\.is-cheering img,\.quiz-host\.is-cheering \.quiz-host-art\{animation:none/);
assert.match(css, /\.quiz-host img\{display:block;[^}]*object-fit:contain/);
assert.match(css, /\.quiz-option:disabled\{opacity:1;color:#294a3f\}/);

function luminance(hex) {
  const channels = hex.match(/../g).map(n => parseInt(n, 16) / 255)
    .map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
for (const [fg, bg] of [['506658','fffefa'], ['465f52','f5f9f2'], ['465f52','eaf4f5'], ['294a3f','dff0df'], ['294a3f','ffe9ec']]) {
  const a = luminance(fg), b = luminance(bg);
  assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05) >= 4.5, `${fg} on ${bg}`);
}
console.log('PASS: actual quiz answer/lock/next/completion/restart and host reactions; selected text contrast pairs; responsive/reduced-motion CSS wiring. Not a browser layout audit.');
