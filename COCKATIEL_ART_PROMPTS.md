# Birbest: ชุด prompt ภาพต้อนรับค็อกคาเทล

วันที่: 28 กันยายน 2569
สถานะ: บรีฟสร้างภาพเพื่อให้ founder ตรวจ ยังไม่ได้สร้างหรือใส่ภาพใหม่ลงเว็บ
ขอบเขต: หน้ารวมต้อนรับน้อง + 6 บทที่เพิ่งทำ ไม่รวม About, แอป หรือบทอาหารเชิงลึก

## ข้อกำหนดฉบับแก้ไข 29 กันยายน 2569

แก้ข้อที่ขาดจากฉบับแรก: ซี่แนวนอนสำหรับปีน ช่องว่างจริงระหว่างซี่ สัดส่วนพื้นที่หลังใส่อุปกรณ์ และแยกกรงอยู่อาศัยออกจากกรงขนส่ง ข้อกำหนดถูกใส่ในแต่ละ prompt ที่เกี่ยวข้องแล้ว ไม่ต้องคัดลอกส่วนนี้ไปต่อเอง

- ซี่แนวนอนบนแผงด้านข้างทั้งสองด้านเป็นการเลือกแบบสำหรับภาพชุดนี้ เพื่อรองรับการปีนตามคำแนะนำ RSPCA ไม่ใช่ข้ออ้างว่าทุกซี่ทุกด้านต้องเป็นแนวนอน
- CFARE ให้ช่วงช่องซี่ค็อกคาเทล 1/2–5/8 นิ้ว หรือประมาณ 12.7–15.9 มม. ชุดภาพเลือกเป้าหมาย 12.7 มม. เพื่อคุมภาพให้สม่ำเสมอ ไม่ใช่การรับรองว่ากรงจริงปลอดภัยกับนกทุกตัว
- แยกช่องว่างระหว่างผิวซี่ออกจากความหนาซี่และระยะกึ่งกลาง ตรวจช่องประตูและมุมด้วย ไม่ให้นกมุดทดสอบ
- ภาพ AI ไม่สามารถยืนยันมิลลิเมตร ขนาดกรง หรือวัสดุได้ ใช้ภาพสินค้า/แบบที่ตรวจจริงเป็น reference หากต้องสื่อขนาดแน่นอน และใส่ตัวเลขเป็นข้อความเว็บภายหลัง
- ฉบับนี้ยังเป็นบรีฟภาพร่างที่ต้องตรวจ ไม่ใช่แบบผลิตกรงหรือคำแนะนำที่สัตวแพทย์รับรอง

แหล่งตรวจ: [RSPCA: Enrichment for Pet Birds](https://www.rspca.org.uk/adviceandwelfare/pets/birds/enrichment), [CFARE: Cage Dimensions](https://centerforanimalrehab.org/guidelines-for-cage-size-and-bar-spacing/), [VCA: Housing Small Birds](https://vcahospitals.com/know-your-pet/housing-small-birds) ตรวจประกอบการแก้ 29 กันยายน 2569

## ใช้งานอย่างไร

- แต่ละ prompt ด้านล่างพร้อมใช้แยกกัน ไม่ต้องประกอบข้อความเอง
- แนบภาพอ้างอิงทุกครั้ง: `assets/about-care.png` เป็นสไตล์หลัก และ `assets/about-world.png` เป็นบรรยากาศ ใช้ค็อกคาเทลจากภาพ ไม่เพิ่มซันคอนัว/กรีนชีคในชุดนี้
- เมื่อภาพแรกลงตัว ใช้ภาพนั้นเป็น reference เพิ่มทุกครั้ง เพื่อคุมหน้าตาและสัดส่วนตัวละคร แนะนำเริ่มภาพ 05 ซึ่งเห็นบุคลิกนกและคนชัดก่อน
- สร้างภาพแยกทีละไฟล์ ไม่ทำภาพรวม 7 ช่อง ส่งออก PNG หรือ WebP คุณภาพสูง ไม่มีข้อความฝังในภาพ
- ภาพบทเรียนใช้ 3:2 แสดงเต็มภาพบนมือถือ ไม่ตัดภาพที่จำเป็นต่อความเข้าใจ ทดสอบย่อกว้าง 360px ว่ายังเห็นเนื้อหาหลัก
- หัวเรื่อง คำเตือน ตัวเลข และปุ่มจะเป็นข้อความจริงในเว็บ ไม่ให้ AI วาด เพื่อให้อ่านชัดและแก้ได้
- ไฟล์ชื่อด้านล่างคือชื่อปลายทางที่เสนอ ยังไม่ใช่ asset ที่มีอยู่จริง เมื่อได้ภาพต้องตรวจความถูกต้องก่อนนำขึ้นเว็บ

## สิ่งที่ย่อในเนื้อหา

ลดจาก 44 เหลือ 36 คำถาม: กรง 7, ตำแหน่ง 5, อุปกรณ์ 6, มื้อแรก 6, ปรับตัว 5, สุขภาพ 7

- กรง: ตัดเรื่องของตกแต่งที่ซ้ำบทอุปกรณ์ คงขนาด ที่มา และข้อจำกัด
- ตำแหน่ง: รวมครัวกับไอระเหย ย้ายรายละเอียดการออกสำรวจไปบทปรับตัว
- อุปกรณ์: รวมการตรวจของชำรุดไว้กับคอน ชาม และของเล่น
- มื้อแรก: ตัดภาระเริ่มจด/ซื้อเครื่องชั่งออกจากบทเริ่มต้น ไม่ได้สรุปว่าเครื่องชั่งไม่มีประโยชน์
- ปรับตัว: รวมเป้าหมายวันแรกกับการเข้าหา รวมการพบเพื่อนใหม่กับข้อจำกัดเรื่องความเข้ากันได้
- สุขภาพ: ย่อคำอธิบาย แต่คงคำเตือนและการเตรียมติดต่อคลินิก

คำเตือนซ้ำเรื่องไม่กิน/ซึมยังคงไว้โดยตั้งใจ เพราะแต่ละหน้าต้องอ่านแยกได้ เนื้อหาและภาพยังต้องตรวจโดยสัตวแพทย์ก่อนถือเป็นคำแนะนำที่ผ่านรับรอง

## ภาพหลัก 7 ภาพ

### 00-welcome: ต้อนรับค็อกคาเทลเข้าบ้าน

- หน้า: `#/learn/cockatiel/welcome`
- ชื่อไฟล์เสนอ: `cockatiel-00-welcome.png`
- ตำแหน่ง: ภาพเปิดเหนือ 6 หัวข้อ
- ภาพต้องสื่อ: บ้านใหม่ที่เริ่มต้นได้ทีละเรื่อง
- จุดตรวจเฉพาะ: ไม่ใช้กรงกลม กรงเล็ก กระเป๋าขนส่งแทนกรงอยู่อาศัย หรือพร็อพจำนวนมาก

```text
Use the attached Birbest artwork as the visual reference, especially the warm illustrated cockatiel care scene. Keep the SAME individual adult grey cockatiel across the series: yellow head and crest, warm orange cheek patches, grey body, white wing patches, long grey tail, small pale beak, natural feet. Soft hand-painted storybook gouache and watercolor texture, gently fluffy feathers, expressive dark eyes, cute but believable anatomy. Friendly, thoughtful, premium-accessible, never plastic 3D or hyperrealistic. Balance pale sky blue, fresh sage green, warm yellow and restrained coral accents; avoid an all-brown or all-beige image. Keep props minimal, lighting clear, outlines readable at phone size. Landscape 3:2, target 1800 x 1200 pixels or larger. Keep the bird and essential objects inside the central 70% with comfortable edge margins. One finished editorial illustration, NOT a website screenshot, interface, poster, card or collage. No embedded text in any language, no numbers, no logos, no watermark, no speech bubbles. Accurate bird anatomy: two wings, two legs, no human hands on the bird, no extra toes or duplicated body parts.

HOUSING ACCURACY: For the living enclosure, clearly show horizontal climbing bars on both side panels, supported by vertical structural posts; do not render every panel with vertical bars only. Use a consistent illustrative clear gap of approximately 12.7 mm (1/2 inch), measured between facing bar surfaces, NOT bar thickness or center-to-center spacing. Maintain the same narrow gap at the door edges and corners; no widening, converging gaps, broken bars or openings that invite head entrapment. Do not put a bird's head or feet through a gap to demonstrate safety. Keep the adult bird's body proportions consistent across images; show genuinely ample enclosure space rather than shrinking the bird. Preserve room for fully extended wings, movement between perches and a long tail clear of floor, bars and objects AFTER equipment is installed. Secure natural perches of varied suitable diameters, no sandpaper or frayed rope, and separate shallow secured dishes outside droppings paths. No sharp ends, flaking coatings, rusty metal, open chain links, loose threads or crowded toys. Do not add a sleeping tent or nest box as a default furnishing. Dimensions in the prompt are design intent, not measurable proof from generated pixels; do not render any measurements or approval seals.

SCENE:
Create an inviting overview scene in a bright, lived-in home. Show the same adult cockatiel resting comfortably inside a spacious rectangular enclosure at center-right, a calm owner seated nearby without reaching inside. Show a few clear care essentials: suitable natural perches, secure shallow food and water dishes, one simple safe wooden toy, and a closed ventilated travel carrier on a separate stable surface. Leave generous usable space inside the enclosure. The room feels welcoming and achievable, not luxurious or cluttered. Use cool daylight, sage-green accents and tiny coral details. Make the bird and its home the visual focus; a viewer should understand 'welcoming a bird home' immediately. One continuous scene, not six panels or a shopping checklist.
```

### 01-cage: บ้านของค็อกคาเทลต้องเป็นแบบไหน?

- หน้า: `#/learn/cockatiel/welcome/cage`
- ชื่อไฟล์เสนอ: `cockatiel-01-cage.png`
- ตำแหน่ง: ใต้คำเกริ่น ก่อนคำถามขนาดกรง
- ภาพต้องสื่อ: ดูพื้นที่ใช้งานจริง ไม่ใช่ความสูงอย่างเดียว
- จุดตรวจเฉพาะ: ตรวจซี่กรงและสัดส่วนด้วยคน ภาพไม่ใช้ยืนยันขนาดขั้นต่ำหรือความปลอดภัยของรุ่นสินค้า

```text
Use the attached Birbest artwork as the visual reference, especially the warm illustrated cockatiel care scene. Keep the SAME individual adult grey cockatiel across the series: yellow head and crest, warm orange cheek patches, grey body, white wing patches, long grey tail, small pale beak, natural feet. Soft hand-painted storybook gouache and watercolor texture, gently fluffy feathers, expressive dark eyes, cute but believable anatomy. Friendly, thoughtful, premium-accessible, never plastic 3D or hyperrealistic. Balance pale sky blue, fresh sage green, warm yellow and restrained coral accents; avoid an all-brown or all-beige image. Keep props minimal, lighting clear, outlines readable at phone size. Landscape 3:2, target 1800 x 1200 pixels or larger. Keep the bird and essential objects inside the central 70% with comfortable edge margins. One finished editorial illustration, NOT a website screenshot, interface, poster, card or collage. No embedded text in any language, no numbers, no logos, no watermark, no speech bubbles. Accurate bird anatomy: two wings, two legs, no human hands on the bird, no extra toes or duplicated body parts.

HOUSING ACCURACY: For the living enclosure, clearly show horizontal climbing bars on both side panels, supported by vertical structural posts; do not render every panel with vertical bars only. Use a consistent illustrative clear gap of approximately 12.7 mm (1/2 inch), measured between facing bar surfaces, NOT bar thickness or center-to-center spacing. Maintain the same narrow gap at the door edges and corners; no widening, converging gaps, broken bars or openings that invite head entrapment. Do not put a bird's head or feet through a gap to demonstrate safety. Keep the adult bird's body proportions consistent across images; show genuinely ample enclosure space rather than shrinking the bird. Preserve room for fully extended wings, movement between perches and a long tail clear of floor, bars and objects AFTER equipment is installed. Secure natural perches of varied suitable diameters, no sandpaper or frayed rope, and separate shallow secured dishes outside droppings paths. No sharp ends, flaking coatings, rusty metal, open chain links, loose threads or crowded toys. Do not add a sleeping tent or nest box as a default furnishing. Dimensions in the prompt are design intent, not measurable proof from generated pixels; do not render any measurements or approval seals.

SCENE:
Create a clear three-quarter-view illustration of a spacious rectangular stainless-steel cockatiel enclosure, wider in horizontal usable space than a decorative tower cage. Show the same adult cockatiel standing on a natural perch, wings resting naturally and entire long tail clear of the floor and nearby objects. Keep the full enclosure visible with continuous, close, evenly spaced bars, a closed secure door, a simple stable base, two appropriate perches and secured shallow dishes away from droppings paths. Leave ample unobstructed interior space. Use a simple pale blue room background, no decorative architecture. The bird must look small enough relative to its home to communicate room to move. This is an illustrative spatial concept, not a scale diagram; do not add rulers, numeric dimensions, arrows or labels.
```

### 02-location: วางกรงตรงไหนดี?

- หน้า: `#/learn/cockatiel/welcome/location`
- ชื่อไฟล์เสนอ: `cockatiel-02-location.png`
- ตำแหน่ง: ใต้คำเกริ่น ก่อนคำถามเลือกมุม
- ภาพต้องสื่อ: สว่าง อยู่ใกล้คน และไม่อยู่ในครัว
- จุดตรวจเฉพาะ: เป็นภาพกลางวัน ไม่สื่อว่าแดดตรงดี หรือมุมห้องนี้รับรองว่าปลอดภัยทุกช่วงเวลา

```text
Use the attached Birbest artwork as the visual reference, especially the warm illustrated cockatiel care scene. Keep the SAME individual adult grey cockatiel across the series: yellow head and crest, warm orange cheek patches, grey body, white wing patches, long grey tail, small pale beak, natural feet. Soft hand-painted storybook gouache and watercolor texture, gently fluffy feathers, expressive dark eyes, cute but believable anatomy. Friendly, thoughtful, premium-accessible, never plastic 3D or hyperrealistic. Balance pale sky blue, fresh sage green, warm yellow and restrained coral accents; avoid an all-brown or all-beige image. Keep props minimal, lighting clear, outlines readable at phone size. Landscape 3:2, target 1800 x 1200 pixels or larger. Keep the bird and essential objects inside the central 70% with comfortable edge margins. One finished editorial illustration, NOT a website screenshot, interface, poster, card or collage. No embedded text in any language, no numbers, no logos, no watermark, no speech bubbles. Accurate bird anatomy: two wings, two legs, no human hands on the bird, no extra toes or duplicated body parts.

HOUSING ACCURACY: For the living enclosure, clearly show horizontal climbing bars on both side panels, supported by vertical structural posts; do not render every panel with vertical bars only. Use a consistent illustrative clear gap of approximately 12.7 mm (1/2 inch), measured between facing bar surfaces, NOT bar thickness or center-to-center spacing. Maintain the same narrow gap at the door edges and corners; no widening, converging gaps, broken bars or openings that invite head entrapment. Do not put a bird's head or feet through a gap to demonstrate safety. Keep the adult bird's body proportions consistent across images; show genuinely ample enclosure space rather than shrinking the bird. Preserve room for fully extended wings, movement between perches and a long tail clear of floor, bars and objects AFTER equipment is installed. Secure natural perches of varied suitable diameters, no sandpaper or frayed rope, and separate shallow secured dishes outside droppings paths. No sharp ends, flaking coatings, rusty metal, open chain links, loose threads or crowded toys. Do not add a sleeping tent or nest box as a default furnishing. Dimensions in the prompt are design intent, not measurable proof from generated pixels; do not render any measurements or approval seals.

SCENE:
Create a calm domestic scene showing a spacious rectangular cockatiel enclosure placed in a bright shared living area, well away from a closed curtained window. Soft indirect daylight illuminates the room; no direct sunbeam reaches the enclosure. The same adult cockatiel rests on a perch with access to secured shallow dishes. A relaxed owner reads on a nearby sofa, leaving respectful space around the enclosure. Show clear floor space and no doorway directly beside the enclosure. Use sky blue, sage green, a few peach textile accents and neutral walls. Keep the interior easy to understand with only a few objects. The image should communicate a comfortable, socially connected daytime location. Do not show a kitchen, stove, candles, sprays, smoke, open windows, operating fans, or decorative plants within the bird's reach.
```

### 03-setup: ในกรงต้องมีอะไรบ้าง?

- หน้า: `#/learn/cockatiel/welcome/setup`
- ชื่อไฟล์เสนอ: `cockatiel-03-setup.png`
- ตำแหน่ง: ใต้คำเกริ่น ก่อนเรื่องคอน
- ภาพต้องสื่อ: ของน้อยแต่เข้าถึงได้ และเหลือที่เคลื่อนไหว
- จุดตรวจเฉพาะ: ภาพตัดให้เห็นภายใน ไม่ใช่แบบสร้างกรงจริง ห้ามเชือกรุ่ย ลวดแหลม กระดาษทรายบนคอน ของเล่นบังทาง หรือชามใต้คอน

```text
Use the attached Birbest artwork as the visual reference, especially the warm illustrated cockatiel care scene. Keep the SAME individual adult grey cockatiel across the series: yellow head and crest, warm orange cheek patches, grey body, white wing patches, long grey tail, small pale beak, natural feet. Soft hand-painted storybook gouache and watercolor texture, gently fluffy feathers, expressive dark eyes, cute but believable anatomy. Friendly, thoughtful, premium-accessible, never plastic 3D or hyperrealistic. Balance pale sky blue, fresh sage green, warm yellow and restrained coral accents; avoid an all-brown or all-beige image. Keep props minimal, lighting clear, outlines readable at phone size. Landscape 3:2, target 1800 x 1200 pixels or larger. Keep the bird and essential objects inside the central 70% with comfortable edge margins. One finished editorial illustration, NOT a website screenshot, interface, poster, card or collage. No embedded text in any language, no numbers, no logos, no watermark, no speech bubbles. Accurate bird anatomy: two wings, two legs, no human hands on the bird, no extra toes or duplicated body parts.

HOUSING ACCURACY: For the living enclosure, clearly show horizontal climbing bars on both side panels, supported by vertical structural posts; do not render every panel with vertical bars only. Use a consistent illustrative clear gap of approximately 12.7 mm (1/2 inch), measured between facing bar surfaces, NOT bar thickness or center-to-center spacing. Maintain the same narrow gap at the door edges and corners; no widening, converging gaps, broken bars or openings that invite head entrapment. Do not put a bird's head or feet through a gap to demonstrate safety. Keep the adult bird's body proportions consistent across images; show genuinely ample enclosure space rather than shrinking the bird. Preserve room for fully extended wings, movement between perches and a long tail clear of floor, bars and objects AFTER equipment is installed. Secure natural perches of varied suitable diameters, no sandpaper or frayed rope, and separate shallow secured dishes outside droppings paths. No sharp ends, flaking coatings, rusty metal, open chain links, loose threads or crowded toys. Do not add a sleeping tent or nest box as a default furnishing. Dimensions in the prompt are design intent, not measurable proof from generated pixels; do not render any measurements or approval seals.

SCENE:
Create an educational cutaway illustration of one spacious rectangular cockatiel enclosure. Use an unmistakable open-front technical cutaway composition, not a cage with missing or broken bars; retain the back and side structure. Show the same adult cockatiel naturally perched, two securely mounted natural wood perches of slightly different suitable diameters, separate shallow food and water dishes attached securely to a side, and one simple solid wooden enrichment item. No perch is directly above either dish. Show a clear route from the perch to each dish and a large open area for movement. The tail clears all surfaces. Use a white-to-pale-mint plain background and restrained pastel colors so each object is easy to identify. No text, symbols, labels, measurement marks or arrows. Prioritize useful placement over decorative abundance.
```

### 04-first-meal: มื้อแรกต้องเตรียมอะไร?

- หน้า: `#/learn/cockatiel/welcome/first-meal`
- ชื่อไฟล์เสนอ: `cockatiel-04-first-meal.png`
- ตำแหน่ง: ใต้คำเกริ่น โดยเก็บคำเตือนเรื่องไม่กินเป็นข้อความที่เห็นชัด
- ภาพต้องสื่อ: อาหารที่คุ้นเคยและน้ำสะอาด ไม่บังคับกิน
- จุดตรวจเฉพาะ: อาหารในภาพเป็นตัวแทนอาหารเดิม ไม่ใช่สูตรแนะนำหรือปริมาณต่อวัน ภาพกินอย่างมีความสุขไม่แทนคำเตือนเมื่อนกไม่กิน

```text
Use the attached Birbest artwork as the visual reference, especially the warm illustrated cockatiel care scene. Keep the SAME individual adult grey cockatiel across the series: yellow head and crest, warm orange cheek patches, grey body, white wing patches, long grey tail, small pale beak, natural feet. Soft hand-painted storybook gouache and watercolor texture, gently fluffy feathers, expressive dark eyes, cute but believable anatomy. Friendly, thoughtful, premium-accessible, never plastic 3D or hyperrealistic. Balance pale sky blue, fresh sage green, warm yellow and restrained coral accents; avoid an all-brown or all-beige image. Keep props minimal, lighting clear, outlines readable at phone size. Landscape 3:2, target 1800 x 1200 pixels or larger. Keep the bird and essential objects inside the central 70% with comfortable edge margins. One finished editorial illustration, NOT a website screenshot, interface, poster, card or collage. No embedded text in any language, no numbers, no logos, no watermark, no speech bubbles. Accurate bird anatomy: two wings, two legs, no human hands on the bird, no extra toes or duplicated body parts.

HOUSING ACCURACY: For the living enclosure, clearly show horizontal climbing bars on both side panels, supported by vertical structural posts; do not render every panel with vertical bars only. Use a consistent illustrative clear gap of approximately 12.7 mm (1/2 inch), measured between facing bar surfaces, NOT bar thickness or center-to-center spacing. Maintain the same narrow gap at the door edges and corners; no widening, converging gaps, broken bars or openings that invite head entrapment. Do not put a bird's head or feet through a gap to demonstrate safety. Keep the adult bird's body proportions consistent across images; show genuinely ample enclosure space rather than shrinking the bird. Preserve room for fully extended wings, movement between perches and a long tail clear of floor, bars and objects AFTER equipment is installed. Secure natural perches of varied suitable diameters, no sandpaper or frayed rope, and separate shallow secured dishes outside droppings paths. No sharp ends, flaking coatings, rusty metal, open chain links, loose threads or crowded toys. Do not add a sleeping tent or nest box as a default furnishing. Dimensions in the prompt are design intent, not measurable proof from generated pixels; do not render any measurements or approval seals.

SCENE:
Create a quiet close view of the same adult cockatiel voluntarily eating familiar small dry bird food from a clean shallow secured dish inside a spacious enclosure. A separate clean shallow water dish is clearly visible and accessible. Position both dishes away from overhanging perches. Show the bird with relaxed, natural posture, no human hand near its beak. In a small secondary area outside the enclosure, show one plain unbranded closed food bag suggesting the previous caregiver's familiar food, with no printed words. Use soft blue, muted green and small warm-yellow accents. Frame the bird, two dishes and clear access as the subject. Do not show a diet ratio, giant food portions, treats as a complete diet, human sweets, a syringe, hand-feeding, or food being withheld. This depicts the first familiar meal, not an ideal lifelong menu.
```

### 05-settling: วันแรกควรทำอะไรกับน้อง?

- หน้า: `#/learn/cockatiel/welcome/settling`
- ชื่อไฟล์เสนอ: `cockatiel-05-settling.png`
- ตำแหน่ง: ใต้คำเกริ่น ก่อนเรื่องเข้าหา
- ภาพต้องสื่อ: มีพื้นที่ให้คุ้นเคย ไม่ต้องขึ้นมือวันแรก
- จุดตรวจเฉพาะ: ไม่วาดนกซึมเป็นการปรับตัวที่น่ารัก และไม่แสดงนกใหม่ใกล้นกเดิมราวกับกักแยกแล้ว

```text
Use the attached Birbest artwork as the visual reference, especially the warm illustrated cockatiel care scene. Keep the SAME individual adult grey cockatiel across the series: yellow head and crest, warm orange cheek patches, grey body, white wing patches, long grey tail, small pale beak, natural feet. Soft hand-painted storybook gouache and watercolor texture, gently fluffy feathers, expressive dark eyes, cute but believable anatomy. Friendly, thoughtful, premium-accessible, never plastic 3D or hyperrealistic. Balance pale sky blue, fresh sage green, warm yellow and restrained coral accents; avoid an all-brown or all-beige image. Keep props minimal, lighting clear, outlines readable at phone size. Landscape 3:2, target 1800 x 1200 pixels or larger. Keep the bird and essential objects inside the central 70% with comfortable edge margins. One finished editorial illustration, NOT a website screenshot, interface, poster, card or collage. No embedded text in any language, no numbers, no logos, no watermark, no speech bubbles. Accurate bird anatomy: two wings, two legs, no human hands on the bird, no extra toes or duplicated body parts.

HOUSING ACCURACY: For the living enclosure, clearly show horizontal climbing bars on both side panels, supported by vertical structural posts; do not render every panel with vertical bars only. Use a consistent illustrative clear gap of approximately 12.7 mm (1/2 inch), measured between facing bar surfaces, NOT bar thickness or center-to-center spacing. Maintain the same narrow gap at the door edges and corners; no widening, converging gaps, broken bars or openings that invite head entrapment. Do not put a bird's head or feet through a gap to demonstrate safety. Keep the adult bird's body proportions consistent across images; show genuinely ample enclosure space rather than shrinking the bird. Preserve room for fully extended wings, movement between perches and a long tail clear of floor, bars and objects AFTER equipment is installed. Secure natural perches of varied suitable diameters, no sandpaper or frayed rope, and separate shallow secured dishes outside droppings paths. No sharp ends, flaking coatings, rusty metal, open chain links, loose threads or crowded toys. Do not add a sleeping tent or nest box as a default furnishing. Dimensions in the prompt are design intent, not measurable proof from generated pixels; do not render any measurements or approval seals.

SCENE:
Create a gentle eye-level scene of the same adult cockatiel inside a spacious enclosure and a calm owner seated at a respectful distance outside it. The owner has both hands resting in their lap, a relaxed posture, and a quiet friendly expression, with no hand entering the enclosure. The bird stands naturally on its perch, alert but not frightened, able to move away into clear interior space. Include food and water as subtle background essentials. Use a simple uncluttered room with pale mint and blue tones and small pink accents. Make the physical space between the bird and person clearly visible; the emotional message is patience and trust without pressure. Show only one bird. No petting, chasing, grabbing, forced step-up, immediate cuddling, or multiple birds sharing a cage.
```

### 06-health: เรื่องสุขภาพต้องเริ่มตรงไหน?

- หน้า: `#/learn/cockatiel/welcome/health`
- ชื่อไฟล์เสนอ: `cockatiel-06-health.png`
- ตำแหน่ง: หลังคำเตือนเร่งด่วน ก่อนคำถามนัดตรวจ ไม่ดันคำเตือนลงท้ายหน้า
- ภาพต้องสื่อ: ขอความช่วยเหลือได้ ไม่ต้องวินิจฉัยเอง
- จุดตรวจเฉพาะ: เป็นภาพนัดปรึกษา ไม่ใช่ตัวอย่างอาการ/วิธีรักษา ไม่แสดงเครื่องหมายรับรองจากสัตวแพทย์

```text
Use the attached Birbest artwork as the visual reference, especially the warm illustrated cockatiel care scene. Keep the SAME individual adult grey cockatiel across the series: yellow head and crest, warm orange cheek patches, grey body, white wing patches, long grey tail, small pale beak, natural feet. Soft hand-painted storybook gouache and watercolor texture, gently fluffy feathers, expressive dark eyes, cute but believable anatomy. Friendly, thoughtful, premium-accessible, never plastic 3D or hyperrealistic. Balance pale sky blue, fresh sage green, warm yellow and restrained coral accents; avoid an all-brown or all-beige image. Keep props minimal, lighting clear, outlines readable at phone size. Landscape 3:2, target 1800 x 1200 pixels or larger. Keep the bird and essential objects inside the central 70% with comfortable edge margins. One finished editorial illustration, NOT a website screenshot, interface, poster, card or collage. No embedded text in any language, no numbers, no logos, no watermark, no speech bubbles. Accurate bird anatomy: two wings, two legs, no human hands on the bird, no extra toes or duplicated body parts.

TRANSPORT ACCURACY: This is a temporary travel carrier, not a permanent living enclosure. Show a stable closed carrier with unobstructed ventilation, a secure latch, room for natural posture and a tail that is not bent against the wall. No sealed box, fabric bag, exposed sharp mesh or opening large enough to trap the bird's head. Do not transfer living-cage dimensions or climbing-bar requirements to the carrier as a universal rule. No medical procedure or forced handling.

SCENE:
Create a warm, trustworthy consultation scene in a clean bird-friendly veterinary room. The same adult cockatiel remains comfortably inside a closed, ventilated, appropriately sized travel carrier on a stable examination table. A veterinarian in muted teal scrubs talks calmly with the owner, who holds a phone with a blank screen and an unbranded food package as discussion aids. No procedure is happening. Keep the bird clearly visible, anatomically natural and not restrained. Use clean pale blue and mint surroundings, soft daylight, minimal equipment and no clinic logos. The feeling is approachable professional help, not fear or a promise of perfect health. Do not show needles, medicine doses, home treatment, feeding syringes, diagnostic symbols, a stethoscope pressed against the bird, or an emergency being ignored.
```

## ภาพอธิบายเพิ่มเติม: ทำทีหลังได้

เริ่มจาก 7 ภาพหลักก่อน ไม่จำเป็นต้องสร้างภาพให้ทุกคำถาม ถ้าภาพหลักไม่ชัด ค่อยเพิ่มภาพด้านล่าง ใช้เป็นภาพแยก ไม่ให้โมเดลฝังรวมในภาพหลัก

### A. ช่องซี่กรง (1:1)

วางข้างคำถามระยะซี่กรง ตัวเลขอ้างอิงยังเป็นข้อความเว็บ

```text
Create a square 1:1 hand-painted educational detail illustration matching the Birbest soft gouache reference. Show ONLY three straight, HORIZONTAL, parallel, evenly spaced stainless-steel cage bars on a pale blue plain background, with an illustrative clear gap of approximately 12.7 mm (1/2 inch) BETWEEN facing metal surfaces, not a center-to-center measurement. Keep thickness visibly distinct from the empty gap. The rendered pixels cannot verify a real-world measurement. Crisp edges and simple composition, no bird, no ruler, no numbers, no arrows, no labels or text, no logo. This is a conceptual close-up of the empty gap, not a scale drawing. Leave generous margins for separately added accessible annotations outside the bitmap.
```

### B. เมล็ดกับเปลือก (3:2)

วางใต้คำถามชามยังเต็ม ให้คนตรวจเมล็ดและเปลือกว่าถูกต้องก่อนใช้ ไม่สื่อว่าชามว่างคือไม่กินแน่นอน

```text
Create a 3:2 educational macro illustration in the Birbest warm hand-painted gouache style. On a clean plain pale-blue surface show two small separated groups of the SAME type of pale millet seed: on the left, a few intact seeds; on the right, visibly split empty thin seed hulls with no kernel inside. Large readable forms, believable botanical structure, no bird, no bowls suggesting portion sizes, no sunflower seeds, no numbers, labels, arrows, words or logos. Keep the two groups visually distinct and clear at small screen size. Do not imply that empty hulls alone measure how much a bird has eaten.
```

### C. กักแยกคนละห้อง (3:2)

วางในบทปรับตัวหรือสุขภาพ ใช้ภาพเดียวร่วมกันได้ ไม่สร้างสองเวอร์ชันที่ขัดกัน

```text
Create a 3:2 simplified architectural cutaway illustration in Birbest's soft gouache style. Show two clearly separate enclosed rooms divided by a solid full-height wall with a closed door. Each room has its own spacious rectangular enclosure and one adult grey cockatiel. HOUSING ACCURACY: For the living enclosure, clearly show horizontal climbing bars on both side panels, supported by vertical structural posts; do not render every panel with vertical bars only. Use a consistent illustrative clear gap of approximately 12.7 mm (1/2 inch), measured between facing bar surfaces, NOT bar thickness or center-to-center spacing. Maintain the same narrow gap at the door edges and corners; no widening, converging gaps, broken bars or openings that invite head entrapment. Do not put a bird's head or feet through a gap to demonstrate safety. Keep the adult bird's body proportions consistent across images; show genuinely ample enclosure space rather than shrinking the bird. Preserve room for fully extended wings, movement between perches and a long tail clear of floor, bars and objects AFTER equipment is installed. Secure natural perches of varied suitable diameters, no sandpaper or frayed rope, and separate shallow secured dishes outside droppings paths. No sharp ends, flaking coatings, rusty metal, open chain links, loose threads or crowded toys. Do not add a sleeping tent or nest box as a default furnishing. Dimensions in the prompt are design intent, not measurable proof from generated pixels; do not render any measurements or approval seals. Birds do not touch or see each other directly; no shared dishes, toys or open doorway. Include minimal furniture and pale blue and sage accents. Clear educational layout, no words, arrows, dates, checkmarks, logos or decorative plants. This illustrates separate rooms only, not a guarantee of infection control or a complete quarantine protocol.
```

## ตรวจภาพก่อนนำเข้าเว็บ

1. ค็อกคาเทลตัวเดิมทุกหน้า สีแก้ม ปีก หาง และจำนวนอวัยวะไม่เปลี่ยน
2. ไม่มีข้อความเพี้ยน โลโก้ที่สร้างใหม่ หรือเครื่องหมายรับรองสุขภาพ
3. ภาพกรงต้องไม่สอนผิด: เห็นซี่แนวนอนบนด้านข้าง ช่องซี่และขอบประตูสม่ำเสมอ ไม่บิด/เว้นช่องใหญ่ ประตูปิดมั่นคง หางไม่ชน พื้นที่ไม่แน่น ชามไม่ใต้คอน หาก AI วาดโครงสร้างผิดให้ปฏิเสธภาพ ไม่แก้ด้วยคำบรรยายว่าปลอดภัย
4. ภาพอาหารไม่บอกสูตร สัดส่วน หรือปริมาณต่อวัน และไม่แทนคำเตือนว่าเมื่อนกไม่กินต้องขอความช่วยเหลือ
5. ภาพสุขภาพไม่ใช้สรุปว่าดูร่าเริงแล้วปลอดโรค ไม่แสดงการรักษาเอง
6. ไม่มีคำเตือนจำเป็นซ่อนในภาพอย่างเดียว ใส่คำอธิบายและ alt text ในเว็บเมื่อเลือกภาพจริงแล้ว
7. ภาพที่เกี่ยวกับการจัดกรง/อาหาร/สุขภาพต้องตรวจโดยคนที่มีความรู้ ไม่ถือว่า prompt ทำให้ผลลัพธ์ถูกต้องอัตโนมัติ

## แหล่งเนื้อหาและการส่งต่อ

ใช้แหล่งที่มีในแต่ละบทของ `flow.js`: VCA Housing Small Birds, Feeding Pet Cockatiels, Introducing a New Pet Bird, Anorexia and Lethargy; CFARE Cage Dimensions; Agriculture Victoria Owning a Bird; Merck Illness in Pet Birds ตรวจไว้ 28 กันยายน 2569 รอบนี้เป็นการตัดคำซ้ำ ไม่เพิ่มเกณฑ์ทางการแพทย์ใหม่

Owner: Digital Product / Brand. ผู้รับต่อ: Founder เพื่อสร้างและเลือกภาพ -> ผู้ตรวจเนื้อหาการเลี้ยงนก -> Digital Product เพื่อจัดวางและทดสอบมือถือ ไม่มีการเผยแพร่ภายนอกในงานนี้
