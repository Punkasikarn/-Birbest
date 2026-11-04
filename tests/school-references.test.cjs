const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..');
const context={}; vm.createContext(context);
for(const file of ['learning-catalog.js','sun-conure-content.js','learning-content.js']) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const elements=[];
function element(){const el={children:[],setAttribute(){},addEventListener(type,fn){this[type]=fn;},append(child){this.children.push(child);},querySelector(selector){return this.parts[selector] ||= element();},parts:{}}; elements.push(el);return el;}
const body=element(),footer=element(),view=element(); view.querySelector=()=>null;
context.window=context;
context.location={hash:'#/learn/cockatiel'};
context.addEventListener=()=>{};
context.document={body,createElement:element,querySelector:s=>s==='.flow-footer'?footer:view};
vm.runInContext(fs.readFileSync(path.join(root,'school-references.js'),'utf8'),context);
const links=elements.filter(el=>el.target==='_blank');
assert.ok(links.length>10);
assert.equal(new Set(links.map(el=>el.href)).size,links.length);
assert.ok(links.every(el=>el.href.startsWith('https://')));
assert.equal(footer.children.length,1); assert.equal(view.children.length,1);
assert.ok(body.children[0].innerHTML.includes('ยังรอตรวจโดยสัตวแพทย์'));
console.log(`Source library: ${links.length} unique HTTPS sources, footer, lesson panel and review status passed.`);
