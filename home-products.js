(() => {
  'use strict';
  if (window.birbestProductGallery) return;
  window.birbestProductGallery = true;
  const shots = [
    ['crochet-cockatiel-pink-leaves.jpg', 'ค็อกคาเทลบนใบไม้สีชมพู', 'Pink leaves', 2048, 2048],
    ['crochet-cockatiel-pink-bloom.jpg', 'ค็อกคาเทลบนดอกไม้สีชมพู', 'Little sunshine', 2048, 2048],
    ['crochet-cockatiel-hanging.jpg', 'พวงกุญแจค็อกคาเทลแขวนกับกิ่งไม้', 'A little friend, everywhere', 1640, 2360],
    ['crochet-cockatiel-details.jpg', 'รายละเอียดงานถักด้านข้าง ด้านล่าง ด้านหลัง และชาร์ม', 'The little details', 900, 1200],
    ['crochet-cockatiel-collection.jpg', 'ภาพรวมค็อกคาเทลโครเชต์และอุปกรณ์ประกอบ', 'Cockatiel collection', 1640, 2360]
  ];
  const sunShots = [
    ['crochet-sun-conure-orange-flowers.jpg', 'ซันคอนัวร์โครเชต์บนดอกไม้สีส้ม', 'Orange blossoms', 2048, 2048],
    ['crochet-sun-conure-autumn-leaves.jpg', 'ซันคอนัวร์โครเชต์บนใบไม้หลากสี', 'A little sunshine', 2048, 2048],
    ['crochet-sun-conure-hanging.jpg', 'พวงกุญแจซันคอนัวร์แขวนกับกิ่งไม้', 'A little friend, everywhere', 1640, 2360],
    ['crochet-sun-conure-details.jpg', 'รายละเอียดซันคอนัวร์โครเชต์และชาร์ม', 'The little details', 900, 1200],
    ['crochet-sun-conure-collection.jpg', 'ภาพรวมซันคอนัวร์โครเชต์และอุปกรณ์ประกอบ', 'Sun Conure collection', 1640, 2360]
  ];
  const dailyShots = [
    ['daily-mixed-intro.png', 'Birbest Daily Pack สูตร Mixed Seed', 'Mixed Seed', 1254, 1254],
    ['daily-mixed-sachet.jpg', 'ซอง Mixed Seed ขนาด 12 กรัม', '12 g per sachet', 941, 941],
    ['daily-mixed-sizes.jpg', 'ภาพชุดบรรจุ 7 และ 30 ซอง', '7 & 30 packs', 1254, 1254],
    ['daily-mixed-30.png', 'ชุด Mixed Seed 30 ซอง', '30 packs', 1254, 1254],
    ['daily-mixed-routine.png', 'ภาพแนวคิดการแบ่งอาหารเป็นซอง', 'Everyday routine', 1254, 1254],
    ['daily-mixed-howto.png', 'ภาพขั้นตอนเปิดซอง เท และสังเกตการกิน', 'Open, pour, observe', 1254, 1254]
  ];
  const dailyPacks = [
    {count:1, weight:12, price:19},
    {count:7, weight:84, price:119},
    {count:30, weight:360, price:469}
  ];
  function detailMarkup(collection, title, description, options, notes, hasEtsy = false) {
    const slug = (window.location?.hash || '').replace(/^#\/?shop\//, '').split(/[?&]/)[0];
    const channels = window.BirbestMarketplaceLinks?.[slug] || {};
    const purchaseLinks = `${channels.shopee ? `<a class="pill" href="${channels.shopee}" target="_blank" rel="noopener noreferrer">ดูราคาและสั่งซื้อบน Shopee ↗</a>` : '<a class="pill" href="https://shopee.co.th/birbest.official" target="_blank" rel="noopener noreferrer">ดูราคาที่ร้าน Shopee ↗</a>'}${channels.etsy ? `<a class="pill product-etsy" href="${channels.etsy}" target="_blank" rel="noopener noreferrer">ดูราคาและสั่งซื้อบน Etsy ↗</a>` : ''}`;
    notes = notes.replace('มีจำหน่ายบน Shopee และ Etsy', 'ตรวจสอบตัวเลือกสินค้าผ่านช่องทางสั่งซื้อด้านบน');
    const [file,alt,,w,h] = collection[0];
    return `<div class="product-detail-layout"><div class="product-detail-media">
      <button type="button" class="product-main-photo" data-main-photo aria-label="ขยายภาพ: ${alt}"><img data-main-image src="assets/${file}" alt="${alt}" width="${w}" height="${h}" decoding="async"></button>
      <div class="product-thumbnails" aria-label="ภาพสินค้า">${collection.map(([src,text,,width,height],i)=>`<button type="button" data-thumbnail="${i}" aria-label="ภาพ ${i+1}: ${text}" aria-pressed="${i===0}"><img src="assets/${src}" alt="" width="${width}" height="${height}" loading="lazy" decoding="async"></button>`).join('')}</div>
      <p class="product-image-count" data-image-count aria-live="polite">1 / ${collection.length}</p></div>
      <div class="product-detail-info"><h2>${title}</h2><p>${description}</p>${options}
      <div class="product-detail-actions">${purchaseLinks}<a class="route-link" href="#/contact">สอบถามสินค้า</a></div>
      <p class="footnote">ราคา ค่าจัดส่ง และโปรโมชันเป็นไปตามแต่ละช่องทาง</p><div class="product-detail-notes">${notes}</div></div></div><a class="product-return" href="#/shop">← กลับหน้าร้าน</a>`;
  }
  function bindDetail(section, collection) {
    let selected = 0;
    const main = section.querySelector('[data-main-photo]');
    const picture = section.querySelector('[data-main-image]');
    const thumbs = section.querySelectorAll('[data-thumbnail]');
    thumbs.forEach(button => button.addEventListener('click', () => {
      selected = Number(button.dataset.thumbnail);
      const [file,alt,,width,height] = collection[selected];
      picture.src = 'assets/' + file;
      picture.alt = alt;
      picture.width = width;
      picture.height = height;
      main.setAttribute('aria-label', 'ขยายภาพ: ' + alt);
      thumbs.forEach(thumb => thumb.setAttribute('aria-pressed', String(thumb === button)));
      section.querySelector('[data-image-count]').textContent = `${selected+1} / ${collection.length}`;
    }));
    main.addEventListener('click', () => {
      opener = main;
      activeShots = collection;
      show(selected);
      dialog.showModal();
    });
  }
  function mountDaily(section) {
    if (!section || section.dataset.gallery) return;
    section.dataset.gallery = 'mixed-seed';
    const options = `<fieldset class="daily-pack-picker"><legend>ขนาดแพ็ก</legend><div class="daily-pack-options">${dailyPacks.map((pack,i)=>`<label><input type="radio" name="daily-pack-size" value="${i}" ${i===0 ? 'checked' : ''}><span><strong>${pack.count} ซอง</strong><small>${pack.weight} กรัม</small></span></label>`).join('')}</div></fieldset><p class="daily-pack-total" aria-live="polite" aria-atomic="true"><span data-pack-summary>1 ซอง · 12 กรัม</span></p>`;
    section.innerHTML = detailMarkup(dailyShots, 'Mixed Seed',
      'เมล็ดผสมแบ่งซองสำหรับค็อกคาเทลโตเต็มวัย ซองละ 12 กรัม หยิบใช้สะดวก ลดขั้นตอนการตวง และช่วยเตรียมอาหารให้คนที่มาดูแลน้องแทนได้ง่ายขึ้น',
      options, '<p class="daily-care">12 กรัมคือน้ำหนักบรรจุ ไม่ใช่ปริมาณอาหารครบวันสำหรับนกทุกตัว สูตรเมล็ดผสมนี้ไม่ใช่อาหารครบถ้วน และไม่รับประกันการแก้ปัญหาเลือกกิน</p><p>เปิดซอง · เทลงชาม · สังเกตการกิน</p><p>เก็บในที่แห้งและเย็น พ้นแดดและความชื้น ตรวจวันผลิตและวันหมดอายุบนบรรจุภัณฑ์</p>');
    section.querySelectorAll('input[name="daily-pack-size"]').forEach(input => {
      input.addEventListener('change', () => {
        if (!input.checked) return;
        const pack = dailyPacks[Number(input.value)];
        if (!pack) return;
        section.querySelector('[data-pack-summary]').textContent = `${pack.count} ซอง · ${pack.weight} กรัม`;
      });
    });
    bindDetail(section, dailyShots);
  }
  function mount(section, shop = false, sun = false) {
    if (!section || section.dataset.gallery) return;
    if (!shop) {
      section.dataset.gallery = 'catalog';
      const products = [
        ['daily-pack', 'daily-mixed-sachet.jpg', 'DAILY PACK', 'Mixed Seed', 'เมล็ดผสมแบ่งซองสำหรับค็อกคาเทล', 'เริ่มต้น 19 บาท', 941],
        ['cockatiel-crochet', 'crochet-cockatiel-pink-leaves.jpg', 'LITTLE GOODS', 'Cockatiel Crochet', 'พวงกุญแจค็อกคาเทล', '299 บาท', 2048],
        ['sun-conure-crochet', 'crochet-sun-conure-orange-flowers.jpg', 'LITTLE GOODS', 'Sun Conure Crochet', 'พวงกุญแจซันคอนัวร์', '299 บาท', 2048]
      ];
      section.innerHTML = `<div class="product-heading"><div><p class="eyebrow">MADE WITH BIRDS IN MIND</p><h2>ของเล็ก ๆ สำหรับวันดี ๆ</h2><p>จากมื้ออาหารของน้อง ถึงเพื่อนตัวเล็กที่พกไปด้วยกัน</p></div><a class="pill" href="#/shop">ดูสินค้าทั้งหมด →</a></div><div class="home-product-selection">${products.map(([route,file,category,title,description,price,size])=>`<a class="shop-product" href="#/shop/${route}"><div class="shop-product-art"><img src="assets/${file}" alt="${description}" width="${size}" height="${size}" loading="lazy" decoding="async"></div><div class="shop-product-label"><div><p>${category}</p><h3>${title}</h3><span>${description}</span></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>`).join('')}</div>`;
      return;
    }
    const collection = sun ? sunShots : shots;
    section.dataset.gallery = 'crochet';
    section.innerHTML = detailMarkup(collection, `${sun ? 'Sun Conure' : 'Cockatiel'} Crochet`,
      `พวงกุญแจ${sun ? 'ซันคอนัวร์สีส้มสดใส' : 'ค็อกคาเทลแก้มส้ม หงอนสีเหลือง'}โครเชต์ เพื่อนตัวเล็กที่พกไปด้วยกัน`,
      '', '<p>พวงกุญแจจากคอลเลกชัน Birbest Little Goods</p><p>มีจำหน่ายบน Shopee และ Etsy ตรวจสอบราคา ค่าจัดส่ง และประเทศปลายทางที่ร้านแต่ละช่องทาง</p>', true);
    bindDetail(section, collection);
  }
  const dialog = document.createElement('dialog');
  dialog.className = 'product-lightbox';
  dialog.setAttribute('aria-label', 'ภาพสินค้า Birbest');
  dialog.innerHTML = `<div class="product-lightbox-bar"><span class="product-counter" aria-live="polite"></span><button type="button" data-close aria-label="ปิดภาพ" title="ปิดภาพ">×</button></div><img class="product-full" alt=""><div class="product-lightbox-bottom"><button type="button" data-prev aria-label="ภาพก่อนหน้า" title="ภาพก่อนหน้า">←</button><p class="product-caption"></p><button type="button" data-next aria-label="ภาพถัดไป" title="ภาพถัดไป">→</button></div>`;
  document.body.append(dialog);
  let current = 0, opener;
  let activeShots = shots;
  const full = dialog.querySelector('.product-full');
  function show(index) {
    current = (index + activeShots.length) % activeShots.length;
    full.src = 'assets/' + activeShots[current][0];
    full.alt = activeShots[current][1];
    dialog.querySelector('.product-caption').textContent = activeShots[current][1];
    dialog.querySelector('.product-counter').textContent = `${current+1} / ${activeShots.length}`;
  }
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-prev]').addEventListener('click', () => show(current-1));
  dialog.querySelector('[data-next]').addEventListener('click', () => show(current+1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    if (opener?.isConnected) opener.focus({ preventScroll:true });
    opener = null;
  });
  function mountShop() {
    window.BirbestCrochet?.mountCatalog();
    const pouchSection = document.querySelector('#shop-pouch-gallery');
    const pouch = pouchSection && (window.BirbestPouchProducts || []).find(p=>p.slug===pouchSection.dataset.product);
    if (pouch && !pouchSection.dataset.gallery) {
      pouchSection.dataset.gallery = 'pouch';
      const collection = pouch.shots.map((shot, i)=>[shot.file, i === pouch.shots.length-2 ? 'ขนาดกระเป๋า 10 × 10 ซม.' : i === pouch.shots.length-1 ? 'ภาพรวมคอลเลกชันกระเป๋าโครเชต์' : `${pouch.title} · ภาพ ${i+1}`, pouch.title, shot.width, shot.height]);
      pouchSection.innerHTML = detailMarkup(collection, pouch.title,
        `กระเป๋าโครเชต์ลาย${pouch.keywords} สำหรับเก็บของชิ้นเล็ก พร้อมห่วงคล้อง เพิ่มสีสันให้กระเป๋าใบโปรด`,
        `<p>ขนาดตามภาพสินค้า: 10 × 10 ซม.</p>`,
        '<p>รายการนี้เป็นกระเป๋าโครเชต์ลายที่เลือก ภาพรวมคอลเลกชันและกระเป๋าใบใหญ่ใช้ประกอบการดูสินค้า ไม่ใช่ชุดรวมทุกลาย</p><p>ตรวจสอบรายละเอียดสินค้า ค่าจัดส่ง และสินค้าคงเหลือที่ร้านแต่ละช่องทางก่อนสั่งซื้อ</p>', true);
      bindDetail(pouchSection, collection);
    }
    const birdToySection = document.querySelector('#shop-bird-toy-gallery');
    const birdToy = birdToySection && (window.BirbestBirdToyProducts || []).find(p=>p.slug===birdToySection.dataset.product);
    if (birdToy && !birdToySection.dataset.gallery) {
      birdToySection.dataset.gallery = 'bird-toy';
      const collection = birdToy.shots.map((shot, i)=>[shot.file, `${birdToy.title} · ภาพ ${i+1}`, birdToy.title, shot.width, shot.height]);
      birdToySection.innerHTML = detailMarkup(collection, birdToy.title, birdToy.description,
        `<h3>ตัวเลือกสินค้า</h3><p>${birdToy.variants}</p>`,
        `<p>${birdToy.notes}</p><p>ใช้งานภายใต้การดูแล ตรวจสภาพอุปกรณ์และจุดแขวนเป็นประจำ หยุดใช้เมื่อพบชิ้นส่วนชำรุดหรือหลุดลุ่ย</p><p>เลือกตัวเลือกที่ต้องการและตรวจสอบราคา ค่าจัดส่ง และสินค้าคงเหลือที่ร้าน Shopee</p>`);
      bindDetail(birdToySection, collection);
    }
    const shirtSection = document.querySelector('#shop-shirt-gallery');
    const shirt = shirtSection && (window.BirbestShirtProducts || []).find(p=>p.slug===shirtSection.dataset.product);
    if (shirt && !shirtSection.dataset.gallery) {
      shirtSection.dataset.gallery = 'shirt';
      const collection = shirt.shots.map(shot=>[shot.file, shot.caption, shirt.title, shot.width, shot.height]);
      shirtSection.innerHTML = detailMarkup(collection, shirt.title,
        'เสื้อครอปสีดำลายซันคอนัวร์หลากท่าทาง เติมสีสันสดใสในสไตล์ Birbest ให้ชุดวันสบาย ๆ',
        `<h3>ตารางไซซ์</h3><p>หน่วย: นิ้ว ตามตารางที่แบรนด์ระบุ</p><div class="shirt-size-table"><table><thead><tr><th scope="col">ไซซ์</th><th scope="col">อก</th><th scope="col">ยาว</th><th scope="col">ไหล่</th><th scope="col">ปลายแขน</th></tr></thead><tbody><tr><th scope="row">S</th><td>31</td><td>16</td><td>12 1/4</td><td>8.5</td></tr><tr><th scope="row">M</th><td>35</td><td>18 1/4</td><td>13 3/4</td><td>9.5</td></tr><tr><th scope="row">L</th><td>39</td><td>19 3/4</td><td>14 3/4</td><td>10.5</td></tr></tbody></table></div>`,
        '<p>ตรวจสอบไซซ์ที่พร้อมจำหน่ายและค่าจัดส่งที่ร้านก่อนสั่งซื้อ ภาพตอนสวมใช้ประกอบการดูทรงเสื้อ</p>', true);
      bindDetail(shirtSection, collection);
    }
    const keychainSection = document.querySelector('#shop-keychain-gallery');
    const keychain = keychainSection && (window.BirbestKeychainProducts || []).find(p=>p.slug===keychainSection.dataset.product);
    if (keychain && !keychainSection.dataset.gallery) {
      keychainSection.dataset.gallery = 'keychain';
      const collection = keychain.shots.map((shot, i)=>[shot.file, i === 0 ? `พวงกุญแจซันคอนัวร์ ${keychain.code}` : 'ภาพรวมลาย AS01–AS08', keychain.title, shot.width, shot.height]);
      keychainSection.innerHTML = detailMarkup(collection, keychain.title,
        `พวงกุญแจภาพซันคอนัวร์ลาย ${keychain.code} พร้อมชาร์มโลโก้ Birbest และเมล็ดทานตะวัน พกสีสันของเพื่อนตัวเล็กไปกับกุญแจหรือกระเป๋าใบโปรด`,
        ``,
        `<p>สินค้ารายการนี้คือลาย ${keychain.code} ภาพรวมคอลเลกชันใช้สำหรับเทียบลาย ไม่ใช่ชุดรวม 8 ชิ้น</p><p>ตรวจสอบตัวเลือกสินค้า ขนาด และค่าจัดส่งที่ร้านแต่ละช่องทางก่อนสั่งซื้อ</p>`, true);
      bindDetail(keychainSection, collection);
    }
    const stickerSection = document.querySelector('#shop-sticker-gallery');
    const sticker = stickerSection && (window.BirbestStickerProducts || []).find(p=>p.slug===stickerSection.dataset.product);
    if (sticker && !stickerSection.dataset.gallery) {
      stickerSection.dataset.gallery = 'sticker';
      const collection = sticker.shots.map((shot, i)=>[shot.file, `${sticker.title} · ${i === 0 ? 'ภาพสินค้า' : 'รายละเอียดคอลเลกชัน'}`, sticker.title, shot.width, shot.height]);
      stickerSection.innerHTML = detailMarkup(collection, sticker.title,
        `สติกเกอร์ลาย${sticker.keywords} จากคอลเลกชัน Chirp Mochi Crayon มาเป็นแพ็กคู่ตัวใหญ่และตัวเล็ก เติมสีสันให้สมุดและของใช้ชิ้นโปรด`,
        ``,
        '<p>หลีกเลี่ยงการแช่น้ำและการติดบนภาชนะที่ต้องล้างน้ำบ่อย เพราะอาจทำให้สติกเกอร์เสียหายหรือมีอายุใช้งานสั้นลง</p><p>ตรวจสอบตัวเลือกสินค้า ราคา และค่าจัดส่งที่ร้านแต่ละช่องทางก่อนสั่งซื้อ</p>', true);
      bindDetail(stickerSection, collection);
    }
    const hatSection = document.querySelector('#shop-hat-gallery');
    const hat = hatSection && (window.BirbestHatProducts || []).find(p=>p.slug===hatSection.dataset.product);
    if (hat && !hatSection.dataset.gallery) {
      hatSection.dataset.gallery = 'hat';
      const collection = hat.shots.map((shot, i)=>[shot.file, `หมวก ${hat.title} · ภาพ ${i+1}`, hat.title, shot.width, shot.height]);
      hatSection.innerHTML = detailMarkup(collection, hat.title,
        hat.slug === 'cockatiel-hat' ? 'Chirpy Fluffy Hat หมวกค็อกคาเทลโทนเหลืองอ่อน พร้อมหงอนและแก้มส้ม เติมความสนุกให้วันแต่งตัว' : 'Chirpy Fluffy Hat หมวกซันคอนัวร์สีส้ม พร้อมรายละเอียดสีเหลือง เขียว และน้ำเงิน เติมสีสันให้วันแต่งตัว',
        ``,
        '<p>สอบถามขนาดและวิธีดูแลก่อนสั่งซื้อ ตรวจสอบตัวเลือกสินค้า ค่าจัดส่ง และประเทศปลายทางที่ร้านแต่ละช่องทาง</p>', true);
      bindDetail(hatSection, collection);
    }
    const section = document.querySelector('#shop-crochet-gallery');
    const product = section && window.BirbestCrochet?.find(section.dataset.product);
    if (product && !section.dataset.gallery) {
      section.dataset.gallery = 'crochet';
      const collection = product.shots.map((shot, i) => [shot.file, `โครเชต์ ${product.title} · ภาพ ${i+1}`, product.title, shot.width, shot.height]);
      section.innerHTML = detailMarkup(collection, product.title,
        `พวงกุญแจโครเชต์ ${product.title} จากคอลเลกชัน Birbest Little Goods`,
        ``,
        '<p>มีจำหน่ายบน Shopee และ Etsy ตรวจสอบราคา ค่าจัดส่ง และประเทศปลายทางที่ร้านแต่ละช่องทาง</p>', true);
      bindDetail(section, collection);
    }
    mountDaily(document.querySelector('#shop-daily-gallery'));
    mount(document.querySelector('#shop-product-gallery'), true);
    mount(document.querySelector('#shop-sun-gallery'), true, true);
  }
  mount(document.querySelector('#home-shop'));
  mountShop();
  window.addEventListener('hashchange', () => {
    // Route rendering has replaced the old product controls; do not restore their focus.
    opener = null;
    if (dialog.open) dialog.close();
    mountShop();
  });
})();
