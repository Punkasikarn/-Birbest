from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json

root = Path(__file__).resolve().parent.parent
source = Path('E:/06-BIRBEST/02_Product/05_Stickers')
files = sorted(p for p in source.iterdir() if p.suffix.lower() in ('.jpg', '.jpeg', '.jfif', '.png'))
out = root / 'qa-stickers'
out.mkdir(exist_ok=True)
sheet = Image.new('RGB', (1200, 900), 'white')
draw = ImageDraw.Draw(sheet)
inventory = []
for i, p in enumerate(files):
    with Image.open(p) as im:
        inventory.append(dict(index=i, source=p.name, width=im.width, height=im.height))
        thumb = ImageOps.contain(im.convert('RGB'), (230, 260))
        x, y = i % 5 * 240, i // 5 * 300
        sheet.paste(thumb, (x, y))
        draw.text((x+5, y+265), str(i), fill='black')
sheet.save(out / 'sheet.jpg')
(out / 'inventory.json').write_text(json.dumps(inventory, indent=2), encoding='utf-8')
