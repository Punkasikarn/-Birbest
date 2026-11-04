(() => {
  'use strict';
  const vca = slug => `https://vcahospitals.com/know-your-pet/${slug}`;
  const merck = slug => `https://www.merckvetmanual.com/bird-owners/${slug}`;
  const sources = {
    voice:['VCA: Biting and Screaming in Birds','https://vcahospitals.com/coral/know-your-pet/biting-and-screaming-in-birds'],
    general:['VCA: Conures - General Information',vca('conures-general')],
    food:['VCA: Feeding Pet Conures',vca('conures-feeding')],
    care:['Tree of Life Exotic Pet Medical Center: Conure Care','https://treeoflifeexotics.vet/education-resource-center/for-clients/birds/conure-care'],
    sleep:['AAV: Providing Adequate Sleep','https://www.aav.org/blogpost/1778905/376627/Providing-Adequate-Sleep'],
    home:['Merck: Providing a Home for a Bird',merck('choosing-and-taking-care-of-a-pet-bird/providing-a-home-for-a-bird')],
    illness:['VCA: Recognizing the Signs of Illness in Pet Birds',vca('recognizing-the-signs-of-illness-in-pet-birds')],
    injury:['Merck: Injuries and Accidents of Pet Birds',merck('disorders-and-diseases-of-birds/injuries-and-accidents-of-pet-birds')],
    introduction:['VCA: Introducing a New Pet Bird',vca('introducing-a-new-pet-bird')],
    hygiene:['VCA: Cage Hygiene in Birds','https://vcahospitals.com/vitality/know-your-pet/cage-hygiene-in-birds'],
    hazards:['Merck: Household Hazards for Pet Birds',merck('routine-care-and-safety-of-birds/household-hazards-for-pet-birds')],
    trust:['World Parrot Trust: The Power of Positive Reinforcement','https://parrots.org/focus/improving-parrot-care/the-power-of-positive-reinforcement/'],
    husbandry:['University of Florida: How to care for your pet bird','https://smallanimal.vethospital.ufl.edu/clinical-services/zoological-medicine/how-to-care-for-your-pet-bird/']
  };
  const draft = (references, presentation={}, blocks={}, options={}) => ({
    status:'available-draft', review:'pending-expert-review',
    applicability:'editorial-source-check-2026-10-07',
    reviewReferences:references.map(key=>sources[key]), presentation, blocks, ...options
  });
  const foodQuestion = (group,question,answer,detail) => ({group,question,answer,detail,source:'vca'});
  globalThis.BirbestSpeciesAdditions = {
    'sun-conure':{
      label:'ซันคอนัว', scope:'สำหรับนกที่กินเองได้แล้ว', status:'available-draft',
      reader:'catalog', checkedAt:'7 ตุลาคม 2569',
      groups:[
        {id:'welcome',name:'เพิ่งรับน้องมา',lessonIds:['welcome/cage','home/identification','welcome/location','welcome/setup','welcome/first-meal','welcome/settling','welcome/health']},
        {id:'daily',name:'อาหารและการดูแลทุกวัน',lessonIds:['food/guide','home/cleaning','home/sleep','home/safety','health/guide','health/eggs']},
        {id:'understand',name:'พฤติกรรมและการเล่น',lessonIds:['behavior/guide','behavior/sounds','play/guide']}
      ],
      artwork:{
        welcome:{file:'learn-sun-conure-cover-v1.webp',alt:'แร้บเตอร์ ซันคอนัวเกาะคอนไม้ในห้องสีฟ้า โดยมีผู้ดูแลนั่งเป็นเพื่อนอยู่ใกล้ ๆ'},
        daily:{file:'learn-sun-conure-food-v1.webp',alt:'ซันคอนัวกับอาหารหลากหลายชนิดและน้ำ'},
        understand:{file:'learn-sun-conure-foraging-v1.webp',alt:'ซันคอนัวสำรวจอาหารใต้กระดาษ'}
      },
      lessons:{
        'health/eggs':draft([],{
          title:'ซันคอนัวออกไข่แล้ว ดูแลอย่างไรดี?',
          cardTitle:'เมื่อน้องออกไข่',
          text:'ดูอาการ จัดการไข่ และวางแผนดูแลซันคอนัวตัวเมีย',
          articleImage:null,
          artNeeded:{id:'sun-conure-eggs',title:'ซันคอนัวกับไข่ใบแรก',description:'เว้นไว้สำหรับภาพซันคอนัวตัวเมียกับไข่ และผู้ดูแลสังเกตอยู่ใกล้ ๆ'}
        },{
          'health/eggs:1':{group:'เพิ่งเจอไข่ใบแรก',question:'เลี้ยงซันคอนัวตัวเดียว ทำไมออกไข่ได้?',answer:'ตัวเมียออกไข่ได้แม้ไม่มีตัวผู้',detail:'ไข่ไม่ได้หมายความว่าจะมีลูกนก หากไม่เคยผสมกับตัวผู้ ไข่จะไม่มีการปฏิสนธิ ไม่จำเป็นต้องหาคู่มาแก้เรื่องนี้',source:'binding'},
          'health/eggs:2':{group:'เพิ่งเจอไข่ใบแรก',question:'เห็นไข่แล้ว ต้องดูอะไรเป็นอันดับแรก?',answer:'ดูอาการของน้องก่อน',detail:'ดูการหายใจ การเกาะคอน และการเบ่ง หากเบ่งซ้ำ อ่อนแรง หรือหายใจลำบาก ให้ติดต่อสัตวแพทย์ที่รับนกทันที แม้จะออกไข่มาแล้วหนึ่งใบก็ยังต้องใส่ใจอาการผิดปกติ',source:'binding'},
          'health/eggs:3':{group:'เพิ่งเจอไข่ใบแรก',question:'ควรเอาไข่ออกเลยหรือปล่อยให้น้องกก?',answer:'วางแผนกับหมอก่อนเอาออกเป็นกิจวัตร',detail:'การนำไข่ออกอาจกระตุ้นให้บางตัวออกเพิ่ม ขอแผนที่เหมาะกับซันคอนัวของเรา ทั้งกรณีไข่สมบูรณ์ ไข่แตก และไข่ที่อาจมีเชื้อ ไม่กำหนดวันเอาออกจากตารางของนกพันธุ์อื่น',source:'laying'},
          'health/eggs:4':{group:'ดูแลและสังเกตต่อ',question:'ช่วงนี้ควรเพิ่มกล่องรังหรือกอดลูบตัวไหม?',answer:'ลดสิ่งกระตุ้นการสืบพันธุ์',detail:'เลี่ยงลูบหลังหรือเชิงกราน และไม่เพิ่มกล่องรังเพื่อชวนให้ออกไข่ คุยกับหมอเรื่องมุมมืด ช่วงแสง และการสัมผัส หากน้องกำลังกกไข่ ให้ขอแผนก่อนเปลี่ยนพื้นที่',source:'laying'},
          'health/eggs:5':{group:'ดูแลและสังเกตต่อ',question:'ต้องเสริมแคลเซียมหรือเพิ่มเมล็ดไหม?',answer:'ให้หมอประเมินอาหารที่กินจริงก่อน',detail:'อาหารเมล็ดอย่างเดียวอาจขาดสารอาหารที่เกี่ยวข้องกับการสร้างไข่ เตรียมรายการอาหารและอาหารเสริมให้หมอดู ไม่เพิ่มยา แคลเซียม หรือใช้ขนาดเสริมของนกตัวอื่นเอง',source:'binding'},
          'health/eggs:6':{group:'ดูแลและสังเกตต่อ',question:'ออกไข่เรื่อย ๆ แต่ยังดูปกติ ควรทำอย่างไร?',answer:'นัดประเมินและบันทึกการออกไข่',detail:'จดวันที่ จำนวนไข่ ลักษณะเปลือก การกิน และพฤติกรรมไว้คุยกับหมอ การออกไข่ซ้ำเกิดได้ในนกหลายชนิด จึงไม่ควรรอให้อ่อนแรงก่อนขอคำแนะนำ',source:'laying'},
          'health/eggs:7':{group:'เมื่อควรขอความช่วยเหลือ',question:'นั่งก้นกรง เบ่ง หรือเกาะคอนไม่ไหว แปลว่าไข่ค้างไหม?',answer:'เป็นเหตุให้ขอความช่วยเหลือด่วน แต่ยังวินิจฉัยเองไม่ได้',detail:'โทรแจ้งคลินิกและเตรียมเดินทางทันที ไม่บีบท้อง ดึงไข่ หรือหยอดน้ำมันเอง อาการอาจเกิดจากหลายสาเหตุ ให้สัตวแพทย์ตรวจหาสาเหตุ',source:'merck'},
          'health/eggs:8':{group:'เมื่อควรขอความช่วยเหลือ',question:'ก่อนพาไปหาหมอ เตรียมอะไรไว้บ้าง?',answer:'เล่าอาการและประวัติที่มี โดยไม่ชะลอการเดินทาง',detail:'แจ้งว่าเป็นซันคอนัว เริ่มผิดปกติเมื่อไร ออกไข่ล่าสุดเมื่อไร และกินอะไรอยู่ ใช้ภาพหรือบันทึกที่มีแล้ว ขอคำแนะนำจากคลินิกเรื่องกรงเดินทางและการดูแลระหว่างทาง',source:'binding'}
        },{
          applicability:'editorial-source-check-2026-10-16',
          notes:[{title:'อ่านอย่างมั่นใจ',text:'ตรวจแหล่งข้อมูล 16 ตุลาคม 2569 · ใช้แนวทางระบบสืบพันธุ์ของนกเลี้ยงมาเรียบเรียงสำหรับเจ้าของซันคอนัว แหล่งอ้างอิงไม่ได้กำหนดจำนวนไข่ ช่วงห่าง หรือความเสี่ยงเฉพาะซันคอนัว จึงไม่ใช้ตัวเลขของพันธุ์อื่นแทน บทนี้ยังรอตรวจบทเรียบเรียงโดยสัตวแพทย์'}]
        }),
        'home/identification':draft([], {image:'learn-sun-conure-cover-v1', articleImage:null, artNeeded:{id:'sun-conure-leg-band',title:'ห่วงขาของซันคอนัว',description:'ภาพชัด ๆ ของแร้บเตอร์บนคอนไม้ พร้อมเห็นห่วงขาอย่างเป็นธรรมชาติ ใช้เล่าเรื่องการสังเกตและเก็บข้อมูล ไม่ใช่สอนใส่หรือถอดห่วง'}}, {}, {applicability:'editorial-source-check-2026-10-14',notes:[{title:'อ่านอย่างมั่นใจ',text:'ตรวจแหล่งข้อมูล 14 ตุลาคม 2569 · เป็นแนวทางทั่วไปสำหรับนกเลี้ยง ให้สัตวแพทย์ที่ดูแลนกช่วยประเมินห่วงและวิธีระบุตัวที่เหมาะกับซันคอนัวของเรา · บทเรียบเรียงนี้ยังรอตรวจโดยสัตวแพทย์'}]}),
        'behavior/sounds':draft(['general','voice','trust','illness'],{
          articleImage:{file:'sun-conure-lesson-15-20261018.webp',alt:'ซันคอนัวกับผู้ดูแล พร้อมภาพประกอบการส่งเสียง พัก เล่น และขยับปีก',width:1536,height:1024,caption:'ค่อย ๆ รู้จักจังหวะของน้องแต่ละตัว · ภาพประกอบ'}
        },{
          'behavior/sounds:1':{group:'รู้จักเสียงของน้อง',question:'ซันคอนัวส่งเสียงดัง เป็นเรื่องปกติไหม?',answer:'เสียงเป็นส่วนหนึ่งของการสื่อสาร',detail:'คอนัวเป็นนกสังคมและอาจส่งเสียงดังเป็นช่วง ๆ การอยู่ด้วยกันจึงไม่จำเป็นต้องตั้งเป้าให้น้องเงียบตลอดวัน',source:'general'},
          'behavior/sounds:2':{group:'รู้จักเสียงของน้อง',question:'ฟังเสียงอย่างเดียว รู้ไหมว่าน้องต้องการอะไร?',answer:'ดูเหตุการณ์และท่าทีประกอบกัน',detail:'ลองสังเกตว่าเกิดอะไรขึ้นก่อนร้อง และมีอะไรเปลี่ยนรอบตัว เสียงคล้ายกันอาจเกิดได้หลายเหตุผล จึงค่อย ๆ เรียนรู้จากน้องแต่ละตัว',source:'voice'},
          'behavior/sounds:3':{group:'อยู่ด้วยกันอย่างสบายใจ',question:'เมื่อน้องร้องมากขึ้น เริ่มดูตรงไหนดี?',answer:'เริ่มจากความสบายและสิ่งรอบตัวน้อง',detail:'ตรวจอาหาร น้ำ ช่วงพัก และสิ่งที่อาจทำให้ตกใจ ก่อนคิดเรื่องฝึก หากเสียงหรืออาการเปลี่ยนจากเดิม ให้ปรึกษาสัตวแพทย์ด้วย',source:'voice'},
          'behavior/sounds:4':{group:'อยู่ด้วยกันอย่างสบายใจ',question:'ชวนน้องสื่อสารอย่างอ่อนโยนได้อย่างไร?',answer:'ตอบรับจังหวะที่อยากส่งเสริม',detail:'เมื่อน้องสบายใจ ลองตอบรับเสียงเบาหรือท่าทีสงบด้วยคำชมและรางวัลที่น้องชอบ ใช้วิธีอ่อนโยนแทนการตะโกนตอบ และเปิดพื้นที่ให้มีเสียงตามธรรมชาติ',source:'trust'},
          'behavior/sounds:5':{group:'อยู่ด้วยกันอย่างสบายใจ',question:'น้องเอนหนีตอนยื่นมือเข้าไป ทำอย่างไรดี?',answer:'พักมือ แล้วให้น้องมีพื้นที่เลือก',detail:'การเอนหนีอาจเป็นสัญญาณว่ายังไม่พร้อม ให้เวลาน้องก่อนลองใหม่ หากมีการกัดบ่อยหรือเปลี่ยนไปจากเดิม ขอคำแนะนำจากสัตวแพทย์ที่ดูแลนกได้',source:'voice'},
          'behavior/sounds:6':{group:'เมื่อมีสิ่งเปลี่ยนไป',question:'น้องเงียบลง แปลว่าสบายใจเสมอไหม?',answer:'เทียบกับนิสัยและกิจวัตรเดิมของน้อง',detail:'เสียงที่เปลี่ยนไป โดยเฉพาะเมื่อกินน้อย ซึม หรือนอนมากขึ้น ควรติดต่อสัตวแพทย์โดยเร็ว เสียงอย่างเดียวใช้วินิจฉัยสุขภาพไม่ได้',source:'illness'},
          'behavior/sounds:7':{group:'เมื่อมีสิ่งเปลี่ยนไป',question:'ลองปรับแล้ว ยังอยู่ด้วยกันลำบาก ขอใครช่วยได้บ้าง?',answer:'ขอแผนที่เหมาะกับบ้านและน้องของเรา',detail:'ปรึกษาสัตวแพทย์ที่ดูแลนก และขอคำแนะนำผู้เชี่ยวชาญพฤติกรรมที่ใช้การเสริมแรงเชิงบวก เป้าหมายคืออยู่ร่วมกันได้อย่างสบายใจ ไม่ใช่ให้น้องทุกตัวเหมือนกัน',source:'trust'}
        },{applicability:'editorial-source-check-2026-10-09',sourceOverrides:{general:sources.general,voice:sources.voice,trust:sources.trust,illness:sources.illness}}),
        'welcome/cage':draft(['general','care','husbandry'],{
          title:'เลือกกรงให้ซันคอนัวอย่างไร?',
          articleImage:{file:'learn-sun-conure-cage-v1.webp',alt:'ซันคอนัวในกรงพร้อมคอนไม้ ชาม และของเล่น',caption:'ภาพประกอบแนวคิด ไม่ใช่แบบอ้างอิงขนาดหรือระยะซี่กรง'},
          source:sources.general[1], additionalSource:sources.care[1], additionalSourceLabel:sources.care[0]
        },{
          'welcome/cage:1':['เริ่มเปรียบเทียบขนาดอย่างไร?','VCA ให้แนวทางกรงคอนัวขั้นต่ำ กว้าง 60 × สูง 60 × ยาว 90 ซม. ตัวเลขนี้เป็นแนวทางของกลุ่มคอนัว ไม่ใช่ขนาดที่รับรองว่าเหมาะกับซันคอนัวทุกตัว เลือกพื้นที่กว้างขึ้นเมื่อทำได้'],
          'welcome/cage:2':['ก่อนเลือกซื้อ ควรดูอะไรเพิ่ม?','เทียบขนาดภายในจริงหลังใส่อุปกรณ์ ให้น้องกางปีก หันตัว และย้ายคอนได้สะดวก โดยหางไม่ติดพื้น ใช้ทั้งขนาดตัวน้องและการจัดพื้นที่ประกอบกัน'],
          'welcome/cage:4':['ระยะซี่กรงของซันคอนัวดูอย่างไร?','คู่มือคอนัวของ Tree of Life ให้แนวทางช่องซี่ 1/2 นิ้ว หรือประมาณ 12.7 มม. วัดช่องว่างจากผิวซี่หนึ่งถึงผิวซี่ข้างกัน รวมช่องประตูด้วย ให้น้องอยู่ในที่ปลอดภัยระหว่างวัด และประเมินความเหมาะสมกับตัวน้องก่อนซื้อ']
        }),
        'welcome/location':draft(['home','care']),
        'welcome/setup':draft(['husbandry','care'],{
          sectionImages:{
            0:{file:'sun-conure-setup-basic-20261018.webp',alt:'ซันคอนัวในกรงที่มีคอน ชามอาหาร ชามน้ำ และของเล่นหนึ่งชิ้น',caption:'เริ่มจากของจำเป็น · ภาพตัดให้เห็นภายในกรง'},
            4:{file:'sun-conure-setup-enrichment-20261018.webp',alt:'ซันคอนัวในกรงที่เพิ่มคอนและของเล่น โดยเว้นพื้นที่ตรงกลาง',caption:'ค่อยเพิ่มกิจกรรมที่เหมาะกับน้อง ไม่จำเป็นต้องแต่งให้เต็มตามภาพ · ตรวจชนิดพืชและวัสดุก่อนใช้จริง'}
          }
        }),
        'welcome/first-meal':draft(['food','illness'],{
          source:sources.food[1],additionalSource:sources.illness[1],additionalSourceLabel:sources.illness[0]
        },{
          'welcome/first-meal:1':['ก่อนกลับบ้าน ขอข้อมูลอะไรไว้ดี?','ขอชื่ออาหารเดิมและยืนยันว่าน้องกินเองได้แล้ว หากยังต้องป้อน ให้สัตวแพทย์ช่วยวางแผน บทนี้สำหรับนกที่กินเองได้ ไม่ใช่คู่มือป้อนลูกนก'],
          'welcome/first-meal:2':['ถ้าน้องไม่กิน ควรเริ่มตรงไหน?','ติดต่อสัตวแพทย์ที่ดูแลนกโดยเร็วเมื่อไม่กินหรือกินลดลงผิดปกติ พร้อมเล่าว่าเริ่มเมื่อไร หากอ่อนแรงมากหรือหายใจลำบาก ให้ขอความช่วยเหลือฉุกเฉิน'],
          'welcome/first-meal:3':['วันแรกต้องเปลี่ยนอาหารเลยไหม?','เตรียมอาหารที่น้องกินเป็นไว้ก่อน การเปลี่ยนเมนูควรวางแผนกับสัตวแพทย์ และดูว่ากินอาหารใหม่จริงก่อนลดอาหารเดิม'],
          'welcome/first-meal:4':['น้ำต้องเตรียมอย่างไร?','มีน้ำสะอาดให้เข้าถึงได้ตลอด ล้างชามและเปลี่ยนน้ำทุกวัน รวมถึงเมื่อมีเศษอาหารหรือสิ่งสกปรก'],
          'welcome/first-meal:5':['ดูอาหารที่เหลืออย่างไรดี?','สังเกตการกินจริงควบคู่กับดูในชาม เมล็ดที่มีเปลือกเหลืออาจทำให้ชามดูเต็มทั้งที่อาหารที่กินได้เหลือน้อย'],
          'welcome/first-meal:6':['ของโปรดใช้เป็นมื้อหลักได้ไหม?','ใช้ของโปรดเป็นส่วนเล็ก ๆ ของการให้รางวัลได้ แต่เมนูระยะยาวต้องคำนึงถึงสารอาหารด้วย คุยกับสัตวแพทย์เพื่อจัดอาหารให้เหมาะกับซันคอนัวของเรา']
        }),
        'welcome/settling':draft(['introduction','trust'],{
          sectionImages:{
            4:{file:'sun-conure-settling-separate-rooms-20261018.webp',alt:'ซันคอนัวสองตัวอยู่คนละกรงในห้องแยกกัน',caption:'แยกคนละห้องก่อนทำความรู้จัก · ภาพประกอบแนวคิดการแยกพื้นที่'}
          }
        }),
        'welcome/health':draft(['introduction','illness','injury']),
        'food/guide':draft(['food'],{
          articleImage:{file:'learn-sun-conure-food-v1.webp',alt:'ซันคอนัวกับอาหารเม็ด ผัก เมล็ด และน้ำ',caption:'ภาพแสดงประเภทอาหาร ไม่ใช่สัดส่วนหรือปริมาณที่แนะนำต่อวัน'}
        }, {
          'food/guide:1':foodQuestion('เริ่มรู้จักอาหาร','เพิ่งรับซันคอนัวมา เริ่มเรื่องอาหารอย่างไร?','เริ่มจากอาหารที่น้องกินเป็น','ค่อยวางแผนเมนูระยะยาวกับสัตวแพทย์ โดยยังให้น้องเข้าถึงอาหารที่กินได้'),
          'food/guide:5':foodQuestion('เมื่อเจออาหารใหม่','น้องยังไม่สนใจอาหารใหม่ ทำอย่างไรดี?','ให้เวลาคุ้นเคยทีละน้อย','เสนอใหม่อย่างใจเย็น พร้อมสังเกตว่ากินจริงหรือเพียงเล่นกับอาหาร'),
          'food/guide:6':foodQuestion('เมื่อเจออาหารใหม่','เมื่อไรค่อยลดอาหารเดิม?','เมื่อมั่นใจว่าน้องกินอาหารใหม่ได้','ให้สัตวแพทย์ช่วยวางแผน ไม่ใช้อดอาหารเพื่อเร่งการเปลี่ยนเมนู'),
          'food/guide:9':foodQuestion('เรื่องเล็ก ๆ ที่ควรรู้','อาหารของคนแบ่งได้ทุกอย่างไหม?','ตรวจชนิดอาหารก่อนแบ่งให้น้อง','ช็อกโกแลต คาเฟอีน แอลกอฮอล์ และอาหารเค็มจัดไม่เหมาะกับนก รายการนี้ไม่ครอบคลุมทุกอย่าง'),
          'food/guide:10':foodQuestion('เรื่องเล็ก ๆ ที่ควรรู้','ต้องเติมวิตามินหรือแคลเซียมเองไหม?','ให้สัตวแพทย์ประเมินก่อน','ความต้องการขึ้นกับเมนูและช่วงชีวิตของน้อง การเติมเองอาจไม่เหมาะกับแต่ละตัว'),
          'food/guide:11':foodQuestion('เรื่องเล็ก ๆ ที่ควรรู้','ซันคอนัวต้องมีกรวดช่วยย่อยไหม?','คอนัวไม่ต้องการกรวดช่วยย่อย','คอนัวแกะเปลือกเมล็ดก่อนกิน การกินกรวดอาจทำให้ทางเดินอาหารอุดตัน จึงไม่จัดกรวดไว้ในชาม')
        },{
          sourceOverrides:{vca:{name:sources.food[0],url:sources.food[1]}},
          notes:[{title:'ของโปรดของแร้บเตอร์ ไม่ใช่สูตรสำหรับทุกตัว',text:'เมล็ดทานตะวันและเมล็ดกัญชงเป็นของที่เจ้าของเล่าว่าแร้บเตอร์ชอบ เรื่องนี้เป็นนิสัยของนกตัวจริง ไม่ใช่คำแนะนำสัดส่วนอาหารสำหรับซันคอนัวทุกตัว'}]
        }),
        'home/cleaning':draft(['hygiene'],{
          questionImages:{'คอนหรือของเล่นเก่า ล้างแล้วใช้ต่อได้เสมอไหม?':{file:'sun-conure-equipment-check-20261018.webp',alt:'เปรียบเทียบคอนและของเล่นกับชิ้นชำรุด พร้อมภาพขยายไม้แตกและเชือกรุ่ย',caption:'ภาพประกอบจุดสังเกตสภาพคอนและของเล่น: ไม้แตก เสี้ยน และเชือกรุ่ย'}},
          articleImage:{file:'learn-cleaning.webp',alt:'ล้างชาม เปลี่ยนกระดาษรองกรง และตรวจสภาพอุปกรณ์',caption:'ดูแลความสะอาดควบคู่กับตรวจสภาพอุปกรณ์ · ภาพประกอบแนวคิด'}
        }),
        'home/sleep':draft(['sleep','home','illness'],{text:'จัดช่วงพักที่สงบ และสังเกตการนอนที่เปลี่ยนไป'}, {
          'home/sleep:1':['ซันคอนัวควรนอนกี่ชั่วโมง?','เริ่มจากช่วงพักที่มืด สงบ และต่อเนื่อง','AAV แนะนำให้คุยกับสัตวแพทย์เรื่องเวลาพักที่เหมาะกับนกแต่ละตัว แล้วจัดกิจวัตรให้สม่ำเสมอตามความต้องการของน้อง',0],
          'home/sleep:5':['น้องตื่นบ่อย ลองดูอะไรได้บ้าง?','ดูแสงและเสียงที่เข้ามารบกวน','ลองสังเกตไฟ โทรทัศน์ และกิจกรรมใกล้กรง หากยังพักไม่สงบ ให้ปรึกษาสัตวแพทย์เพื่อหาวิธีที่เหมาะกับน้อง',0],
          'home/sleep:6':['เปิดเพลงตอนนอนดีไหม?','ช่วงพักเริ่มจากความเงียบก่อนได้','ความชอบฟังเพลงตอนเล่นไม่ได้แปลว่าน้องต้องการเสียงเพลงตลอดคืน ลดเสียงที่อาจรบกวนช่วงพัก',0],
          'home/sleep:7':['นอนมากขึ้นพร้อมกินน้อยลง ควรทำอย่างไร?','ติดต่อสัตวแพทย์ให้ช่วยประเมิน','การนอนและการกินที่เปลี่ยนจากเดิมควรได้รับความใส่ใจ หากหายใจลำบากหรืออ่อนแรงมาก ให้ขอความช่วยเหลือฉุกเฉิน',2]
        },{sourceOverrides:{2:sources.illness}}),
        'home/safety':draft(['hazards'],{}, {
          'home/safety:2':'<p class="footnote">แนวทางความปลอดภัยพื้นฐานสำหรับนกเลี้ยง ใช้ประกอบการจัดบ้านให้ซันคอนัว ไม่ใช่การรับรองอุปกรณ์หรือผลิตภัณฑ์แต่ละชนิด</p>'
        }),
        'health/guide':draft(['illness','injury'],{}, {
          'health/guide:6':'<details class="food-question"><summary>โทรคุยกับหมอ บอกอะไรบ้าง?</summary><div class="food-question-body"><p>บอกว่าเป็นซันคอนัว อาการที่กังวล เริ่มเมื่อไร อาหารที่กินจริง และประวัติที่ทราบ ใช้ภาพที่มีอยู่ช่วยเล่าได้ โดยไม่ชะลอการขอความช่วยเหลือเพื่อถ่ายเพิ่ม</p></div></details>',
          'health/guide:10':'<p class="footnote">อาการในบทนี้เป็นเหตุให้ขอความช่วยเหลือ ไม่ใช่คำวินิจฉัย และไม่ได้ครอบคลุมอาการผิดปกติทุกแบบ</p>'
        },{parts:[{shared:'health/guide:1'},{shared:'health/guide:3'},{shared:'health/guide:4'},{shared:'health/guide:5'},{specific:'health/guide:6'},{shared:'health/guide:7'},{shared:'health/guide:8'},{shared:'health/guide:9'},{specific:'health/guide:10'}]}),
        'behavior/guide':draft(['general','trust'],{}, {},{
          notes:[{title:'รู้จักเสียงของซันคอนัว',text:'คอนัวอาจส่งเสียงดังเป็นช่วง ๆ การอยู่ด้วยกันไม่จำเป็นต้องตั้งเป้าให้น้องเงียบตลอดวัน สังเกตจังหวะและบริบทของน้องแต่ละตัว พร้อมสร้างกิจกรรมร่วมกันอย่างใจเย็น'},{title:'แร้บเตอร์ค้าบ!',text:'แร้บเตอร์ตัวจริงชอบพูดคำนี้และชอบเต้นตามเพลง นกตัวอื่นอาจชอบสื่อสารต่างออกไป ไม่จำเป็นต้องพูดหรือเต้นเหมือนกัน'}]
        }),
        'play/guide':draft(['care','husbandry','trust'],{
          articleImage:{file:'learn-sun-conure-foraging-v1.webp',alt:'ซันคอนัวเปิดกระดาษหาอาหาร โดยมีผู้ดูแลอยู่ด้วย',caption:'เลือกวัสดุที่เหมาะกับน้องและดูแลระหว่างเล่น · ภาพประกอบ'}
        })
      }
    }
  };
  // Founder-provided illustrations, numbered to match the supplied lesson files.
  const illustratedLessons = ['welcome/cage','home/identification','welcome/location','welcome/setup','welcome/first-meal','welcome/settling','welcome/health','food/guide','home/cleaning','home/sleep','home/safety','health/guide','health/eggs','behavior/guide'];
  const species = globalThis.BirbestSpeciesAdditions['sun-conure'];
  species.artwork = {};
  illustratedLessons.forEach((id, index) => {
    const presentation = species.lessons[id].presentation;
    const oldArt = presentation.articleImage;
    presentation.articleImage = {
      file:`sun-conure-lesson-${String(index + 1).padStart(2,'0')}-20261018.webp`,
      alt:oldArt?.alt || 'ภาพประกอบบทเรียนซันคอนัว',
      caption:oldArt?.caption || 'ภาพประกอบแนวคิดสำหรับบทเรียนซันคอนัว',
      width:[6,10,11,12].includes(index) ? 1448 : 1536,
      height:[6,10,11,12].includes(index) ? 1086 : 1024
    };
    delete presentation.artNeeded;
  });
})();
