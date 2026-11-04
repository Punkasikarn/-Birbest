(() => {
  // Keep existing route IDs compatible while adopting the founder's real mascots.
  Object.assign(friends.millet, {name:'อุด้ง',image:'mascot-udon.webp',story:'ค็อกคาเทลนักสำรวจ ช่างคิด ฉลาด และมีมุมระแวงนิด ๆ เหมือนกำลังคิดอะไรอยู่ตลอดเวลา แต่ถ้าเห็นมิลเลตเมื่อไร ตาจะเป็นประกายแล้ววิ่งมาหาทันที',intro:'นักสำรวจช่างคิด เห็นมิลเลตทีไรตาวาวทุกที',details:[['ของโปรดที่ทำให้ตาวาว','มิลเลตคือของโปรดมาก ๆ ของอุด้ง เห็นเมื่อไรก็พร้อมวิ่งมาหา'],['เรื่องเล็ก ๆ ที่เป็นอุด้ง','กินเสร็จแล้วต้องเช็ดปาก เป็นนักสำรวจที่รักความสะอาดด้วย'],['ช่วงเวลาที่ชอบ','ชอบให้เกาหัว ชอบร้องเพลง และจุ๊บ ๆ']],action:'ทักอุด้ง'});
  Object.assign(friends.sunny, {name:'แร้บเตอร์',image:'mascot-raptor.webp',story:'ซันคอนัวเสียงดังตัวจริง ชอบเต้นและฟังเพลง มีเมล็ดทานตะวันกับเมล็ดกัญชงเป็นของโปรด และมีวีรกรรมเอาของกินไปกวนกับน้ำจนน้ำเละ',intro:'เสียงดัง ชอบเต้น ฟังเพลง และมีวีรกรรมกับชามน้ำ',details:[['ของโปรด','เมล็ดทานตะวันกับเมล็ดกัญชง (Hemp Seed) คือของโปรดของแร้บเตอร์'],['วีรกรรมประจำตัว','ชอบเอาของกินไปกวนกับน้ำ จนชามน้ำเละไปด้วย'],['ช่วงเวลาที่ชอบ','ชอบฟังเพลงและเต้น พร้อมเสียงร้องดังมากแบบแร้บเตอร์']],action:'ทักแร้บเตอร์'});
  const hero=document.querySelector('.hero');
  hero.classList.add('layered-village');
  hero.querySelector('.spot-roll')?.remove();
  const stage=document.createElement('div');
  stage.className='village-stage';
  hero.prepend(stage);
  const activities={
    millet:{label:'เรียนรู้ค็อกคาเทล',href:'#/learn/cockatiel'},
    sunny:{label:'เล่นตอบคำถาม',href:'#wonder'}
  };
  document.querySelector('.quiz-meta span').textContent='คำถามชวนเล่นกับแร้บเตอร์';
  [['millet','udon','อุด้ง'],['sunny','raptor','แร้บเตอร์']].forEach(([id,file,name])=>{
    const button=hero.querySelector(`[data-mascot="${id}"]`);
    button.classList.add('mascot-spot');
    const activity=activities[id];
    button.href=activity.href;
    button.setAttribute('aria-label',name+' · '+activity.label);
    button.innerHTML=`<img src="assets/mascot-${file}.webp" alt="" draggable="false"><span>${name}<small>${activity.label}</small></span>`;
    stage.append(button);
    const card=document.querySelector(`.friend [data-friend="${id}"]`)?.closest('.friend');
    if(card){
      card.querySelector('h3').textContent=name;
      card.querySelector('.friend-copy p').textContent=friends[id].intro;
      card.querySelector('img').src=`assets/mascot-${file}.webp`;
      card.querySelector('img').alt=name;
      card.querySelector('.portrait-note').textContent=name;
      card.querySelectorAll('[data-friend]').forEach(b=>b.setAttribute('aria-label','รู้จัก'+name));
      card.querySelector('.text-link').textContent='มารู้จัก'+name+' →';
    }
  });
  // Independent sprite windows; scene coordinates anchor feet to actual surfaces.
  // Crop, local foot position, scene foot position (percent), rendered width.
  const residents=[
    {id:'window',crop:[400,100,270,280],foot:[48,93],at:[24.1,42.2],size:3.5,shadow:false},
    {id:'path',crop:[30,380,300,280],foot:[57,90],at:[19.5,71.6],size:4.8,shadow:true},
    {id:'fence',crop:[1080,90,330,280],foot:[40,92],at:[29.1,53.8],size:3.2,shadow:true},
    {id:'counter',crop:[1090,380,330,340],foot:[44,93],at:[83.9,64.9],size:4.8,shadow:true},
    {id:'stone',crop:[1050,725,390,305],foot:[45,90],at:[96.1,80.6],size:5.2,shadow:true}
  ];
  residents.forEach(({id,crop:[x,y,w,h],foot:[fx,fy],at:[left,top],size,shadow},i)=>{
    const bird=document.createElement('span');
    bird.className='village-resident';bird.setAttribute('aria-hidden','true');
    bird.dataset.perch=id;
    Object.assign(bird.style,{left:left+'%',top:top+'%',width:size+'%',aspectRatio:`${w}/${h}`,transform:`translate(-${fx}%,-${fy}%)`});
    bird.style.setProperty('--foot-x',fx+'%');
    bird.style.setProperty('--foot-y',fy+'%');
    bird.style.setProperty('--resident-delay',`${-i*1.3}s`);
    if(shadow)bird.classList.add('has-ground-shadow');
    const art=document.createElement('span');art.className='resident-art';
    const img=document.createElement('img');img.src='assets/village-residents.webp';img.alt='';
    Object.assign(img.style,{width:1448/w*100+'%',left:-x/w*100+'%',top:-y/h*100+'%'});
    art.append(img);bird.append(art);stage.append(bird);
  });
  ['left','right'].forEach(side=>{
    const foliage=document.createElement('div');foliage.className='village-foliage '+side;foliage.setAttribute('aria-hidden','true');stage.append(foliage);
    const cloud=document.createElement('img');cloud.className='opening-cloud '+side;cloud.src='assets/hero-cloud.webp';cloud.alt='';cloud.setAttribute('aria-hidden','true');hero.append(cloud);
  });
  // Reveal on first visit without delaying navigation or blocking input.
  const reveal=()=>hero.classList.add('village-reveal');
  const sceneImage=new Image();sceneImage.src='assets/home-village-layer.webp';
  sceneImage.decode().catch(()=>{}).then(()=>requestAnimationFrame(reveal));
  document.querySelector('.friend [data-friend="roll"]')?.closest('.friend').remove();
  document.querySelector('#friends .section-heading>p:last-child').textContent='อุด้งกับแร้บเตอร์ สองเพื่อนตัวจริงของ Birbest';
  document.querySelector('#friends .footnote').textContent='มาสคอตได้แรงบันดาลใจจากนกตัวจริง ภาพและท่าทางเป็นการเล่าเรื่องในโลก Birbest';
})();
