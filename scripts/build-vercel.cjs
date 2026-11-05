const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
for(const name of fs.readdirSync(root))if(name==='index.html'||/\.(js|css)$/.test(name))fs.copyFileSync(path.join(root,name),path.join(out,name));
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else files.push(f);}}walk(out);
if(files.some(f=>/\.(docx|pdf|csv|md|py)$/i.test(f)))throw Error('Non-public document in output');
console.log(`Static website prepared: ${files.length} files. Internal documents excluded.`);
