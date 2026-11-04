from pathlib import Path
import json,re,hashlib
from docx import Document
from docx.shared import Cm,Pt,RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

b=Path(__file__).resolve().parents[1]/'qa-product-links-2026-11-03'
src=b/'Birbest_Product_Links_Simple_2026-11-03.docx'
before=hashlib.sha256(src.read_bytes()).hexdigest()
original=Document(src);a=json.loads((b/'audit.json').read_text(encoding='utf-8'))
shop={};etsy={};last=''
for p in original.paragraphs:
 text=''.join(p._p.xpath('.//w:t/text()'))
 urls=re.findall(r'https?://[^\s]+',text)
 for h in p._p.xpath('.//w:hyperlink'):
  rid=h.get(qn('r:id'))
  if rid in original.part.rels:urls.append(original.part.rels[rid].target_ref)
 for u in urls:
  sm=re.search(r'(?:i\.|/product/)(\d+)[./](\d+)',u)
  em=re.search(r'etsy.com/listing/(\d+)',u)
  if sm:
   key=sm.group(2)
   if key not in shop:shop[key]={'id':key,'name':last,'url':u,'category':next((x['category'] for x in a['links'] if x['id']==key),'crochet')}
  if em:etsy[em.group(1)]=u.split('?')[0]
 if text.strip() and not urls and not text.startswith('ลิงก์:'):last=text.strip()
assert len(shop)==64,(len(shop),shop.keys())
assert len(etsy)==14
# Browser-observed listing options, 2026-11-03. Sold-out options remain listed.
verified=[
('1763495839','Cockatiel Crochet','Lutino, cinnamon pied, silver, normal, white, yellow'),
('1745786694','Sun Conure Crochet','Sun Conure'),
('1762874105','Budgie Crochet','blue, purple'),
('1780229777','Cockatoo Crochet','Moluccan (sold out), Greater, Mitchell, Galah, Umbrella'),
('1774603109','Green-cheek Conure Crochet','Turquoise, Blue yellow, normal, pineapple'),
('1762329826','Forpus / Parrotlet Crochet','Parrotlet'),
('1749293292','Lovebird Crochet','orange-yellow, peach faced, black masked'),
('1771884666','Rainbow Lorikeet Crochet','Rainbow Lorikeet'),
('1754335000','Indian Ringneck Crochet','yellow, green, purple'),
('4337979087','Chirpy Fluffy Hat','sun conure, cockatiel'),
('1750370495','Sun Conure Acrylic Keychain','AS01, AS02, AS03, AS05, AS06, AS07, AS08'),
('1774986598','Crochet Pouch','eclectus green, sunconure, cockatiel, cockatoo, budgie blue, greencheek, scarlet macaw, amazon, galah, major mitchell’s, forpus, monk, moluccan, hyacinth, blue gold macaw, ringneck purple, lovebird black, budgie purple, golden conure, african grey'),
('1745903680','Sun Conure Crop T-Shirt','S, M, L'),
('1831945996','Chirp Snug Hut','pineapple greencheek, lovebird, green cheek, parrotlet, cockatiel, sunconure')]
covered=set()
for x in a['coverage']:
 s=x['slug'];c=x['category']
 if c in ['hat','pouch','shirt'] or (c=='keychain' and 'as04' not in s) or s=='chirp-snug-hut':covered.add(s)
 if c=='crochet' and (s.startswith(('cockatiel','cockatoo','budgie','greencheek','lovebird','ringneck')) or s in ['sun-conure-crochet','forpus','rainbow-lorikeet']):covered.add(s)
missing=[x for x in a['coverage'] if x['slug'] not in covered and x['category']!='daily']
d=Document();sec=d.sections[0];sec.top_margin=sec.bottom_margin=sec.left_margin=sec.right_margin=Cm(2)
for n in ['Normal','Title','Heading 1','Heading 2']:
 st=d.styles[n];st.font.name='TH Sarabun New';st.font.size=Pt(16 if n=='Normal' else 22 if n=='Title' else 19);st.font.color.rgb=RGBColor(0,0,0)
 st.element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'),'TH Sarabun New')
 # Remove the inherited title border from the installed Word template.
 for border in st.element.xpath('.//w:pBdr'):border.getparent().remove(border)
d.styles['Normal'].paragraph_format.line_spacing=1;d.styles['Normal'].paragraph_format.space_after=Pt(6)
def p(t,keep=False):
 pa=d.add_paragraph(t);pa.paragraph_format.keep_with_next=keep;return pa
def link(url,label=None):
 pa=d.add_paragraph();h=OxmlElement('w:hyperlink');h.set(qn('r:id'),pa.part.relate_to(url,'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',is_external=True))
 r=OxmlElement('w:r');pr=OxmlElement('w:rPr');color=OxmlElement('w:color');color.set(qn('w:val'),'0563C1');pr.append(color);under=OxmlElement('w:u');under.set(qn('w:val'),'single');pr.append(under);r.append(pr);t=OxmlElement('w:t');t.text=label or url;r.append(t);h.append(r);pa._p.append(h)
d.add_heading('ลิงก์สินค้า Birbest',0)
p('จัดหมวดหมู่ Shopee และ Etsy | 3 พฤศจิกายน 2569')
p('Shopee 64 ลิงก์ | Etsy 14 ลิงก์รวมสินค้า แต่ละลิงก์ Etsy ใช้กับสีและลายที่แสดงไว้ใต้ชื่อสินค้า')
d.add_heading('Shopee',1)
for cat,title in [('daily','อาหาร Daily Pack'),('crochet','พวงกุญแจโครเชต์'),('hat','หมวก'),('pouch','กระเป๋าโครเชต์'),('sticker','สติกเกอร์'),('keychain','พวงกุญแจอะคริลิค'),('shirt','เสื้อ'),('toy','ของเล่นและอุปกรณ์นก')]:
 d.add_heading(title,2)
 for x in [v for v in shop.values() if v['category']==cat]:
  p(x['name'],True);url='https://shopee.co.th/product/1289399006/'+x['id'];link(x['url'],url)
d.add_page_break();d.add_heading('Etsy',1)
p('ตรวจชื่อสินค้าและตัวเลือกจากหน้าร้านโดยตรงแล้ว ลิงก์รวมแสดงครั้งเดียวต่อสินค้าเพื่อค้นง่าย')
for i,(id,title,options) in enumerate(verified):
 if i in [0,9,10,11,12,13]:d.add_heading({0:'พวงกุญแจโครเชต์',9:'หมวก',10:'พวงกุญแจอะคริลิค',11:'กระเป๋าโครเชต์',12:'เสื้อ',13:'ของเล่นและอุปกรณ์นก'}[i],2)
 p(title,True);link(etsy[id]);p('สี / ลาย / ขนาด: '+options)
d.add_heading('รายการ Etsy ที่ไม่พบในลิงก์และหน้าร้านที่ตรวจ',1)
p('แยกไว้สำหรับเติมลิงก์ในภายหลัง ไม่ใช้ลิงก์ของสินค้าอื่นแทน')
for cat,title in [('crochet','พวงกุญแจโครเชต์'),('keychain','พวงกุญแจอะคริลิค'),('sticker','สติกเกอร์'),('bird-toy','ของเล่นและอุปกรณ์นก')]:
 items=[x for x in missing if x['category']==cat]
 if items:
  d.add_heading(title,2)
  for x in items:p(x['title'],True);p('ลิงก์: ______________________________________________')
p('AS04 ไม่มีในตัวเลือก Etsy ที่ตรวจ ส่วน Moluccan Crochet ยังอยู่ในลิงก์รวม Cockatoo แต่แสดง sold out ณ วันที่ตรวจ')
p('สินค้า Etsy เพิ่มเติมที่พบ แต่ยังไม่มีในเว็บไซต์: BIRBEST Halloween Bird-Themed Digital Sticker Pack (เป็นสติกเกอร์ดิจิทัล ไม่ใช่แพ็กคู่ที่มีในเว็บไซต์)',True)
link('https://www.etsy.com/listing/1809879301/birbest-halloween-bird-themed-digital')
out=b/'Birbest_Product_Links_Organized_2026-11-03.docx';d.save(out)
assert hashlib.sha256(src.read_bytes()).hexdigest()==before
(b/'organized-links-audit.json').write_text(json.dumps({'source':str(src),'source_sha256':before,'shopee':list(shop.values()),'etsy_verified':[{'id':i,'name':n,'options':o,'url':etsy[i]} for i,n,o in verified],'etsy_missing_from_checked_shop':missing,'website_changed':False},ensure_ascii=False,indent=2),encoding='utf-8')
print('Shopee',len(shop),'Etsy',len(verified),'missing',len(missing));print(out)
