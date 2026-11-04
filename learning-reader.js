(function (root) {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reference = source => {
    if (!source) return '';
    const [name,url] = Array.isArray(source) ? source : [source.name,source.url];
    return /^https:\/\//.test(url || '') ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(name || 'แหล่งข้อมูลอ่านต่อ')}</a>` : '';
  };
  const review = '<p class="footnote">บทเรียนฉบับร่าง · รอตรวจบทเรียบเรียงโดยสัตวแพทย์ ใช้ประกอบการเรียนรู้ ไม่แทนคำแนะนำเฉพาะตัว</p>';
  function render(catalog, speciesId, lessonId = '', section = '', questionGroup = '') {
    const species = catalog.getSpecies(speciesId);
    const groups = catalog.getCurriculum(speciesId);
    if (!groups) return null;
    const base = '#/learn/' + encodeURIComponent(speciesId);
    const all = groups.flatMap(g => g.lessons);
    const context = `<div class="species-context"><strong>${esc(species.label)}</strong><span>${esc(species.scope)}</span></div>`;
    const heading = (title, text, parent = '') => context + `<nav class="breadcrumbs" aria-label="เส้นทางหน้า"><a href="#home">หน้าแรก</a>${parent}<span aria-current="page">${esc(title)}</span></nav><header class="route-heading"><h1>${esc(title)}</h1><p>${esc(text)}</p></header>`;
    const result = (title, html) => ({title:`${title} | ${species.label} | Birbest`,html});
    if (!lessonId) {
      const title = 'เรียนรู้' + species.label;
      const shortcuts = groups.map(g => `<a href="${base}?section=${g.id}"${section === g.id ? ' aria-current="location"' : ''}><span>${esc(g.name)}</span></a>`).join('');
      const stages = groups.map(g => {
        const art = species.artwork?.[g.id];
        const cardArt = lesson => {
          const image = speciesId === 'sun-conure' ? lesson.articleImage : null;
          return image ? `<img src="assets/${esc(image.file)}" alt="${esc(lesson.cardTitle || lesson.title)}" width="${image.width || 1536}" height="${image.height || 1024}" loading="lazy" style="display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover">` : '';
        };
        return `<section class="species-stage" aria-labelledby="species-${g.id}"><h2 id="species-${g.id}" tabindex="-1">${esc(g.name)}</h2>${art ? `<img class="species-scene" src="assets/${esc(art.file)}" alt="${esc(art.alt)}" width="1536" height="1024" loading="lazy">` : ''}<div class="learning-cards">${g.lessons.map(l => `<a class="learning-card" href="${base}/${l.href}">${cardArt(l)}<div class="learning-card-copy"><h3>${esc(l.cardTitle || l.title)}</h3><p>${esc(l.text)}</p><span aria-hidden="true">→</span></div></a>`).join('')}</div></section>`;
      }).join('');
      return result(title, heading(title,'ค่อย ๆ รู้จักน้อง ตั้งแต่วันแรกจนถึงทุกวันที่อยู่ด้วยกัน') + review + `<nav class="learning-shortcuts" aria-label="หัวข้อในหน้านี้">${shortcuts}</nav>` + stages);
    }
    const lesson = catalog.getLesson(speciesId,lessonId);
    if (!lesson) return result('ยังไม่พบบทเรียนนี้', heading('ยังไม่พบบทเรียนนี้','') + `<a class="route-link" href="${base}">กลับไปเลือกบทเรียน</a>`);
    const group = groups.find(g => g.lessons.some(l => l.href === lessonId));
    const parent = `<a href="${base}">เรียนรู้${esc(species.label)}</a><a href="${base}?section=${group.id}">${esc(group.name)}</a>`;
    let body = '';
    if (lesson.format === 'sections') body = lesson.sections.map(([title,text], index) => {
      const image = lesson.sectionImages?.[index];
      const figure = image ? `<figure class="welcome-art"><img src="assets/${esc(image.file)}" alt="${esc(image.alt)}" width="1536" height="1024" loading="lazy"><figcaption>${esc(image.caption)}</figcaption></figure>` : '';
      return `<section class="route-section"><h2>${esc(title)}</h2><p>${esc(text)}</p></section>${figure}`;
    }).join('');
    const questionMarkup = q => {
      const [title,answer,detail,key] = Array.isArray(q) ? q : [q.question,q.answer,q.detail,q.source];
      const image = lesson.questionImages?.[title];
      const figure = image ? `<figure class="welcome-art"><img src="assets/${esc(image.file)}" alt="${esc(image.alt)}" width="1536" height="1024" loading="lazy"><figcaption>${esc(image.caption)}</figcaption></figure>` : '';
      return `<details class="food-question"><summary>${esc(title)}</summary><div class="food-question-body"><p><strong>${esc(answer)}</strong></p><p>${esc(detail)}</p>${figure}<p class="footnote">${reference(lesson.sources?.[key])}</p></div></details>`;
    };
    if (lesson.format === 'questions') {
      const grouped = lesson.questions.every(q => !Array.isArray(q) && q.group);
      const questionGroups = grouped ? [...new Set(lesson.questions.map(q => q.group))] : [];
      body = `<p class="label">${lesson.questions.length} คำถาม</p>`;
      if (grouped) {
        body += `<nav class="learning-shortcuts question-shortcuts" aria-label="หมวดคำถาม">${questionGroups.map((name,i) => `<a href="${base}/${lessonId}?group=${i}"${String(questionGroup) === String(i) ? ' aria-current="location"' : ''}><span>${esc(name)}</span></a>`).join('')}</nav>`;
        body += questionGroups.map((name,i) => `<section class="species-question-group" aria-labelledby="question-group-${i}"><h2 id="question-group-${i}" tabindex="-1">${esc(name)}</h2>${lesson.questions.filter(q => q.group === name).map(questionMarkup).join('')}</section>`).join('');
      } else body += lesson.questions.map(questionMarkup).join('');
    }
    if (lesson.format === 'html') body = catalog.lessonHtml(speciesId,lessonId);
    const alert = lessonId === 'health/eggs'
      ? '<aside class="lesson-alert"><strong>เบ่งซ้ำ อ่อนแรง หรือหายใจลำบาก? ขอความช่วยเหลือตอนนี้</strong><p>หากน้องมีอาการเหล่านี้ นั่งก้นกรงผิดปกติ มีเลือด หรือมีเนื้อเยื่อโผล่ที่ก้น ให้ติดต่อสัตวแพทย์ที่รับนกทันที ไม่รอให้เห็นไข่และไม่รออ่านบทนี้จบ อาการเหล่านี้อาจมีได้หลายสาเหตุ ไม่ใช่คำวินิจฉัยว่าไข่ค้าง</p><p>ไม่บีบท้อง ดึงไข่ หรือหยอดน้ำมันเอง ให้คลินิกแนะนำการเดินทาง</p><p class="footnote">'+reference(lesson.sources.merck)+'</p></aside>'
      : lessonId === 'behavior/sounds'
      ? '<aside class="lesson-alert"><strong>เมื่อเสียงและอาการเปลี่ยนจากเดิม</strong><p>หากกินน้อย ซึม หรือนอนมากขึ้น ให้ติดต่อสัตวแพทย์ที่ดูแลนกโดยเร็ว หากหายใจลำบากหรืออ่อนแรงมาก ให้ขอความช่วยเหลือฉุกเฉินได้เลย</p></aside>'
      : ['food/guide','welcome/first-meal','home/sleep'].includes(lessonId)
      ? '<aside class="lesson-alert"><strong>เมื่อการกินหรืออาการเปลี่ยนไป</strong><p>หากไม่กินหรือกินลดลงผิดปกติ ติดต่อสัตวแพทย์ที่ดูแลนกโดยเร็ว หากหายใจลำบากหรืออ่อนแรงมาก ให้ขอความช่วยเหลือฉุกเฉินได้เลย</p></aside>'
      : lessonId === 'home/cleaning' ? '<aside class="lesson-alert"><strong>เตรียมพื้นที่ก่อนใช้น้ำยา</strong><p>ให้น้องอยู่ในพื้นที่ปลอดภัยแยกจากบริเวณทำความสะอาด ใช้ผลิตภัณฑ์ตามฉลาก และปรึกษาสัตวแพทย์หากไม่แน่ใจเรื่องความเหมาะสม</p></aside>'
      : lessonId === 'home/identification' ? '<aside class="lesson-alert"><strong>ขาบวม มีแผล เลือดออก หรือห่วงเกี่ยวติด?</strong><p>ติดต่อสัตวแพทย์ที่รับนกทันที อย่าตัด งัด หรือดึงห่วงออกเอง</p></aside>' : '';
    const art = lesson.articleImage;
    const illustration = art ? `<figure class="welcome-art lesson-art"><img src="assets/${esc(art.file)}" alt="${esc(art.alt)}" width="${esc(art.width || 1536)}" height="${esc(art.height || 1024)}" loading="lazy"><figcaption>${esc(art.caption)}</figcaption></figure>` : lesson.artNeeded ? `<figure class="welcome-art lesson-art art-placeholder" data-art-needed="${esc(lesson.artNeeded.id)}"><div><p class="label">ภาพประกอบกำลังเตรียม</p><h2>${esc(lesson.artNeeded.title)}</h2><p>${esc(lesson.artNeeded.description)}</p></div><figcaption>ช่องนี้เว้นไว้สำหรับภาพเฉพาะของบทเรียนนี้</figcaption></figure>` : '';
    const notes = lesson.notes.map(n => `<section class="route-section"><h2>${esc(n.title)}</h2><p>${esc(n.text)}</p></section>`).join('');
    const refs = [...(lesson.reviewReferences || []),...Object.values(lesson.sources || {})];
    if (lesson.source) refs.push(['แหล่งข้อมูลอ่านต่อ',lesson.source]);
    if (lesson.additionalSource) refs.push([lesson.additionalSourceLabel,lesson.additionalSource]);
    const seen = new Set();
    const references = refs.filter(r => {
      const url = Array.isArray(r) ? r[1] : r.url;
      if (!url || seen.has(url)) return false;
      seen.add(url);return true;
    }).map(r => `<li>${reference(r)}</li>`).join('');
    const index = all.findIndex(l => l.href === lessonId);
    const neighbor = (l,label) => `<a class="route-link" href="${base}/${l.href}">${label}: ${esc(l.cardTitle || l.title)}</a>`;
    const navigation = `<nav class="lesson-navigation" aria-label="อ่านต่อ">${index > 0 ? neighbor(all[index-1],'ก่อนหน้า') : ''}${index < all.length-1 ? neighbor(all[index+1],'เรื่องถัดไป') : `<a class="route-link" href="${base}">กลับไปเลือกบทเรียน</a>`}</nav><p><a class="route-link" href="${base}?section=${group.id}">รวมเรื่อง${esc(group.name)}</a></p>`;
    const illustratedBody = lessonId === 'health/guide' ? body + illustration : illustration + body;
    return result(lesson.title, heading(lesson.title,lesson.text,parent) + review + `<article class="route-body">${alert}${illustratedBody}${notes}<details class="species-sources"><summary>แหล่งข้อมูลอ่านต่อ</summary><ul>${references}</ul></details></article>` + navigation);
  }
  function focusSection(view, section) {
    if (!['welcome','daily','understand'].includes(section)) return;
    const target = view.querySelector('#species-' + section);
    target?.scrollIntoView({block:'start'});
    target?.focus({preventScroll:true});
  }
  function focusQuestions(view, group) {
    if (!/^(0|[1-9][0-9]?)$/.test(String(group ?? ''))) return;
    const target = view.querySelector('#question-group-' + group);
    target?.scrollIntoView({block:'start'});
    target?.focus({preventScroll:true});
  }
  root.BirbestLearningReader = Object.freeze({render,focusSection,focusQuestions});
})(globalThis);
