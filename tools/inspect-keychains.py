from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json

root = Path(__file__).resolve().parent.parent
files = sorted(Path('E:/06-BIRBEST/02_Product/06_Keychain').glob('*.jfif'))
out = root / 'qa-keychains'
out.mkdir(exist_ok=True)
sheet = Image.new('RGB', (1000, 810), 'white')
draw = ImageDraw.Draw(sheet)
inventory = []
for i, p in enumerate(files):
    with Image.open(p) as im:
        inventory.append(dict(index=i, source=p.name, width=im.width, height=im.height))
        thumb = ImageOps.contain(im.convert('RGB'), (320, 240))
        x, y = i % 3 * 333, i // 3 * 270
        sheet.paste(thumb, (x, y))
        draw.text((x+5, y+245), str(i), fill='black')
sheet.save(out / 'sheet.jpg')
(out / 'inventory.json').write_text(json.dumps(inventory, indent=2), encoding='utf-8')
