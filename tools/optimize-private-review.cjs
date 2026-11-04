const fs=require('node:fs'),path=require('node:path');
const sharp=require('C:/Users/punka/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'../../07_Birbest_World_PrivateReview/dist/assets');
async function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name);if(entry.isDirectory()){await walk(file);continue;}
 if(!/\.(png|jpe?g|jfif|webp)$/i.test(file))continue;
 const input=fs.readFileSync(file);let pipeline=sharp(input).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true});
 const ext=path.extname(file).toLowerCase();
 if(ext==='.png')pipeline=pipeline.png({palette:true,quality:85,effort:7});
 else if(ext==='.webp')pipeline=pipeline.webp({quality:82});
 else pipeline=pipeline.jpeg({quality:82,mozjpeg:true});
 const result=await pipeline.toBuffer();if(result.length<input.length)fs.writeFileSync(file,result);
}}
walk(root).then(()=>{let bytes=0;function sum(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())sum(f);else bytes+=fs.statSync(f).size;}}sum(root);console.log(JSON.stringify({assetBytes:bytes,originalsUnchanged:true}));}).catch(e=>{console.error(e.message);process.exitCode=1;});
