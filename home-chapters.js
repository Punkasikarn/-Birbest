(() => {
  'use strict';
  const home = document.querySelector('#home-view');
  if (!home || home.dataset.chapters) return;
  home.dataset.chapters = '20261019';
  const image = (file, alt, extra = '') => `<img src="assets/${file}" alt="${alt}" width="1536" height="1024" loading="lazy" decoding="async" ${extra}>`;
  const heading = (label, title, text) => `<div class="section-heading"><p class="eyebrow">${label}</p><h2>${title}</h2><p>${text}</p></div>`;
  const today = home.querySelector('#today');
  today.classList.add('chapter-explore');
  today.innerHTML = heading('EXPLORE OUR LITTLE WORLD','มีอะไรอยู่ใน Birbest?','เรียนรู้ · หัวเราะ · ใช้ชีวิตกับนกได้ง่ายขึ้น') + `<div class="world-paths">
    <a class="world-path" href="#/learn/cockatiel">${image('home-explore-school-20261019.webp','อุด้งกับเพื่อนนกในห้องเรียนกลางสวน มีหนังสือและกระดาน')}<p class="path-label">LEARN</p><h3>Bird School</h3><p>อยู่ด้วยกันให้เข้าใจกว่าเดิม<br>จากวันแรก ไปจนถึงทุกวันของเรา</p><span class="pill">เข้า Bird School <span aria-hidden="true">→</span></span></a>
    <a class="world-path" href="#/stories">${image('home-explore-stories-20261019.webp','อุด้งกับสมุดเรื่องเล่า กล้อง และกระดานภาพถ่ายในสวนดอกไม้')}<p class="path-label">SMILE</p><h3>Little Stories</h3><p>เรื่องเล็กของเพื่อนตัวเล็ก<br>ความวุ่นวายที่ทำให้วันธรรมดายิ้มได้</p><span class="pill">ดูเรื่องเล่าทั้งหมด <span aria-hidden="true">→</span></span></a>
    <a class="world-path" href="#/shop">${image('home-explore-shop-20261019.webp','ร้านในโลกนิทาน Birbest มีอุด้งและแร้บเตอร์อยู่หน้าร้านท่ามกลางดอกไม้')}<p class="path-label">EVERYDAY</p><h3>Birbest Shop</h3><p>สิ่งเล็ก ๆ สำหรับคนรักนก<br>แวะดูของจากร้าน Birbest</p><span class="pill">ดูสินค้าทั้งหมด <span aria-hidden="true">→</span></span></a>
  </div>`;
  home.querySelector('#friends').before(today);

  const friends = home.querySelector('#friends');
  friends.classList.add('chapter-friends');

  const school = document.createElement('section');
  school.id = 'home-school';
  school.className = 'section chapter-school';
  school.innerHTML = heading('BIRBEST BIRD SCHOOL','ชีวิตกับนก เริ่มจากการเข้าใจกัน','ตั้งแต่วันแรกที่กลับบ้าน ไปจนถึงเรื่องเล็ก ๆ ที่เจอกันทุกวัน') + `<div class="school-journal"><div class="school-reading">
    <a class="school-feature" href="#/learn/cockatiel?section=welcome">${image('welcome-first-meal.png','ค็อกคาเทลเริ่มกินอาหารในบ้านใหม่')}<div><p class="path-label">สำหรับคนเพิ่งรับน้องมา</p><h3>รับน้องมาใหม่ เริ่มตรงไหนดี?</h3><p>กรง อาหาร มุมพัก และการทำความรู้จัก</p><span class="text-link">เริ่มอ่าน <span aria-hidden="true">→</span></span></div></a>
    <div class="school-topics">
      <a href="#/learn/cockatiel/food/guide">${image('learn-food-types.webp','อาหารชนิดต่าง ๆ ในชาม')}<h3>อาหารและการกิน</h3></a>
      <a href="#/learn/cockatiel/home/safety">${image('learn-cockatiel-home-safety-v2.webp','พื้นที่ใช้ชีวิตของค็อกคาเทล')}<h3>บ้านและความปลอดภัย</h3></a>
      <a href="#/learn/sun-conure/behavior/sounds">${image('sun-conure-lesson-15-20261018.webp','เสียงและพฤติกรรมของซันคอนัว')}<h3>พฤติกรรมและการสื่อสาร</h3></a>
      <a href="#/learn/cockatiel/health/guide">${image('learn-cockatiel-health-v2.webp','ผู้ดูแลติดต่อสัตวแพทย์')}<h3>สุขภาพและการดูแล</h3></a>
    </div><nav class="school-species" aria-label="เลือกอ่าน Bird School"><a href="#/learn/cockatiel">ค็อกคาเทล →</a><a href="#/learn/sun-conure">ซันคอนัว →</a><a href="#/tools/checklist">เช็กลิสต์ประจำวัน →</a></nav>
  </div></div>`;
  friends.after(school);
  // Move the live quiz, retaining its listeners, progress and accessible result.
  const wonder = home.querySelector('#wonder');
  school.querySelector('.school-journal').append(wonder);
  wonder.querySelector('.wonder-intro h2').innerHTML = 'แร้บเตอร์ถามหน่อย!';
  wonder.querySelector('.wonder-intro .eyebrow').textContent = 'A LITTLE QUESTION';

  const stories = home.querySelector('#little-story');
  stories.innerHTML = heading('LITTLE STORIES','เรื่องเล็ก ๆ จากโลก Birbest','เรื่องแต่งจากนิสัยของเพื่อนตัวเล็ก ที่ทำให้วันธรรมดามีรอยยิ้ม') + `<div class="story-journal">
    <a class="story-feature" href="#/stories/millet-day">${image('story-udon-millet-v1.webp','อุด้งสนใจช่อมิลเลตจากมือผู้ดูแล')}<div><p class="path-label">เรื่องของอุด้ง</p><h3>อุด้งกับเสียงถุงกรอบแกรบ</h3><p>วันธรรมดาของนักสำรวจ ที่สะดุดลงเพราะเสียงคุ้นเคย</p><span class="text-link">อ่านเรื่องนี้ <span aria-hidden="true">→</span></span></div></a>
    <a class="story-secondary" href="#/stories/sunny-song">${image('story-raptor-dancing-v1.webp','แร้บเตอร์เต้นตามเสียงเพลง')}<div><p class="path-label">เรื่องของแร้บเตอร์</p><h3>แร้บเตอร์ค้าบ!</h3><p>คนดูหนึ่งคน กับความตั้งใจเต็มห้อง</p><span class="text-link">ไปดูนักเต้นตัวเล็ก <span aria-hidden="true">→</span></span></div></a>
  </div><div class="chapter-actions"><a class="pill" href="#/stories">ดูเรื่องเล่าทั้งหมด →</a><a class="route-link" href="#/stories/postcards">เก็บโปสการ์ดสักใบ →</a></div>`;
  school.after(stories);

  const products = [...home.querySelectorAll('.home-flow')].find(section => !section.id);
  products.id = 'home-shop';
  products.classList.add('chapter-shop');
  products.innerHTML = `<div class="shop-editorial"><div><p class="eyebrow">MADE WITH BIRDS IN MIND</p><h2>ของเล็ก ๆ ที่เริ่มจาก<br>ชีวิตจริงกับนก</h2><p>เราเริ่มจากการสังเกตวันธรรมดาของนกและคนที่อยู่ด้วยกัน แล้วค่อย ๆ คิดว่าอะไรจะช่วยให้ทุกวันง่ายขึ้น</p><a class="pill" href="#/shop">แวะร้าน Birbest →</a><div class="shop-note"><h3>Birbest Daily Pack</h3><p>Mixed Seed เมล็ดผสมแบ่งซอง สำหรับค็อกคาเทลโตเต็มวัย</p><a class="route-link" href="#/shop/daily-pack">ดู Daily Pack สูตร Mixed Seed →</a><p class="footnote">สอบถามราคาและขนาดแพ็กผ่านช่องทางร้าน</p></div></div><figure>${image('about-care.webp','ภาพประกอบการเตรียมอาหารในวันธรรมดากับค็อกคาเทล')}<figcaption>เริ่มจากความใส่ใจในทุกวัน · ภาพประกอบ ไม่ใช่ภาพสินค้า</figcaption></figure></div>`;
  stories.after(products);
  const closing = home.querySelector('.closing');
  closing.classList.add('chapter-closing');
  closing.querySelector('.pill').insertAdjacentHTML('beforebegin','<a class="pill flock-link" href="https://linktr.ee/udon_taohu" target="_blank" rel="noopener noreferrer">ตามไปดูชีวิตจริงของ Udon &amp; Taohu ↗</a>');
})();
