from pathlib import Path
import json
from PIL import Image, ImageOps, ImageDraw

source = Path('E:/06-BIRBEST/02_Product/02_Crochet')
out = Path(__file__).resolve().parent.parent / 'qa-crochet'
out.mkdir(exist_ok=True)
files = sorted(p for p in source.rglob('*') if p.suffix.lower() in {'.jfif', '.jpg', '.jpeg', '.png', '.webp'})
items = []
for i, p in enumerate(files):
    with Image.open(p) as im:
        items.append({'index': i, 'source': p.relative_to(source).as_posix(), 'width': im.width, 'height': im.height})
for start in range(0, len(files), 36):
    sheet = Image.new('RGB', (1200, 1440), 'white')
    draw = ImageDraw.Draw(sheet)
    for slot, p in enumerate(files[start:start+36]):
        x, y = slot % 6 * 200, slot // 6 * 240
        with Image.open(p) as im:
            thumb = ImageOps.contain(im.convert('RGB'), (192, 192))
            sheet.paste(thumb, (x + (192-thumb.width)//2, y))
        draw.text((x+3,y+194), str(start+slot) + ' ' + p.parent.name[:22], fill='black')
        draw.text((x+3,y+210), p.parent.parent.name[:25], fill='black')
    sheet.save(out / f'sheet-{start//36}.jpg')
(out / 'inventory.json').write_text(json.dumps(items, indent=2), encoding='utf-8')
print(f'{len(files)} images; {((len(files)+35)//36)} review sheets in {out}')
