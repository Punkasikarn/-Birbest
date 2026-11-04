import json
from pathlib import Path
b=Path(__file__).resolve().parents[1]
a=json.loads((b/'qa-product-links-2026-11-03/audit.json').read_text(encoding='utf-8'))
out={}
for x in a['coverage']:
 s=x['slug'];c=x['category'];ids=x['candidate_ids'].split('; ')
 if c=='daily':continue
 if s=='forpus':ids=['27757727198']
 row={'shopee':'https://shopee.co.th/product/1289399006/'+ids[0]}
 eid=None
 if c=='crochet':
  for prefix,id in [('cockatiel','1763495839'),('cockatoo','1780229777'),('budgie','1762874105'),('greencheek','1774603109'),('lovebird','1749293292'),('ringneck','1754335000')]:
   if s.startswith(prefix):eid=id
  eid={'sun-conure-crochet':'1745786694','forpus':'1762329826','rainbow-lorikeet':'1771884666'}.get(s,eid)
 if c=='hat':eid='4337979087'
 if c=='pouch':eid='1774986598'
 if c=='shirt':eid='1745903680'
 if c=='keychain' and not s.endswith('as04'):eid='1750370495'
 if s=='chirp-snug-hut':eid='1831945996'
 if eid:row['etsy']='https://www.etsy.com/listing/'+eid
 out[s]=row
assert len(out)==88
(b/'marketplace-links.js').write_text('// Founder links and Etsy variant inspection, 2026-11-03. Daily formula mapping remains separate.\nwindow.BirbestMarketplaceLinks = '+json.dumps(out,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
