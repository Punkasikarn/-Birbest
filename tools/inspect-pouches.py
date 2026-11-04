from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json

root = Path(__file__).resolve().parent.parent
source = Path('E:/06-BIRBEST/02_Product/09_Pouch')
files = sorted(source.rglob('*.jfif'))
out = root / 'qa-pouches'
out.mkdir(exist_ok=True)
inventory = []
for start in range(0, len(files), 25):
    sheet = Image.new('RGB', (1250, 1350), 'white')
    draw = ImageDraw.Draw(sheet)
    for i, p in enumerate(files[start:start+25], start):
        with Image.open(p) as im:
            inventory.append(dict(index=i, source=p.relative_to(source).as_posix(), width=im.width, height=im.height))
            thumb = ImageOps.contain(im.convert('RGB'), (240, 235))
            x, y = (i-start) % 5 * 250, (i-start) // 5 * 270
            sheet.paste(thumb, (x, y))
            draw.text((x+5, y+239), f'{i} {p.parent.name}', fill='black')
    sheet.save(out / f'sheet-{start//25}.jpg')
(out / 'inventory.json').write_text(json.dumps(inventory, indent=2), encoding='utf-8')
