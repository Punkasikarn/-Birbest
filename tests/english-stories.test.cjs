const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const context={window:{}};vm.createContext(context);
vm.runInContext(read('language-stories.js'),context);
const copy=context.window.BirbestStoriesEnglish;
const flow=read('flow.js');
vm.runInContext(flow.slice(flow.indexOf('  const stories = ['),flow.indexOf('  const esc =')).replace('const stories =','window.stories ='),context);
assert.equal(context.window.stories.length,2);
for(const story of context.window.stories){
  assert.ok(copy[story.title]);assert.ok(copy[story.note]);assert.ok(copy[story.lesson]);
  for(const [heading,text] of story.scenes){
    assert.ok(copy[heading],heading);assert.ok(copy[text],text);
    assert.equal(copy[text].split('\n').length,text.split('\n').length,'Keep story pacing');
  }
}
assert.ok(copy['เหตุการณ์เป็นเรื่องแต่งในโลก Birbest โดยใช้นิสัยที่เจ้าของเล่าเป็นแรงบันดาลใจ'].includes('fictional'));
for(const [th,en] of Object.entries(copy))assert.ok(!/[\u0e00-\u0e7f]/.test(en),th);
const index=read('index.html');assert.ok(index.indexOf('src="language-stories.js"')<index.indexOf('src="language.js"'));
console.log('Both stories: 8 scenes, line pacing, titles, notes, fiction disclosure and dictionary load order passed.');
