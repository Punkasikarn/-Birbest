const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'flow.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'flow.css'), 'utf8');
const context = {
  friends: {millet:{name:'Udon', image:'mascot-udon.webp'}, sunny:{name:'Raptor', image:'mascot-raptor.webp'}},
  view: {}, heading: title => `<h1>${title}</h1>`, related: html => html,
  mascotRoles: {millet:{},sunny:{}}
};
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('  const stories ='), source.indexOf('  const dailyLessons =')), context);
vm.runInContext(source.slice(source.indexOf('  const storyArtwork ='), source.indexOf('  const mascotRoles =')) + '\nthis.art=storyArtwork;this.cards=storyCards();', context);
const storyBranch = source.split('\n').find(line => line.trim().startsWith("else if(parts[0]==='stories'&&parts.length===2"));
assert.ok(storyBranch);
for (const id of ['millet-day', 'sunny-song']) {
  context.parts = ['stories', id];
  vm.runInContext(storyBranch.trim().replace(/^else /, ''), context);
  const output = context.view.innerHTML;
  assert.equal((output.match(/class="story-scene"/g) || []).length, 4);
  assert.equal((output.match(/class="story-illustration"/g) || []).length, 2);
  assert.equal((output.match(/loading="eager"/g) || []).length, 1);
  assert.equal((output.match(/loading="lazy"/g) || []).length, 1);
  assert.ok(!output.includes('class="story-portrait"'));
  assert.ok(output.includes('เหตุการณ์เป็นเรื่องแต่ง'));
  assert.ok(output.includes('aria-label="อ่านเรื่องเล่าต่อ"'));
  const destination=id==='sunny-song'?'sun-conure/behavior':'cockatiel/food';
  assert.ok(output.includes('href="#/learn/'+destination+'/guide"'));
  if(id==='sunny-song')assert.ok(!output.includes('#/learn/cockatiel/'));
  for (const art of Object.values(context.art[id])) {
    assert.ok(art.alt.length > 10);
    assert.ok(output.includes(art.file));
    assert.ok(fs.existsSync(path.join(root, 'assets', art.file)));
    assert.ok(fs.existsSync(path.join(root, 'assets', art.file.replace('.webp', '.png'))));
  }
}
assert.ok(context.cards.includes('story-udon-exploring-v1.webp'));
assert.ok(context.cards.includes('story-raptor-greeting-v1.webp'));
const about = source.slice(source.indexOf("    else if(route==='about')"), source.indexOf("    else if(route==='privacy')"));
context.route = 'about';
vm.runInContext(about.trim().replace(/^else /, ''), context);
const output = context.view.innerHTML;
assert.equal((output.match(/class="about-story-image"/g) || []).length, 5);
assert.ok(output.includes('assets/about-two-friends-world-v1.webp'));
assert.ok(output.indexOf('id="about-world"') < output.indexOf('class="about-care-art"'));
assert.equal((output.match(/<section /g) || []).length, 8);
assert.ok(output.includes('สูตร Mixed Seed'));
assert.ok(output.includes('ไม่ใช่อาหารครบถ้วน'));
assert.ok(!output.includes('ยังไม่เปิดสั่งซื้อ'));
for (const figure of output.matchAll(/<figure class="about-story-image">([\s\S]*?)<\/figure>/g)) assert.ok(!figure[1].includes('<a '));
assert.match(css, /\.about-page \.about-story\{display:block;max-width:1100px/);
assert.match(css, /\.story-illustration img\{[^}]*height:auto;[^}]*object-fit:contain/);
console.log('PASS: both actual story renders, four scenes/two images each, lazy delivery, covers, assets, About reading order/eight sections/unlinked figures. Browser layout remains unverified.');
