(() => {
  const home = document.querySelector('#home-view');
  const view = document.createElement('main');
  view.className = 'route-view';
  view.id = 'route-view';
  view.tabIndex = -1;
  view.hidden = true;
  home.after(view);
  const skipLink=document.querySelector('a.skip');
  skipLink.addEventListener('click',event=>{
    event.preventDefault();
    const content=view.hidden?home:view;
    content.focus({preventScroll:true});
    content.scrollIntoView({block:'start',behavior:'instant'});
  });
  const postcards = document.querySelector('#postcards');
  const postcardSlot = document.createElement('div');
  postcardSlot.hidden = true;
  home.after(postcardSlot);
  postcardSlot.append(postcards);

  const categories = [
    {id:'food', name:'อาหารและน้ำ', title:'เรื่องกินของค็อกคาเทล เริ่มตรงไหนดี?', text:'เมล็ด เพลเลต อาหารใหม่ และน้ำสะอาด เรื่องใกล้ตัวที่เจ้าของนกสงสัย', question:'กินแต่เมล็ดได้ไหม?', answer:'เมล็ดอย่างเดียวไม่ใช่อาหารที่ครบถ้วน', paragraphs:[], source:'https://vcahospitals.com/know-your-pet/cockatiels-feeding'},
    {id:'behavior', name:'พฤติกรรม', title:'เริ่มทำความคุ้นเคยกับน้องอย่างไร?', text:'รู้จักน้องจากสิ่งที่เลือกทำและบริบทรอบตัว', question:'นกสายพันธุ์เดียวกันมีนิสัยเหมือนกันไหม?', answer:'แต่ละตัวมีบุคลิกและประสบการณ์ของตัวเอง', paragraphs:['คาแรคเตอร์ของ Birbest เป็นเรื่องเล่า ส่วนนกที่อยู่กับเรามีความชอบของตัวเอง ลองสังเกตว่าน้องเลือกเข้าใกล้อะไร และเลือกถอยออกจากอะไร','บันทึกเหตุการณ์พร้อมบริบท เช่น ใครอยู่ด้วย มีเสียงหรือสิ่งของใหม่หรือไม่ ช่วยให้เราจำสิ่งที่เกิดขึ้นได้ตรงกว่าการติดป้ายว่าน้องดื้อหรือขี้กลัว'], source:'https://lafeber.com/pet-birds/species/parrot/'},
    {id:'health', name:'สุขภาพและร่างกาย', title:'เมื่อไรควรติดต่อสัตวแพทย์?', text:'สังเกตสิ่งที่เปลี่ยนไป และเตรียมขอความช่วยเหลือ', question:'น้องดูต่างจากทุกวัน เริ่มตรงไหนดี?', answer:'ติดต่อสัตวแพทย์ที่ดูแลนกเพื่อประเมินความเร่งด่วน', paragraphs:[], source:'https://www.merckvetmanual.com/bird-owners/disorders-and-diseases-of-birds/injuries-and-accidents-of-pet-birds'},
    {id:'home', name:'บ้านและความปลอดภัย', title:'เดินสำรวจพื้นที่ของน้อง', text:'เริ่มจากมุมที่น้องใช้ชีวิตจริงในแต่ละวัน', question:'เริ่มสำรวจบ้านจากตรงไหนดี?', answer:'เริ่มจากกรง คอน ของเล่น และบริเวณที่น้องออกมาใช้เวลา', paragraphs:['สังเกตสภาพอุปกรณ์และสิ่งที่เปลี่ยนไปในพื้นที่เดิม ถ้ามีสิ่งของใหม่เข้ามา ให้ตรวจความเหมาะสมก่อนให้น้องเข้าถึง','จดจุดที่ยังไม่แน่ใจไว้เพื่อหาข้อมูลจากแหล่งที่เชื่อถือได้ การดูเพียงภาพหรือความน่ารักของอุปกรณ์ยังไม่เพียงพอที่จะยืนยันความปลอดภัย'], source:'https://parrots.org/learn/care-guides/'},
    {id:'play', name:'เล่นและสำรวจ', title:'ความสนุกของการค้นหา', text:'ให้การสำรวจเป็นส่วนหนึ่งของวันธรรมดา', question:'ทำไมการหาอาหารถึงเป็นกิจกรรมได้?', answer:'การค้นหาเปิดโอกาสให้นกได้ใช้พฤติกรรมตามธรรมชาติ', paragraphs:['กิจกรรมค้นหาอาหารช่วยเพิ่มสิ่งที่น้องได้สำรวจ เริ่มจากกิจกรรมที่เหมาะกับความสามารถและความสนใจของน้อง','วัสดุและอุปกรณ์ต้องเหมาะกับนกของเรา คอยสังเกตระหว่างเล่น และไม่บังคับให้น้องเข้าหาสิ่งที่ยังไม่พร้อม'], source:'https://parrots.org/reference-library/reference-library-hide-and-seek-foraging-and-puzzle-toys/'}
  ];
  const curriculum = BirbestLearning.getCurriculum('cockatiel');
  const welcomeTopics = curriculum.find(group=>group.id==='welcome').lessons;
  const foodLessonData = BirbestLearning.getLesson('cockatiel','food/guide');
  const foodSources = foodLessonData.sources;
  const foodQuestions = foodLessonData.questions;
  const cleaningLessonData = BirbestLearning.getLesson('cockatiel','home/cleaning');
  const cleaningSources = cleaningLessonData.sources;
  const cleaningQuestions = cleaningLessonData.questions;
  const sleepLessonData = BirbestLearning.getLesson('cockatiel','home/sleep');
  const sleepSources = sleepLessonData.sources;
  const sleepQuestions = sleepLessonData.questions;
  const trustLessonData = BirbestLearning.getLesson('cockatiel','behavior/guide');
  const trustSources = trustLessonData.sources;
  const trustQuestions = trustLessonData.questions;
  const playLessonData = BirbestLearning.getLesson('cockatiel','play/guide');
  const playSources = playLessonData.sources;
  const playQuestions = playLessonData.questions;
  const foodGroups = [...new Set(foodQuestions.map(item=>item.group))];
  const foodLesson = () => `<p class="food-intro">เพิ่งเริ่มเลี้ยงแล้วมีคำถามเรื่องอาหาร เป็นเรื่องธรรมดา ลองเริ่มจากข้อที่สงสัย ไม่จำเป็นต้องรู้ทุกอย่างในวันเดียว</p>
    <aside class="lesson-alert"><strong>ช่วงนี้น้องกินน้อยลงผิดปกติ?</strong><p>${esc(foodQuestions[6].detail)}</p></aside>
    <nav class="learning-shortcuts" aria-label="หมวดคำถามเรื่องอาหาร">${foodGroups.map((group,i)=>`<a href="#/learn/cockatiel/food/guide?group=${i}" data-food-group="${i}">${esc(group)} <span aria-hidden="true">↓</span></a>`).join('')}</nav>`+
    foodGroups.map((group,i)=>`<section class="food-group"><h2 id="food-group-${i}" tabindex="-1">${esc(group)}</h2>${foodQuestions.filter(item=>item.group===group).map(item=>`<details class="food-question"><summary>${esc(item.question)}</summary><div class="food-question-body"><p class="food-answer">${esc(item.answer)}</p><p>${esc(item.detail)}</p><a class="label route-link" href="${foodSources[item.source].url}" target="_blank" rel="noopener">อ่านแหล่งข้อมูล: ${esc(foodSources[item.source].name)}</a></div></details>`).join('')}</section>`).join('')+
    `<aside class="lesson-sources"><h2>อ่านอย่างมั่นใจ</h2><p>บทนี้เริ่มจากคำถามของคนเลี้ยงค็อกคาเทล ไม่ใช่สูตรอาหารหรือคำแนะนำการรักษาเฉพาะตัว</p><p>เรียบเรียงโดย Birbest จากแหล่งความรู้สัตวแพทย์ ตรวจแหล่งข้อมูล 27 กันยายน 2569 · บทเรียบเรียงนี้ยังรอตรวจโดยสัตวแพทย์</p></aside>`;
  const stories = [
    {id:'millet-day', title:'อุด้งกับเสียงถุงกรอบแกรบ', friend:'millet', category:'food', lesson:'รู้จักอาหารในชาม',note:'ของโปรดเป็นส่วนหนึ่งของเรื่องเล่า ไม่ใช่ตัวอย่างสัดส่วนอาหารประจำวัน',scenes:[
      ['ขอสำรวจก่อน','อุด้งเดินตรวจโต๊ะตัวเดิมอย่างตั้งใจ\nเอียงคอซ้ายที ขวาที\n“วันนี้มีอะไรเปลี่ยนไปหรือเปล่านะ?”'],
      ['เสียงที่คุ้นเคย','กรอบแกรบ…\nอุด้งหยุดเดิน มองตามเสียงถุงในมือเจ้าของ\nขอดูก่อน ยังไม่แน่ใจ\nแต่พอเห็นช่อมิลเลตโผล่พ้นถุง… ตาก็วาวขึ้นทันที'],
      ['เรื่องนี้ไม่ต้องคิดนาน','เมื่อกี้ยังค่อย ๆ สำรวจอยู่เลย\nตอนนี้อุด้งวิ่งมาหาแล้ว!\nเจ้าของยื่นมิลเลตให้ อุด้งรับรางวัลชิ้นเล็กอย่างตั้งใจ\nเรื่องอื่นค่อยคิดต่อ ขอชิมก่อนนะ'],
      ['เรียบร้อยแล้วหนึ่งเรื่อง','กินเสร็จ อุด้งเช็ดปากกับคอนจนเรียบร้อย\nแล้วก้มศีรษะให้เจ้าของเกาเบา ๆ\nก่อนส่งเสียงเพลงสั้น ๆ\nการสำรวจวันนี้จบลงอย่างน่าพอใจ']
    ]},
    {id:'sunny-song', title:'แร้บเตอร์ค้าบ!', friend:'sunny', category:'behavior',lesson:'เริ่มทำความคุ้นเคยกับน้องอย่างไร?',note:'ความชอบของนกแต่ละตัวต่างกัน ให้เขาเลือกมีส่วนร่วมในแบบที่สบายใจ',scenes:[
      ['ใครอยู่ตรงนี้เอ่ย?','เจ้าของเดินเข้ามาในห้อง\nยังไม่ทันได้เรียกชื่อ เสียงคุ้นเคยก็ดังขึ้น\n“แร้บเตอร์ค้าบ!”\nอ๋อ อยู่ตรงนี้เอง'],
      ['เพลงมาแล้ว','พอเพลงที่เจ้าของเปิดดังขึ้น\nแร้บเตอร์ก็เริ่มขยับตัว โยกตามจังหวะ\nวันนี้มีคนดูหนึ่งคน\nแต่ความตั้งใจเหมือนมีคนดูเต็มห้อง'],
      ['นักเต้นมีอะไรจะบอก','เจ้าของโยกตาม แร้บเตอร์ก็เต้นต่อ\nแล้วหยุดมองหน้ากันครู่หนึ่ง\nก่อนประกาศด้วยเสียงดังชัดเจน\n“แร้บเตอร์ค้าบ!”'],
      ['จำชื่อได้แล้วค้าบ','เพลงจบ เจ้าของปรบมือเบา ๆ\n“เก่งมาก แร้บเตอร์”\nเจ้าตัวมองกลับมา แล้วตอบอีกครั้ง\n“แร้บเตอร์ค้าบ!”\nวันนี้ไม่มีใครลืมชื่อนักเต้นแน่นอน']
    ]}
  ];
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const linkCard = (href, title, text, tag='') => `<a class="route-card" href="#/${href}">${tag?`<small>${esc(tag)}</small>`:''}<h3>${esc(title)}</h3><p>${esc(text)}</p><span class="card-arrow">เข้าไปดู →</span></a>`;
  const dailyLessons = curriculum.find(group=>group.id==='daily').lessons;
  const optimizedLearningImages = new Set(['learn-foraging','learn-trust','learn-cleaning','learn-food-types']);
  const learningCardOverrides = {
    'welcome/cage': 'learn-cockatiel-cage-v2.webp',
    'home/identification': 'learn-cockatiel-leg-band-v1.webp',
    'welcome/settling': 'learn-cockatiel-trust-v2.webp',
    'home/safety': 'learn-cockatiel-home-safety-v2.webp',
    'health/guide': 'learn-cockatiel-health-v2.webp',
    'health/eggs': 'learn-cockatiel-eggs-v1.webp'
  };
  const learningCard = (href, title, text, image) => `<a class="learning-card" href="#/learn/cockatiel/${href}"><img src="assets/${learningCardOverrides[href] || `${image}.${optimizedLearningImages.has(image)?'webp':'png'}`}" alt="" width="1536" height="1024" loading="lazy"><div class="learning-card-copy"><h3>${esc(title)}</h3><p>${esc(text)}</p><span class="learning-card-arrow" aria-hidden="true">→</span></div></a>`;
  const related = cards => `<section class="related"><h2>เดินต่ออีกนิด</h2><div class="route-grid">${cards}</div></section>`;
  const heading = (title, description, parent='') => `<nav class="breadcrumbs" aria-label="เส้นทางหน้า"><a href="#home">หน้าแรก</a>${parent}<span aria-current="page">${esc(title)}</span></nav><header class="route-heading"><h1>${esc(title)}</h1><p>${esc(description)}</p></header>`;
  const categoryCards = () => categories.map(c=>linkCard(`learn/${c.id}`,c.name,c.text)).join('');
  const storyArtwork = {
    'millet-day': {
      0:{file:'story-udon-exploring-v1.webp',alt:'อุด้งเอียงคอสำรวจโต๊ะไม้ในห้องสีฟ้า'},
      1:{file:'story-udon-millet-v1.webp',alt:'อุด้งตาเป็นประกายเมื่อเห็นช่อมิลเลตโผล่จากถุงในมือเจ้าของ'}
    },
    'sunny-song': {
      0:{file:'story-raptor-greeting-v1.webp',alt:'แร้บเตอร์กางปีกทักเจ้าของจากคอนไม้ โดยประตูห้องปิดอยู่'},
      2:{file:'story-raptor-dancing-v1.webp',alt:'แร้บเตอร์โยกตัวบนคอนไม้ ขณะเจ้าของนั่งยิ้มเป็นเพื่อนอยู่ใกล้ ๆ'}
    }
  };
  const storyIllustration = (id,index) => {
    const art=storyArtwork[id]?.[index];
    return art?`<figure class="story-illustration"><img src="assets/${art.file}" alt="${esc(art.alt)}" width="1536" height="1024" loading="${index===0?'eager':'lazy'}" decoding="async"></figure>`:'';
  };
  const storyCards = () => stories.map(s=>`<a class="route-card story-card" href="#/stories/${s.id}"><img src="assets/${storyArtwork[s.id][0].file}" alt="" width="1536" height="1024" loading="lazy"><h3>${esc(s.title)}</h3><p>เรื่องเล่าของ${esc(friends[s.friend].name)} · 4 ฉากสั้น</p><span class="card-arrow">อ่านเรื่องนี้ →</span></a>`).join('');
  const mascotRoles = {
    millet:{label:'เรียนรู้ไปกับอุด้ง',text:'อุด้งพาเข้า Bird School เลือกอ่านเรื่องการดูแลค็อกคาเทล ตั้งแต่วันแรกจนถึงทุกวัน',href:'#/learn/cockatiel',action:'เข้า Bird School'},
    sunny:{label:'เล่นคำถามกับแร้บเตอร์',text:'แร้บเตอร์ชวนลองตอบคำถามสั้น ๆ แล้วค้นพบเรื่องน่ารู้เกี่ยวกับนกไปด้วยกัน',href:'#wonder',action:'เล่นตอบคำถาม'}
  };
  const characterCards = () => Object.entries(mascotRoles).map(([id,role])=>{const f=friends[id];return `<article class="route-card" data-mascot="${id}"><img src="assets/${f.image}" alt="${esc(f.name)}" width="320" height="300"><h3>${esc(f.name)}</h3><p>${esc(f.species)}</p><p class="mascot-role">${esc(role.label)}</p><a class="card-arrow" href="#/characters/${id}">มารู้จัก${esc(f.name)} →</a></article>`;}).join('');

  const today = document.createElement('section');
  today.className='section home-flow'; today.id='today';
  today.innerHTML=`<p class="eyebrow">TODAY IN BIRBEST</p><h2>วันนี้แวะมุมไหนดี?</h2><div class="route-grid">${linkCard('learn/cockatiel?section=welcome','เพิ่งรับน้องมา','เริ่มจากกรง มุมพัก และวันแรกที่อยู่ด้วยกัน','สำหรับค็อกคาเทล')}${linkCard('learn/cockatiel?section=daily','ดูแลทุกวัน','อาหาร ความสะอาด การพักผ่อน และความปลอดภัย','สำหรับค็อกคาเทล')}${linkCard('about','รู้จัก Birbest','เรื่องราวและความตั้งใจของโลกเล็ก ๆ สำหรับคนรักนก','เรื่องของเรา')}</div>`;
  document.querySelector('#wonder').before(today);
  const schoolLinks=document.createElement('div'); schoolLinks.className='school-links';
  schoolLinks.innerHTML=`<a class="all-school" href="#/learn">เข้า Bird School →</a><a href="#/tools/checklist">เช็กลิสต์ประจำวัน</a>`;
  document.querySelector('.wonder-intro').append(schoolLinks);
  const latest=document.createElement('section'); latest.className='section home-flow home-story'; latest.id='little-story';
  latest.setAttribute('aria-labelledby','little-story-title');
  const featuredStory=stories[0];
  latest.innerHTML=`<div class="section-heading"><p class="eyebrow">LITTLE STORIES</p><h2 id="little-story-title">${esc(featuredStory.title)}</h2><p>วันธรรมดาของนักสำรวจ ที่สะดุดลงเพราะเสียงคุ้นเคย</p></div><div class="story-peek">${[0,1].map(index=>{const art=storyArtwork[featuredStory.id][index];return `<figure><img src="assets/${art.file}" alt="${esc(art.alt)}" width="1536" height="1024" loading="lazy" decoding="async"><figcaption><span class="peek-number" aria-hidden="true">0${index+1}</span><div><h3>${esc(featuredStory.scenes[index][0])}</h3><p>${index===0?'โต๊ะตัวเดิม แต่ขอตรวจอีกทีให้แน่ใจ':'กรอบแกรบ… เดี๋ยวนะ เสียงอะไรเอ่ย?'}</p></div></figcaption></figure>`;}).join('')}</div><div class="story-peek-actions"><a class="pill" href="#/stories/${featuredStory.id}">แล้วอุด้งเจออะไร? อ่านต่อ <span aria-hidden="true">→</span></a><a class="route-link" href="#/stories">เรื่องเล่าทั้งหมด</a></div><p class="footnote">เรื่องแต่งจากนิสัยของเพื่อนตัวเล็กในโลก Birbest</p><p class="story-keepsake"><a class="route-link" href="#/stories/postcards">หยิบโปสการ์ดจากหมู่บ้านกลับไปด้วย →</a></p>`;
  document.querySelector('#friends').after(latest);
  const products=document.createElement('section');products.className='section home-flow';
  products.innerHTML=`<p class="eyebrow">MADE WITH BIRDS IN MIND</p><h2>แวะร้าน Birbest</h2><p>เลือกชมสินค้าของเราบน Shopee และ Etsy</p><p><a class="pill" href="#/shop">เลือกร้านที่อยากแวะ →</a></p><p class="footnote">เมล็ดผสมแบ่งซองสำหรับค็อกคาเทล: <a class="route-link" href="#/shop/daily-pack">ดู Daily Pack สูตร Mixed Seed</a> · สอบถามผ่านช่องทางร้าน</p>`;
  document.querySelector('#wonder').after(products);
  const footerLinks=document.createElement('nav'); footerLinks.className='flow-footer'; footerLinks.setAttribute('aria-label','เมนูท้ายหน้า');
  footerLinks.innerHTML='<a href="#/learn">เรียนรู้</a><a href="#/stories">เรื่องเล่า</a><a href="#/characters">เพื่อนของเรา</a><a href="#/shop">ร้านค้า</a><a href="#/about">รู้จัก Birbest</a><a href="#/privacy">ข้อมูลและความเป็นส่วนตัว</a>';
  document.querySelector('footer').before(footerLinks);

  // Public destinations read from the founder's Linktree, 2026-10-04.
  const channels=[
    {name:'Instagram',text:'birbest.official',url:'https://www.instagram.com/birbest.official',group:'social'},
    {name:'Facebook',text:'Birbest',url:'https://www.facebook.com/people/Birbest/61560306989510/',group:'social'},
    {name:'TikTok',text:'@birbest.official',url:'https://www.tiktok.com/@birbest.official',group:'social'},
    {name:'YouTube',text:'Birbest',url:'https://www.youtube.com/channel/UCyjn35FVsOUk0gViOdxBp7g',group:'social'},
    {name:'Shopee',text:'birbest.official',url:'https://shopee.co.th/birbest.official',group:'shop'},
    {name:'Etsy',text:'Birbest',url:'https://birbest.etsy.com/',group:'shop'}
  ];
  const channelLinks=group=>`<div class="contact-links">${channels.filter(c=>c.group===group).map(c=>`<a href="${c.url}" target="_blank" rel="noopener noreferrer"><span><strong>${c.name}</strong><small>${c.text}</small></span><span aria-hidden="true">↗</span><span class="skip">เปิดในแท็บใหม่</span></a>`).join('')}</div>`;
  footerLinks.insertAdjacentHTML('beforeend','<a href="#/contact">ติดต่อและติดตาม</a>');

  const availableSpecies=BirbestLearning.getAvailableSpecies();
  const learningSearch=availableSpecies.flatMap(id=>{
    const species=BirbestLearning.getSpecies(id);
    return BirbestLearning.getCurriculum(id).flatMap(group=>group.lessons.map(lesson=>({
      href:`learn/${id}/${lesson.href}`,
      title:`${lesson.title} · ${species.label}`,
      text:`${group.name} · ${lesson.text}`,
      keywords:(lesson.searchTerms||'')+' '+(lesson.questions||lesson.sections||[]).map(q=>Array.isArray(q)?q.slice(0,3).join(' '):[q.question,q.answer,q.detail].join(' ')).join(' ')
    })));
  });
  const searchIndex=[...learningSearch,...stories.map(s=>({href:`stories/${s.id}`,title:s.title,text:`การ์ตูน เรื่องเล่า ${friends[s.friend].name} ${friends[s.friend].species}`})),...Object.entries(friends).map(([id,f])=>({href:`characters/${id}`,title:f.name,text:f.species})),{href:'tools/checklist',title:'เช็กลิสต์ประจำวัน',text:'ดูแล บันทึก น้ำ อาหาร บ้าน เล่น'},{href:'shop/daily-pack',title:'Birbest Daily Pack',text:'เมล็ด อาหาร แบ่งส่วน สินค้า'},{href:'stories/postcards',title:'โปสการ์ด',text:'รูป ดาวน์โหลด ภาพ ของฟรี'}];
  searchIndex.push({href:'contact',title:'ติดต่อและติดตาม Birbest',text:'ช่องทางติดต่อ Instagram Facebook TikTok YouTube Shopee Etsy Linktree'});
  (window.BirbestPouchProducts || []).forEach(p=>searchIndex.push({href:'shop/'+p.slug,title:p.title,text:'กระเป๋า โครเชต์ ถัก Pouch '+p.keywords}));
  (window.BirbestBirdToyProducts || []).forEach(p=>searchIndex.push({href:'shop/'+p.slug,title:p.title,text:'ของเล่น อุปกรณ์นก '+p.keywords}));
  (window.BirbestShirtProducts || []).forEach(p=>searchIndex.push({href:'shop/'+p.slug,title:p.title,text:'เสื้อครอป สีดำ ซันคอนัวร์ S M L ตารางไซซ์'}));
  (window.BirbestKeychainProducts || []).forEach(p=>searchIndex.push({href:'shop/'+p.slug,title:p.title,text:'พวงกุญแจภาพนก ซันคอนัวร์ '+p.code}));
  (window.BirbestStickerProducts || []).forEach(p=>searchIndex.push({href:'shop/'+p.slug,title:p.title,text:'สติกเกอร์ สติ๊กเกอร์ Chirp Mochi Crayon '+p.keywords}));
  (window.BirbestHatProducts || []).forEach(p=>searchIndex.push({href:'shop/'+p.slug,title:p.title,text:'หมวก Chirpy Fluffy Hat '+(p.slug==='cockatiel-hat'?'ค็อกคาเทล':'ซันคอนัวร์')}));
  (window.BirbestCrochet?.products || []).forEach(p=>searchIndex.push({href:'shop/'+p.slug,title:p.title+' Crochet',text:'พวงกุญแจ โครเชต์ '+p.group}));
  searchIndex.push({href:'shop',title:'ร้านของ Birbest',text:'ร้านค้า ซื้อสินค้า Shopee Etsy'},{href:'about',title:'รู้จัก Birbest',text:'เกี่ยวกับเรา ผู้ก่อตั้ง เรื่องราวแบรนด์'},{href:'privacy',title:'ข้อมูลและความเป็นส่วนตัว',text:'ล้างข้อมูล ลบรายการ บันทึกในอุปกรณ์'});
  const checklistItems=['เปลี่ยนน้ำสะอาดแล้ว','จัดอาหารและสังเกตชามแล้ว','ตรวจพื้นที่และอุปกรณ์แล้ว','มีเวลาให้น้องเล่นหรือสำรวจแล้ว'];
  function checklist(){
    const day=new Date().toLocaleDateString('en-CA');
    view.dataset.checklistDay=day;
    let checked=[];
    try{const value=JSON.parse(localStorage.getItem('birbest-world-checklist')||'null');if(value?.day===day&&Array.isArray(value.checked))checked=value.checked.filter(i=>Number.isInteger(i)&&i>=0&&i<4);}catch{}
    view.innerHTML=heading('เช็กลิสต์ประจำวัน','บันทึกเรื่องเล็ก ๆ ที่ทำให้น้องวันนี้','<a href="#/learn">เรียนรู้</a>')+`<p class="label">${new Date().toLocaleDateString('th-TH',{dateStyle:'long'})} · บันทึกในอุปกรณ์นี้</p><div class="checklist">${checklistItems.map((item,i)=>`<label class="check-row"><input type="checkbox" value="${i}" ${checked.includes(i)?'checked':''}><span>${item}</span></label>`).join('')}</div><div class="tool-actions"><p class="status" role="status"></p><button class="pill" id="reset-checklist">เริ่มเช็กใหม่</button></div><p class="footnote">รายการนี้เป็นตัวช่วยเตือน ไม่ใช่การประเมินสุขภาพน้อง</p>${related(linkCard('learn/home','บ้านของน้อง','สำรวจมุมที่น้องใช้ชีวิต')+linkCard('learn/play','เวลาเล่น','รู้จักกิจกรรมค้นหา'))}`;
    const update=()=>{
      if(day!==new Date().toLocaleDateString('en-CA')){checklist();return;}
      checked=[...view.querySelectorAll('input:checked')].map(i=>Number(i.value));let stored=true;
      try{localStorage.setItem('birbest-world-checklist',JSON.stringify({day,checked}));}catch{stored=false;}
      view.querySelector('.status').textContent=`วันนี้ทำแล้ว ${checked.length} / 4 เรื่อง${checked.length===4?' · ขอบคุณที่ดูแลน้องวันนี้':''}${stored?' · บันทึกแล้ว':' · ใช้เช็กได้ แต่เบราว์เซอร์ยังเก็บไว้ครั้งหน้าไม่ได้'}`;
      view.querySelector('#reset-checklist').disabled=checked.length===0;
    };
    view.querySelectorAll('input').forEach(input=>input.addEventListener('change',update));
    view.querySelector('#reset-checklist').addEventListener('click',()=>{view.querySelectorAll('input').forEach(i=>i.checked=false);update();});update();
  }
  const refreshChecklistDay=()=>{
    if(!document.hidden&&view.querySelector('.checklist')&&view.dataset.checklistDay!==new Date().toLocaleDateString('en-CA'))checklist();
  };
  document.addEventListener('visibilitychange',refreshChecklistDay);
  window.addEventListener('focus',refreshChecklistDay);
  setInterval(refreshChecklistDay,30000);
  function render(){
    postcardSlot.append(postcards);
    const raw=location.hash.slice(1);
    const requestedRoute=raw.startsWith('/')?raw.slice(1).split('?')[0].replace(/\/$/,''):'';
    if(requestedRoute==='characters/roll'||requestedRoute==='stories/roll-around'){
      history.replaceState(null,'',requestedRoute.startsWith('stories/')?'#/stories':'#/characters');render();return;
    }
    if(requestedRoute==='learn/welcome'||requestedRoute==='learn/cockatiel/welcome'){
      history.replaceState(null,'','#/learn/cockatiel?section=welcome');
      render();
      return;
    }
    const isLegacyLearn=requestedRoute==='learn'||/^learn\/(welcome|food|behavior|health|home|play)(\/|$)/.test(requestedRoute);
    if(isLegacyLearn)history.replaceState(null,'','#/'+requestedRoute.replace(/^learn/,'learn/cockatiel'));
    const route=requestedRoute.replace(/^learn\/cockatiel(?=\/|$)/,'learn');
    const parts=route.split('/');
    const learningSpecies=parts[0]==='learn'?BirbestLearning.getSpecies(isLegacyLearn?'cockatiel':requestedRoute.split('/')[1]):null;
    setMainMenuOpen(false);
    home.hidden=!!route;view.hidden=!route;
    skipLink.setAttribute('href',route?'#route-view':'#home-view');
    view.classList.toggle('about-page',route==='about');
    const activeNav=parts[0]==='learn'&&learningSpecies?.status==='available-draft'?`#/learn/${isLegacyLearn?'cockatiel':requestedRoute.split('/')[1]}`:`#/${parts[0]}`;
    document.querySelector('.learn-dropdown-toggle')?.classList.toggle('is-current',parts[0]==='learn');
    document.querySelectorAll('.site-header nav a').forEach(a=>{if(route&&a.hash===activeNav)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    if(!route){
      document.title='Birbest — โลกเล็ก ๆ ที่มีความสุขตัวเบ้อเริ่ม';
      requestAnimationFrame(()=>{
        const target=document.getElementById(raw||'home');target?.scrollIntoView();
        if(raw==='wonder'){
          const question=document.querySelector('#quiz-content h3');
          question?.setAttribute('tabindex','-1');question?.focus({preventScroll:true});
        }
      });
      return;
    }
    const pouchProduct = route.startsWith('shop/') && (window.BirbestPouchProducts || []).find(p=>p.slug===route.slice(5));
    if(pouchProduct){
      view.innerHTML=heading(pouchProduct.title,'กระเป๋าโครเชต์ลาย'+pouchProduct.keywords,'<a href="#/shop">ร้านค้า</a>')+`<section id="shop-pouch-gallery" class="route-section" data-product="${esc(pouchProduct.slug)}" aria-label="${esc(pouchProduct.title)}"></section>`;
      document.title=pouchProduct.title+' | Birbest';
      view.focus({preventScroll:true});window.scrollTo(0,0);return;
    }
    const birdToyProduct = route.startsWith('shop/') && (window.BirbestBirdToyProducts || []).find(p=>p.slug===route.slice(5));
    if(birdToyProduct){
      view.innerHTML=heading(birdToyProduct.title,birdToyProduct.subtitle,'<a href="#/shop">ร้านค้า</a>')+`<section id="shop-bird-toy-gallery" class="route-section" data-product="${esc(birdToyProduct.slug)}" aria-label="${esc(birdToyProduct.title)}"></section>`;
      document.title=birdToyProduct.title+' | Birbest';
      view.focus({preventScroll:true});window.scrollTo(0,0);return;
    }
    const shirtProduct = route.startsWith('shop/') && (window.BirbestShirtProducts || []).find(p=>p.slug===route.slice(5));
    if(shirtProduct){
      view.innerHTML=heading(shirtProduct.title,'เสื้อครอปสีดำลายซันคอนัวร์','<a href="#/shop">ร้านค้า</a>')+`<section id="shop-shirt-gallery" class="route-section" data-product="${esc(shirtProduct.slug)}" aria-label="${esc(shirtProduct.title)}"></section>`;
      document.title=shirtProduct.title+' | Birbest';
      view.focus({preventScroll:true});window.scrollTo(0,0);return;
    }
    const keychainProduct = route.startsWith('shop/') && (window.BirbestKeychainProducts || []).find(p=>p.slug===route.slice(5));
    if(keychainProduct){
      view.innerHTML=heading(keychainProduct.title,'พวงกุญแจภาพซันคอนัวร์ · '+keychainProduct.code,'<a href="#/shop">ร้านค้า</a>')+`<section id="shop-keychain-gallery" class="route-section" data-product="${esc(keychainProduct.slug)}" aria-label="${esc(keychainProduct.title)}"></section>`;
      document.title=keychainProduct.title+' | Birbest';
      view.focus({preventScroll:true});window.scrollTo(0,0);return;
    }
    const stickerProduct = route.startsWith('shop/') && (window.BirbestStickerProducts || []).find(p=>p.slug===route.slice(5));
    if(stickerProduct){
      view.innerHTML=heading(stickerProduct.title,'Chirp Mochi Crayon · สติกเกอร์แพ็กคู่','<a href="#/shop">ร้านค้า</a>')+`<section id="shop-sticker-gallery" class="route-section" data-product="${esc(stickerProduct.slug)}" aria-label="${esc(stickerProduct.title)}"></section>`;
      document.title=stickerProduct.title+' | Birbest';
      view.focus({preventScroll:true});window.scrollTo(0,0);return;
    }
    const hatProduct = route.startsWith('shop/') && (window.BirbestHatProducts || []).find(p=>p.slug===route.slice(5));
    if(hatProduct){
      view.innerHTML=heading(hatProduct.title,'Chirpy Fluffy Hat · หมวกจาก Birbest','<a href="#/shop">ร้านค้า</a>')+`<section id="shop-hat-gallery" class="route-section" data-product="${esc(hatProduct.slug)}" aria-label="${esc(hatProduct.title)}"></section>`;
      document.title=hatProduct.title+' | Birbest';
      view.focus({preventScroll:true});window.scrollTo(0,0);return;
    }
    const crochetProduct = route.startsWith('shop/') && window.BirbestCrochet?.find(route.slice(5));
    if(crochetProduct){
      view.innerHTML=heading(crochetProduct.title+' Crochet','พวงกุญแจโครเชต์ Birbest','<a href="#/shop">ร้านค้า</a>')+`<section id="shop-crochet-gallery" class="route-section" data-product="${esc(crochetProduct.slug)}" aria-label="${esc(crochetProduct.title)}"></section>`;
      document.title=crochetProduct.title+' Crochet | Birbest';
      view.focus({preventScroll:true});window.scrollTo(0,0);
      return;
    }
    if(parts[0]==='learn'&&learningSpecies?.status!=='available-draft'){
      const title=learningSpecies?`บทเรียน${learningSpecies.label}กำลังเตรียมเนื้อหา`:'ยังไม่พบสายพันธุ์นี้';
      view.innerHTML=heading(title,'')+`<p>เรากำลังเตรียมเนื้อหาให้เหมาะกับน้องแต่ละสายพันธุ์</p><a class="route-link" href="#home">กลับหน้าแรก →</a>`;
      document.title=`${title} | Birbest`;
      view.focus({preventScroll:true});window.scrollTo(0,0);
      return;
    }
    const catalogSpeciesId=isLegacyLearn?'cockatiel':requestedRoute.split('/')[1];
    const catalogLessonId=isLegacyLearn?parts.slice(1).join('/'):requestedRoute.split('/').slice(2).join('/');
    if(learningSpecies?.reader==='catalog'||BirbestLearning.getLesson(catalogSpeciesId,catalogLessonId)?.reader==='catalog'){
      const speciesId=catalogSpeciesId;
      const lessonId=catalogLessonId;
      const section=new URLSearchParams(raw.split('?')[1]||'').get('section');
      const questionGroup=new URLSearchParams(raw.split('?')[1]||'').get('group');
      const page=BirbestLearningReader.render(BirbestLearning,speciesId,lessonId,section,questionGroup);
      view.innerHTML=page.html;
      document.title=page.title;
      view.focus({preventScroll:true});window.scrollTo(0,0);
      const focusLearningTarget=params=>{
        if(lessonId)BirbestLearningReader.focusQuestions(view,params.get('group'));
        else BirbestLearningReader.focusSection(view,params.get('section'));
      };
      requestAnimationFrame(()=>focusLearningTarget(new URLSearchParams(raw.split('?')[1]||'')));
      view.querySelectorAll('.learning-shortcuts a').forEach(a=>a.addEventListener('click',()=>{
        if(a.hash===location.hash)focusLearningTarget(new URLSearchParams(a.hash.split('?')[1]));
      }));
      return;
    }
    if(route==='learn')view.innerHTML=heading('เรียนรู้ค็อกคาเทล','ค่อย ๆ รู้จักน้อง ตั้งแต่วันแรก จนถึงทุกวันที่อยู่ด้วยกัน')+`
      <nav class="learning-shortcuts" aria-label="หัวข้อในหน้านี้">
        <a href="#/learn/cockatiel?section=welcome"><span>เพิ่งรับน้องมา</span></a>
        <a href="#/learn/cockatiel?section=daily"><span>อาหารและการดูแล</span></a>
        <a href="#/learn/cockatiel?section=understand"><span>พฤติกรรมและการเล่น</span></a>
      </nav>
      <section class="learning-stage" aria-labelledby="stage-welcome">
        <h2 id="stage-welcome">เพิ่งรับน้องมา</h2>
        <p>เพิ่งรับน้องมา เริ่มจากเรื่องกรงได้เลย</p>
        <img class="learning-scene" src="assets/welcome-overview.png" alt="เจ้าของนั่งใกล้กรงค็อกคาเทลที่เพิ่งย้ายเข้าบ้าน" width="1536" height="1024">
        <div class="learning-topics learning-cards">${welcomeTopics.map(t=>learningCard(t.href,t.cardTitle,t.text,t.image)).join('')}</div>
      </section>
      <section class="learning-stage" aria-labelledby="stage-daily">
        <h2 id="stage-daily">อาหารและการดูแลทุกวัน</h2>
        <p>จากมื้อแรก มารู้จักอาหารในชามและสิ่งเล็ก ๆ ที่ทำให้น้องได้ทุกวัน</p>
        <div class="learning-cards">${dailyLessons.map(t=>learningCard(t.href,t.title,t.text,t.image)).join('')}</div>
        <p class="learning-tool">เครื่องมือเสริม: <a class="route-link" href="#/tools/checklist">เช็กลิสต์ดูแลประจำวัน</a></p>
      </section>
      <section class="learning-stage" aria-labelledby="stage-understand">
        <h2 id="stage-understand">พฤติกรรมและการเล่น</h2>
        <p>น้องแต่ละตัวมีความชอบและจังหวะของตัวเอง เริ่มทำความรู้จักผ่านเรื่องใกล้ตัว</p>
        <div class="learning-cards">${curriculum.find(group=>group.id==='understand').lessons.map(t=>learningCard(t.href,t.title,t.text,t.image)).join('')}</div>
      </section>
      <p class="footnote">บทเรียนอยู่ระหว่างพัฒนาและทบทวน ใช้ประกอบการเรียนรู้ ไม่แทนคำแนะนำเฉพาะตัวจากสัตวแพทย์</p>`;
    else if(route==='learn/welcome')view.innerHTML=heading('ต้อนรับค็อกคาเทลเข้าบ้าน','เพิ่งรับมา หรือกำลังเตรียมรับ เลือกเริ่มจากเรื่องใกล้ตัวได้เลย','<a href="#/learn">Bird School</a>')+`<p class="quick-answer">สำหรับนกที่กินเองได้แล้ว หากน้องยังต้องป้อนหรือไม่แน่ใจ ควรติดต่อสัตวแพทย์ที่ดูแลนก ไม่ใช้บทนี้แทนคำแนะนำลูกป้อน</p><div class="route-grid">${welcomeTopics.map((t,i)=>linkCard('learn/welcome/'+t.id,t.title,t.text,'เรื่องที่ '+(i+1))).join('')}</div><p class="footnote">บทนำอยู่ระหว่างทบทวนโดยผู้เชี่ยวชาญ · ไม่ใช้แทนการตรวจสุขภาพ</p>`;
    else if(parts[0]==='learn'&&parts[1]==='welcome'&&parts.length===3&&welcomeTopics.some(t=>t.id===parts[2])){const t=welcomeTopics.find(t=>t.id===parts[2]);const next=welcomeTopics[welcomeTopics.indexOf(t)+1];view.innerHTML=heading(t.title,t.text,'<a href="#/learn">Bird School</a><a href="#/learn/welcome">ต้อนรับน้องเข้าบ้าน</a>')+`<article class="route-body"><p class="label">สำหรับนกที่กินเองได้แล้ว</p>${t.sections.map(([h,p])=>`<section class="route-section"><h2>${esc(h)}</h2><p>${esc(p)}</p></section>`).join('')}<p class="label"><a class="route-link" href="${t.source}" target="_blank" rel="noopener">แหล่งข้อมูลอ่านต่อ</a>${t.additionalSource?` · <a class="route-link" href="${t.additionalSource}" target="_blank" rel="noopener">${esc(t.additionalSourceLabel||'CFARE: ขนาดกรงและระยะซี่กรง')}</a>`:''} · ตรวจข้อมูล 28 กันยายน 2569 · รอตรวจบทเรียบเรียงโดยสัตวแพทย์</p></article>${related((t.id==='first-meal'?linkCard('learn/welcome/settling','ต่อไป: วันแรกควรทำอะไรกับน้อง?','ทำความรู้จักกันโดยไม่เร่งความคุ้นเคย')+linkCard('learn/food/guide','อ่านเพิ่ม: รู้จักอาหารในชาม','เมล็ด เพลเลต ผัก และข้อสงสัยเรื่องอาหาร'):next?linkCard('learn/welcome/'+next.id,'ต่อไป: '+next.title,next.text):linkCard('learn','สำรวจ Bird School','เลือกเรื่องที่อยากรู้ต่อ'))+linkCard('learn/welcome','ดูทั้ง 6 เรื่อง','กลับไปภาพรวมต้อนรับน้องเข้าบ้าน'))}`;}
    else if(parts[0]==='learn'&&categories.some(c=>c.id===parts[1])&&(parts.length===2||(parts.length===3&&parts[2]==='guide'))){const c=categories.find(c=>c.id===parts[1]);view.innerHTML=heading(parts[2]?c.title:c.name,c.text,'<a href="#/learn">เรียนรู้</a>')+(parts[2]?`<article class="route-body"><div class="quick-answer"><strong>${esc(c.question)}</strong><p>${esc(c.answer)}</p></div>${c.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="label">เนื้อหาเบื้องต้น · <a class="route-link" href="${c.source}" target="_blank" rel="noopener">แหล่งข้อมูลอ่านต่อ</a></p></article>${related(linkCard('tools/checklist','ลองจดสิ่งที่ทำวันนี้','เริ่มที่เช็กลิสต์ประจำวัน')+linkCard(`stories/${stories.find(s=>s.category===c.id)?.id||'millet-day'}`,'พักอ่านเรื่องเล่า','แวะไปหาเพื่อนในหมู่บ้าน'))}`:`<div class="route-grid">${linkCard(`learn/${c.id}/guide`,c.title,c.question,'อ่านประมาณ 1 นาที')}${linkCard('tools/checklist','เช็กลิสต์ประจำวัน','พาความรู้ไปใช้ในวันธรรมดา','เครื่องมือ')}</div>`);}
    else if(route==='stories')view.innerHTML=heading('เรื่องเล่าของ Birbest','เรื่องแต่งสั้น ๆ ที่ได้แรงบันดาลใจจากอุด้งกับแร้บเตอร์ตัวจริง')+`<div class="route-grid story-grid">${storyCards()}</div>${related(linkCard('characters','รู้จักเพื่อนของเรา','นิสัยจริงของอุด้งกับแร้บเตอร์')+linkCard('stories/postcards','มุมโปสการ์ด','เก็บภาพที่ชอบกลับไป'))}`;
    else if(route==='learn/home/cleaning'){
      view.innerHTML=heading('กรง ชามน้ำ และชามอาหาร ทำความสะอาดอย่างไร?','เริ่มจากเรื่องเล็ก ๆ ที่ทำทุกวัน ไม่ต้องรอให้กรงดูสกปรก','<a href="#/learn">รวมเรื่องค็อกคาเทล</a>')+`<article class="route-body"><p class="label">7 คำถามเรื่องความสะอาด</p><aside class="lesson-alert"><strong>ใช้น้ำยาเมื่อแยกน้องออกจากห้องแล้ว</strong><p>ไอระเหยและสารตกค้างเป็นสิ่งที่ต้องระวัง การล้างกรงไม่ควรทำให้น้องสัมผัสน้ำยาหรือสเปรย์</p></aside><div class="quick-answer"><strong>วันนี้เริ่มจาก 3 อย่าง</strong><ul><li>ล้างชามอาหารและชามน้ำ</li><li>เปลี่ยนกระดาษรองกรง</li><li>ตรวจคราบและสภาพคอนกับของเล่น</li></ul></div><div class="cleaning-questions">${cleaningQuestions.map(([q,a,d,s])=>`<details class="food-question"><summary>${esc(q)}</summary><div class="food-question-body"><p class="food-answer">${esc(a)}</p><p>${esc(d)}</p><a class="label route-link" href="${cleaningSources[s][1]}" target="_blank" rel="noopener">${esc(cleaningSources[s][0])}</a></div></details>`).join('')}</div><aside class="lesson-sources"><h2>อ่านอย่างมั่นใจ</h2><p>อ้างอิงเฉพาะแนวทางสุขอนามัยจาก VCA และ Winter Park Veterinary Hospital แหล่งข้อมูลให้รอบล้างใหญ่ต่างกัน จึงไม่กำหนดตารางตายตัวหรือสูตรน้ำยาสำหรับทุกบ้าน</p><p>ตรวจแหล่งข้อมูล 30 กันยายน 2569 · รอตรวจบทเรียบเรียงโดยผู้เชี่ยวชาญ หากมีนกป่วยหรือสงสัยโรคติดต่อ ให้สัตวแพทย์กำหนดวิธีทำความสะอาดเฉพาะกรณี</p></aside></article>${related(`<nav class="lesson-navigation" aria-label="อ่านต่อ"><a class="route-link" href="#/learn/cockatiel?section=daily">← รวมเรื่องค็อกคาเทล</a><a class="route-link" href="#/learn/cockatiel/welcome/setup">อ่านต่อ: จัดคอนและชาม →</a></nav>`)}`;
    }
    else if(route==='learn/home/safety'){
      view.innerHTML=heading('บ้านที่ปลอดภัยสำหรับนก','เตรียมพื้นที่เล็ก ๆ ให้พร้อม ก่อนออกมาสำรวจด้วยกัน','<a href="#/learn/cockatiel">รวมเรื่องค็อกคาเทล</a>')+`<article class="route-body">${BirbestLearning.lessonHtml('cockatiel','home/safety')}</article>${related('<nav class="lesson-navigation" aria-label="อ่านต่อ"><a class="route-link" href="#/learn/cockatiel?section=daily">← รวมเรื่องค็อกคาเทล</a><a class="route-link" href="#/learn/cockatiel/health/guide">อ่านต่อ: เมื่อไรควรติดต่อสัตวแพทย์? →</a></nav>')}`;
    }
    else if(route==='learn/home/sleep'){
      view.innerHTML=heading('จัดเวลานอนและมุมพักให้น้องอย่างไร?','เมื่อถึงเวลาพัก ให้บ้านค่อย ๆ เงียบลงไปด้วยกัน','<a href="#/learn">รวมเรื่องค็อกคาเทล</a>')+`<article class="route-body">
        <p class="label">7 คำถามเรื่องการพักผ่อน</p>
        <aside class="lesson-alert"><strong>นอนมากขึ้น พร้อมซึมหรือกินน้อยลง?</strong><p>อาการเหล่านี้ควรให้สัตวแพทย์ที่ดูแลนกช่วยประเมินโดยเร็ว หากหายใจลำบาก อ่อนแรงมาก หรือเกาะคอนไม่ได้ ให้ขอความช่วยเหลือฉุกเฉิน</p><a class="route-link" href="#/learn/cockatiel/welcome/health">อ่านเรื่องสัญญาณสุขภาพ →</a></aside>
        <div class="quick-answer"><strong>คืนนี้เริ่มง่าย ๆ</strong><p>ลดแสงและเสียงรบกวน จัดช่วงพักให้สม่ำเสมอ แล้วสังเกตว่าน้องพักได้สงบหรือไม่ ไม่ต้องซื้อผ้าคลุมหรืออุปกรณ์ใหม่ทุกอย่างพร้อมกัน</p></div>
        <div class="sleep-questions">${sleepQuestions.map(([q,a,d,s])=>`<details class="food-question"><summary>${esc(q)}</summary><div class="food-question-body"><p class="food-answer">${esc(a)}</p><p>${esc(d)}</p><a class="label route-link" href="${sleepSources[s][1]}" target="_blank" rel="noopener">${esc(sleepSources[s][0])}</a></div></details>`).join('')}</div>
        <aside class="lesson-sources"><h2>อ่านอย่างมั่นใจ</h2><p>เรียบเรียงจาก AAV, Merck Veterinary Manual และคู่มือค็อกคาเทลของสัตวแพทย์ Robert L. Linville ช่วงชั่วโมงนอนเป็นแนวทางทั่วไป ไม่ใช่คำสั่งเฉพาะตัว แหล่งข้อมูลมีมุมมองเรื่องคลุมกรงต่างกัน จึงไม่แนะนำให้คลุมทุกตัว</p><p>ตรวจแหล่งข้อมูล 30 กันยายน 2569 · รอตรวจบทเรียบเรียงโดยผู้เชี่ยวชาญ · ไม่ใช้แทนการตรวจวินิจฉัย</p></aside>
      </article>${related(`<nav class="lesson-navigation" aria-label="อ่านต่อ"><a class="route-link" href="#/learn/cockatiel?section=daily">← รวมเรื่องค็อกคาเทล</a><a class="route-link" href="#/learn/cockatiel/welcome/location">อ่านต่อ: วางกรงตรงไหนดี? →</a></nav>`)}`;
    }
    else if(route==='stories/postcards'){view.innerHTML=heading('โปสการ์ดจาก Birbest','เลือกภาพที่ชอบแล้วเก็บกลับไปได้เลย','<a href="#/stories">เรื่องเล่า</a>');view.append(postcards);}
    else if(parts[0]==='stories'&&parts.length===2&&stories.some(s=>s.id===parts[1])){const s=stories.find(s=>s.id===parts[1]);const f=friends[s.friend];const other=stories.find(item=>item.id!==s.id);view.innerHTML=heading(s.title,`ตอนสั้นของ${f.name} · เรื่องแต่งจากบุคลิกจริง`,'<a href="#/stories">เรื่องเล่า</a>')+`<article class="story-reader">${s.scenes.map(([title,text],i)=>`<section class="story-scene"><p class="label">ฉาก ${i+1} / ${s.scenes.length}</p><h2>${esc(title)}</h2>${storyIllustration(s.id,i)}<p class="story-lines">${esc(text)}</p></section>`).join('')}<p class="footnote">เหตุการณ์เป็นเรื่องแต่งในโลก Birbest โดยใช้นิสัยที่เจ้าของเล่าเป็นแรงบันดาลใจ</p><p class="footnote">${esc(s.note)}</p></article>${related(linkCard(`learn/${s.friend==='sunny'?'sun-conure':'cockatiel'}/${s.category}/guide`,s.lesson,'อ่านต่อใน Bird School')+linkCard(`characters/${s.friend}`,`รู้จัก${f.name}`,'พบกับนิสัยของนกตัวจริง'))}<nav class="lesson-navigation story-navigation" aria-label="อ่านเรื่องเล่าต่อ"><a class="route-link" href="#/stories">← รวมเรื่องเล่า</a><a class="route-link" href="#/stories/${other.id}">อีกเรื่อง: ${esc(other.title)} →</a></nav>`;}
    else if(route==='characters')view.innerHTML=heading('เพื่อนของเรา','อุด้งกับแร้บเตอร์ สองมาสคอตที่มีต้นแบบจากนกตัวจริงของ Birbest')+`<div class="route-grid mascot-directory">${characterCards()}</div><p class="footnote">ภาพและบทบาทในหมู่บ้านเป็นการเล่าเรื่องในโลก Birbest</p>`;
    else if(parts[0]==='characters'&&parts.length===2&&Object.hasOwn(mascotRoles,parts[1])){const id=parts[1];const f=friends[id];const role=mascotRoles[id];const other=id==='millet'?'sunny':'millet';view.innerHTML=heading(f.name,f.species,'<a href="#/characters">เพื่อนของเรา</a>')+`<div class="profile-layout mascot-profile"><img id="profile-image" src="assets/${f.image}" alt="${esc(f.name)}"><div><h2>สวัสดี เรา${esc(f.name)}</h2><p>${esc(f.story)}</p>${(f.details||[]).map(([title,text])=>`<h3>${esc(title)}</h3><p>${esc(text)}</p>`).join('')}</div></div><p class="footnote">นิสัยและของโปรดจากเรื่องที่เจ้าของเล่า เป็นเรื่องเฉพาะตัว ไม่ใช่คำแนะนำเรื่องอาหารหรือพฤติกรรมของนกทุกตัว</p><section class="route-section"><h2>${esc(role.label)}</h2><p>${esc(role.text)}</p><a class="pill" href="${role.href}">${esc(role.action)}</a></section><p class="footnote">บทบาทชวนเรียนรู้และเล่นคำถามเป็นเรื่องเล่าในเว็บไซต์</p>${related(linkCard('characters/'+other,'แวะทัก'+friends[other].name,mascotRoles[other].label)+linkCard('characters','เพื่อนของเรา','กลับไปหาอุด้งกับแร้บเตอร์'))}`;}
    else if(route==='tools/checklist')checklist();
    else if(route==='shop')view.innerHTML=heading('ร้านค้า Birbest','ของจากโลก Birbest สำหรับคนรักนก')+`<section class="shop-catalog" aria-label="สินค้า Birbest">
      <a class="shop-product" href="#/shop/daily-pack"><div class="shop-product-art"><img src="assets/daily-mixed-sachet.jpg" alt="Birbest Daily Pack สูตร Mixed Seed" width="941" height="941"></div><div class="shop-product-label"><div><p>DAILY PACK</p><h2>Mixed Seed</h2><span>สำหรับค็อกคาเทล · 1 / 7 / 30 ซอง</span><strong class="product-price">เริ่มต้น 19 บาท</strong></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>
      <a class="shop-product" href="#/shop/cockatiel-crochet"><div class="shop-product-art"><img src="assets/crochet-cockatiel-pink-leaves.jpg" alt="พวงกุญแจค็อกคาเทลโครเชต์" width="2048" height="2048" loading="lazy"></div><div class="shop-product-label"><div><p>LITTLE GOODS</p><h2>Cockatiel Crochet</h2><span>พวงกุญแจค็อกคาเทล</span><strong class="product-price">299 บาท</strong></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>
      <a class="shop-product" href="#/shop/sun-conure-crochet"><div class="shop-product-art"><img src="assets/crochet-sun-conure-orange-flowers.jpg" alt="พวงกุญแจซันคอนัวร์โครเชต์" width="2048" height="2048" loading="lazy"></div><div class="shop-product-label"><div><p>LITTLE GOODS</p><h2>Sun Conure Crochet</h2><span>พวงกุญแจซันคอนัวร์</span><strong class="product-price">299 บาท</strong></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>
    </section><section class="route-section"><h2>ช่องทางสั่งซื้อ</h2><p>Daily Pack มีจำหน่ายบน Shopee · งานฝีมือและงานอาร์ตมีทั้ง Shopee และ Etsy</p>${channelLinks('shop')}<p class="footnote">ตรวจสอบราคา ค่าจัดส่ง และประเทศปลายทางที่ร้านแต่ละช่องทาง</p></section><a class="route-link" href="#/contact">ติดต่อและติดตาม Birbest →</a>`;
    else if(route==='shop/cockatiel-crochet')view.innerHTML=heading('Cockatiel Crochet','พวงกุญแจค็อกคาเทลโครเชต์','<a href="#/shop">ร้านค้า</a>')+`<section id="shop-product-gallery" class="route-section" aria-label="Cockatiel Crochet"></section>`;
    else if(route==='shop/sun-conure-crochet')view.innerHTML=heading('Sun Conure Crochet','พวงกุญแจซันคอนัวร์โครเชต์','<a href="#/shop">ร้านค้า</a>')+`<section id="shop-sun-gallery" class="route-section" aria-label="Sun Conure Crochet"></section>`;
    else if(route==='contact')view.innerHTML=heading('ติดต่อและติดตาม Birbest','แวะทักทาย ติดตามเรื่องราว หรือเลือกชมของจาก Birbest')+`<article class="route-body"><section class="route-section"><h2>พบกันบนโซเชียล</h2>${channelLinks('social')}</section><section class="route-section"><h2>ช่องทางสั่งซื้อ</h2>${channelLinks('shop')}<p class="footnote">Daily Pack มีจำหน่ายบน Shopee · งานฝีมือและงานอาร์ตมีทั้ง Shopee และ Etsy</p></section><p><a class="route-link" href="https://linktr.ee/birbest.official" target="_blank" rel="noopener noreferrer">รวมช่องทางทั้งหมดบน Linktree ↗</a></p><p class="footnote">ช่องทางภายนอกมีเงื่อนไขและการจัดการข้อมูลของแต่ละแพลตฟอร์ม</p></article>${related(linkCard('about','รู้จัก Birbest','เรื่องราวเบื้องหลังแบรนด์')+linkCard('stories','พักอ่านเรื่องเล่า','แวะหาอุด้งกับแร้บเตอร์'))}`;
    else if(route==='shop/daily-pack')view.innerHTML=heading('Birbest Daily Pack','Mixed Seed สำหรับค็อกคาเทลโตเต็มวัย','<a href="#/shop">ร้านค้า</a>')+`<section id="shop-daily-gallery" class="route-section" aria-label="Daily Pack Mixed Seed"></section>`;
    else if(route==='about')view.innerHTML=`
      <header class="about-hero">
        <img src="assets/home-village-layer.webp" alt="หมู่บ้าน Birbest ริมทะเล มีสวนดอกไม้และร้านเล็ก ๆ รอต้อนรับคนรักนก" width="1536" height="1024" fetchpriority="high">
        <div class="about-hero-copy"><p class="eyebrow">CHIRP UP YOUR LIFE!</p><h1>รู้จัก Birbest</h1><p>การดูแลนกสนุกกว่าที่คิด</p></div>
      </header>
      <article class="route-body about-story">
        <section class="about-origin" aria-labelledby="about-world">
          <div>
          <p class="eyebrow">OUR STORY · จุดเริ่มต้นของ Birbest</p>
          <h2 id="about-world">ความใส่ใจ เริ่มจากเรื่องเล็ก ๆ ทุกวัน</h2>
          <p>Birbest เริ่มต้นจากประสบการณ์การเลี้ยงค็อกคาเทลของผู้ก่อตั้ง และความตั้งใจให้นกที่รักมีสุขภาพดี มีความสุข และอยู่ร่วมกันไปให้นานที่สุด การเตรียมอาหาร เปลี่ยนน้ำ และศึกษาข้อมูลจึงไม่ใช่เพียงกิจวัตร แต่เป็นความใส่ใจในทุกวัน</p>
          <p>ประสบการณ์เหล่านี้ทำให้เห็นรายละเอียดที่เจ้าของนกต้องจัดการ ทั้งเวลาในการเตรียมอาหาร อาหารถุงใหญ่ที่ใช้ไม่ทัน และการส่งต่อวิธีดูแลให้ผู้อื่นเข้าใจตรงกัน</p>
          <p>การชั่งและแบ่งอาหารล่วงหน้าเป็นจุดเริ่มต้นของการจัดการกิจวัตรให้สะดวกขึ้น และนำมาสู่แนวคิดของ Birbest: นำความเข้าใจจากการดูแลนกจริง มาพัฒนาสิ่งที่เป็นประโยชน์ต่อคนรักนก โดยยังรักษาความใส่ใจในทุกรายละเอียด</p>
          </div>
          <img class="about-care-art" src="assets/about-care.webp" alt="ภาพประกอบความใส่ใจในวันธรรมดา ผู้ดูแลจัดถ้วยอาหารให้ค็อกคาเทลข้างสมุดบันทึก" width="1448" height="1086" loading="lazy">
        </section>
        <section aria-labelledby="about-fun">
          <h2 id="about-fun">ความรู้ก็สนุกได้</h2>
          <p>การสังเกตสิ่งเล็ก ๆ ในแต่ละวันเป็นจุดเริ่มต้นของความเข้าใจ Birbest จึงตั้งใจถ่ายทอดเรื่องการดูแลนกผ่านภาษาที่เข้าถึงง่าย ภาพ เรื่องเล่า และกิจกรรมที่ชวนให้เรียนรู้</p>
          <p>ไม่ว่าจะเริ่มจากเรื่องเล่าของตัวละคร หรือค้นหาคำตอบเรื่องการดูแล ทุกคนสามารถเลือกเรียนรู้ในเรื่องที่สนใจและนำกลับไปใช้ในชีวิตประจำวัน</p>
          <p><a class="route-link" href="#/stories">แวะอ่านเรื่องเล่าของเพื่อน ๆ →</a></p>
          <figure class="about-story-image"><img src="assets/learn-foraging.webp" alt="ภาพประกอบค็อกคาเทลกำลังสำรวจ เป็นช่วงเวลาแห่งการค้นพบเล็ก ๆ" width="1536" height="1024" loading="lazy"></figure>
        </section>
        <section aria-labelledby="about-care">
          <p class="eyebrow">OUR MISSION · สิ่งที่เราตั้งใจทำ</p>
          <h2 id="about-care">ช่วยให้ความใส่ใจทำได้ง่ายขึ้นในทุกวัน</h2>
          <p>เราตั้งใจเปลี่ยนความเข้าใจจากชีวิตจริงของคนเลี้ยงนก ให้เป็นความรู้ ผลิตภัณฑ์ และเครื่องมือที่ใช้ได้ในทุกวัน เพื่อให้การดูแลนกง่ายขึ้น สนุกขึ้น และน่าไว้ใจ โดยใส่ใจความแตกต่างของนกแต่ละตัว</p>
          <p>การพัฒนาเริ่มจากค็อกคาเทล ซึ่งเป็นสายพันธุ์ที่ผู้ก่อตั้งมีประสบการณ์ดูแลโดยตรง โดยให้ความสำคัญกับการศึกษาและทดสอบก่อนขยายไปยังสายพันธุ์อื่น ไม่ใช้แนวทางเดียวกันกับนกทุกตัว</p>
          <figure class="about-story-image"><img src="assets/learn-trust.webp" alt="ภาพประกอบช่วงเวลาที่เจ้าของนั่งเป็นเพื่อนค็อกคาเทล" width="1536" height="1024" loading="lazy"></figure>
        </section>
        <section aria-labelledby="about-vision">
          <p class="eyebrow">OUR VISION · โลกที่เราอยากสร้าง</p>
          <h2 id="about-vision">โลกที่เชื่อมโยงคนรักนก</h2>
          <figure class="about-story-image"><img src="assets/about-two-friends-world-v1.webp" alt="อุด้งกับแร้บเตอร์ยืนบนแท่นไม้คนละแท่น ในหมู่บ้านดอกไม้ริมทะเลของ Birbest" width="1536" height="1024" loading="lazy"><figcaption>อุด้งกับแร้บเตอร์ในโลกเรื่องเล่าของ Birbest</figcaption></figure>
          <p>วิสัยทัศน์ของ Birbest คือการสร้าง “อาณาจักรนก” ที่เชื่อมโยงความรู้ ผลิตภัณฑ์ ประสบการณ์ และชุมชน เพื่อสนับสนุนคุณภาพชีวิตที่ดีของนกและเจ้าของ</p>
          <p>เราตั้งใจให้โลกแห่งนี้เป็นพื้นที่ที่ทุกคนเข้ามาค้นพบความสนุก ทำความรู้จักเพื่อนนก และได้รับความรู้กลับไป เป็นประสบการณ์ที่มีคุณค่ามากกว่าการเลือกซื้อสินค้า และเป็นสิ่งที่ Birbest กำลังพัฒนาทีละส่วน</p>
        </section>
        <section aria-labelledby="about-name">
          <p class="eyebrow">CHIRP UP YOUR LIFE!</p>
          <h2 id="about-name">ให้วันธรรมดามีเสียงสดใส</h2>
          <p>ชื่อ Birbest มาจาก Birb คำเรียกนกแบบเอ็นดู กับ Best ความตั้งใจที่จะทำสิ่งที่ดีขึ้นเพื่อนกและคนที่รักนก ไม่ใช่ความสมบูรณ์แบบที่ไกลตัว แต่เป็นความใส่ใจที่เข้าถึงได้ในชีวิตจริง</p>
          <p>Chirp Up Your Life! เล่นกับเสียงร้องของนกและคำว่า cheer up เพราะเราเชื่อว่าการมีนกอยู่ด้วยทำให้วันธรรมดามีสีสันขึ้นได้ เช่นเดียวกับสีรุ้งในโลโก้ที่สะท้อนความหลากหลายของเพื่อนนกในโลก Birbest</p>
        </section>
        <section aria-labelledby="about-trust">
          <h2 id="about-trust">ความสนุกที่มาพร้อมความรับผิดชอบ</h2>
          <p>Birbest ให้ความสำคัญกับการสื่อสารที่เข้าใจง่ายและตรงไปตรงมา โดยแยกเรื่องเล่าสมมติของตัวละครออกจากข้อมูลการดูแลนก พร้อมระบุแหล่งข้อมูล เงื่อนไข และข้อจำกัดของสิ่งที่ยังต้องศึกษาเพิ่มเติม</p>
          <p>เนื้อหาความรู้ชุดแรกกำลังพัฒนาและทบทวน ข้อมูลบนเว็บไซต์ใช้ประกอบการเรียนรู้ ไม่ใช้วินิจฉัยหรือรักษานก หากกังวลเรื่องสุขภาพของน้อง ควรติดต่อสัตวแพทย์ที่ดูแลนก</p>
          <p><a class="route-link" href="#/learn">สำรวจเรื่องน่ารู้ใน Bird School →</a></p>
          <figure class="about-story-image"><img src="assets/learn-cleaning.webp" alt="ภาพประกอบความใส่ใจผ่านการดูแลชาม กรง และอุปกรณ์ในทุกวัน" width="1536" height="1024" loading="lazy"></figure>
        </section>
        <section aria-labelledby="about-growing">
          <h2 id="about-growing">จากความเข้าใจ สู่การพัฒนา</h2>
          <p>ตอนนี้คุณทำความรู้จักอุด้งกับแร้บเตอร์ อ่านเรื่องเล่าสั้น ๆ ลองเช็กลิสต์ประจำวัน และเก็บโปสการ์ดจากหมู่บ้าน Birbest ได้ เราจะค่อย ๆ เติมเนื้อหาและพัฒนาเครื่องมือจากสิ่งที่คนรักนกต้องใช้ในชีวิตจริง</p>
          <p>Birbest Daily Pack เริ่มจากโจทย์การตวงอาหารในวันรีบและการฝากคนอื่นดูแลน้อง สูตร Mixed Seed แบ่งบรรจุซองละ 12 กรัมสำหรับค็อกคาเทลโตเต็มวัย ช่วยให้เตรียมอาหารได้สะดวกขึ้น โดยไม่ใช่อาหารครบถ้วนหรือปริมาณอาหารครบวันสำหรับนกทุกตัว</p>
          <p><a class="route-link" href="#/shop/daily-pack">ดู Daily Pack สูตร Mixed Seed →</a></p>
          <figure class="about-story-image"><img src="assets/learn-food-types.webp" alt="ภาพประกอบค็อกคาเทลกับอาหารหลายประเภท ไม่ใช่ภาพผลิตภัณฑ์ Daily Pack" width="1536" height="1024" loading="lazy"><figcaption>ภาพประกอบความใส่ใจในมื้ออาหาร ไม่ใช่ภาพผลิตภัณฑ์ Daily Pack</figcaption></figure>
        </section>
        <section class="about-welcome" aria-labelledby="about-mascots"><p class="eyebrow">MEET OUR TWO FRIENDS</p><h2 id="about-mascots">อุด้งกับแร้บเตอร์ เพื่อนตัวจริงของ Birbest</h2><p>สองมาสคอตมีต้นแบบจากนกที่ผู้ก่อตั้งเลี้ยง ความชอบและนิสัยเล็ก ๆ ของทั้งคู่เป็นแรงบันดาลใจให้เรื่องเล่าในหมู่บ้าน</p><div class="about-mascots">${Object.keys(mascotRoles).map(id=>`<a href="#/characters/${id}"><img src="assets/${friends[id].image}" alt="${esc(friends[id].name)}" width="320" height="300" loading="lazy"><h3>${esc(friends[id].name)}</h3><p>${esc(friends[id].intro)}</p><span class="route-link">มารู้จักกัน →</span></a>`).join('')}</div><p class="about-signoff">Birbest ยินดีต้อนรับทุกคนที่รักนก ทั้งผู้ที่เลี้ยงอยู่แล้ว ผู้ที่กำลังเรียนรู้ และผู้ที่อยากค้นพบความสุขจากโลกของนก</p></section>
      </article>
      ${related(linkCard('stories','เรื่องเล่าของอุด้งกับแร้บเตอร์','พักอ่านเรื่องสั้นจากสองเพื่อนตัวเล็ก')+linkCard('contact','ติดต่อและติดตาม Birbest','แวะทักทาย ติดตามเรื่องราว หรือเลือกชมร้านของเรา'))}`;
    else if(route==='privacy')view.innerHTML=heading('ข้อมูลและความเป็นส่วนตัว','สำหรับเว็บไซต์ต้นแบบในอุปกรณ์นี้')+`<article class="route-body"><p>เว็บไซต์นี้ยังไม่มีบัญชีผู้ใช้ การสั่งซื้อ หรือการส่งข้อมูลนกขึ้นระบบ โปสการ์ดที่ถูกใจและเช็กลิสต์ถูกเก็บไว้ในเบราว์เซอร์นี้</p><p>ฟอนต์เก็บไว้กับเว็บไซต์ ลิงก์แหล่งข้อมูลเปิดไปยังเว็บไซต์ภายนอกตามที่คุณเลือกกด</p><button class="pill" id="clear-world">ล้างรายการที่บันทึกในเว็บนี้</button><p role="status" id="clear-status"></p></article>`;
    else if(route==='search'){
      view.innerHTML=heading('ค้นหาใน Birbest','ค้นหาเรื่องน่ารู้ เพื่อนตัวเล็ก ร้านค้า และช่องทางติดต่อ')+`<form class="search-form" role="search"><label class="skip" for="site-query">คำค้น</label><input id="site-query" name="q" type="search" placeholder="เช่น ค็อกคาเทล อาหาร หรือเช็กลิสต์" maxlength="100"><button class="pill" type="submit">ค้นหา</button></form><p class="status" role="status" id="search-status"></p><div id="search-results" class="route-grid"></div>`;
      const form=view.querySelector('form');
      const input=view.querySelector('input');
      const search=()=>{
        const query=input.value.trim().toLocaleLowerCase();
        const terms=query.split(/\s+/).filter(Boolean);
        const found=query?searchIndex.filter(item=>terms.every(term=>`${item.title} ${item.text} ${item.keywords||''}`.toLocaleLowerCase().includes(term))):[];
        view.querySelector('#search-status').textContent=query?(found.length?`พบ ${found.length} รายการ`:'ยังไม่เจอเรื่องนี้ ลองใช้คำสั้นลง หรือเลือกจากมุมด้านล่างได้เลย'):'วันนี้อยากแวะมุมไหน?';
        view.querySelector('#search-results').innerHTML=found.length?found.map(item=>linkCard(item.href,item.title,item.text)).join(''):availableSpecies.map(id=>linkCard('learn/'+id,'เรียนรู้'+BirbestLearning.getSpecies(id).label,'เลือกเรื่องที่อยากรู้ใน Bird School')).join('')+linkCard('stories','เรื่องเล่าของเพื่อนตัวเล็ก','แวะหาอุด้งกับแร้บเตอร์')+linkCard('contact','ติดต่อและติดตาม','โซเชียลและร้านของ Birbest');
      };
      input.value=new URLSearchParams(raw.split('?')[1]||'').get('q')||'';
      form.addEventListener('submit',e=>{e.preventDefault();history.replaceState(null,'',`#/search?q=${encodeURIComponent(input.value.trim())}`);search();});
      input.addEventListener('input',()=>{if(!input.value){history.replaceState(null,'','#/search');search();}});
      search();
    }
    else view.innerHTML=heading('มุมนี้ยังหาไม่เจอ','กลับไปเดินเล่นจากหน้าแรก หรือค้นหาเรื่องที่สนใจได้เลย')+`<a class="pill" href="#home">กลับหน้าแรก</a> <a class="route-link" href="#/search">ค้นหาในเว็บไซต์</a>`;
    if(route==='learn/welcome'||route.startsWith('learn/welcome/')){
      const figure=(file,alt,caption,width=1536,height=1024)=>`<figure class="welcome-art"><img src="assets/welcome-${file}.png" alt="${esc(alt)}" width="${width}" height="${height}" loading="lazy"><figcaption>${esc(caption)}</figcaption></figure>`;
      const art={
        cage:['กรงสี่เหลี่ยมพร้อมคอน ชาม และเจ้าของนั่งอยู่ข้าง ๆ','ภาพประกอบแนวคิดบ้านของน้อง ไม่ใช่แบบระบุขนาดกรงหรือรับรองวัสดุ'],
        location:['เปรียบเทียบมุมพักกับบริเวณแดดส่องตรง ลมแอร์เป่า และเตาปรุงอาหาร','เลือกมุมพักให้เหมาะกับน้อง ภาพนี้อธิบายตำแหน่ง ไม่ได้แสดงขนาดกรงที่แนะนำ'],
        'first-meal':['ค็อกคาเทลกินอาหารที่ชาม มีน้ำอยู่ข้างกัน','เริ่มจากอาหารที่น้องกินเป็น ภาพนี้ไม่ใช่สัดส่วนอาหารสำหรับระยะยาว'],
        settling:['เจ้าของนั่งเงียบ ๆ ใกล้กรง ให้นกคุ้นเคยโดยไม่จับตัว','อยู่ใกล้กันได้ โดยไม่ต้องรีบเข้าไปจับน้อง'],
        health:['เจ้าของนำค็อกคาเทลในกรงเดินทางมาพูดคุยกับสัตวแพทย์','เตรียมข้อมูลอาหารเดิมและสิ่งที่สังเกตได้ ไปคุยกับสัตวแพทย์ที่ดูแลนก']
      };
      if(route==='learn/welcome'){
        view.querySelector('.quick-answer').insertAdjacentHTML('afterend',figure('overview','เจ้าของให้ค็อกคาเทลทำความคุ้นเคยกับบ้านใหม่','ค่อย ๆ เตรียมบ้าน อาหาร และเวลาให้น้องปรับตัว'));
      }else{
        const sections=view.querySelectorAll('.route-section');
        const id=parts[2];
        if(id==='setup'){
          sections[0].insertAdjacentHTML('beforebegin',figure('setup-overview','ภาพรวมกรงพร้อมภาพขยายซี่กรง คอน ชาม ของเล่น และพื้นที่กางปีก','ภาพรวมอุปกรณ์ · ภาพประกอบไม่ใช่แบบระบุขนาดหรือรับรองวัสดุ'));
          sections[0].insertAdjacentHTML('afterend',figure('setup-basic','ภาพตัดภายในกรงแบบเรียบง่าย มีคอน ชามอาหาร น้ำ และของเล่นหนึ่งชิ้น','เริ่มจากของจำเป็น · ภาพตัดให้เห็นภายในกรง'));
          sections[4].insertAdjacentHTML('afterend',figure('setup-enrichment','ภาพตัดภายในกรงที่เพิ่มคอนและกิจกรรม โดยมีพื้นที่ตรงกลาง','ค่อยเพิ่มกิจกรรมที่เหมาะกับน้อง ไม่จำเป็นต้องแต่งให้เต็มตามภาพ · ตรวจชนิดพืชและวัสดุก่อนใช้จริง'));
        }else if(art[id]){
          // Keep urgent advice before illustrations in the health and first-meal lessons.
          const after=id==='health'?0:id==='first-meal'?1:null;
          const html=figure(id,...art[id]);
          sections[after===null?0:after].insertAdjacentHTML(after===null?'beforebegin':'afterend',html);
        }
        if(id==='cage'){
          sections[4].insertAdjacentHTML('beforeend',`<ul class="cage-materials"><li><strong>สเตนเลสไม่มีผิวเคลือบ:</strong> ขอรายละเอียดวัสดุจากผู้ผลิต และตรวจรอยต่อกับจุดคมด้วย สีเงินหรือผิวเงาเพียงอย่างเดียวยังใช้ระบุว่าเป็นสเตนเลสไม่ได้</li><li><strong>เหล็กเคลือบสีฝุ่น:</strong> เลือกงานผิวเรียบ ยึดเกาะดี ไม่มีรอยลอกหรือสนิม และถามถึงโลหะใต้ชั้นเคลือบ คำว่า powder coating จึงเป็นจุดเริ่มต้นในการถามข้อมูล ไม่ใช่การรับรองความปลอดภัยของกรงทุกใบ</li><li><strong>จุดที่ควรตรวจเพิ่ม:</strong> ลวดชุบสังกะสี (galvanized) และผิวเคลือบที่ถูกกัดหลุดมีความเสี่ยงจากการรับสังกะสีเข้าสู่ร่างกาย หากพบสีลอก สนิม หรือวัสดุไม่ชัดเจน ให้เลือกกรงอื่นที่ตรวจสอบได้ หรือขอคำแนะนำจากสัตวแพทย์ที่ดูแลนกก่อนใช้</li></ul><p class="label"><a class="route-link" href="https://www.forthebirdsdvm.com/blogs/news/1586482-whats-that-cage-made-of" target="_blank" rel="noopener">For the Birds DVM: วัสดุและผิวเคลือบกรง</a> · ตรวจข้อมูลวัสดุเพิ่มเติม 1 ตุลาคม 2569 · รอตรวจบทเรียบเรียงโดยผู้เชี่ยวชาญ</p>`);
          sections[5].querySelector('p').outerHTML=`<ol class="cage-buying-checks"><li><strong>ขนาดภายในจริง</strong><p>กว้าง × ลึก × สูงเท่าไร และเมื่อวางคอนกับชามแล้ว เหลือพื้นที่ให้น้องขยับได้แค่ไหน?</p></li><li><strong>ช่องว่างระหว่างซี่</strong><p>วัดขอบในถึงขอบในได้เท่าไร รวมช่องบริเวณประตูด้วย?</p></li><li><strong>วัสดุและผิวเคลือบ</strong><p>ตัวกรงทำจากอะไร เคลือบด้วยอะไร และมีข้อมูลจากผู้ผลิตให้ตรวจสอบไหม?</p></li><li><strong>การเปิดล้างและตัวล็อก</strong><p>ถอดถาดและเข้าถึงส่วนต่าง ๆ เพื่อล้างได้สะดวกไหม ประตูและตัวล็อกปิดแน่นดีหรือเปล่า?</p></li></ol><p>ใช้ 4 ข้อนี้คุยกับผู้ขาย หรือขอภาพรายละเอียดเพิ่มเติมก่อนเลือกกรงให้น้องได้เลย</p>`;
          sections[3].insertAdjacentHTML('beforebegin','<section class="route-section"><h2>เลือกซี่แนวนอนหรือแนวตั้งดี?</h2><p>สำหรับค็อกคาเทล ซี่แนวนอนอย่างน้อยบางด้านช่วยให้ปีนได้สะดวก กรงจึงมีทั้งซี่แนวนอนและแนวตั้งได้ โดยเลือกควบคู่กับระยะช่องว่าง วัสดุ และพื้นที่ใช้งานที่เหมาะกับน้อง</p><a class="label route-link" href="https://www.petdoc.ws/CockatielCare.htm" target="_blank" rel="noopener">Robert L. Linville, DVM: Cockatiel Care Guide</a></section>');
          sections[3].insertAdjacentHTML('afterend',`<figure class="welcome-art"><div class="bar-gap-diagram"><img src="assets/welcome-bar-gap.png" alt="ลูกศรแนวตั้งวัดช่องว่างจากขอบล่างของซี่บนถึงขอบบนของซี่ถัดไป ไม่รวมความหนาของโลหะ" width="1254" height="1254" loading="lazy"><span class="bar-gap-extensions" aria-hidden="true"></span><span class="bar-gap-arrow" aria-hidden="true"></span><span class="bar-gap-label" aria-hidden="true">วัดช่องว่างตรงนี้<br>ขอบในถึงขอบใน</span></div><figcaption>วัดเฉพาะช่องว่างที่โล่งระหว่างซี่ ไม่รวมความหนาซี่ และไม่วัดจากกึ่งกลางซี่ · ถ้าซี่ตั้ง ให้วัดช่องว่างในแนวนอนด้วยหลักเดียวกัน · ภาพขยายนี้ไม่ใช่ระยะจริง ใช้อุปกรณ์วัดที่กรงตามแนวทางในบท</figcaption></figure>`);
        }
        if(id==='first-meal')sections[4].insertAdjacentHTML('afterend',figure('seed-hulls','ภาพเปรียบเทียบเมล็ดเต็มทางซ้ายกับเปลือกที่เปิดและว่างด้านในทางขวา','ซ้าย: เมล็ดเต็ม · ขวา: เปลือกว่าง · ภาพขยายช่วยสังเกตความต่าง รูปร่างและสีอาจแตกต่างตามชนิดเมล็ด'));
        if(id==='settling'||id==='health')sections[id==='settling'?4:2].insertAdjacentHTML('afterend',figure('separate-rooms','ภาพตัดให้เห็นค็อกคาเทลในกรงแยกคนละห้อง มีผนังและประตูปิดคั่นกลาง','คนละห้อง มีประตูปิดคั่น · ภาพเล่าแนวคิดการแยกพื้นที่ ส่วนแผนกักแยกและการตรวจสุขภาพให้สัตวแพทย์แนะนำตามแต่ละบ้าน'));
      }
    }
    if(route==='privacy')view.querySelector('#clear-world').addEventListener('click',()=>{try{localStorage.removeItem('birbest-world-postcards');localStorage.removeItem('birbest-world-checklist');saved=[];renderSaved();view.querySelector('#clear-status').textContent='ล้างรายการของเว็บไซต์นี้แล้ว';}catch{view.querySelector('#clear-status').textContent='เบราว์เซอร์ไม่อนุญาตให้ล้างข้อมูล';}});
    if(route==='learn/food/guide'){
      const article=view.querySelector('article');
      article.innerHTML=`<p class="label">12 คำถาม · สำหรับคนเริ่มเลี้ยงค็อกคาเทล</p>${foodLesson()}`;
      view.querySelector('.related').innerHTML=`<nav class="lesson-navigation" aria-label="อ่านต่อ"><a class="route-link" href="#/learn/cockatiel?section=daily">← รวมเรื่องค็อกคาเทล</a><a class="route-link" href="#/stories/millet-day">พักอ่านเรื่องเล่า: ${esc(stories[0].title)} →</a></nav>`;
      article.querySelectorAll('[data-food-group]').forEach(a=>a.addEventListener('click',event=>{
        if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
        event.preventDefault();
        const target=article.querySelector(`#food-group-${a.dataset.foodGroup}`);
        target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});
      }));
    }
    if(route==='learn/health/guide'){
      view.querySelector('article').innerHTML=`${BirbestLearning.lessonHtml('cockatiel','health/guide')}`;
      view.querySelector('.related').innerHTML='<nav class="lesson-navigation" aria-label="อ่านต่อ"><a class="route-link" href="#/learn/cockatiel?section=daily">← รวมเรื่องค็อกคาเทล</a><a class="route-link" href="#/learn/cockatiel/welcome/health">อ่านต่อ: ตรวจสุขภาพนกใหม่ →</a></nav>';
    }
    if(route==='learn/home/safety')view.querySelector('article .lesson-alert').insertAdjacentHTML('afterend','<figure class="welcome-art lesson-art"><img src="assets/learn-cockatiel-home-safety-v2.webp" alt="อุด้งยืนบนคอนกับผู้ดูแลในห้องนั่งเล่นที่ประตูและหน้าต่างปิด" width="1536" height="1024" loading="lazy"><figcaption>ภาพชวนสังเกตพื้นที่ก่อนออกมาเล่น เช่น ประตู หน้าต่าง จุดเกาะ และสิ่งของรอบตัว · ยังต้องตรวจพัดลม สายไฟ ต้นไม้ และอันตรายอื่นตามรายการในบท</figcaption></figure>');
    if(route==='learn/welcome/location'||route==='learn/play/guide')view.querySelector('article').insertAdjacentHTML('afterend','<p><a class="route-link" href="#/learn/cockatiel/home/safety">ก่อนออกมาเล่น: จัดบ้านให้ปลอดภัยสำหรับนก →</a></p>');
    if(route==='learn/welcome/health')view.querySelector('article').insertAdjacentHTML('beforeend','<p><a class="route-link" href="#/learn/cockatiel/health/guide">น้องดูต่างจากทุกวัน: เมื่อไรควรติดต่อสัตวแพทย์? →</a></p>');
    if(route==='learn/behavior/guide'){
      view.querySelector('.route-heading h1').textContent='เริ่มทำความคุ้นเคยกับน้องอย่างไร?';
      view.querySelector('.route-heading p').textContent='เริ่มจากความคุ้นเคยเล็ก ๆ และให้น้องมีทางเลือก';
      view.querySelector('.breadcrumbs [aria-current]').textContent='เริ่มทำความคุ้นเคยกับน้องอย่างไร?';
      view.querySelector('article').innerHTML=`<p class="label">7 คำถามเรื่องความคุ้นเคย</p><div class="quick-answer"><strong>ไม่ต้องรีบจับ ก็เริ่มรู้จักกันได้</strong><p>บทนี้ชวนเริ่มสร้างความไว้ใจต่อจากวันแรกที่น้องย้ายบ้าน ไม่ใช่คู่มือบังคับขึ้นมือหรือแก้ปัญหาการกัดเฉพาะตัว</p></div><div class="trust-questions">${trustQuestions.map(([q,a,d,s])=>`<details class="food-question"><summary>${esc(q)}</summary><div class="food-question-body"><p class="food-answer">${esc(a)}</p><p>${esc(d)}</p><a class="label route-link" href="${trustSources[s][1]}" target="_blank" rel="noopener">${esc(trustSources[s][0])}</a></div></details>`).join('')}</div><aside class="lesson-sources"><h2>อ่านอย่างมั่นใจ</h2><p>เรียบเรียงจากแนวทางการดูแลและฝึกนกทั่วไปของ VCA และ World Parrot Trust สำหรับเจ้าของค็อกคาเทล ไม่ใช่ผลการศึกษาที่รับประกันผลเฉพาะสายพันธุ์หรือแต่ละตัว</p><p>ตรวจแหล่งข้อมูล 30 กันยายน 2569 · บทเรียบเรียงยังรอตรวจโดยผู้เชี่ยวชาญ ไม่ใช้วินิจฉัยปัญหาสุขภาพหรือพฤติกรรม</p><a class="route-link" href="#/learn/cockatiel/welcome/health">มีเรื่องสุขภาพกังวล? อ่านเรื่องการขอความช่วยเหลือ</a></aside>`;
      view.querySelector('.related').innerHTML=`<nav class="lesson-navigation" aria-label="อ่านต่อ"><a class="route-link" href="#/learn/cockatiel?section=understand">← รวมเรื่องค็อกคาเทล</a><a class="route-link" href="#/learn/cockatiel/play/guide">อ่านต่อ: ความสนุกของการค้นหา →</a></nav>`;
    }
    if(route==='learn/play/guide'){
      view.querySelector('.route-heading h1').textContent='เริ่มเล่นค้นหาอาหารแบบง่าย ๆ';
      view.querySelector('.route-heading p').textContent='ไม่ต้องมีของเล่นเต็มบ้าน เริ่มจากสิ่งเล็ก ๆ ที่น้องทำได้';
      view.querySelector('.breadcrumbs [aria-current]').textContent='เริ่มเล่นค้นหาอาหาร';
      view.querySelector('article').innerHTML=`<p class="label">7 คำถามเรื่องกิจกรรมค้นหาอาหาร</p><div class="quick-answer"><strong>เริ่มให้หาเจอ ก่อนเพิ่มความยาก</strong><p>สำหรับการลองครั้งแรกในบทนี้ ให้เป็นกิจกรรมเสริม ไม่เอาชามอาหารปกติออกเพื่อบังคับให้น้องเล่น และไม่ใช้กิจกรรมแทนการขอคำแนะนำเมื่อน้องกินลดลงผิดปกติ</p></div><div class="play-questions">${playQuestions.map(([q,a,d,s])=>`<details class="food-question"><summary>${esc(q)}</summary><div class="food-question-body"><p class="food-answer">${esc(a)}</p><p>${esc(d)}</p><a class="label route-link" href="${playSources[s][1]}" target="_blank" rel="noopener">${esc(playSources[s][0])}</a></div></details>`).join('')}</div><aside class="lesson-sources"><h2>อ่านอย่างมั่นใจ</h2><p>เรียบเรียงจาก AAV มหาวิทยาลัยฟลอริดา RSPCA และหนังสือกิจกรรมของ Kris Porter ที่เผยแพร่ผ่าน World Parrot Trust โดยเลือกแนวคิดเริ่มต้น ไม่ได้แนะนำให้ทำตามอุปกรณ์ทุกแบบในแหล่งอ้างอิง</p><p>เป็นแนวทางนกแก้วทั่วไปที่นำมาเรียบเรียงสำหรับเจ้าของค็อกคาเทล ไม่ใช่การรับรองความปลอดภัยเฉพาะตัว · ตรวจแหล่งข้อมูล 30 กันยายน 2569 · รอตรวจบทเรียบเรียงโดยผู้เชี่ยวชาญ</p></aside>`;
      view.querySelector('.related').innerHTML=`<nav class="lesson-navigation" aria-label="อ่านต่อ"><a class="route-link" href="#/learn/cockatiel?section=understand">← รวมเรื่องค็อกคาเทล</a><a class="route-link" href="#/learn/cockatiel/food/guide">อ่านต่อ: รู้จักอาหารในชาม →</a></nav>`;
    }
    const lessonArt={
      'learn/home/cleaning':{file:'learn-cleaning.webp',alt:'สามกิจกรรมดูแลความสะอาด ล้างชาม เปลี่ยนกระดาษรองกรง และตรวจคอนกับของเล่น',caption:'เริ่มจากสามเรื่องใกล้ตัว: ชามสะอาด กระดาษใหม่ และอุปกรณ์ที่ตรวจสภาพแล้ว · จัดน้องไว้ในพื้นที่ปลอดภัยแยกจากบริเวณทำความสะอาด'},
      'learn/home/sleep':{file:'learn-sleep.png',alt:'ค็อกคาเทลพักบนคอนในกรงที่ไม่มีผ้าคลุม ภายในห้องยามค่ำคืน',caption:'มุมสงบสำหรับช่วงพักของน้อง · แสงในภาพใช้เล่าบรรยากาศ ไม่ใช่ระดับแสงที่แนะนำให้เปิดตลอดคืน ปรับตามคำแนะนำในบทและน้องแต่ละตัว'},
      'learn/food/guide':{file:'learn-food-types.webp',alt:'ค็อกคาเทลข้างชามเพลเลต เมล็ด ผัก และน้ำที่แยกจากกัน',caption:'รู้จักอาหารแต่ละประเภท · ปริมาณในภาพเป็นภาพประกอบ ไม่ใช่สัดส่วนหรือปริมาณที่แนะนำต่อวัน'},
      'learn/behavior/guide':{file:'learn-cockatiel-trust-v2.webp',alt:'อุด้งอยู่บนคอนในกรงเปิด โดยผู้ดูแลนั่งอยู่ใกล้ในระยะที่ไม่รบกวน',caption:'เริ่มจากอยู่ใกล้กันอย่างสงบ ให้น้องมีเวลาและทางเลือก · ภาพประกอบแนวคิด ไม่ใช่แบบประเมินภาษากาย'},
      'learn/play/guide':{file:'learn-foraging.webp',alt:'ค็อกคาเทลใช้จะงอยปากยกกระดาษในถาดตื้น เผยให้เห็นอาหาร โดยมีเจ้าของอยู่ใกล้',caption:'ความสนุกของการค้นหา · ภาพประกอบแนวคิดกิจกรรม ไม่ใช่การรับรองวัสดุหรืออุปกรณ์ในภาพ'}
    };
    if(lessonArt[route]){
      const art=lessonArt[route];
      const figure=`<figure class="welcome-art lesson-art"><img src="assets/${art.file}" alt="${esc(art.alt)}" width="1536" height="1024"><figcaption>${esc(art.caption)}</figcaption></figure>`;
      const anchor=view.querySelector(route==='learn/food/guide'?'.learning-shortcuts':'.quick-answer');
      anchor.insertAdjacentHTML('afterend',figure);
    }
    if(route==='learn/home/cleaning')view.querySelector('.cleaning-questions details:last-child').insertAdjacentHTML('afterend','<figure class="welcome-art lesson-art"><img src="assets/learn-equipment-check.png" alt="เปรียบเทียบคอนและของเล่นทางซ้ายกับชิ้นชำรุดทางขวา มีภาพขยายไม้แตกและเชือกรุ่ย" width="1536" height="1024" loading="lazy"><figcaption>จุดที่ชวนสังเกต: ไม้แตก เสี้ยน และเชือกรุ่ยทางขวา ควรนำชิ้นชำรุดออกและเปลี่ยนให้เหมาะกับน้อง · ภาพช่วยดูสภาพภายนอก ส่วนวัสดุและความสะอาดยังต้องตรวจเพิ่มเติม</figcaption></figure>');
    if(route==='learn/food')view.querySelector('.route-card small').textContent='12 คำถาม · เลือกอ่านเรื่องที่สงสัย';
    if(parts[0]==='learn'&&parts[1]==='welcome'&&parts.length===3&&welcomeTopics.some(t=>t.id===parts[2])){
      const topicIndex=welcomeTopics.findIndex(t=>t.id===parts[2]);
      const next=welcomeTopics[topicIndex+1];
      view.querySelector('.related').innerHTML=`<nav class="lesson-navigation" aria-label="อ่านต่อ"><a class="route-link" href="#/learn/cockatiel?section=welcome">← รวมเรื่องค็อกคาเทล</a>${next?`<a class="route-link" href="#/learn/welcome/${next.id}">เรื่องถัดไป: ${esc(next.title)} →</a>`:`<a class="route-link" href="#/learn/food/guide">อ่านต่อ: รู้จักอาหารในชาม →</a>`}</nav>`;
      if(parts[2]==='setup')view.querySelector('article').insertAdjacentHTML('beforeend','<p><a class="route-link" href="#/learn/cockatiel/home/cleaning">จัดกรงแล้ว ดูแลความสะอาดอย่างไร? →</a></p>');
      if(parts[2]==='first-meal')view.querySelector('article').insertAdjacentHTML('beforeend','<p><a class="route-link" href="#/learn/cockatiel/food/guide">อ่านเสริม: รู้จักอาหารในชามและการเริ่มลองอาหารใหม่ →</a></p>');
      if(parts[2]==='location')view.querySelector('article').insertAdjacentHTML('beforeend','<p><a class="route-link" href="#/learn/cockatiel/home/sleep">เมื่อถึงกลางคืน จัดมุมพักอย่างไร? →</a></p>');
    }
    if(route==='learn/welcome/cage'||route==='learn/welcome/location'){
      const isCage=parts[2]==='cage';
      const article=view.querySelector('article');
      article.classList.add('cage-lesson');
      if(isCage)view.querySelector('.route-heading h1').textContent='เลือกกรงแบบไหนดี?';
      const cover=article.querySelector('.welcome-art');
      cover.classList.add('cage-cover');
      cover.querySelector('img').loading='eager';
      const summary=isCage
        ? {title:'ดูพื้นที่ ซี่กรง และวัสดุไปด้วยกัน',text:'เลือกกรงที่เหลือพื้นที่ให้น้องขยับได้หลังใส่อุปกรณ์ แล้วตรวจช่องซี่ วัสดุ และตัวล็อกก่อนตัดสินใจ',links:[[0,'พื้นที่และขนาด'],[3,'ซี่กรงและการวัด'],[5,'วัสดุและผิวเคลือบ'],[6,'4 ข้อก่อนซื้อ']]}
        : {title:'มุมที่อยู่ใกล้กัน และพักได้อย่างสงบ',text:'เริ่มจากบริเวณสว่างที่ปลอดจากควันและไอระเหย แล้วดูแสงแดด ลม และกิจกรรมในบ้านทั้งกลางวันและก่อนนอน',links:[[0,'เลือกมุมในบ้าน'],[1,'อากาศรอบกรง'],[2,'แสงแดดและลม'],[3,'มุมพักกลางคืน']]};
      cover.insertAdjacentHTML('afterend',`<section class="cage-summary" aria-labelledby="cage-summary-title"><p class="label">เริ่มจากตรงนี้</p><h2 id="cage-summary-title">${esc(summary.title)}</h2><p>${esc(summary.text)}</p><nav class="cage-jumps" aria-label="เลือกอ่านในบทนี้">${summary.links.map(([index,label])=>`<button type="button" data-cage-jump="${index}">${esc(label)}</button>`).join('')}</nav></section>`);
      const sections=[...article.querySelectorAll('.route-section')];
      sections.forEach((section,i)=>{
        section.id='cage-topic-'+i;
        section.tabIndex=-1;
        const number=document.createElement('span');
        number.className='cage-section-number';
        number.setAttribute('aria-hidden','true');
        number.textContent=String(i+1).padStart(2,'0');
        section.querySelector('h2').prepend(number);
      });
      article.querySelectorAll('[data-cage-jump]').forEach(button=>button.addEventListener('click',()=>{
        const target=sections[Number(button.dataset.cageJump)];
        target.focus({preventScroll:true});
        target.scrollIntoView({block:'start',behavior:'instant'});
      }));
      const source=[...article.querySelectorAll(':scope > p.label')].find(p=>p.querySelector('a'));
      if(source){
        const footer=document.createElement('aside');
        footer.className='cage-source-note';
        footer.innerHTML='<h2>แหล่งข้อมูลของบทนี้</h2>';
        source.before(footer);footer.append(source);
      }
    }
    // Shared, silent character interactions; animation is decorative only.
    if(route==='characters'||(parts[0]==='characters'&&Object.hasOwn(mascotRoles,parts[1]))){
      const portraits=route==='characters'?[...view.querySelectorAll('[data-mascot]')].map(el=>[el.dataset.mascot,el.querySelector('img')]):[[parts[1],view.querySelector('#profile-image')]];
      portraits.forEach(([id,img])=>{
        const stage=document.createElement('div');stage.className='mascot-gimmick';
        img.before(stage);stage.append(img);
        const isUdon=id==='millet';
        const action=document.createElement('button');action.className='mascot-gimmick-action';
        action.textContent=isUdon?'ชวนอุด้งร้องเพลง':'ทักแร้บเตอร์';
        action.title=isUdon?'แสดงตัวโน้ตของอุด้ง (ไม่มีเสียง)':'แร้บเตอร์ทักทายเป็นข้อความ';
        const reply=document.createElement('p');reply.className='mascot-gimmick-reply';reply.setAttribute('role','status');reply.setAttribute('aria-atomic','true');
        const notes=document.createElement('div');notes.className='mascot-notes';notes.setAttribute('aria-hidden','true');notes.innerHTML='<span>♪</span><span>♫</span><span>♪</span>';
        notes.hidden=!isUdon;
        stage.append(notes,reply,action);
        let busy=false;
        action.addEventListener('click',()=>{
          if(busy)return;
          busy=true;stage.classList.remove('is-performing');void stage.offsetWidth;
          reply.textContent=isUdon?'อุด้งร้องเพลงให้แล้วนะ ♪':'แร้บเตอร์ค้าบ';
          stage.classList.add('is-performing');
          setTimeout(()=>{stage.classList.remove('is-performing');busy=false;},1800);
        });
      });
    }
    const lessonGroups=curriculum;
    const groupIndex=lessonGroups.findIndex(g=>g.lessons.some(t=>route==='learn/'+t.href));
    if(groupIndex!==-1){
      const group=lessonGroups[groupIndex];
      const lessonIndex=group.lessons.findIndex(t=>route==='learn/'+t.href);
      const previous=group.lessons[lessonIndex-1];
      const next=group.lessons[lessonIndex+1];
      const nextGroup=lessonGroups[groupIndex+1];
      const relatedSection=view.querySelector('.related');
      relatedSection.innerHTML=`<p class="label">${esc(group.name)} · บทที่ ${lessonIndex+1} จาก ${group.lessons.length}</p><nav class="lesson-navigation" aria-label="ลำดับบท${esc(group.name)}">${previous?`<a class="route-link" rel="prev" href="#/learn/cockatiel/${previous.href}">← บทก่อนหน้า: ${esc(previous.title)}</a>`:''}<a class="route-link" href="#/learn/cockatiel?section=${group.id}">ดูทั้ง ${group.lessons.length} บท</a>${next?`<a class="route-link" rel="next" href="#/learn/cockatiel/${next.href}">บทถัดไป: ${esc(next.title)} →</a>`:nextGroup?`<a class="route-link" href="#/learn/cockatiel?section=${nextGroup.id}">หมวดถัดไป: ${esc(nextGroup.name)} →</a>`:'<a class="route-link" href="#/learn/cockatiel">กลับภาพรวม Bird School →</a>'}</nav>`;
      view.querySelectorAll('.breadcrumbs a').forEach(a=>{
        if(['#/learn','#/learn/cockatiel'].includes(a.getAttribute('href'))){
          a.href='#/learn/cockatiel?section='+group.id;
          a.textContent=group.name;
        }
      });
    }
    if(route==='learn'||route.startsWith('learn/')){
      const scope=document.createElement('aside');
      scope.className='species-context';
      scope.setAttribute('aria-label','สายพันธุ์ของบทเรียน');
      scope.innerHTML=`<strong>${esc(learningSpecies.label)}</strong><span>${esc(learningSpecies.scope)}</span>`;
      view.prepend(scope);
    }
    view.querySelectorAll('a[href^="#/learn"]').forEach(a=>{
      const target=a.getAttribute('href');
      if(['#/learn','#/learn/cockatiel','#/learn/welcome','#/learn/cockatiel/welcome'].includes(target)){
        if(target.endsWith('/welcome')){a.remove();return;}
        if(a.closest('.breadcrumb, .breadcrumbs'))a.textContent='รวมเรื่องค็อกคาเทล';
      }
      if(/^#\/learn(?:$|\/(?:welcome|food|behavior|health|home|play)(?:\/|$))/.test(target))a.setAttribute('href',target.replace('#/learn','#/learn/cockatiel'));
    });
    document.title=`${view.querySelector('h1')?.textContent||'Birbest'}${route==='learn'||route.startsWith('learn/')?' | ค็อกคาเทล':''} | Birbest`;
    view.focus({preventScroll:true});window.scrollTo(0,0);
    if(route==='learn/food/guide'){
      const group=new URLSearchParams(raw.split('?')[1]||'').get('group');
      if(['0','1','2'].includes(group)){
        const target=view.querySelector(`#food-group-${group}`);
        target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});
      }
    }
    if(route==='learn'){
      const jumpToSection=()=>{
        const section=new URLSearchParams(location.hash.split('?')[1]||'').get('section');
        const targets={welcome:'#stage-welcome',daily:'#stage-daily',understand:'#stage-understand'};
        const target=targets[section]&&view.querySelector(targets[section]);
        if(target){target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});}
      };
      view.querySelectorAll('.learning-shortcuts a').forEach(a=>a.addEventListener('click',event=>{
        if(a.hash===location.hash){event.preventDefault();jumpToSection();}
      }));
      jumpToSection();
    }
  }
  window.addEventListener('hashchange',render);
  render();
})();
