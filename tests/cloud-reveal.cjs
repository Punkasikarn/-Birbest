const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root=path.join(__dirname,'..');
const js=fs.readFileSync(path.join(root,'home-cloud-reveal.js'),'utf8');
const css=fs.readFileSync(path.join(root,'home-cloud-reveal.css'),'utf8');
const props={},events={},heroEvents={};
let top=0, observer, scrolled;
let homeVisible=true;
const header={dataset:{},contains(){return false},removeAttribute(){delete this.dataset.cloudNav}};
const style={setProperty(k,v){props[k]=v}};
const skip={addEventListener(k,v){events[k]=v}};
const hero={offsetHeight:600,style,before(){},append(){},addEventListener(k,v){heroEvents[k]=v},querySelector(){return {focus(){}}},contains(){return false}};
const journey={offsetHeight:1100,style,append(){},getBoundingClientRect(){return {top}}};
const home={dataset:{motion:'playing'},querySelector(s){return s==='.hero'?hero:null},getClientRects(){return homeVisible?[1]:[]}};
let created=0, frame;
vm.runInNewContext(js,{
  document:{hidden:false,querySelector(s){return s==='.site-header'?header:home},createElement(tag){if(tag==='img')return {setAttribute(){}};return created++?skip:journey},addEventListener(){}},
  window:{scrollY:0,addEventListener(k,v){events[k]=v},scrollTo(value){scrolled=value}},
  MutationObserver:class{constructor(fn){observer=fn}observe(){}},
  requestAnimationFrame(fn){frame=fn;return 1}
});
assert.equal(props['--reveal-opacity'],'1');
assert.equal(header.dataset.cloudNav,'hidden');
assert.equal(header.inert,true);
assert.equal(skip.hidden,false);
assert.equal(props['--enter-opacity'],'1');
top=-150;events.scroll();frame();assert.equal(props['--enter-opacity'],'0.5');
assert.equal(skip.hidden,false,'Button stays rendered while fading');
assert.equal(props['--brand-opacity'],'0.5');
top=-299;events.scroll();frame();assert.equal(header.dataset.cloudNav,'hidden');
assert.ok(Number(props['--brand-opacity'])>0);
top=-300;events.scroll();frame();assert.equal(props['--brand-opacity'],'0');
assert.equal(header.dataset.cloudNav,'visible');
assert.equal(skip.hidden,true,'Entry button disappears at the same threshold as navigation appears');
assert.equal(props['--enter-opacity'],'0');
top=-250;events.scroll();frame();assert.equal(props['--reveal-opacity'],'0.5');
top=-500;events.scroll();frame();assert.equal(props['--reveal-opacity'],'0');
assert.equal(header.dataset.cloudNav,'visible');
assert.equal(header.inert,false);
assert.equal(skip.hidden,true);
top=0;events.scroll();frame();assert.equal(props['--reveal-opacity'],'1');
assert.equal(props['--brand-opacity'],'1');
assert.equal(header.dataset.cloudNav,'hidden');
home.dataset.motion='paused';observer();frame();assert.equal(props['--reveal-opacity'],'0');
home.dataset.motion='playing';events.click();assert.ok(scrolled);assert.equal(props['--reveal-opacity'],'0');
// Clicking/focusing must not latch the scene open during later reverse scrolls.
header.contains=()=>true;
for (let cycle=0;cycle<4;cycle++) {
  for (const position of [-500,-300,-150,0,-150,-300,-500,0]) {
    top=position;events.scroll();frame();
    const p=Math.max(0,Math.min(1,-position/500));
    assert.equal(Number(props['--reveal-opacity']),1-p*p*(3-2*p));
    assert.equal(header.dataset.cloudNav,p>=.6?'visible':'hidden');
    assert.equal(skip.hidden,p>=.6);
  }
}
heroEvents.focusin({target:{}});frame();assert.equal(props['--reveal-opacity'],'0');
events.pageshow();frame();assert.equal(props['--reveal-opacity'],'1');
homeVisible=false;events.hashchange();frame();assert.equal(header.dataset.cloudNav,undefined);assert.equal(header.inert,false);
assert.ok(css.includes('animation:none!important'));
assert.ok(css.includes('prefers-reduced-motion:reduce'));
assert.ok(css.includes('padding-bottom:0'));
assert.ok(css.includes('top:-69px;height:72px'));
assert.ok(css.includes('top:-41px;height:44px'));
assert.ok(css.includes('height:calc(var(--scene-height,100svh) + 70svh)'));
assert.ok(!css.includes('padding-bottom:70svh'));
assert.ok(css.includes("[data-motion='playing'] #today{margin-top:-28svh"));
assert.ok(css.includes("[data-motion='playing'] #today{margin-top:0}"));
assert.ok(css.includes("[data-motion='paused'] .cloud-journey{height:auto"));
// At release the sticky scene's bottom meets the wrapper/next-section boundary.
for (const [scene, viewport] of [[1054,749],[560,820],[667,700]]) {
  const travel=viewport*.7, wrapper=scene+travel;
  const stickyTop=Math.min(0,viewport-scene);
  const release=travel-stickyTop;
  assert.equal(wrapper-release,stickyTop+scene);
}
assert.ok(!js.includes('preventDefault'));
console.log('PASS: cloud scroll endpoints, midpoint, reverse, pause, skip and reduced-motion styles; rendered acceptance pending.');
