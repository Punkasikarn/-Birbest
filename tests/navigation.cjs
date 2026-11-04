const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'flow.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Exercise the actual handlers without a browser or network requests.
const handlers = {};
const status = {};
const results = {};
const input = {value: '', addEventListener: (name, fn) => { handlers[name] = fn; }};
const form = {addEventListener: (name, fn) => { handlers[name] = fn; }};
const learning = {};
for(const file of ['learning-catalog.js','sun-conure-content.js','learning-content.js']) vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),learning);
const indexContext = {
  window: {},
  BirbestLearning: learning.BirbestLearning,
  stories: [], friends: {}
};
vm.runInNewContext(fs.readFileSync(path.join(root,'crochet-data.js'),'utf8'),indexContext);
indexContext.window.BirbestCrochet={products:indexContext.window.BirbestCrochetProducts};
const indexStart = source.indexOf('  const availableSpecies=');
const indexEnd = source.indexOf('  const checklistItems=', indexStart);
vm.runInNewContext(source.slice(indexStart,indexEnd)+'\nthis.items=searchIndex;',indexContext);
const lessons = indexContext.items.filter(item=>item.href.startsWith('learn/'));
assert.equal(indexContext.items.filter(item=>item.href.startsWith('shop/')).length,54);
assert.equal(lessons.length,31);
assert.equal(new Set(lessons.map(item=>item.href)).size,31);
for(const item of lessons) {
  const [,species,...parts]=item.href.split('/');
  assert.ok(learning.BirbestLearning.getLesson(species,parts.join('/')));
  assert.ok(item.title.includes(learning.BirbestLearning.getSpecies(species).label));
}
const context = {
  availableSpecies: learning.BirbestLearning.getAvailableSpecies(),
  BirbestLearning: learning.BirbestLearning,
  heading: () => '',
  linkCard: (href, title) => `<a href="#/${href}">${title}</a>`,
  view: {querySelector: selector => ({form, input, '#search-status': status, '#search-results': results}[selector])},
  searchIndex: indexContext.items,
  raw: '/search?q=Instagram', URLSearchParams,
  history: {replaceState: (_, __, url) => { context.lastUrl = url; }}
};
vm.createContext(context);
const start = source.indexOf("else if(route==='search'){") + "else if(route==='search'){".length;
const end = source.indexOf("\n    else view.innerHTML=heading('มุมนี้", start);
vm.runInContext(source.slice(start, end).replace(/\}\s*$/, ''), context);
assert.match(results.innerHTML, /#\/contact/);
assert.match(status.textContent, /1/);
input.value = '<script>missing</script>';
handlers.submit({preventDefault() {}});
assert.match(results.innerHTML, /#\/learn\/cockatiel/);
assert.ok(!results.innerHTML.includes('<script>'));
assert.ok(context.lastUrl.includes('%3Cscript%3E'));
input.value = '';
handlers.input();
assert.equal(context.lastUrl, '#/search');
assert.match(results.innerHTML, /#\/stories/);
assert.match(results.innerHTML, /#\/learn\/sun-conure/);
for(const [query,href] of [
  ['ค็อกคาเทล ออกไข่','learn/cockatiel/health/eggs'],
  ['ซันคอนัว ออกไข่','learn/sun-conure/health/eggs'],
  ['ค็อกคาเทล ห่วงขา','learn/cockatiel/home/identification'],
  ['ซันคอนัว เบอร์โทร','learn/sun-conure/home/identification'],
  ['ซันคอนัว พัดลม','learn/sun-conure/home/safety'],
  ['ค็อกคาเทล ฉุกเฉิน','learn/cockatiel/health/guide'],
  ['ซันคอนัว กรวด','learn/sun-conure/food/guide'],
  ['ค็อกคาเทล นอน','learn/cockatiel/home/sleep']
]) {
  input.value=query;handlers.submit({preventDefault(){}});
  assert.ok(results.innerHTML.includes('#/'+href),query);
  const other=query.startsWith('ซันคอนัว')?'cockatiel':'sun-conure';
  assert.ok(!results.innerHTML.includes('#/learn/'+other),query+' stays scoped');
}

let skipHandler;
let focused;
const home = {focus: () => { focused = 'home'; }, scrollIntoView() {}};
const view = {hidden: false, focus: () => { focused = 'route'; }, scrollIntoView() {}};
const skipStart = source.indexOf('  const skipLink=');
const skipEnd = source.indexOf('  const postcards =', skipStart);
vm.runInNewContext(source.slice(skipStart, skipEnd), {
  home, view, document: {querySelector: () => ({addEventListener: (_, fn) => { skipHandler = fn; }})}
});
skipHandler({preventDefault() {}});
assert.equal(focused, 'route');
view.hidden = true;
skipHandler({preventDefault() {}});
assert.equal(focused, 'home');
assert.match(html, /id="home-view" tabindex="-1"/);
assert.ok(!html.includes('สามเพื่อนซี้'));

const channelStart = source.indexOf('  const channels=');
const channelEnd = source.indexOf('  footerLinks.insertAdjacentHTML', channelStart);
const channelContext = {};
vm.createContext(channelContext);
vm.runInContext(source.slice(channelStart, channelEnd) + '\nthis.shop=channelLinks("shop");this.social=channelLinks("social");', channelContext);
assert.equal((channelContext.shop.match(/target="_blank"/g) || []).length, 2);
assert.equal((channelContext.social.match(/rel="noopener noreferrer"/g) || []).length, 4);
assert.match(channelContext.shop, /https:\/\/shopee.co.th\/birbest.official/);
assert.match(channelContext.social, /UCyjn35FVsOUk0gViOdxBp7g/);
console.log('PASS: search matches/empty/reset/encoding; skip focus; mascot copy; six channel links. Visual layout not tested.');
