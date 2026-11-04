from pathlib import Path
from docx import Document
from urllib.parse import unquote, urlsplit
from collections import Counter
import re, json, csv, html

BASE = Path(__file__).resolve().parents[1]
OUT = BASE / 'qa-product-links-2026-11-03'
OUT.mkdir(exist_ok=True)
SOURCE = Path('C:/Users/punka/OneDrive/Desktop/Link สินค้า .docx')
d = Document(SOURCE)
rows = []
previous = ''
for i, p in enumerate(d.paragraphs):
    text = ''.join(p._p.xpath('.//w:t/text()'))
    urls = re.findall(r'https?://[^\s]+', text)
    label = re.split(r'https?://', text)[0].strip() or previous
    for u in urls:
        m = re.search(r'i\.(\d+)\.(\d+)', u)
        assert m, ('Unrecognized URL', u)
        decoded = unquote(urlsplit(u).path).strip('/')
        title = re.sub(r'-i\.\d+\.\d+$', '', decoded).replace('-', ' ')
        rows.append(dict(id=m.group(2), label=label, url=u, title=title, paragraph=i+1))
    if text.strip() and not urls:
        previous = text.strip()
counts = Counter(x['id'] for x in rows)
unique = list({x['id']: x for x in reversed(rows)}.values())[::-1]
assert len(rows)==73 and len(unique)==63
for x in unique:
    x['occurrences']=counts[x['id']]
    x['category']=('daily' if 'Daily' in x['title'] else 'crochet' if 'พวงกุญแจโครเชต์' in x['title'] else 'pouch' if 'Pouch' in x['title'] else 'hat' if 'HAT' in x['title'] else 'shirt' if 'เสื้อ' in x['title'] else 'sticker' if 'สติ๊ก' in x['title'] else 'keychain' if 'อะคริลิค' in x['title'] else 'toy')
catalog=[]
for f in BASE.glob('*data.js'):
    s=f.read_text(encoding='utf-8')
    for x in json.loads(s[s.index('['):].strip().rstrip(';')):
        catalog.append(dict(slug=x['slug'],title=x['title'],category=f.stem.replace('-data','')))
catalog.append(dict(slug='daily-pack',title='Mixed Seed Daily Pack (1 / 7 / 30)',category='daily'))
# Explicit title correspondences are candidates, not verified listing variants.
names = {
'cockatiel-crochet':'นกค๊อกคาเทล','sun-conure-crochet':'นกแก้วซันคอนัวร์','african-grey':'นกแอฟริกันเกรย์','alexandrine':'นกแก้วโม่ง','budgie-blue':'นกหงส์หยก','budgie-purple':'นกหงส์หยกม่วง','caique-black-head':'นกไคท์หัวดำ','caique-normal':'นกไคท์','cockatiel-white':'นกค๊อกคาเทลขาว','cockatiel-white-grey':'นกค๊อกคาเทลเทา','cockatiel-yellow':'นกค๊อกคาเทลลูติโน่','cockatiel-yellow-grey':'นกค๊อกคาเทลเทาเหลือง','cockatiel-yellow-grey-white':'นกค๊อกคาเทลซินนามอนพาย','cockatoo-galah':'นกกระตั้วกาล่า','cockatoo-greater':'นกกระตั้วหงอนเหลือง','cockatoo-mitchell':'นกกระตั้วเมเจอร์มิเชล','cockatoo-moluccan':'นกกระตั้วมอลลัคคัน','cockatoo-umbrella':'นกกระตั้ว','conure-golden':'นกโกลเดนคอนัวร์','greencheek-black-green-cream':'นกกรีนชีคบลูเยลโล','greencheek-black-green-red':'นกกรีนชีค','greencheek-turquoise':'นกกรีนชีคเทอควอยซ์','conure-crimson':'นกคริมสันเบลลี่คอนัวร์','greencheek-pineapple':'นกกรีนชีคพายแอปเปิ้ล','eclectus-green':'นกอิเล็กตัสเขียว','eclectus-red':'นกอิเล็กตัสแดง','lovebird-black-green':'นกเลิฟเบิร์ดหัวดำ','lovebird-orange':'นกเลิฟเบิร์ด','lovebird-pink-green':'นกเลิฟเบิร์ดหน้าพีช','macaw-blue-gold':'นกบลูโกลด์มาคอว์','macaw-hahns-green':'นกฮันมาคอว์','macaw-hahns-blue':'นกฮันมาคอว์','macaw-hyacinth':'นกไฮยาซิน','macaw-scarlet':'นกมาคอว์','monk-blue':'นกม๊องค์ฟ้า','monk-green':'นกม๊องค์','rainbow-lorikeet':'นกสายรุ้งลอรี่คีท','ringneck-green':'นกริงเนคเขียว','ringneck-purple':'นกริงเนคม่วง','ringneck-yellow':'นกริงเนคเหลือง','hen':'ไก่','crow':'อีกา','call-duck':'เป็ดคอลดัค','mallard-duck':'เป็ดมัลลาร์ด','shima-enaga':'นกชิมะ นกญี่ปุ่น','flamingo':'นกฟลามิงโก้','owl':'นกฮูก','peacock':'นกยูง','pigeon':'นกพิราบ','sparrow-female':'นกกระจอกสาว','sparrow':'นกกระจอก','toucan':'นกเงือก'}
for x in catalog:
    group=[u for u in unique if u['category']==('toy' if x['category']=='bird-toy' else x['category'])]
    if x['category']=='bird-toy':
        group=[u for u in group if x['title'] in u['title']]
    if x['category']=='crochet':
        want='BIRBEST พวงกุญแจโครเชต์'+names.get(x['slug'],'__MISSING__')
        candidates=[u for u in group if u['title']==want]
    else:
        candidates=group
    x['candidate_ids']='; '.join(u['id'] for u in candidates)
    x['status']='พบลิงก์ที่อาจตรง ต้องยืนยันลาย/ตัวเลือก' if candidates else 'ไม่พบลิงก์ในไฟล์'
    if x['category']=='daily': x['status']='ชื่อ Starter ขัดกับ URL บางรายการ; ไม่พบชื่อ 30 วันชัดเจน ต้องยืนยันสูตรและขนาด'
assert len(catalog)==89
for name, data in [('links-clean.csv',unique),('catalog-coverage.csv',catalog)]:
    with (OUT/name).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(data[0]));w.writeheader();w.writerows(data)
(OUT/'audit.json').write_text(json.dumps(dict(source=str(SOURCE),occurrences=len(rows),unique=len(unique),removed=10,category_counts=dict(Counter(u['category'] for u in unique)),links=unique,coverage=catalog),ensure_ascii=False,indent=2),encoding='utf-8')
e=html.escape
parts=['<!doctype html><meta charset="utf-8"><title>ตรวจลิงก์สินค้า 3 พฤศจิกายน 2569</title><style>body{font:16px Tahoma,sans-serif;line-height:1.7;max-width:1100px;margin:40px auto;padding:20px;color:#202a2b}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:10px;text-align:left}a{color:#086674}h2{margin-top:36px}</style><h1>ตรวจลิงก์สินค้าก่อนลงเว็บไซต์</h1><p>ต้นฉบับไม่ถูกแก้ไข เว็บไซต์ยังไม่เปลี่ยนแปลง ตรวจเทียบแค็ตตาล็อกในเครื่อง 89 รายการ ไม่ใช่หลักฐานว่าร้านออนไลน์มีสินค้าเท่านี้</p><p>พบ 73 รายการ ตัดซ้ำตามรหัสสินค้า 10 รายการ เหลือ 63 ลิงก์ ไม่ลบสินค้าต่างรหัสเพียงเพราะชื่อคล้ายกัน เก็บ URL พร้อมตัวเลือกเดิมไว้</p><p><strong>ยังยืนยันความครบไม่ได้</strong>: ไม่มี Etsy ในไฟล์; Pouch, หมวก, สติกเกอร์ และพวงกุญแจอะคริลิคเป็นลิงก์รวม ต้องยืนยันตัวเลือกให้ครบทุกลาย ไม่จำเป็นต้องส่งลิงก์ซ้ำหนึ่งลิงก์ต่อลาย</p><p>Daily Pack 4 รหัสมีป้ายชื่อ Starter 1/7 วันซ้ำกัน แต่สอง URL ไม่มีคำ Starter จึงห้ามจับคู่สูตรอัตโนมัติ ไม่มีชื่อ 30 วันชัดเจน อาจอยู่ในตัวเลือกแพ็กรวม ต้องตรวจเพิ่ม</p><p>ทดลองเปิด Shopee 3 หน้าแล้วเครื่องมือตรวจเข้าถึงไม่ได้ จึงยังไม่รับรองลิงก์เปิดได้ สต็อก ราคา หรือรายการตัวเลือกจริง</p><h2>รายการซ้ำที่ตัดออก</h2><ul>']
for u in unique:
    if counts[u['id']]>1: parts.append(f'<li>{e(u["title"])} — {u["id"]} ตัด {counts[u["id"]]-1} รายการ</li>')
parts.append('</ul><h2>ลิงก์หลังตัดซ้ำ 63 รายการ</h2><table><tr><th>รายการ</th><th>รหัสสินค้า / เปิดลิงก์</th></tr>')
for u in unique: parts.append(f'<tr><td>{e(u["title"])}</td><td><a href="{e(u["url"],quote=True)}">{u["id"]}</a></td></tr>')
parts.append('</table><h2>เทียบสินค้าเว็บไซต์ 89 รายการ</h2><p>การจับคู่ข้างล่างอิงชื่อที่ได้รับเท่านั้น โดยเฉพาะสี/ลายเป็นข้อเสนอให้ตรวจ ไม่ใช่การยืนยัน ห้ามนำ candidate ไปใส่ปุ่มซื้อโดยอัตโนมัติ</p><table><tr><th>สินค้าเว็บไซต์</th><th>รหัสที่อาจตรง</th><th>สถานะ</th></tr>')
for x in catalog:parts.append(f'<tr><td>{e(x["title"])}</td><td>{e(x["candidate_ids"])}</td><td>{e(x["status"])}</td></tr>')
parts.append('</table>')
(OUT/'ตรวจลิงก์สินค้า.html').write_text('\n'.join(parts),encoding='utf-8')
print(json.dumps(dict(occurrences=len(rows),unique=len(unique),categories=dict(Counter(u['category'] for u in unique)),no_candidates=[x['title'] for x in catalog if not x['candidate_ids']]),ensure_ascii=False))
