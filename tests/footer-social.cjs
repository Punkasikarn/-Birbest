const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),source=fs.readFileSync(path.join(root,'flow.js'),'utf8');
const start=source.indexOf('  const channels=['),end=source.indexOf('  const channelLinks=',start);
const c={};vm.runInNewContext(source.slice(start,end)+';this.channels=channels;',c);
const social=c.channels.filter(v=>v.group==='social');assert.equal(social.length,4);
for(const p of social){assert.ok(p.url.startsWith('https://'));const svg=fs.readFileSync(path.join(root,'assets/social',p.name.toLowerCase()+'.svg'),'utf8');assert.ok(svg.startsWith('<svg'));assert.ok(!svg.includes('<script'));}
assert.ok(source.includes("document.querySelector('footer').prepend(follow)"));
assert.ok(fs.readFileSync(path.join(root,'footer-social.css'),'utf8').includes('min-height:48px'));
console.log('Footer: 4 existing social URLs, local SVG logos and tap targets passed.');
