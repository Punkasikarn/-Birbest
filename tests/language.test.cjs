const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname,'..');
const nodes = ['ร้านค้า','19 รายการ','1 ซอง · 12 กรัม','คำแนะนำที่ยังไม่ได้แปล'].map(nodeValue=>({nodeValue,parentElement:{closest:()=>null}}));
const field = {values:{placeholder:'ชื่อสินค้า / สายพันธุ์',alt:'ร้านค้า'},hasAttribute(k){return k in this.values;},getAttribute(k){return this.values[k];},setAttribute(k,v){this.values[k]=v;}};
const buttons = ['th','en'].map(language=>({dataset:{language},setAttribute(k,v){this[k]=v;}}));
let switcher;
const document = {
  body:{},documentElement:{},
  createElement(tag){ const el={setAttribute(){},querySelectorAll:()=>buttons,addEventListener(type,fn){this.click=fn;}}; if(tag==='div')switcher=el; return el; },
  querySelector:()=>({before(){},after(){}}),
  querySelectorAll:()=>[field],
  createTreeWalker(){let i=0; return {nextNode(){this.currentNode=nodes[i++];return !!this.currentNode;}};}
};
const storage = {};
const context={window:{},document,NodeFilter:{SHOW_TEXT:4},MutationObserver:class{disconnect(){} observe(){}},queueMicrotask:fn=>fn(),localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v}};
vm.runInNewContext(fs.readFileSync(path.join(root,'language-stories.js'),'utf8'),context);
vm.runInNewContext(fs.readFileSync(path.join(root,'language.js'),'utf8'),context);
const select = language => switcher.click({target:{closest:()=>buttons.find(b=>b.dataset.language===language)}});
select('en');
assert.equal(context.window.BirbestLanguage.translate('อุด้งกับเสียงถุงกรอบแกรบ'),'Udon and the Rustling Bag');
assert.equal(context.window.BirbestLanguage.translate('ฉาก 2 / 4'),'Scene 2 / 4');
assert.equal(nodes[0].nodeValue,'Shop');
assert.equal(nodes[1].nodeValue,'19 products');
assert.equal(field.values.placeholder,'Product name / bird species');
assert.equal(field.values.alt,'Shop');
assert.equal(document.documentElement.lang,'en');
assert.equal(storage['birbest-language'],'en');
nodes[1].nodeValue='3 รายการ'; context.window.BirbestLanguage.apply();
assert.equal(nodes[1].nodeValue,'3 products');
select('th'); assert.equal(nodes[0].nodeValue,'ร้านค้า'); assert.equal(nodes[1].nodeValue,'3 รายการ');
assert.equal(field.values.placeholder,'ชื่อสินค้า / สายพันธุ์');
assert.equal(field.values.alt,'ร้านค้า');
select('en'); select('th'); assert.equal(nodes[2].nodeValue,'1 ซอง · 12 กรัม');
assert.equal(nodes[3].nodeValue,'คำแนะนำที่ยังไม่ได้แปล');
context.localStorage.setItem=()=>{throw Error('Storage blocked');}; select('en');
assert.equal(context.window.BirbestLanguage.language,'en');
console.log('Language: switching, restoration, dynamic counts, attributes, storage and Thai fallback passed.');
