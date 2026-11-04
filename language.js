(() => {
  'use strict';
  // Exact editorial translations preserve the existing DOM and its live controls.
  const copy = {
    'เรียนรู้':'Bird School', 'เรื่องเล่า':'Stories', 'ร้านค้า':'Shop', 'รู้จัก Birbest':'About Birbest',
    'ค้นหา':'Search', 'หน้าแรก':'Home', 'ข้ามไปเนื้อหา':'Skip to content', 'เข้าไปทักเพื่อน':'Meet our friends',
    'เมนูหลัก':'Main navigation', 'เปิดเมนู':'Open menu', 'ปิดเมนู':'Close menu', 'Birbest หน้าแรก':'Birbest home',
    'ค้นหาในเว็บไซต์':'Search this website', 'เพื่อนของเรา':'Our friends', 'ติดต่อและติดตาม':'Contact & follow',
    'ข้อมูลและความเป็นส่วนตัว':'Privacy', 'โลกของคนรักนก':'A world for bird lovers',
    'โลกเล็ก ๆ ของคนรักนก':'A little world for bird lovers', 'เข้าเมือง':'Explore Birbest',
    'มีอะไรอยู่ใน Birbest?':'Explore Birbest', 'เรียนรู้ · หัวเราะ · ใช้ชีวิตกับนกได้ง่ายขึ้น':'Learn, smile, and enjoy life with birds.',
    'เข้า Bird School':'Explore Bird School', 'ดูเรื่องเล่าทั้งหมด':'All stories', 'ดูสินค้าทั้งหมด':'All products',
    'ดูสินค้าทั้งหมด →':'All products →', 'สิ่งเล็ก ๆ สำหรับคนรักนก':'Little things for bird lovers',
    'แวะดูของจากร้าน Birbest':'Discover the Birbest shop', 'ตัวเล็ก แต่คาแรคเตอร์ใหญ่':'Little birds. Big personalities.',
    'มารู้จักอุด้ง →':'Meet Udon →', 'มารู้จักแร้บเตอร์ →':'Meet Raptor →',
    'ชีวิตกับนก เริ่มจากการเข้าใจกัน':'Life with birds starts with understanding',
    'ตั้งแต่วันแรกที่กลับบ้าน ไปจนถึงเรื่องเล็ก ๆ ที่เจอกันทุกวัน':'From the first day home to everyday discoveries.',
    'ของเล็ก ๆ สำหรับวันดี ๆ':'Little things for brighter days',
    'จากมื้ออาหารของน้อง ถึงเพื่อนตัวเล็กที่พกไปด้วยกัน':'From everyday meals to little companions for your adventures.',
    'ร้านค้า Birbest':'Birbest Shop', 'ของจากโลก Birbest สำหรับคนรักนก':'Made with birds and bird lovers in mind.',
    'ค้นหาสินค้า':'Search products', 'ชื่อสินค้า / สายพันธุ์':'Product name / bird species', 'หมวดสินค้า':'Category',
    'สินค้าทั้งหมด':'All products', 'นกชนิดอื่น ๆ':'Other birds', 'ยังไม่พบสินค้าที่ตรงกัน':'No matching products.',
    'สำหรับค็อกคาเทล · 1 / 7 / 30 ซอง':'For cockatiels · 1 / 7 / 30 sachets',
    'พวงกุญแจโครเชต์':'Crochet keychain', 'พวงกุญแจโครเชต์ Birbest':'Birbest crochet keychain',
    'กระเป๋าโครเชต์ลายนก':'Bird crochet pouch', 'พวงกุญแจภาพนก':'Bird photo keychain',
    'สติกเกอร์แพ็กคู่':'Sticker pair', 'หมวกนก':'Bird hat',
    'เมล็ดผสมแบ่งซองสำหรับค็อกคาเทล':'Portioned mixed seeds for cockatiels',
    'พวงกุญแจค็อกคาเทล':'Cockatiel keychain', 'พวงกุญแจซันคอนัวร์':'Sun Conure keychain',
    'ดูราคาและสั่งซื้อบน Shopee ↗':'Shop on Shopee ↗', 'ดูราคาและสั่งซื้อบน Etsy ↗':'Shop on Etsy ↗',
    'ดูราคาที่ร้าน Shopee ↗':'Visit our Shopee shop ↗', 'สอบถามสินค้า':'Ask about this product',
    'ราคา ค่าจัดส่ง และโปรโมชันเป็นไปตามแต่ละช่องทาง':'Prices, shipping and offers vary by marketplace.',
    '← กลับหน้าร้าน':'← Back to shop', 'ขนาดแพ็ก':'Pack size', 'ตัวเลือกสินค้า':'Product options',
    'ภาพสินค้า':'Product images', 'ภาพสินค้า Birbest':'Birbest product images', 'ปิดภาพ':'Close image',
    'ภาพก่อนหน้า':'Previous image', 'ภาพถัดไป':'Next image', 'ปิด':'Close',
    'Mixed Seed สำหรับค็อกคาเทลโตเต็มวัย':'Mixed Seed for adult cockatiels',
    'เมล็ดผสมแบ่งซองสำหรับค็อกคาเทลโตเต็มวัย ซองละ 12 กรัม หยิบใช้สะดวก ลดขั้นตอนการตวง และช่วยเตรียมอาหารให้คนที่มาดูแลน้องแทนได้ง่ายขึ้น':'Mixed seeds in individual 12 g sachets for adult cockatiels. Easy to portion and convenient when someone else is helping with daily care.',
    '12 กรัมคือน้ำหนักบรรจุ ไม่ใช่ปริมาณอาหารครบวันสำหรับนกทุกตัว สูตรเมล็ดผสมนี้ไม่ใช่อาหารครบถ้วน และไม่รับประกันการแก้ปัญหาเลือกกิน':'12 g is the pack weight, not a full-day feeding recommendation for every bird. This seed mix is not a complete diet and does not guarantee a solution to selective eating.',
    'เปิดซอง · เทลงชาม · สังเกตการกิน':'Open · Pour · Observe eating',
    'เก็บในที่แห้งและเย็น พ้นแดดและความชื้น ตรวจวันผลิตและวันหมดอายุบนบรรจุภัณฑ์':'Store in a cool, dry place away from sunlight and moisture. Check the production and expiry dates on the pack.',
    'พวงกุญแจจากคอลเลกชัน Birbest Little Goods':'A keychain from the Birbest Little Goods collection.',
    'การดูแลนกสนุกกว่าที่คิด':'Discover the joy of caring for birds',
    'ความใส่ใจ เริ่มจากเรื่องเล็ก ๆ ทุกวัน':'Care begins with the little things',
    'ความรู้ก็สนุกได้':'Learning can be joyful', 'ช่วยให้ความใส่ใจทำได้ง่ายขึ้นในทุกวัน':'Making everyday care a little easier',
    'โลกที่เชื่อมโยงคนรักนก':'Connecting a world of bird lovers',
    'แหล่งข้อมูลอ่านต่อ':'Sources & further reading', 'แหล่งข้อมูลและแนวทางการเรียบเรียง':'Sources & editorial approach',
    'ดูแหล่งข้อมูล Bird School ทั้งหมด':'Browse Bird School sources',
    'เลือกสายพันธุ์ของน้อง':'Choose your bird species', 'ค็อกคาเทล':'Cockatiel', 'ซันคอนัว':'Sun Conure',
    'อ่านบทเรียน':'Read lessons', 'บทเรียนฉบับร่าง':'Draft lessons', 'กำลังเตรียมเนื้อหา':'Coming later'
  };
  let language = 'th';
  Object.assign(copy, window.BirbestEnglishCopy || {});
  Object.assign(copy, window.BirbestStoriesEnglish || {});
  try { if (localStorage.getItem('birbest-language') === 'en') language = 'en'; } catch {}
  const originals = new WeakMap();
  const attrs = new WeakMap();
  function translate(text) {
    if (Object.hasOwn(copy, text)) return copy[text];
    if (/^ฉาก \d+ \/ \d+$/.test(text)) return text.replace('ฉาก','Scene');
    if (/^\d+ รายการ$/.test(text)) return text.replace('รายการ','products');
    if (/^\d+ ซอง(?: · \d+ กรัม)?$/.test(text)) return text.replace('ซอง','sachets').replace('กรัม','g');
    if (/^\d+ กรัม$/.test(text)) return text.replace('กรัม','g');
    return text;
  }
  const switcher = document.createElement('div');
  switcher.className = 'language-switch';
  switcher.setAttribute('role','group'); switcher.setAttribute('aria-label','Language / ภาษา');
  switcher.innerHTML = '<button type="button" lang="th" data-language="th">TH</button><button type="button" lang="en" data-language="en">EN</button>';
  document.querySelector('.site-header .menu-toggle').before(switcher);
  const notice = document.createElement('p'); notice.className = 'language-notice'; notice.lang = 'en';
  notice.textContent = 'English preview: some interactive content and Bird School lessons are still in Thai. Product artwork is shown in its original language.';
  document.querySelector('.site-header').after(notice);
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (!scheduled) { scheduled = true; queueMicrotask(() => { scheduled = false; apply(); }); }
  });
  function apply() {
    observer.disconnect();
    document.documentElement.lang = language;
    notice.hidden = language !== 'en';
    switcher.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.language === language)));
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement.closest('script, style, .language-switch, .language-notice, [data-no-translate]')) continue;
      let record = originals.get(node);
      if (!record || node.nodeValue !== record.last) record = {source:node.nodeValue};
      const source = record.source;
      const result = language === 'en' ? source.replace(source.trim(),translate(source.trim())) : source;
      if (node.nodeValue !== result) node.nodeValue = result;
      record.last = result; originals.set(node,record);
    }
    document.querySelectorAll('[placeholder], [aria-label], [title], img[alt]').forEach(el => {
      const records = attrs.get(el) || {};
      for (const name of ['placeholder','aria-label','title','alt']) {
        if (!el.hasAttribute(name)) continue;
        const current = el.getAttribute(name);
        let record = records[name];
        if (!record || current !== record.last) record = {source:current};
        const result = language === 'en' ? translate(record.source) : record.source;
        if (current !== result) el.setAttribute(name,result);
        record.last = result; records[name] = record;
      }
      attrs.set(el, records);
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title','alt']});
  }
  switcher.addEventListener('click', event => {
    const button = event.target.closest('[data-language]'); if (!button) return;
    language = button.dataset.language;
    try { localStorage.setItem('birbest-language',language); } catch {}
    apply();
  });
  window.BirbestLanguage = {translate, apply, get language() { return language; }};
  apply();
})();
