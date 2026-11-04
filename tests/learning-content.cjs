const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const createCatalog = require('../learning-catalog.js');
const root = path.resolve(__dirname,'..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const flow = read('flow.js');
const context = {createBirbestLearningCatalog:createCatalog};
vm.runInNewContext(read('learning-content.js'),context);
const catalog = context.BirbestLearning;
const baseline = JSON.parse(read('tests/learning-baseline.json'));
const digest = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const curriculum = catalog.getCurriculum('cockatiel');
assert.deepEqual(Array.from(curriculum,g=>g.lessons.length),[7,6,2]);
assert.equal(new Set(curriculum.flatMap(g=>g.lessons.map(l=>l.href))).size,15);
for (const group of curriculum) {
  for (const lesson of group.lessons) {
    const before = baseline[lesson.href];
    const content = lesson.format==='html' ? catalog.lessonHtml('cockatiel',lesson.href) : lesson.content;
    if (before) {
      assert.equal(digest(content),before.hash,`Original content changed: ${lesson.href}`);
      assert.equal(lesson.content.length,before.count);
    } else {
      assert.ok(['health/eggs','home/identification'].includes(lesson.href));
      assert.equal(lesson.content.length,lesson.href==='health/eggs'?8:7);
    }
    assert.equal(lesson.review,'pending-expert-review');
    assert.ok(Object.isFrozen(lesson.content));
    assert.ok(Object.isFrozen(lesson.content[0]));
    assert.ok(fs.existsSync(path.join(root,'assets',lesson.image+'.png')));
    if (lesson.format==='questions') {
      for (const q of lesson.questions) {
        const source = Array.isArray(q) ? lesson.sources[q[3]] : lesson.sources[q.source];
        assert.ok(source,`Missing question source: ${lesson.href}`);
        assert.match(Array.isArray(source)?source[1]:source.url,/^https:\/\//);
      }
    }
  }
}
for (const species of ['sun-conure','green-cheek','forpus','unknown','__proto__','constructor']) {
  assert.equal(catalog.getCurriculum(species),null);
  for (const id of Object.keys(baseline)) assert.equal(catalog.getLesson(species,id),null);
  assert.equal(catalog.lessonHtml(species,'home/safety'),'');
}
assert.equal(catalog.getLesson('cockatiel','unknown'),null);
assert.equal(catalog.getLesson('cockatiel','welcome/cage').reuse,'mixed');
assert.equal(catalog.getLesson('cockatiel','welcome/first-meal').reuse,'species');
assert.equal(catalog.getLesson('cockatiel','home/cleaning').reuse,'shared');
assert.equal(catalog.getLesson('cockatiel','home/sleep').reuse,'mixed');

// A synthetic second reader proves reuse without activating any real new species.
function fixture(common='one common source') {
  const entry = text => ({status:'available-draft',review:'pending-expert-review',presentation:{title:text},blocks:{extra:[text]}});
  const profile = text => ({status:'available-draft',groups:[{id:'daily',name:'Daily',lessonIds:['care']}],lessons:{care:entry(text)}});
  return {
    sharedBlocks:{base:[common]},
    lessons:{care:{format:'questions',parts:[{shared:'base'},{specific:'extra'}]}},
    species:{a:profile('only A'),b:profile('only B'),pending:{status:'pending'}}
  };
}
const sharedFixture = createCatalog(fixture());
const a = sharedFixture.getLesson('a','care');
const b = sharedFixture.getLesson('b','care');
assert.strictEqual(a.content[0],b.content[0]);
assert.equal(a.content[1][0],'only A');
assert.equal(b.content[1][0],'only B');
assert.equal(sharedFixture.getLesson('pending','care'),null);
const changed = createCatalog(fixture('updated once'));
for (const id of ['a','b']) assert.equal(changed.getLesson(id,'care').content[0][0],'updated once');
const missing = fixture();
delete missing.species.b.lessons.care.blocks.extra;
assert.throws(()=>createCatalog(missing),/Missing learning block/);
const unassigned = fixture();
unassigned.species.b.groups=[];
delete unassigned.species.b.lessons.care;
assert.equal(createCatalog(unassigned).getLesson('b','care'),null);

const html = read('index.html');
const scripts = [...html.matchAll(/<script src="([^"]+)" defer>/g)].map(m=>m[1]);
assert.ok(scripts.indexOf('learning-catalog.js')<scripts.indexOf('learning-content.js'));
const flowScriptIndex = scripts.findIndex(src=>src.startsWith('flow.js'));
assert.ok(scripts.indexOf('learning-content.js')<flowScriptIndex);
assert.ok(flow.includes('const lessonGroups=curriculum;'));
assert.ok(!flow.includes('const welcomeTopics = ['));
assert.ok(!flow.includes('const foodQuestions = ['));

// Exercise production hub/welcome/safety/health templates with the extracted content.
const article = {innerHTML:''};
const related = {innerHTML:''};
const view = {innerHTML:'',querySelector:selector=>selector==='article'?article:related};
const renderContext = {BirbestLearning:catalog,view};
vm.createContext(renderContext);
vm.runInContext(flow.slice(flow.indexOf('  const curriculum ='),flow.indexOf('  const foodGroups =')),renderContext);
vm.runInContext(flow.slice(flow.indexOf('  const esc ='),flow.indexOf('  const storyArtwork =')),renderContext);
const hubStart=flow.indexOf("    if(route==='learn')view.innerHTML");
const hubEnd=flow.indexOf("    else if(route==='learn/welcome')",hubStart);
renderContext.route='learn';
vm.runInContext(flow.slice(hubStart,hubEnd),renderContext);
assert.equal((view.innerHTML.match(/class="learning-card"/g)||[]).length,15);
for (const id of Object.keys(baseline)) assert.ok(view.innerHTML.includes(`href="#/learn/cockatiel/${id}"`));
const welcomeBranch=flow.split('\n').find(line=>line.trim().startsWith("else if(parts[0]==='learn'&&parts[1]==='welcome'"));
for (const lesson of curriculum[0].lessons) {
  if(lesson.reader==='catalog') continue;
  renderContext.parts=['learn','welcome',lesson.id];
  vm.runInContext(welcomeBranch.trim().replace(/^else /,''),renderContext);
  assert.equal((view.innerHTML.match(/class="route-section"/g)||[]).length,lesson.sections.length);
  assert.ok(view.innerHTML.includes(lesson.source));
}
const safetyStart=flow.indexOf("    else if(route==='learn/home/safety')");
const safetyEnd=flow.indexOf("    else if(route==='learn/home/sleep')",safetyStart);
renderContext.route='learn/home/safety';
vm.runInContext(flow.slice(safetyStart,safetyEnd).trim().replace(/^else /,''),renderContext);
assert.ok(view.innerHTML.includes(catalog.lessonHtml('cockatiel','home/safety')));
const healthStart=flow.indexOf("    if(route==='learn/health/guide'){");
const healthEnd=flow.indexOf("    if(route==='learn/welcome/location'",healthStart);
renderContext.route='learn/health/guide';
vm.runInContext(flow.slice(healthStart,healthEnd),renderContext);
assert.equal(article.innerHTML,catalog.lessonHtml('cockatiel','health/guide'));
assert.ok(article.innerHTML.includes('ขอความช่วยเหลือฉุกเฉินทันที'));
assert.ok(!article.innerHTML.includes('{{learnRoot}}'));

// Pending direct links must stop before the cockatiel renderer and scope banner.
const guardStart=flow.indexOf("    if(parts[0]==='learn'&&learningSpecies?.status!=='available-draft'){");
const guard=flow.slice(guardStart,hubStart);
for (const speciesId of ['sun-conure','forpus','unknown']) {
  renderContext.parts=['learn',speciesId,'home','safety'];
  renderContext.learningSpecies=catalog.getSpecies(speciesId);
  renderContext.document={title:''};
  renderContext.window={scrollTo:()=>{}};
  view.focus=()=>{};
  vm.runInContext(`(function(){${guard}})()`,renderContext);
  assert.ok(!view.innerHTML.includes('ค็อกคาเทล'));
  assert.ok(!view.innerHTML.includes('species-context'));
  assert.ok(!renderContext.document.title.includes('ค็อกคาเทล'));
}
console.log('PASS: all 13 original lesson hashes, 7/6/2 curriculum, sources, immutable shared reuse, isolated species content, pending/unknown gates and production hub/welcome/safety/health templates. Not a browser layout test.');
