from pathlib import Path
import json
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

b=Path(__file__).resolve().parents[1]/'qa-product-links-2026-11-03'
a=json.loads((b/'audit.json').read_text(encoding='utf-8'))
d=Document();s=d.sections[0];s.top_margin=s.bottom_margin=s.left_margin=s.right_margin=Cm(2)
for n in ['Normal','Title','Heading 1','Heading 2']:
 st=d.styles[n];st.font.name='TH Sarabun New';st.font.size=Pt(16 if n=='Normal' else 20);st.font.color.rgb=RGBColor(0,0,0)
 st.element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'),'TH Sarabun New')
st=d.styles['Normal'];st.paragraph_format.line_spacing=1;st.paragraph_format.space_after=Pt(7)
def hyperlink(url,item):
 p=d.add_paragraph();h=OxmlElement('w:hyperlink');h.set(qn('r:id'),p.part.relate_to(url,'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',is_external=True))
 r=OxmlElement('w:r');pr=OxmlElement('w:rPr');c=OxmlElement('w:color');c.set(qn('w:val'),'0563C1');pr.append(c);u=OxmlElement('w:u');u.set(qn('w:val'),'single');pr.append(u);r.append(pr);t=OxmlElement('w:t');t.text='https://shopee.co.th/product/1289399006/'+item;r.append(t);h.append(r);p._p.append(h)
d.add_heading('Link สินค้า Shopee',0)
for x in a['links']:
 p=d.add_paragraph(x['label']);p.paragraph_format.keep_with_next=True
 hyperlink(x['url'],x['id'])
d.add_page_break();d.add_heading('สินค้าที่ยังไม่ได้ใส่ลิงก์ Shopee',0)
d.add_paragraph('พวงกุญแจโครเชต์นกฟอพัส (Forpus)')
d.add_paragraph('ลิงก์: ______________________________________________')
d.add_page_break();d.add_heading('สินค้าที่ยังไม่ได้ใส่ลิงก์ Etsy',0)
for cat,title in [('crochet','พวงกุญแจโครเชต์'),('hat','หมวก'),('sticker','สติกเกอร์'),('keychain','พวงกุญแจอะคริลิค'),('pouch','กระเป๋าโครเชต์'),('shirt','เสื้อ')]:
 d.add_heading(title,1)
 for x in a['coverage']:
  if x['category']==cat:
   p=d.add_paragraph(x['title']);p.paragraph_format.keep_with_next=True
   d.add_paragraph('ลิงก์: ______________________________________________')
out=b/'Birbest_Product_Links_Simple_2026-11-03.docx';d.save(out)
assert len([r for r in d.part.rels.values() if 'hyperlink' in r.reltype])==63
print(out)
