const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
let input='';process.stdin.setEncoding('utf8');
if(process.stdin.isTTY)process.stdin.setRawMode(true);
console.log('Ready for hidden credential input.');
process.stdin.on('data',s=>{input+=s;if(/[\r\n]/.test(input)){process.stdin.pause();run();}});
function run(){
 const c=JSON.parse(input);const temp=fs.mkdtempSync(path.join(os.tmpdir(),'birbest-index-'));
 const env={...process.env,GIT_INDEX_FILE:path.join(temp,'index'),GIT_AUTHOR_NAME:'Sites',GIT_AUTHOR_EMAIL:'sites@users.noreply.openai.com',GIT_COMMITTER_NAME:'Sites',GIT_COMMITTER_EMAIL:'sites@users.noreply.openai.com'};
 const args=['-c','http.sslBackend=openssl','-c','credential.helper=','-c','http.extraHeader='];
 if(c.auth_mode==='http_extra_header'){env.SITES_GIT_AUTHORIZATION='Authorization: Bearer '+c.token;args.push('--config-env=http.'+c.remote_url+'.extraHeader=SITES_GIT_AUTHORIZATION');}
 function git(a,stdin){const r=cp.spawnSync('git',[...args,...a],{env,input:stdin,encoding:'utf8',maxBuffer:20*1024*1024,windowsHide:true});if(r.status!==0)throw Error((r.stderr||'git failed').split(c.token||'TOKEN_NOT_PRESENT').join('[redacted]'));return r.stdout.trim();}
 const original=git(['rev-parse','HEAD']);const branch=git(['symbolic-ref','--short','HEAD']);
 if(branch!==c.branch)throw Error('Unexpected local branch');
 const entries=git(['ls-tree','-r','-z',original]).split('\0').filter(Boolean).map(line=>{const [meta,file]=line.split('\t');const [mode,,oid]=meta.split(' ');return {mode,oid,file,size:fs.statSync(file).size};});
 git(['read-tree','--empty']);let parent='',batch=[],bytes=0,n=0;
 function push(){if(!batch.length)return;git(['update-index','--add','--index-info'],batch.map(e=>`${e.mode} ${e.oid}\t${e.file}`).join('\n')+'\n');const tree=git(['write-tree']);const commit=git(['commit-tree',tree,...(parent?['-p',parent]:[])],`Private review assets batch ${++n}\n`);git(['push',c.remote_url,commit+':refs/heads/'+c.branch]);parent=commit;console.log('Sent batch '+n+' ('+batch.length+' files)');batch=[];bytes=0;}
 for(const e of entries){if(bytes+e.size>40*1024*1024)push();batch.push(e);bytes+=e.size;}push();
 const final=git(['commit-tree',git(['rev-parse',original+'^{tree}']),'-p',parent,'-p',original],'Complete private review source\n');
 git(['push',c.remote_url,final+':refs/heads/'+c.branch]);git(['update-ref','refs/heads/'+branch,final,original]);
 console.log(JSON.stringify({commit_sha:final,batches:n}));
 process.exit(0);
}
