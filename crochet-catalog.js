(() => {
  'use strict';
  const products = window.BirbestCrochetProducts || [];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const find = slug => products.find(p => p.slug === slug);
  const hats = window.BirbestHatProducts || [];
  const stickers = window.BirbestStickerProducts || [];
  const keychains = window.BirbestKeychainProducts || [];
  const shirts = window.BirbestShirtProducts || [];
  const birdToys = window.BirbestBirdToyProducts || [];
  const pouches = window.BirbestPouchProducts || [];
  const groups = [...new Set([...products, ...hats, ...stickers, ...keychains, ...shirts, ...birdToys, ...pouches].map(p => p.group))];
  const thaiNames = {'Cockatiel':'ค็อกคาเทล','Conure':'คอนัวร์ ซันคอนัวร์ กรีนชีค','African Grey':'แอฟริกันเกรย์','Alexandrine':'อเล็กซานดรีน','Budgie':'หงส์หยก','Caique':'ไคท์','Cockatoo':'กระตั้ว','Eclectus':'อิเล็คตัส','Forpus':'ฟอพัส','Lovebird':'เลิฟเบิร์ด','Macaw':'มาคอว์','Monk':'ม็องค์','Rainbow Lorikeet':'เรนโบว์ ลอริคีท','Ringneck':'ริงเน็ค','Other Birds':'นกชนิดอื่น'};
  const daily = {slug:'daily-pack',title:'Mixed Seed',group:'Daily Pack',price:19,shots:[{file:'daily-mixed-sachet.jpg',width:941,height:941}]};
  const items = [daily, ...birdToys, ...hats, ...shirts, ...pouches, ...stickers, ...keychains, ...products];
  function card(p) {
    const photo = p.shots[p.coverIndex ?? 0];
    const isFood = p.slug === 'daily-pack';
    if (p.kind === 'pouch') {
      return `<a class="shop-product" href="#/shop/${escape(p.slug)}"><div class="shop-product-art"><img src="assets/${escape(photo.file)}" alt="กระเป๋าโครเชต์ ${escape(p.keywords)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"></div><div class="shop-product-label"><div><p>BIRBEST CROCHET POUCH</p><h2>${escape(p.title)}</h2><span>กระเป๋าโครเชต์ลายนก</span></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>`;
    }
    if (p.kind === 'bird-toy') {
      return `<a class="shop-product" href="#/shop/${escape(p.slug)}"><div class="shop-product-art"><img src="assets/${escape(photo.file)}" alt="${escape(p.title+' '+p.subtitle)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"></div><div class="shop-product-label"><div><p>BIRBEST BIRD ACCESSORIES</p><h2>${escape(p.title)}</h2><span>${escape(p.subtitle)}</span></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>`;
    }
    if (p.kind === 'shirt') {
      return `<a class="shop-product" href="#/shop/${escape(p.slug)}"><div class="shop-product-art"><img src="assets/${escape(photo.file)}" alt="เสื้อครอปสีดำลายซันคอนัวร์" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"></div><div class="shop-product-label"><div><p>BIRBEST SHIRTS</p><h2>${escape(p.title)}</h2><span>เสื้อครอปสีดำ · ลายซันคอนัวร์</span></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>`;
    }
    if (p.kind === 'keychain') {
      return `<a class="shop-product" href="#/shop/${escape(p.slug)}"><div class="shop-product-art"><img src="assets/${escape(photo.file)}" alt="พวงกุญแจซันคอนัวร์ ${escape(p.code)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"></div><div class="shop-product-label"><div><p>BIRBEST KEYCHAINS</p><h2>${escape(p.title)}</h2><span>พวงกุญแจภาพซันคอนัวร์ · ${escape(p.code)}</span></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>`;
    }
    if (p.kind === 'sticker') {
      return `<a class="shop-product" href="#/shop/${escape(p.slug)}"><div class="shop-product-art"><img src="assets/${escape(photo.file)}" alt="สติกเกอร์ ${escape(p.keywords)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"></div><div class="shop-product-label"><div><p>BIRBEST STICKERS</p><h2>${escape(p.title)}</h2><span>Chirp Mochi Crayon · แพ็กคู่</span></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>`;
    }
    if (p.kind === 'hat') {
      return `<a class="shop-product" href="#/shop/${escape(p.slug)}"><div class="shop-product-art"><img src="assets/${escape(photo.file)}" alt="หมวก ${escape(p.title)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"></div><div class="shop-product-label"><div><p>BIRBEST HATS</p><h2>${escape(p.title)}</h2><span>Chirpy Fluffy Hat</span></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>`;
    }
    return `<a class="shop-product" href="#/shop/${escape(p.slug)}"><div class="shop-product-art"><img src="assets/${escape(photo.file)}" alt="${escape(isFood ? 'Birbest Daily Pack สูตร Mixed Seed' : 'โครเชต์ '+p.title)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"></div><div class="shop-product-label"><div><p>${isFood ? 'DAILY PACK' : 'BIRBEST CROCHET'}</p><h2>${escape(p.title)}</h2><span>${isFood ? 'สำหรับค็อกคาเทล · 1 / 7 / 30 ซอง' : 'พวงกุญแจโครเชต์'}</span></div><span class="shop-product-arrow" aria-hidden="true">→</span></div></a>`;
  }
  function filterItems(query, group) {
    const term = query.trim().toLocaleLowerCase();
    return items.filter(p => (!group || p.group === group) && `${p.title} ${p.group} ${p.keywords || ''} ${thaiNames[p.group] || ''} ${p.kind === 'pouch' ? 'กระเป๋า โครเชต์ ถัก Pouch' : p.kind === 'bird-toy' ? 'ของเล่น อุปกรณ์นก' : p.kind === 'shirt' ? 'เสื้อครอป สีดำ ซันคอนัวร์ S M L ตารางไซซ์' : p.kind === 'keychain' ? 'พวงกุญแจภาพนก ซันคอนัวร์ '+p.code : p.kind === 'sticker' ? 'สติกเกอร์ สติ๊กเกอร์ Chirp Mochi Crayon แพ็กคู่' : p.kind === 'hat' ? 'หมวก Chirpy Fluffy Hat '+(p.slug === 'cockatiel-hat' ? 'ค็อกคาเทล' : 'ซันคอนัวร์') : p.slug === 'daily-pack' ? 'อาหาร เมล็ดผสม ค็อกคาเทล' : 'โครเชต์ พวงกุญแจ งานฝีมือ'}`.toLocaleLowerCase().includes(term));
  }
  function mountCatalog() {
    const host = document.querySelector('#route-view .shop-catalog');
    if (!host || host.dataset.expanded) return;
    host.dataset.expanded = 'true';
    host.innerHTML = `<div class="shop-tools"><label>ค้นหาสินค้า<input type="search" data-shop-query placeholder="ชื่อสินค้า / สายพันธุ์" autocomplete="off"></label><label>หมวดสินค้า<select data-shop-group><option value="">สินค้าทั้งหมด</option>Daily Pack</option>${groups.map(g=>`<option value="${escape(g)}">${escape(g === 'Other Birds' ? 'นกชนิดอื่น ๆ' : g)}</option>`).join('')}</select></label></div><p class="shop-count" role="status" aria-live="polite"></p><div class="crochet-grid"></div><div class="shop-empty" hidden><p>ยังไม่พบสินค้าที่ตรงกัน</p><button type="button" class="pill" data-shop-reset>ดูสินค้าทั้งหมด</button></div>`;
    const query = host.querySelector('[data-shop-query]');
    const group = host.querySelector('[data-shop-group]');
    const grid = host.querySelector('.crochet-grid');
    const count = host.querySelector('.shop-count');
    const empty = host.querySelector('.shop-empty');
    function update() {
      const matches = filterItems(query.value, group.value);
      grid.innerHTML = matches.map(card).join('');
      count.textContent = `${matches.length} รายการ`;
      empty.hidden = matches.length > 0;
    }
    query.addEventListener('input', update);
    group.addEventListener('change', update);
    host.querySelector('[data-shop-reset]').addEventListener('click', () => {
      query.value = ''; group.value = ''; update(); query.focus();
    });
    update();
  }
  window.BirbestCrochet = {find, products, mountCatalog, filterItems, card};
})();
