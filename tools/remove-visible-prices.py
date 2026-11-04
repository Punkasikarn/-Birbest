from pathlib import Path
import re
b=Path(__file__).resolve().parents[1]
for name in ['home-products.js','crochet-catalog.js']:
 p=b/name;s=p.read_text(encoding='utf-8')
 s=re.sub(r'<strong class="product-price">.*?</strong>','',s)
 s=s.replace('<b>${pack.price} บาท</b>','').replace('<strong data-pack-price>19 บาท</strong>','')
 s=s.replace("        section.querySelector('[data-pack-price]').textContent = `${pack.price} บาท`;\n",'')
 s=s.replace('ซื้อบน Shopee ↗','ดูราคาและสั่งซื้อบน Shopee ↗').replace('ซื้อบน Etsy ↗','ดูราคาและสั่งซื้อบน Etsy ↗').replace('ไปที่ร้าน Shopee ↗','ดูราคาที่ร้าน Shopee ↗')
 s=s.replace('<div class="product-detail-notes">${notes}', '<p class="footnote">ราคา ค่าจัดส่ง และโปรโมชันเป็นไปตามแต่ละช่องทาง</p><div class="product-detail-notes">${notes}')
 p.write_text(s,encoding='utf-8')
