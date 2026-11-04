const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const read = f => fs.readFileSync(path.join(root,f),'utf8');
const context = vm.createContext({});
const files = ['learning-catalog.js','sun-conure-content.js','learning-content.js','learning-reader.js'];
const index = read('index.html');
let last = -1;
for (const file of files) {
  assert.ok(index.indexOf('src="'+file+'"') > last);
  last = index.indexOf('src="'+file+'"');
  vm.runInContext(read(file),context);
}
const catalog = context.BirbestLearning, reader = context.BirbestLearningReader;
for (const [id, stem] of [['welcome/cage','cage'],['food/guide','food'],['play/guide','foraging']]) {
  const file = stem === 'foraging' ? 'learn-sun-conure-foraging-v1.webp' : `sun-conure-lesson-${stem === 'cage' ? '01' : '08'}-20261018.webp`;
  assert.equal(context.BirbestSpeciesAdditions['sun-conure'].lessons[id].presentation.articleImage.file,file);
  assert.ok(fs.existsSync(path.join(root,'assets',file)));
}
assert.ok(context.BirbestSpeciesAdditions['sun-conure'].lessons['food/guide'].presentation.articleImage.caption.includes('ไม่ใช่สัดส่วน'));
const groups = catalog.getCurriculum('sun-conure');
assert.deepEqual(Array.from(groups,g=>g.lessons.length),[7,6,3]);
const lessons = groups.flatMap(g=>g.lessons);
for (const lesson of catalog.getCurriculum('cockatiel').flatMap(g=>g.lessons)) {
  assert.ok(lessons.some(s=>s.href===lesson.href),`Missing equivalent topic: ${lesson.href}`);
}
const hub = reader.render(catalog,'sun-conure','','daily').html;
assert.ok(hub.includes('sun-conure-lesson-15-20261018.webp'));
assert.ok(!hub.includes('story-raptor-greeting-v1.webp'));
assert.equal((hub.match(/class="species-stage"/g)||[]).length,3);
assert.ok(!hub.includes('class="learning-stage"'));
assert.ok(hub.includes('?section=daily" aria-current="location"'));
const valid = new Set(['#/learn/sun-conure',...lessons.map(l=>'#/learn/sun-conure/'+l.href)]);
for (const [i,l] of lessons.entries()) {
  assert.equal(l.review,'pending-expert-review');
  const html = reader.render(catalog,'sun-conure',l.href).html;
  assert.ok(html.includes('ฉบับร่าง'));
  assert.ok(!/cockatiel|ค็อกคาเทล|undefined|\{\{learnRoot\}\}/.test(html),l.href);
  assert.ok(html.includes('https://'),l.href+' references');
  for (const m of html.matchAll(/href="(#[^"]+)"/g)) {
    if(m[1].startsWith('#/learn/')) assert.ok(valid.has(m[1].split('?')[0]),m[1]);
  }
  if(i) assert.ok(html.includes('href="#/learn/sun-conure/'+lessons[i-1].href+'"'));
  if(i<lessons.length-1) assert.ok(html.includes('href="#/learn/sun-conure/'+lessons[i+1].href+'"'));
  for (const m of html.matchAll(/src="(assets\/[^"]+)"/g)) assert.ok(fs.existsSync(path.join(root,m[1])),m[1]);
  if(['food/guide','home/sleep','home/cleaning'].includes(l.href)) assert.ok(html.indexOf('class="lesson-alert"') < html.indexOf('<details'));
}
for(const m of hub.matchAll(/src="(assets\/[^"]+)"/g)) assert.ok(fs.existsSync(path.join(root,m[1])),m[1]);
assert.equal(catalog.getLesson('cockatiel','home/cleaning').content[0],catalog.getLesson('sun-conure','home/cleaning').content[0]);
assert.notDeepEqual(catalog.getLesson('cockatiel','welcome/cage').content[0],catalog.getLesson('sun-conure','welcome/cage').content[0]);
assert.equal(reader.render(catalog,'forpus'),null);
assert.ok(reader.render(catalog,'sun-conure','missing').html.includes('ยังไม่พบบทเรียนนี้'));
let focused = 0, scrolled = 0;
reader.focusSection({querySelector:s=>{assert.equal(s,'#species-daily');return {scrollIntoView(){scrolled++;},focus(){focused++;}};}},'daily');
assert.equal(focused,1);assert.equal(scrolled,1);
reader.focusSection({querySelector(){throw Error('Invalid section queried');}},'bad');
const sounds=catalog.getLesson('sun-conure','behavior/sounds');
assert.equal(sounds.questions.length,7);
assert.equal(catalog.getLesson('cockatiel','behavior/sounds'),null);
assert.equal(sounds.reviewReferences.length,4);
for(const q of sounds.questions) assert.ok(sounds.sources[q.source]);
const soundHtml=reader.render(catalog,'sun-conure','behavior/sounds').html;
assert.ok(soundHtml.includes('sun-conure-lesson-15-20261018.webp'));
assert.ok(!soundHtml.includes('learn-sun-conure-cover-v1.webp'));
assert.equal((soundHtml.match(/class="species-question-group"/g)||[]).length,3);
assert.ok(soundHtml.indexOf('class="lesson-alert"')<soundHtml.indexOf('<img'));
assert.ok(soundHtml.includes('/behavior/guide"'));
assert.ok(soundHtml.includes('/play/guide"'));
console.log('PASS: 16 Sun Conure drafts, topic coverage, species isolation, navigation, assets and urgent notices. Visual and veterinary approval remain pending.');

const food=reader.render(catalog,'sun-conure','food/guide','','1').html;
assert.equal((food.match(/class="species-question-group"/g)||[]).length,3);
assert.equal((food.match(/class="food-question"/g)||[]).length,12);
const blocks=[...food.matchAll(/<section class="species-question-group"[\s\S]*?<\/section>/g)];
assert.deepEqual(blocks.map(m=>(m[0].match(/class="food-question"/g)||[]).length),[4,3,5]);
assert.ok(food.includes('?group=1" aria-current="location"'));
assert.ok(food.indexOf('class="lesson-alert"')<food.indexOf('class="learning-shortcuts question-shortcuts"'));
assert.ok(food.includes('<details class="species-sources"><summary>แหล่งข้อมูลอ่านต่อ</summary>'));
const flow=read('flow.js');
const branchStart=flow.indexOf("    const catalogSpeciesId=");
const branchEnd=flow.indexOf("    if(route==='learn')",branchStart);
const jumps=[];
const clicks=[];
const target={scrollIntoView(){jumps.push('scroll');},focus(){jumps.push('focus');}};
const routeContext={
  isLegacyLearn:false,
  learningSpecies:catalog.getSpecies('sun-conure'),
  BirbestLearning:catalog,BirbestLearningReader:reader,URLSearchParams,
  requestedRoute:'learn/sun-conure/food/guide',
  raw:'/learn/sun-conure/food/guide?group=1',
  location:{hash:'#/learn/sun-conure/food/guide?group=1'},
  view:{innerHTML:'',focus(){},
    querySelector(selector){assert.equal(selector,'#question-group-1');return target;},
    querySelectorAll(){return [{hash:'#/learn/sun-conure/food/guide?group=1',addEventListener(type,fn){assert.equal(type,'click');clicks.push(fn);}}];}
  },
  document:{},window:{scrollTo(){}},requestAnimationFrame:fn=>fn()
};
vm.runInNewContext('(function(){'+flow.slice(branchStart,branchEnd)+'})();',routeContext);
assert.deepEqual(jumps,['scroll','focus']);
assert.ok(routeContext.view.innerHTML.includes('?group=1" aria-current="location"'));
clicks[0]();
assert.deepEqual(jumps,['scroll','focus','scroll','focus']);
for(const invalid of [null,'','-1','1x','[x]']) reader.focusQuestions({querySelector(){throw Error('Invalid group queried');}},invalid);
reader.focusQuestions({querySelector(){return null;}},'99');
console.log('PASS: 4/3/5 food grouping, all 12 questions, visible urgent notice, source disclosure, executed deep-link route and repeat-click focus.');
