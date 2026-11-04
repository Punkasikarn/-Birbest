// Keep the decorative cloud tied to scroll position, including Back navigation.
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const distance = Math.max(0, window.scrollY - (hero.getBoundingClientRect().top + window.scrollY));
    const progress = reducedMotion.matches ? 0 : Math.min(1, distance / 280);
    hero.style.setProperty('--cloud-rise', `${-150 * progress}px`);
    hero.style.setProperty('--cloud-opacity', String(1 - progress));
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  window.addEventListener('pageshow', schedule);
  reducedMotion.addEventListener('change', schedule);
  update();
})();

const friends = {
  millet: {name:'อุด้ง',species:'COCKATIEL / ค็อกคาเทล',image:'mascot-udon.webp',story:'นักสำรวจช่างคิด เห็นมิลเลตทีไรตาวาวทุกที',action:'ทักอุด้ง',reply:'จิ๊บ จิ๊บ ♪',motion:'bounce'},
  sunny: {name:'แร้บเตอร์',species:'SUN CONURE / ซันคอนัว',image:'mascot-raptor.webp',story:'ซันคอนัวเสียงดัง ชอบเต้นและฟังเพลง',action:'ทักแร้บเตอร์',reply:'แร้บเตอร์ค้าบ',motion:'sing'}
};
const dialog = document.querySelector('#friend-dialog');
let currentFriend;
document.querySelectorAll('[data-friend]').forEach(button => button.addEventListener('click', () => {
  if (button.hasAttribute('data-mascot-activity')) return;
  window.location.hash = '/characters/' + button.dataset.friend;
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if(event.target === dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
document.querySelector('#friend-action').addEventListener('click', () => {
  const portrait=document.querySelector('.dialog-portrait');
  portrait.className='dialog-portrait';
  void portrait.offsetWidth;
  portrait.classList.add(currentFriend.motion);
  document.querySelector('#friend-response').textContent=currentFriend.reply;
});
const menu=document.querySelector('.menu-toggle');
function setMainMenuOpen(open){
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'ปิดเมนู':'เปิดเมนู');
  document.querySelector('.site-header nav').classList.toggle('open',open);
}
menu.addEventListener('click',()=>setMainMenuOpen(menu.getAttribute('aria-expanded')!=='true'));
document.querySelectorAll('.site-header nav a').forEach(link=>link.addEventListener('click',()=>setMainMenuOpen(false)));
const questions=[
  {title:'นกทุกตัวในสายพันธุ์เดียวกัน จะมีนิสัยเหมือนกันไหม?',options:['เหมือนกันทุกตัวเลย','แต่ละตัวมีนิสัยของตัวเอง','ดูจากสีขนก็รู้แล้ว'],answer:1,explanation:'แต่ละตัวมีบุคลิกและประสบการณ์ต่างกัน ลองสังเกตเพื่อนตัวเล็กของเราไปทีละวัน จะได้รู้ว่าอะไรทำให้น้องสบายใจ',source:'https://lafeber.com/pet-birds/species/parrot/',sourceLabel:'อ่านต่อที่ Lafeber'},
  {title:'ทำไมของเล่นที่น้องต้องค้นหาของข้างใน ถึงน่าสนใจ?',options:['เพราะได้สำรวจและหาอาหาร','เพราะไม่ต้องดูแลน้องอีก','เพราะใช้แทนอาหารได้'],answer:0,explanation:'การหาอาหารเป็นกิจกรรมหนึ่งที่เปิดโอกาสให้นกได้ใช้พฤติกรรมตามธรรมชาติ เลือกวัสดุที่เหมาะกับน้อง และคอยดูความปลอดภัยระหว่างเล่น',source:'https://parrots.org/reference-library/reference-library-hide-and-seek-foraging-and-puzzle-toys/'},
  {title:'วันนี้อยากรู้จักน้องให้มากขึ้น เริ่มจากอะไรดี?',options:['บังคับให้ลองของใหม่ทันที','ดูจากนกตัวอื่นอย่างเดียว','สังเกตว่าน้องเลือกเข้าใกล้อะไร'],answer:2,explanation:'เริ่มจากการสังเกตและให้ทางเลือก ช่วยให้เราเรียนรู้สิ่งที่น้องสนใจโดยไม่ต้องรีบร้อน วันนี้อาจแค่มอง พรุ่งนี้ค่อยลองก็ได้',source:'https://www.parrots.org/pdfs/all_about_parrots/reference_library/PEAB2.pdf'}
];
let questionIndex=0,answered=false,quizComplete=false;
const next=document.querySelector('.quiz-next');
const quizHost=document.querySelector('.quiz-host');
function updateQuizHost(message, celebrate=false){
  if(!quizHost)return;
  quizHost.querySelector('.quiz-host-speech').textContent=message;
  quizHost.classList.toggle('is-cheering',celebrate);
}
function renderQuestion(){
  answered=false;
  updateQuizHost(questionIndex===0?'แร้บเตอร์ค้าบ! มาเล่นด้วยกัน':'มาลองอีกเรื่องด้วยกันค้าบ');
  const q=questions[questionIndex];
  document.querySelector('#quiz-count').textContent=`0${questionIndex+1} / 03`;
  const content=document.querySelector('#quiz-content');
  content.replaceChildren();
  const heading=document.createElement('h3');
  heading.textContent=q.title;
  content.append(heading);
  const list=document.createElement('div');
  list.className='quiz-options';
  q.options.forEach((label,index)=>{
    const button=document.createElement('button');
    button.className='quiz-option';
    const badge=document.createElement('b');
    badge.textContent=String.fromCharCode(65+index);
    const text=document.createElement('span');
    text.textContent=label;
    button.append(badge,text);
    button.addEventListener('click',()=>{
      if(answered)return;
      answered=true;
      updateQuizHost(index===q.answer?'ใช่เลยค้าบ!':'ได้รู้จักน้องเพิ่มอีกเรื่องแล้วค้าบ',true);
      list.querySelectorAll('button').forEach((option,i)=>{
        option.disabled=true;
        option.classList.toggle('correct',i===q.answer);
        option.classList.toggle('incorrect',i===index&&index!==q.answer);
      });
      const result=document.querySelector('.quiz-result');
      result.textContent=(index===q.answer?'ใช่เลย! ':'คำตอบคือ '+q.options[q.answer]+' · ')+q.explanation+' ';
      const source=document.createElement('a');
      source.href=q.source;
      source.target='_blank';
      source.rel='noopener';
      source.textContent=q.sourceLabel||'อ่านต่อที่ World Parrot Trust';
      result.append(source);
      next.hidden=false;
      next.textContent=questionIndex===questions.length-1?'จบกิจกรรม →':'เรื่องต่อไป →';
    });
    list.append(button);
  });
  content.append(list);
  document.querySelector('.quiz-result').textContent='';
  next.hidden=true;
}
next.addEventListener('click',()=>{
  if(quizComplete){quizComplete=false;questionIndex=0;renderQuestion();}
  else if(questionIndex===questions.length-1){
    quizComplete=true;
    updateQuizHost('แร้บเตอร์ค้าบ! ขอบคุณที่มาเล่นด้วยกัน',true);
    document.querySelector('#quiz-count').textContent='ครบ 3 เรื่องแล้ว';
    document.querySelector('#quiz-content').innerHTML='<h3>ขอบคุณที่มาเล่นกับแร้บเตอร์!</h3><p>วันนี้ได้รู้จักนิสัยของน้อง การค้นหาอาหาร และการสังเกตสิ่งที่น้องสนใจแล้ว</p><a class="route-link" href="#/learn/cockatiel">เรียนรู้ต่อใน Bird School →</a>';
    document.querySelector('.quiz-result').textContent='';
    next.textContent='เล่นอีกครั้ง ↻';
  }else{questionIndex++;renderQuestion();}
  const heading=document.querySelector('#quiz-content h3');heading.tabIndex=-1;heading.focus({preventScroll:true});
});renderQuestion();
let saved=[];try{const raw=JSON.parse(localStorage.getItem('birbest-world-postcards')||'[]');if(Array.isArray(raw))saved=raw.filter(id=>['village','home'].includes(id));}catch{}
let filter='all';
function renderSaved(){document.querySelectorAll('[data-card]').forEach(card=>{const chosen=saved.includes(card.dataset.card);const button=card.querySelector('.save');button.setAttribute('aria-pressed',String(chosen));button.textContent=chosen?'♥':'♡';card.hidden=filter==='saved'&&!chosen;});document.querySelector('#saved-count').textContent=saved.length;document.querySelector('.empty-saved').hidden=!(filter==='saved'&&saved.length===0);}
const postcardStatus=document.createElement('p');postcardStatus.className='status';postcardStatus.setAttribute('role','status');document.querySelector('.postcard-toolbar').after(postcardStatus);
// File previews cannot reliably trigger downloads; keep the website open instead.
if(location.protocol==='file:')document.querySelectorAll('#postcards a[download]').forEach(link=>{
  link.removeAttribute('download');link.target='_blank';link.rel='noopener';
  if(link.classList.contains('download'))link.textContent='เปิดภาพต้นฉบับ ↗';
  else link.setAttribute('aria-label','เปิดภาพต้นฉบับ '+link.querySelector('img').alt);
});
document.querySelectorAll('.save').forEach(button=>button.addEventListener('click',()=>{
  const id=button.closest('[data-card]').dataset.card;saved=saved.includes(id)?saved.filter(value=>value!==id):[...saved,id];
  let stored=true;try{localStorage.setItem('birbest-world-postcards',JSON.stringify(saved));}catch{stored=false;}
  renderSaved();postcardStatus.textContent=stored?(saved.includes(id)?'เพิ่มในใบโปรดแล้ว · เก็บไว้ในเบราว์เซอร์นี้':'นำออกจากใบโปรดแล้ว'):'เลือกไว้สำหรับครั้งนี้แล้ว แต่เบราว์เซอร์ยังบันทึกไว้ครั้งหน้าไม่ได้';
  if(button.closest('[data-card]').hidden)document.querySelector('[data-filter="saved"]').focus();
}));
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('.filter').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});renderSaved();}));renderSaved();
