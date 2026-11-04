const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('index.html');
const flow = read('flow.js');
const mascots = read('home-mascots.js');

for (const [id, href] of [['millet', '#/learn/cockatiel'], ['sunny', '#wonder']]) {
  const anchor = html.match(new RegExp(`<a [^>]*data-mascot="${id}"[^>]*>`))[0];
  assert.ok(anchor.includes(`href="${href}"`));
  assert.ok(!anchor.includes('data-friend'));
}
assert.ok(!mascots.includes('activityDialog'));
assert.ok(html.includes('src="learn-menu.js"'));
assert.ok(html.includes('aria-controls="learn-species-panel"'));
assert.match(html, /<a href="#\/learn\/cockatiel">ค็อกคาเทล/);
assert.equal((html.match(/<span aria-disabled="true">/g)||[]).length,2);
const activityStart = mascots.indexOf('  const activities=');
const activityEnd = mascots.indexOf("  document.querySelector('.quiz-meta", activityStart);
const activityContext = {};
vm.runInNewContext(mascots.slice(activityStart, activityEnd) + '\nthis.result=activities;', activityContext);
assert.equal(activityContext.result.millet.href, '#/learn/cockatiel');
assert.equal(activityContext.result.sunny.href, '#wonder');

// Execute the actual home-section construction with minimal DOM doubles.
const sections = [];
const placements=[];
const element = (selector='') => ({before(node) {placements.push([selector,'before',node]);}, after(node) {placements.push([selector,'after',node]);}, append() {}, setAttribute() {}});
const context = {
  document: {
    createElement: () => {const node = element(); sections.push(node); return node;},
    querySelector: element
  },
  linkCard: (href, title) => `<a href="#/${href}">${title}</a>`,
  storyCards: () => '<a href="#/stories/millet-day">Story</a>'
};
const start = flow.indexOf('  const today =');
const end = flow.indexOf('  const footerLinks=', start);
vm.runInNewContext(flow.slice(flow.indexOf('  const stories ='),flow.indexOf('  const dailyLessons =')),context);
vm.runInNewContext(flow.slice(flow.indexOf('  const storyArtwork ='),flow.indexOf('  const mascotRoles =')),context);
vm.runInNewContext(flow.slice(start, end), context);
const today = sections.find(s => s.id === 'today').innerHTML;
assert.equal((today.match(/<a /g) || []).length, 3);
for (const href of ['learn/cockatiel?section=welcome', 'learn/cockatiel?section=daily', 'about']) {
  assert.ok(today.includes(`href="#/${href}"`));
}
const latest = sections.find(s => s.innerHTML?.includes('LITTLE STORIES')).innerHTML;
assert.ok(latest.includes('#/stories/postcards'));
assert.equal((latest.match(/<figure>/g)||[]).length,2);
assert.ok(latest.includes('story-udon-exploring-v1.webp'));
assert.ok(latest.includes('story-udon-millet-v1.webp'));
assert.ok(latest.includes('#/stories/millet-day'));
assert.ok(latest.includes('เรื่องแต่ง'));
assert.ok(placements.some(([target,method,node])=>target==='#friends'&&method==='after'&&node.id==='little-story'));
assert.ok(placements.some(([target,method,node])=>target==='#wonder'&&method==='before'&&node.id==='today'));
assert.ok(html.includes('href="home-journey.css"'));
const journeyCSS=read('home-journey.css');
assert.match(journeyCSS,/\.story-peek img\{[^}]*object-fit:contain/);
assert.ok(journeyCSS.includes('@media(max-width:700px)'));
for(const file of ['transition-cover.svg','transition-story.svg','transition-garden.svg']){
  assert.ok(journeyCSS.includes(`assets/${file}`));
  assert.match(read(`assets/${file}`),/viewBox="0 0 1200 120"/);
}
assert.ok(journeyCSS.includes('filter:drop-shadow('));
assert.ok(journeyCSS.includes('pointer-events:none'));
assert.ok(journeyCSS.includes('top:-55px;height:56px'));
assert.ok(journeyCSS.includes('.welcome-ribbon::before'));
assert.ok(journeyCSS.includes('top:-79px;height:80px'));
assert.ok(journeyCSS.includes('top:-47px;height:48px'));
assert.ok(journeyCSS.includes('clip-path:inset(-40px 0 1px 0)'));
const products = sections.find(s => s.innerHTML?.includes('MADE WITH BIRDS')).innerHTML;
assert.ok(products.indexOf('href="#/shop"') < products.indexOf('href="#/shop/daily-pack"'));
assert.ok(products.includes('สอบถามผ่านช่องทางร้าน'));
assert.ok(!products.includes('ยังไม่เปิดสั่งซื้อ'));
assert.ok(!products.includes('stories/postcards'));

const title = 'เริ่มทำความคุ้นเคยกับน้องอย่างไร?';
const learningContext = {createBirbestLearningCatalog:require('../learning-catalog.js')};
vm.runInNewContext(fs.readFileSync(path.join(root,'learning-content.js'),'utf8'),learningContext);
assert.equal(learningContext.BirbestLearning.getLesson('cockatiel','behavior/guide').title,title);
assert.ok(flow.includes("curriculum.find(group=>group.id==='understand').lessons.map(t=>learningCard"));
assert.ok(flow.includes(`title:'${title}'`));
assert.ok(flow.includes(`view.querySelector('.route-heading h1').textContent='${title}'`));
assert.ok(flow.includes(`view.querySelector('.breadcrumbs [aria-current]').textContent='${title}'`));
assert.ok(flow.includes("isLegacyLearn?'cockatiel':requestedRoute.split('/')[1]"));
assert.match(flow, /if\(raw==='wonder'\)/);
assert.match(flow, /question\?\.focus\(\{preventScroll:true\}\)/);
console.log('PASS: direct mascot links; available navigation; executed home shortcuts/story/shop sections; consistent lesson titles; quiz focus wiring. Browser rendering not tested.');
