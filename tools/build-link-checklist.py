from pathlib import Path
import json
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT

base=Path(__file__).resolve().parents[1]/'qa-product-links-2026-11-03'
a=json.loads((base/'audit.json').read_text(encoding='utf-8'))
d=Document();s=d.sections[0];s.top_margin=s.bottom_margin=Cm(1.8);s.left_margin=s.right_margin=Cm(1.8)
for name in ['Normal','Title','Heading 1','Heading 2']:
 st=d.styles[name];st.font.name='TH Sarabun New';st.font.color.rgb=RGBColor(0,0,0);st.font.size=Pt(16 if name=='Normal' else 24 if name=='Title' else 20)
 st.element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'),'TH Sarabun New')
d.styles['Normal'].paragraph_format.space_after=Pt(5)
d.styles['Normal'].paragraph_format.line_spacing=1.0
def p(t,style=None):return d.add_paragraph(t,style)
def table(headers,rows):
 t=d.add_table(rows=1,cols=len(headers));t.alignment=WD_TABLE_ALIGNMENT.CENTER
 for c,v in zip(t.rows[0].cells,headers):
  c.text=v
  for r in c.paragraphs[0].runs:r.bold=True
  sh=OxmlElement('w:shd');sh.set(qn('w:fill'),'E8EFF0');c._tc.get_or_add_tcPr().append(sh)
 rep=OxmlElement('w:tblHeader');t.rows[0]._tr.get_or_add_trPr().append(rep)
 for vals in rows:
  cells=t.add_row().cells
  for c,v in zip(cells,vals):c.text=v;c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
 for row in t.rows:
  cant=OxmlElement('w:cantSplit');row._tr.get_or_add_trPr().append(cant)
  for c in row.cells:
   borders=OxmlElement('w:tcBorders')
   for side in ['top','left','bottom','right']:
    el=OxmlElement('w:'+side);el.set(qn('w:val'),'single');el.set(qn('w:sz'),'4');el.set(qn('w:color'),'D9D9D9');borders.append(el)
   c._tc.get_or_add_tcPr().append(borders)
   for pa in c.paragraphs:
    pa.paragraph_format.space_after=Pt(3)
 return t
def link(pa,label,url):
 rid=pa.part.relate_to(url,'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',is_external=True)
 h=OxmlElement('w:hyperlink');h.set(qn('r:id'),rid);r=OxmlElement('w:r');pr=OxmlElement('w:rPr');co=OxmlElement('w:color');co.set(qn('w:val'),'086674');pr.append(co);r.append(pr);tx=OxmlElement('w:t');tx.text=label;r.append(tx);h.append(r);pa._p.append(h)
p('รายการลิงก์สินค้าและรายการที่ยังขาด','Title')
p('Birbest | ตรวจวันที่ 3 พฤศจิกายน 2569')
p('ใช้เติมลิงก์ก่อนนำลงเว็บไซต์ เทียบไฟล์ Link สินค้า .docx กับสินค้าในเว็บไซต์ 89 รายการ โดยเก็บต้นฉบับไว้และยังไม่เปลี่ยนปุ่มซื้อบนเว็บไซต์')
p('สรุปผลตรวจ','Heading 1')
p('พบลิงก์ 73 รายการ ตัดรายการซ้ำตามรหัสสินค้า 10 รายการ เหลือ 63 ลิงก์ Shopee ไม่พบลิงก์ Etsy ในไฟล์ที่ได้รับ')
p('ยังไม่มีลิงก์ที่ระบุชัด','Heading 2')
p('• พวงกุญแจโครเชต์ Forpus (ฟอพัส) — Shopee\n• Etsy ของสินค้างานฝีมือและงานอาร์ต 85 รายการ — ระบุชื่อครบในตารางหน้าถัดไป หากยังไม่มีขายให้เขียน “ยังไม่มีขาย”\n• Daily Pack Mixed Seed ขนาด 30 ซอง — ยังไม่มีชื่อ 30 วันชัดเจน อาจอยู่ในลิงก์แพ็กรวม จึงต้องยืนยันก่อนขอลิงก์ใหม่')
p('มีลิงก์แล้ว แต่ต้องยืนยันก่อนใช้','Heading 2')
p('Daily Pack ทั้ง 4 ลิงก์มีป้ายชื่อ Starter 1/7 วันซ้ำกัน แต่สอง URL ไม่มีคำ Starter ต้องระบุว่าสูตรใดและขนาดใดอยู่ในแต่ละลิงก์ ห้ามลบต่างรหัสว่าเป็นรายการซ้ำ')
p('หมวก 2 ลาย กระเป๋า 15 ลาย สติกเกอร์ 6 ลาย และพวงกุญแจอะคริลิค AS01–AS08 มีลิงก์รวมหมวดละ 1 ลิงก์แล้ว ใช้ลิงก์เดิมซ้ำได้เมื่อยืนยันว่ามีตัวเลือกตรงลาย ไม่จำเป็นต้องสร้างลิงก์ใหม่ทุกลาย')
p('ชื่อโครเชต์ในเว็บไซต์กับชื่อที่ให้มาบางแบบต่างกัน เช่น สีค็อกคาเทล กรีนชีค และ Hahn’s Macaw จึงเป็นการจับคู่เบื้องต้น ยังไม่ยืนยันภาพและตัวเลือกจริง')
p('หมายเหตุ: ทดลองเปิด Shopee บางหน้าแล้วเครื่องมือตรวจเข้าถึงไม่ได้ รายงานนี้จึงตรวจจากชื่อและรหัสลิงก์ที่ได้รับ ไม่ยืนยันสต็อก ราคา หรือการเปิดหน้าจริง')
d.add_page_break()
p('ตารางเติมลิงก์สินค้าทั้งหมด','Heading 1')
p('ช่อง Shopee แสดงรหัสสินค้าที่อาจตรงจากชื่อ ใช้ค้นในรายการลิงก์ท้ายเอกสารได้ ส่วนช่อง Etsy ยังไม่ได้รับทั้งหมด ตารางนี้ไม่ใช่การยืนยันว่าลิงก์และลายตรงกันแล้ว')
groups=[('daily','อาหารรายวัน'),('crochet','พวงกุญแจโครเชต์'),('hat','หมวก'),('sticker','สติกเกอร์'),('keychain','พวงกุญแจอะคริลิค'),('pouch','กระเป๋าโครเชต์'),('shirt','เสื้อ'),('bird-toy','ของเล่นและอุปกรณ์นก')]
for category,title in groups:
 p(title,'Heading 2');items=[x for x in a['coverage'] if x['category']==category]
 rows=[]
 for x in items:
  sh=x['candidate_ids'] or 'ยังไม่มีลิงก์ — เติม: __________'
  if category=='daily':sh='ยืนยันสูตร/ขนาดจาก 4 ลิงก์ท้ายเอกสาร\n1 ซอง: ______\n7 ซอง: ______\n30 ซอง: ______'
  elif category in ['pouch','hat','keychain','sticker']:sh+='\nลิงก์รวม — ยืนยันลาย: ______'
  else:sh+='\nยืนยัน/แก้ลิงก์: ______' if x['candidate_ids'] else ''
  et='ไม่ได้รับลิงก์\nเติม: __________________' if category not in ['daily','bird-toy'] else 'Shopee เท่านั้นตามข้อมูลปัจจุบัน'
  rows.append([x['title'],sh,et])
 table(['สินค้า / ลาย','Shopee','Etsy'],rows)
d.add_page_break();p('ลิงก์ที่ตัดรายการซ้ำแล้ว','Heading 1')
p('63 ลิงก์ กดที่รหัสสินค้าเพื่อเปิด URL เดิมพร้อมข้อมูลตัวเลือกที่ให้มา ชื่อแสดงจาก URL เพื่อช่วยตรวจป้ายชื่อที่คลาดเคลื่อน ไม่ใช่ชื่อที่ยืนยันจากหน้าร้านสด')
for category,title in [('daily','Daily Pack ต้องยืนยันสูตรและขนาด'),('crochet','พวงกุญแจโครเชต์'),('pouch','กระเป๋า'),('hat','หมวก'),('sticker','สติกเกอร์'),('keychain','พวงกุญแจอะคริลิค'),('shirt','เสื้อ'),('toy','ของเล่นและอุปกรณ์')]:
 p(title,'Heading 2')
 for x in [u for u in a['links'] if u['category']==category]:
  name=x['title'].replace('BIRBEST ','').replace('พวงกุญแจโครเชต์','')
  pa=p(name);pa.paragraph_format.keep_with_next=True
  if category=='daily':p('ป้ายชื่อเดิม: '+x['label']).paragraph_format.keep_with_next=True
  link(p('ลิงก์: '),x['id'],x['url'])
p('รายการซ้ำที่นำออก','Heading 1')
for x in a['links']:
 if x['occurrences']>1:p(x['title'].replace('BIRBEST ','')+' | '+x['id']+' | ตัดซ้ำ '+str(x['occurrences']-1)+' รายการ')
footer=s.footer.paragraphs[0];footer.alignment=2
footer.add_run('Birbest | ');fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');footer._p.append(fld)
out=base/'Birbest_Product_Links_Checklist_2026-11-03.docx';d.save(out)
assert len([r for r in d.part.rels.values() if 'hyperlink' in r.reltype])==63
assert sum(len([x for x in a['coverage'] if x['category']==c]) for c,_ in groups)==89
print(out)
