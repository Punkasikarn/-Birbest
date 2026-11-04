(() => {
  'use strict';
  const catalog = window.BirbestLearning;
  if (!catalog) return;
  const sources = new Map();
  const add = source => {
    const [name,url] = Array.isArray(source) ? source : [source?.name,source?.url];
    if (typeof url === 'string' && url.startsWith('https://') && !sources.has(url)) sources.set(url,name || url);
  };
  for (const species of catalog.getAvailableSpecies()) {
    for (const group of catalog.getCurriculum(species)) {
      for (const lesson of group.lessons) {
        (lesson.reviewReferences || []).forEach(add);
        Object.values(lesson.sources || {}).forEach(add);
        if (lesson.source) add(['แหล่งข้อมูลอ่านต่อ',lesson.source]);
        if (lesson.additionalSource) add([lesson.additionalSourceLabel,lesson.additionalSource]);
      }
    }
  }
  const dialog = document.createElement('dialog');
  dialog.className = 'reference-library';
  dialog.setAttribute('aria-labelledby','reference-library-title');
  dialog.innerHTML = '<button type="button" aria-label="ปิด">×</button><h2 id="reference-library-title">แหล่งข้อมูลและแนวทางการเรียบเรียง</h2><p>Bird School เรียบเรียงเพื่อการเรียนรู้จากแหล่งข้อมูลสัตวแพทย์และองค์กรด้านสวัสดิภาพนก เลือกอ่านแหล่งที่มาของคำแนะนำแต่ละเรื่องได้ในบทเรียนนั้น</p><p>วันที่ตรวจแหล่งข้อมูลและข้อจำกัดระบุในบทเรียนตามที่มีบันทึกไว้ บทเรียบเรียงยังรอตรวจโดยสัตวแพทย์ การมีแหล่งอ้างอิงไม่ได้หมายถึงการรับรองเนื้อหาโดยองค์กรนั้น</p><ul></ul>';
  const list = dialog.querySelector('ul');
  [...sources].sort((a,b)=>a[1].localeCompare(b[1])).forEach(([url,name]) => {
    const item = document.createElement('li'); const link = document.createElement('a');
    link.href = url; link.textContent = name; link.target = '_blank'; link.rel = 'noopener noreferrer';
    item.append(link); list.append(item);
  });
  document.body.append(dialog);
  let opener;
  const open = event => { event.preventDefault(); opener = event.currentTarget; dialog.showModal(); };
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{ if (opener?.isConnected) opener.focus(); });
  const footerLink = document.createElement('a'); footerLink.href = '#bird-school-sources';
  footerLink.textContent = 'แหล่งข้อมูลและแนวทางการเรียบเรียง'; footerLink.addEventListener('click',open);
  document.querySelector('.flow-footer').append(footerLink);
  function mount() {
    const view = document.querySelector('#route-view');
    if (!location.hash.startsWith('#/learn') || view.querySelector('.reference-method')) return;
    const block = document.createElement('details'); block.className = 'reference-method';
    block.innerHTML = '<summary>แหล่งข้อมูลและแนวทางการเรียบเรียง</summary><p>แหล่งอ้างอิงเฉพาะเรื่องอยู่ใกล้คำตอบหรือท้ายบท เพื่อให้อ่านตรวจสอบบริบทได้โดยตรง สถานะการตรวจและวันที่อ้างอิงคงตามบันทึกของแต่ละบท</p><a href="#bird-school-sources">ดูแหล่งข้อมูล Bird School ทั้งหมด</a>';
    block.querySelector('a').addEventListener('click',open); view.append(block);
  }
  window.addEventListener('hashchange',mount); mount();
})();
