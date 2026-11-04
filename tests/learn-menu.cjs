const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const rootDir = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(rootDir, 'learn-menu.js'), 'utf8');
const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
function node() {
  return {handlers:{},attributes:{},
    addEventListener(type,fn){this.handlers[type]=fn;},
    setAttribute(name,value){this.attributes[name]=value;},
    focus(){document.activeElement=this;}
  };
}
const toggle=node(), link=node(), panel=node(), root=node(), mobile=node();
panel.hidden=true;
panel.querySelector=()=>link;
root.querySelector=selector=>selector==='button'?toggle:panel;
root.querySelectorAll=()=>[link];
root.contains=target=>[root,toggle,panel,link].includes(target);
const document=node();
document.querySelector=selector=>selector==='.learn-dropdown'?root:mobile;
const window=node();
const hover={matches:false};
let timer;
vm.runInNewContext(source,{
  document,window,matchMedia:()=>hover,
  setTimeout:fn=>{timer=fn;return 1;},
  clearTimeout:()=>{timer=undefined;}
});
const check=open=>{
  assert.equal(panel.hidden,!open);
  assert.equal(toggle.attributes['aria-expanded'],String(open));
};
toggle.handlers.click();check(true);
toggle.handlers.click();check(false);
root.handlers.pointerenter();check(false);
hover.matches=true;
root.handlers.pointerenter();check(true);
root.handlers.pointerleave();
assert.equal(typeof timer,'function');
document.activeElement=toggle;
root.handlers.focusin();
assert.equal(timer,undefined,'Moving keyboard focus inside cancels hover close');
toggle.handlers.keydown({key:'ArrowDown',preventDefault(){}});
assert.equal(document.activeElement,link);check(true);
document.handlers.keydown({key:'Escape'});
check(false);assert.equal(document.activeElement,toggle);
toggle.handlers.click();
document.handlers.pointerdown({target:link});check(true);
document.handlers.pointerdown({target:{}});check(false);
toggle.handlers.click();root.handlers.focusout({relatedTarget:{}});check(false);
toggle.handlers.click();link.handlers.click();check(false);
toggle.handlers.click();window.handlers.hashchange();check(false);
toggle.handlers.click();mobile.handlers.click();check(false);
assert.ok(html.includes('aria-controls="learn-species-panel"'));
assert.ok(html.includes('id="learn-species-panel" hidden'));
for(const name of ['ค็อกคาเทล','ซันคอนัว','กรีนชีคคอนัว','ฟอพัส']) assert.ok(html.includes(name));
assert.equal((html.match(/<span aria-disabled="true">/g)||[]).length,2);
assert.ok(html.includes('href="#/learn/sun-conure"'));
console.log('PASS: restored species disclosure click/touch/hover, keyboard, focus timer, outside/route/mobile dismissal and honest pending labels. Browser layout not tested.');
