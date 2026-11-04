from pathlib import Path
import hashlib
import json
import shutil

root = Path(__file__).resolve().parent.parent
source = Path('E:/06-BIRBEST/02_Product/02_Crochet')
inventory = json.loads((root / 'qa-crochet/inventory.json').read_text(encoding='utf-8'))
# Curated from the numbered review sheets, not inferred from download filenames.
rows = [
('cockatiel-crochet','Cockatiel · Yellow White','Cockatiel',[51,49,52,50,53]),
('sun-conure-crochet','Sun Conure','Conure',[115,101,113,102,108,109,110,111,112,104,105,106,107,114,116,117]),
('african-grey','African Grey','African Grey',[0,1,4,2]),
('alexandrine','Alexandrine','Alexandrine',[5,7,6,9]),
('budgie-blue','Budgie · Blue','Budgie',[10,12,13,11]),
('budgie-purple','Budgie · Purple','Budgie',[15,14,16,17]),
('caique-black-head','Caique · Black Head','Caique',[21,20,19,22]),
('caique-normal','Caique · Normal','Caique',[26,23,24,25]),
('cockatiel-white','Cockatiel · White','Cockatiel',[29,32,30,31]),
('cockatiel-white-grey','Cockatiel · White Grey','Cockatiel',[33,35,36,34]),
('cockatiel-yellow','Cockatiel · Yellow','Cockatiel',[37,39,40,38]),
('cockatiel-yellow-grey','Cockatiel · Yellow Grey','Cockatiel',[43,42,41,44]),
('cockatiel-yellow-grey-white','Cockatiel · Yellow Grey White','Cockatiel',[48,45,46,47]),
('cockatoo-galah','Galah Cockatoo','Cockatoo',[56,54,57,55]),
('cockatoo-greater','Greater Cockatoo','Cockatoo',[59,58,61,60]),
('cockatoo-mitchell','Mitchell Cockatoo','Cockatoo',[62,65,63,64]),
('cockatoo-moluccan','Moluccan Cockatoo','Cockatoo',[68,67,69,66]),
('cockatoo-umbrella','Umbrella Cockatoo','Cockatoo',[71,74,72,73]),
('conure-golden','Golden Conure','Conure',[78,77,75,76]),
('greencheek-black-green-cream','Green-cheek · Black Green Cream','Conure',[79,81,80,82]),
('greencheek-black-green-red','Green-cheek · Black Green Red','Conure',[85,83,86,84]),
('greencheek-turquoise','Green-cheek · Turquoise','Conure',[89,87,88,90]),
('conure-crimson','Crimson-bellied Conure','Conure',[94,92,93,95]),
('greencheek-pineapple','Green-cheek · Pineapple','Conure',[98,96,97,99]),
('eclectus-green','Eclectus · Green','Eclectus',[119,118,121,120]),
('eclectus-red','Eclectus · Red','Eclectus',[125,123,122,124]),
('forpus','Forpus','Forpus',[127,129,131,128]),
('lovebird-black-green','Lovebird · Black Green','Lovebird',[133,134,135,132]),
('lovebird-orange','Lovebird · Orange','Lovebird',[137,138,136,139]),
('lovebird-pink-green','Lovebird · Pink Green','Lovebird',[143,142,141,140]),
('macaw-blue-gold','Blue Gold Macaw','Macaw',[149,147,145,146]),
('macaw-hahns-green',"Hahn's Macaw · Green",'Macaw',[150,152]),
('macaw-hahns-blue',"Hahn's Macaw · Blue",'Macaw',[151,154,153]),
('macaw-hyacinth','Hyacinth Macaw','Macaw',[155,157,156,148]),
('macaw-scarlet','Scarlet Macaw','Macaw',[163,160,161,159]),
('monk-blue','Monk · Blue','Monk',[169,168,167,166]),
('monk-green','Monk · Green','Monk',[172,171,170,173]),
('rainbow-lorikeet','Rainbow Lorikeet','Rainbow Lorikeet',[176,179,177,175]),
('ringneck-green','Indian Ringneck · Green','Ringneck',[183,180,182,181]),
('ringneck-purple','Indian Ringneck · Purple','Ringneck',[184,185,187,186]),
('ringneck-yellow','Indian Ringneck · Yellow','Ringneck',[191,192,189,190]),
('hen','Hen','Other Birds',[193,195,194]),
('crow','Crow','Other Birds',[199,197,198]),
('call-duck','Call Duck','Other Birds',[202,201,203]),
('mallard-duck','Mallard Duck','Other Birds',[204,205,206]),
('shima-enaga','Shima-enaga','Other Birds',[210,212,211]),
('flamingo','Flamingo','Other Birds',[213,214,215]),
('owl','Owl','Other Birds',[217,220,219]),
('peacock','Peacock','Other Birds',[221,224,222]),
('pigeon','Pigeon','Other Birds',[226,228,227]),
('sparrow-female','Sparrow · Female','Other Birds',[229,230,233]),
('sparrow','Sparrow','Other Birds',[234,236,235]),
('toucan','Toucan','Other Birds',[239,238,237]),
]
# Catalog-only selections; keep the detail galleries and source images unchanged.
catalog_covers = {
    'cockatiel-crochet': 49,
    'sun-conure-crochet': 101,
    'budgie-blue': 12,
    'caique-black-head': 20,
    'cockatiel-yellow-grey': 42,
    'cockatoo-greater': 58,
    'cockatoo-mitchell': 65,
    'cockatoo-moluccan': 67,
    'eclectus-green': 118,
    'macaw-hyacinth': 157,
    'monk-blue': 168,
    'monk-green': 171,
    'ringneck-green': 180,
}
dest = root / 'assets/crochet'
dest.mkdir(parents=True, exist_ok=True)
products = []
used = set()
for slug, title, group, indices in rows:
    shots = []
    for i in indices:
        item = inventory[i]
        p = source / item['source']
        digest = hashlib.sha256(p.read_bytes()).hexdigest()
        name = f'{slug}-{len(shots)+1}{p.suffix.lower()}'
        shutil.copy2(p, dest / name)
        shots.append({'file':'crochet/'+name, 'width':item['width'], 'height':item['height'], 'source':item['source'], 'sha256':digest})
        used.add(i)
    products.append({'slug':slug, 'title':title, 'group':group, 'price':299, 'coverIndex':indices.index(catalog_covers.get(slug, indices[0])), 'shots':shots})
(root / 'crochet-data.js').write_text('// Generated by tools/import-crochet.py; source images remain untouched.\nwindow.BirbestCrochetProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(root / 'qa-crochet/import-report.json').write_text(json.dumps({'products':len(products),'usedImages':len(used),'excluded':[i for i in inventory if i['index'] not in used]},indent=2),encoding='utf-8')
print(f'{len(products)} products, {len(used)} curated images copied without modification.')
