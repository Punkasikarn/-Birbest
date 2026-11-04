from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json

root = Path(__file__).resolve().parent.parent
files = sorted(p for p in Path('E:/06-BIRBEST/02_Product/03_Hat').iterdir() if p.suffix.lower() in ('.jpg', '.jfif', '.png'))
out = root / 'qa-hats'
out.mkdir(exist_ok=True)
sheet = Image.new('RGB', (1200, 1080), 'white')
draw = ImageDraw.Draw(sheet)
inventory = []
for i, p in enumerate(files):
    with Image.open(p) as im:
        inventory.append({'index': i, 'source': p.name, 'width': im.width, 'height': im.height})
        thumb = ImageOps.contain(im.convert('RGB'), (190, 310))
        x, y = (i % 6) * 200, (i // 6) * 360
        sheet.paste(thumb, (x + (190-thumb.width)//2, y))
        draw.text((x+5, y+315), str(i), fill='black')
sheet.save(out / 'sheet.jpg')
(out / 'inventory.json').write_text(json.dumps(inventory, indent=2), encoding='utf-8')
