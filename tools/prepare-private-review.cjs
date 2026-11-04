const fs=require('node:fs'),path=require('node:path');
const source=path.resolve(__dirname,'..');
const target=path.resolve(source,'../07_Birbest_World_PrivateReview/dist');
fs.mkdirSync(target,{recursive:true});
// Allow only browser code and public assets; never copy owner notes or QA files.
const files=fs.readdirSync(source).filter(name=>name==='index.html'||/\.(js|css)$/.test(name));
for(const name of files)fs.copyFileSync(path.join(source,name),path.join(target,name));
const allowed=/\.(png|jpe?g|jfif|webp|gif|svg|woff2?|ttf|otf|mp4|webm|ico)$/i;
let count=0,bytes=0;
function copyAssets(dir,relative='assets'){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const input=path.join(dir,entry.name),output=path.join(target,relative,entry.name);
    if(entry.isSymbolicLink())throw Error('Symlink excluded: '+input);
    if(entry.isDirectory()){copyAssets(input,path.join(relative,entry.name));continue;}
    if(!allowed.test(entry.name))continue;
    fs.mkdirSync(path.dirname(output),{recursive:true});fs.copyFileSync(input,output);
    count++;bytes+=fs.statSync(input).size;
  }
}
copyAssets(path.join(source,'assets'));
const html=fs.readFileSync(path.join(target,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g)){
  if(!fs.existsSync(path.join(target,match[1].split('?')[0])))throw Error('Missing entry dependency: '+match[1]);
}
console.log(JSON.stringify({target,codeFiles:files.length,assets:count,assetBytes:bytes,excluded:'Owner Markdown, tests, tools, QA documents/screenshots, source business folders'}));
