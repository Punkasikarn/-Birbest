(() => {
  'use strict';
  const copy = {
    'Bird School เรียบเรียงเพื่อการเรียนรู้จากแหล่งข้อมูลสัตวแพทย์และองค์กรด้านสวัสดิภาพนก เลือกอ่านแหล่งที่มาของคำแนะนำแต่ละเรื่องได้ในบทเรียนนั้น':'Bird School draws on veterinary and bird-welfare resources for educational reading. Each lesson links to the sources behind its guidance.',
    'วันที่ตรวจแหล่งข้อมูลและข้อจำกัดระบุในบทเรียนตามที่มีบันทึกไว้ บทเรียบเรียงยังรอตรวจโดยสัตวแพทย์ การมีแหล่งอ้างอิงไม่ได้หมายถึงการรับรองเนื้อหาโดยองค์กรนั้น':'Source-check dates and limitations are recorded in individual lessons where available. Our editorial content is awaiting veterinary review. Citing an organisation does not imply its endorsement.',
    'แหล่งอ้างอิงเฉพาะเรื่องอยู่ใกล้คำตอบหรือท้ายบท เพื่อให้อ่านตรวจสอบบริบทได้โดยตรง สถานะการตรวจและวันที่อ้างอิงคงตามบันทึกของแต่ละบท':'Topic-specific sources appear beside answers or at the end of each lesson, so you can check their context. Review status and source dates follow each lesson’s existing records.',
    'มีจำหน่ายบน Shopee และ Etsy ตรวจสอบราคา ค่าจัดส่ง และประเทศปลายทางที่ร้านแต่ละช่องทาง':'Check available purchase channels, prices, shipping and eligible destinations using the shop links.',
    'OUR STORY · จุดเริ่มต้นของ Birbest':'OUR STORY',
    'OUR MISSION · สิ่งที่เราตั้งใจทำ':'OUR MISSION',
    'OUR VISION · โลกที่เราอยากสร้าง':'OUR VISION',
    'Birbest เริ่มต้นจากประสบการณ์การเลี้ยงค็อกคาเทลของผู้ก่อตั้ง และความตั้งใจให้นกที่รักมีสุขภาพดี มีความสุข และอยู่ร่วมกันไปให้นานที่สุด การเตรียมอาหาร เปลี่ยนน้ำ และศึกษาข้อมูลจึงไม่ใช่เพียงกิจวัตร แต่เป็นความใส่ใจในทุกวัน':'Birbest began with our founder’s experience caring for cockatiels and a wish to share a long, happy, healthy life with them. Preparing meals, changing water and learning about their needs became everyday expressions of care.',
    'ประสบการณ์เหล่านี้ทำให้เห็นรายละเอียดที่เจ้าของนกต้องจัดการ ทั้งเวลาในการเตรียมอาหาร อาหารถุงใหญ่ที่ใช้ไม่ทัน และการส่งต่อวิธีดูแลให้ผู้อื่นเข้าใจตรงกัน':'That experience brought everyday challenges into focus: finding time to prepare food, getting through large bags before they go to waste, and helping someone else understand a bird’s routine.',
    'การชั่งและแบ่งอาหารล่วงหน้าเป็นจุดเริ่มต้นของการจัดการกิจวัตรให้สะดวกขึ้น และนำมาสู่แนวคิดของ Birbest: นำความเข้าใจจากการดูแลนกจริง มาพัฒนาสิ่งที่เป็นประโยชน์ต่อคนรักนก โดยยังรักษาความใส่ใจในทุกรายละเอียด':'Weighing and portioning food ahead of time made the routine easier. It also sparked the idea behind Birbest: turning real-life experience with birds into useful things for bird lovers, with care in every detail.',
    'การสังเกตสิ่งเล็ก ๆ ในแต่ละวันเป็นจุดเริ่มต้นของความเข้าใจ Birbest จึงตั้งใจถ่ายทอดเรื่องการดูแลนกผ่านภาษาที่เข้าถึงง่าย ภาพ เรื่องเล่า และกิจกรรมที่ชวนให้เรียนรู้':'Understanding begins with noticing the little things. At Birbest, we share bird-care knowledge through approachable language, illustrations, stories and activities that invite curiosity.',
    'ไม่ว่าจะเริ่มจากเรื่องเล่าของตัวละคร หรือค้นหาคำตอบเรื่องการดูแล ทุกคนสามารถเลือกเรียนรู้ในเรื่องที่สนใจและนำกลับไปใช้ในชีวิตประจำวัน':'Whether you begin with a character’s story or a question about care, you can explore what interests you and bring those discoveries into everyday life.',
    'แวะอ่านเรื่องเล่าของเพื่อน ๆ →':'Meet our friends through their stories →',
    'เราตั้งใจเปลี่ยนความเข้าใจจากชีวิตจริงของคนเลี้ยงนก ให้เป็นความรู้ ผลิตภัณฑ์ และเครื่องมือที่ใช้ได้ในทุกวัน เพื่อให้การดูแลนกง่ายขึ้น สนุกขึ้น และน่าไว้ใจ โดยใส่ใจความแตกต่างของนกแต่ละตัว':'Our aim is to turn the lived experience of bird owners into practical knowledge, products and tools. We want care to feel easier, more enjoyable and trustworthy, while respecting each bird’s individual needs.',
    'การพัฒนาเริ่มจากค็อกคาเทล ซึ่งเป็นสายพันธุ์ที่ผู้ก่อตั้งมีประสบการณ์ดูแลโดยตรง โดยให้ความสำคัญกับการศึกษาและทดสอบก่อนขยายไปยังสายพันธุ์อื่น ไม่ใช้แนวทางเดียวกันกับนกทุกตัว':'We begin with cockatiels, the species our founder knows through hands-on care. Research and testing come before expanding to other species, because one approach cannot suit every bird.',
    'อุด้งกับแร้บเตอร์ในโลกเรื่องเล่าของ Birbest':'Udon and Raptor in the story world of Birbest',
    'วิสัยทัศน์ของ Birbest คือการสร้าง “อาณาจักรนก” ที่เชื่อมโยงความรู้ ผลิตภัณฑ์ ประสบการณ์ และชุมชน เพื่อสนับสนุนคุณภาพชีวิตที่ดีของนกและเจ้าของ':'Our vision is a world for birds and the people who love them: bringing together knowledge, products, experiences and community to support a better life together.',
    'เราตั้งใจให้โลกแห่งนี้เป็นพื้นที่ที่ทุกคนเข้ามาค้นพบความสนุก ทำความรู้จักเพื่อนนก และได้รับความรู้กลับไป เป็นประสบการณ์ที่มีคุณค่ามากกว่าการเลือกซื้อสินค้า และเป็นสิ่งที่ Birbest กำลังพัฒนาทีละส่วน':'We want this to be a place to discover something joyful, meet our bird friends and leave with new understanding. It is more than a place to shop, and we are building it one thoughtful step at a time.',
    'ให้วันธรรมดามีเสียงสดใส':'A little chirp for an ordinary day',
    'ชื่อ Birbest มาจาก Birb คำเรียกนกแบบเอ็นดู กับ Best ความตั้งใจที่จะทำสิ่งที่ดีขึ้นเพื่อนกและคนที่รักนก ไม่ใช่ความสมบูรณ์แบบที่ไกลตัว แต่เป็นความใส่ใจที่เข้าถึงได้ในชีวิตจริง':'Birbest brings together “birb”, an affectionate word for a bird, and “best”, our wish to keep making things better for birds and their people. It is about thoughtful care that fits real life, rather than distant perfection.',
    'Chirp Up Your Life! เล่นกับเสียงร้องของนกและคำว่า cheer up เพราะเราเชื่อว่าการมีนกอยู่ด้วยทำให้วันธรรมดามีสีสันขึ้นได้ เช่นเดียวกับสีรุ้งในโลโก้ที่สะท้อนความหลากหลายของเพื่อนนกในโลก Birbest':'“Chirp Up Your Life!” plays on a bird’s chirp and the phrase “cheer up”. Birds bring colour to ordinary days, just as our rainbow logo celebrates the many different birds in the Birbest world.',
    'ความสนุกที่มาพร้อมความรับผิดชอบ':'Joy, with responsibility',
    'Birbest ให้ความสำคัญกับการสื่อสารที่เข้าใจง่ายและตรงไปตรงมา โดยแยกเรื่องเล่าสมมติของตัวละครออกจากข้อมูลการดูแลนก พร้อมระบุแหล่งข้อมูล เงื่อนไข และข้อจำกัดของสิ่งที่ยังต้องศึกษาเพิ่มเติม':'We value clear, honest communication. Our fictional character stories are distinct from bird-care information, and we identify sources, conditions and the limits of what is still being explored.',
    'เนื้อหาความรู้ชุดแรกกำลังพัฒนาและทบทวน ข้อมูลบนเว็บไซต์ใช้ประกอบการเรียนรู้ ไม่ใช้วินิจฉัยหรือรักษานก หากกังวลเรื่องสุขภาพของน้อง ควรติดต่อสัตวแพทย์ที่ดูแลนก':'Our first learning collection is still being developed and reviewed. Website content is educational, not a diagnosis or treatment. For concerns about your bird’s health, contact a veterinarian who treats birds.',
    'สำรวจเรื่องน่ารู้ใน Bird School →':'Explore Bird School →',
    'จากความเข้าใจ สู่การพัฒนา':'From understanding to making',
    'ตอนนี้คุณทำความรู้จักอุด้งกับแร้บเตอร์ อ่านเรื่องเล่าสั้น ๆ ลองเช็กลิสต์ประจำวัน และเก็บโปสการ์ดจากหมู่บ้าน Birbest ได้ เราจะค่อย ๆ เติมเนื้อหาและพัฒนาเครื่องมือจากสิ่งที่คนรักนกต้องใช้ในชีวิตจริง':'Meet Udon and Raptor, enjoy short stories, try the daily checklist and collect postcards from the Birbest village. We will keep adding content and tools shaped by what bird lovers need in real life.',
    'Birbest Daily Pack เริ่มจากโจทย์การตวงอาหารในวันรีบและการฝากคนอื่นดูแลน้อง สูตร Mixed Seed แบ่งบรรจุซองละ 12 กรัมสำหรับค็อกคาเทลโตเต็มวัย ช่วยให้เตรียมอาหารได้สะดวกขึ้น โดยไม่ใช่อาหารครบถ้วนหรือปริมาณอาหารครบวันสำหรับนกทุกตัว':'Birbest Daily Pack grew from busy mornings and asking someone else to help with bird care. Mixed Seed comes in individual 12 g sachets for adult cockatiels, making preparation easier. It is not a complete diet, and 12 g is not a full-day feeding recommendation for every bird.',
    'ดู Daily Pack สูตร Mixed Seed →':'Discover Daily Pack Mixed Seed →',
    'ภาพประกอบความใส่ใจในมื้ออาหาร ไม่ใช่ภาพผลิตภัณฑ์ Daily Pack':'An illustration of mealtime care, not a photograph of Daily Pack.',
    'อุด้งกับแร้บเตอร์ เพื่อนตัวจริงของ Birbest':'Udon and Raptor, the friends behind Birbest',
    'สองมาสคอตมีต้นแบบจากนกที่ผู้ก่อตั้งเลี้ยง ความชอบและนิสัยเล็ก ๆ ของทั้งคู่เป็นแรงบันดาลใจให้เรื่องเล่าในหมู่บ้าน':'Our two mascots are inspired by the founder’s own birds. Their little habits and favourite things spark the stories of our village.',
    'Birbest ยินดีต้อนรับทุกคนที่รักนก ทั้งผู้ที่เลี้ยงอยู่แล้ว ผู้ที่กำลังเรียนรู้ และผู้ที่อยากค้นพบความสุขจากโลกของนก':'Everyone who loves birds is welcome here: longtime owners, curious learners and anyone ready to discover the joy of their world.',
    'อุด้ง':'Udon', 'แร้บเตอร์':'Raptor', 'มารู้จักกัน →':'Meet our friends →',
    'นักสำรวจช่างคิด เห็นมิลเลตทีไรตาวาวทุกที':'A thoughtful little explorer whose eyes light up at the sight of millet.',
    'เสียงดัง ชอบเต้น ฟังเพลง และมีวีรกรรมกับชามน้ำ':'Loud, music-loving and always ready to dance, with a mischievous habit around the water bowl.',
    'เรื่องเล่าของอุด้งกับแร้บเตอร์':'Stories of Udon and Raptor', 'พักอ่านเรื่องสั้นจากสองเพื่อนตัวเล็ก':'Take a little break with our two friends.',
    'ติดต่อและติดตาม Birbest':'Contact & follow Birbest', 'แวะทักทาย ติดตามเรื่องราว หรือเลือกชมร้านของเรา':'Say hello, follow our stories or visit our shops.',
    'หมวก':'Hats', 'เสื้อ':'Shirts', 'สติกเกอร์':'Stickers', 'กระเป๋าโครเชต์':'Crochet pouches', 'ของเล่นและอุปกรณ์นก':'Bird toys & accessories',
    'เสื้อครอปสีดำ · ลายซันคอนัวร์':'Black crop T-shirt · Sun Conure', 'Chirp Mochi Crayon · แพ็กคู่':'Chirp Mochi Crayon · Pair',
    'ขนาดตามภาพสินค้า: 10 × 10 ซม.':'Dimensions shown in the product artwork: 10 × 10 cm.',
    'ขนาดกระเป๋า 10 × 10 ซม.':'Pouch dimensions: 10 × 10 cm', 'ภาพรวมคอลเลกชันกระเป๋าโครเชต์':'Crochet pouch collection',
    'รายการนี้เป็นกระเป๋าโครเชต์ลายที่เลือก ภาพรวมคอลเลกชันและกระเป๋าใบใหญ่ใช้ประกอบการดูสินค้า ไม่ใช่ชุดรวมทุกลาย':'This listing is for the selected crochet pouch design. Collection photos and the larger bag are shown for context; this is not a set of every design.',
    'ตรวจสอบรายละเอียดสินค้า ค่าจัดส่ง และสินค้าคงเหลือที่ร้านแต่ละช่องทางก่อนสั่งซื้อ':'Check product details, shipping and availability in your chosen marketplace before ordering.',
    'ตรวจสอบตัวเลือกสินค้า ขนาด และค่าจัดส่งที่ร้านแต่ละช่องทางก่อนสั่งซื้อ':'Check product options, dimensions and shipping in your chosen marketplace before ordering.',
    'ตรวจสอบตัวเลือกสินค้า ราคา และค่าจัดส่งที่ร้านแต่ละช่องทางก่อนสั่งซื้อ':'Check product options, prices and shipping in your chosen marketplace before ordering.',
    'ตรวจสอบตัวเลือกสินค้าผ่านช่องทางสั่งซื้อด้านบน ตรวจสอบราคา ค่าจัดส่ง และประเทศปลายทางที่ร้านแต่ละช่องทาง':'Explore available options using the links above. Check prices, shipping and eligible destinations in your chosen marketplace.',
    'หลีกเลี่ยงการแช่น้ำและการติดบนภาชนะที่ต้องล้างน้ำบ่อย เพราะอาจทำให้สติกเกอร์เสียหายหรือมีอายุใช้งานสั้นลง':'Avoid soaking stickers or applying them to containers that need frequent washing, as this may damage them or shorten their life.',
    'Chirpy Fluffy Hat หมวกค็อกคาเทลโทนเหลืองอ่อน พร้อมหงอนและแก้มส้ม เติมความสนุกให้วันแต่งตัว':'A pale-yellow Cockatiel Chirpy Fluffy Hat with a crest and orange cheeks, for a playful touch to your outfit.',
    'Chirpy Fluffy Hat หมวกซันคอนัวร์สีส้ม พร้อมรายละเอียดสีเหลือง เขียว และน้ำเงิน เติมสีสันให้วันแต่งตัว':'An orange Sun Conure Chirpy Fluffy Hat with yellow, green and blue details, bringing a little colour to your outfit.',
    'สอบถามขนาดและวิธีดูแลก่อนสั่งซื้อ ตรวจสอบตัวเลือกสินค้า ค่าจัดส่ง และประเทศปลายทางที่ร้านแต่ละช่องทาง':'Ask about sizing and care before ordering. Check product options, shipping and eligible destinations in your chosen marketplace.',
    'เสื้อครอปสีดำลายซันคอนัวร์หลากท่าทาง เติมสีสันสดใสในสไตล์ Birbest ให้ชุดวันสบาย ๆ':'A black crop T-shirt featuring Sun Conures in playful poses. A colourful Birbest touch for relaxed days.',
    'ตารางไซซ์':'Size chart', 'หน่วย: นิ้ว ตามตารางที่แบรนด์ระบุ':'Measurements in inches, as listed in the brand’s size chart.',
    'ไซซ์':'Size', 'อก':'Chest', 'ยาว':'Length', 'ไหล่':'Shoulder', 'ปลายแขน':'Sleeve opening',
    'ตรวจสอบไซซ์ที่พร้อมจำหน่ายและค่าจัดส่งที่ร้านก่อนสั่งซื้อ ภาพตอนสวมใช้ประกอบการดูทรงเสื้อ':'Check available sizes and shipping in the shop before ordering. Model photos illustrate the fit.',
    'ภาพรวมลาย AS01–AS08':'Design collection AS01–AS08', 'รายละเอียดคอลเลกชัน':'Collection details',
    'ที่แขวนอาหาร':'Hanging feeder', 'ของเล่นรูปดาว':'Star-shaped toy', 'เต็นท์ผ้าลายนก':'Bird-themed fabric hut',
    'สีชมพู ฟ้า เขียว · ขนาด S / M / Set':'Pink, blue, green · S / M / Set', 'สีฟ้า ชมพู เขียว':'Blue, pink, green',
    'ลายซันคอนัวร์ ค็อกคาเทล กรีนชีค ฟอพัส เลิฟเบิร์ด พายแอปเปิลกรีนชีค':'Sun Conure, Cockatiel, Green-cheeked Conure, Parrotlet, Lovebird, Pineapple Green-cheeked Conure',
    'อุปกรณ์แขวนมิลเล็ตและผักสำหรับจัดมุมอาหารของนก':'A hanging holder for millet and vegetables in your bird’s feeding area.',
    'ช่วงราคาตามตัวเลือก ตรวจสอบราคาแต่ละขนาดและรายละเอียดของ Set ที่ร้านก่อนสั่งซื้อ':'Prices vary by option. Check the price of each size and the contents of the Set in the shop before ordering.',
    'ของเล่นแขวนรูปดาวพร้อมลูกปัดสีพาสเทล สำหรับเพิ่มกิจกรรมในมุมเล่นของนก':'A hanging star-shaped toy with pastel beads for your bird’s play area.',
    'เลือกขนาดและตำแหน่งติดตั้งให้เหมาะกับนก สอบถามรายละเอียดวัสดุก่อนสั่งซื้อ':'Choose an appropriate size and hanging position for your bird. Ask about materials before ordering.',
    'เต็นท์ผ้าแขวนลายนก มีช่องเปิดและคานด้านล่างตามภาพสินค้า':'A hanging bird-themed fabric hut with an opening and a lower bar, as shown in the product photos.',
    'สินค้าเป็นเต็นท์ผ้า โปรดสอบถามขนาดและตรวจความเหมาะสมก่อนใช้ หากนกชอบกัดหรือดึงเส้นใย ควรหลีกเลี่ยงอุปกรณ์ผ้า พวงกุญแจในภาพเป็นของประกอบฉาก ไม่ได้ยืนยันว่ารวมในชุด':'This is a fabric hut. Ask about dimensions and assess suitability before use. Avoid fabric accessories for birds that chew or pull fibres. The keychain in the photo is a prop and is not confirmed as included.',
    'ใช้งานภายใต้การดูแล ตรวจสภาพอุปกรณ์และจุดแขวนเป็นประจำ หยุดใช้เมื่อพบชิ้นส่วนชำรุดหรือหลุดลุ่ย':'Supervise use and regularly inspect the accessory and hanging points. Stop using it if any part is damaged or frayed.',
    'เลือกตัวเลือกที่ต้องการและตรวจสอบราคา ค่าจัดส่ง และสินค้าคงเหลือที่ร้าน Shopee':'Choose your preferred option and check prices, shipping and availability on Shopee.'
  };
  for (const p of window.BirbestCrochetProducts || []) {
    copy[`พวงกุญแจโครเชต์ ${p.title} จากคอลเลกชัน Birbest Little Goods`] = `${p.title} crochet keychain from the Birbest Little Goods collection.`;
  }
  for (const p of window.BirbestPouchProducts || []) {
    copy[`กระเป๋าโครเชต์ลาย${p.keywords} สำหรับเก็บของชิ้นเล็ก พร้อมห่วงคล้อง เพิ่มสีสันให้กระเป๋าใบโปรด`] = `${p.title}: a crochet pouch for small essentials, with an attachment loop to brighten up your favourite bag.`;
    copy[`กระเป๋าโครเชต์ลาย${p.keywords}`] = `${p.title} crochet pouch`;
  }
  for (const p of window.BirbestStickerProducts || []) {
    copy[`สติกเกอร์ลาย${p.keywords} จากคอลเลกชัน Chirp Mochi Crayon มาเป็นแพ็กคู่ตัวใหญ่และตัวเล็ก เติมสีสันให้สมุดและของใช้ชิ้นโปรด`] = `${p.title} from the Chirp Mochi Crayon collection. A pair of stickers, one large and one small, to brighten notebooks and everyday favourites.`;
  }
  for (const p of window.BirbestKeychainProducts || []) {
    copy[`พวงกุญแจภาพซันคอนัวร์ลาย ${p.code} พร้อมชาร์มโลโก้ Birbest และเมล็ดทานตะวัน พกสีสันของเพื่อนตัวเล็กไปกับกุญแจหรือกระเป๋าใบโปรด`] = `Sun Conure photo keychain ${p.code}, with Birbest logo and sunflower-seed charms. A colourful little companion for your keys or favourite bag.`;
    copy[`สินค้ารายการนี้คือลาย ${p.code} ภาพรวมคอลเลกชันใช้สำหรับเทียบลาย ไม่ใช่ชุดรวม 8 ชิ้น`] = `This listing is for design ${p.code}. The collection image is for comparing designs, not a set of eight keychains.`;
    copy[`พวงกุญแจภาพซันคอนัวร์ · ${p.code}`] = `Sun Conure photo keychain · ${p.code}`;
  }
  const families = ['Crochet','Hat','Sticker','Keychain','Shirt','BirdToy','Pouch'];
  for (const family of families) for (const p of window[`Birbest${family}Products`] || []) {
    copy[`โครเชต์ ${p.title}`] = `${p.title} crochet`;
    copy[`หมวก ${p.title}`] = p.title;
    if (p.keywords) {
      copy[`กระเป๋าโครเชต์ ${p.keywords}`] = `${p.title} crochet pouch`;
      copy[`สติกเกอร์ ${p.keywords}`] = `${p.title} stickers`;
    }
    if (p.code) copy[`พวงกุญแจซันคอนัวร์ ${p.code}`] = `Sun Conure keychain ${p.code}`;
    if (p.subtitle) copy[`${p.title} ${p.subtitle}`] = `${p.title} ${copy[p.subtitle] || ''}`.trim();
    (p.shots || []).forEach((shot,i) => {
      for (const prefix of ['', 'โครเชต์ ', 'หมวก ']) {
        const label = `${prefix}${p.title} · ภาพ ${i+1}`;
        copy[label] = `${p.title} · Photo ${i+1}`;
        copy[`ขยายภาพ: ${label}`] = `Enlarge: ${p.title} · Photo ${i+1}`;
        copy[`ภาพ ${i+1}: ${label}`] = `Photo ${i+1}: ${p.title}`;
      }
      copy[`${p.title} · ${i === 0 ? 'ภาพสินค้า' : 'รายละเอียดคอลเลกชัน'}`] = `${p.title} · ${i === 0 ? 'Product photo' : 'Collection details'}`;
    });
  }
  window.BirbestEnglishCopy = Object.freeze(copy);
})();
