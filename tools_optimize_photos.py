"""Optimasi foto: crop tengah + resize + WebP ke public/img/foto/ (satu per sumber)."""
from PIL import Image, ImageOps
import os

BASE = os.path.dirname(os.path.abspath(__file__))
EXT = os.path.join(BASE, "..", "ext")
OUT = os.path.join(BASE, "public", "img", "foto")
os.makedirs(OUT, exist_ok=True)

# (sumber, nama-output, mode) mode: cover 4:3 | wide 16:9 | tall 3:4 | square 1:1
JOBS = [
    ("p02_x61.jpeg",  "sungai-utik",   "wide"),
    ("p02_x57.jpeg",  "kegiatan-warga","tall"),
    ("p02_x77.jpeg",  "kegiatan-hutan","cover"),
    ("p06_x257.jpeg", "survei-lapangan","cover"),
    ("p31_x5241.jpeg","betang-eksterior","square"),
]
RATIO = {"cover": (4, 3), "wide": (16, 9), "tall": (3, 4), "square": (1, 1)}
MAXW = 1280


def crop_ratio(im, ratio):
    w, h = im.size
    tr = ratio[0] / ratio[1]
    cur = w / h
    if cur > tr:  # terlalu lebar -> potong kiri-kanan
        nw = int(h * tr)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = int(w / tr)
    y = (h - nh) // 2
    return im.crop((0, y, w, y + nh))


for src, name, mode in JOBS:
    p = os.path.join(EXT, src)
    if not os.path.exists(p):
        print("MISS", src)
        continue
    im = Image.open(p).convert("RGB")
    im = ImageOps.exif_transpose(im)
    im = crop_ratio(im, RATIO[mode])
    if im.width > MAXW:
        im = im.resize((MAXW, int(MAXW * im.height / im.width)), Image.LANCZOS)
    out = os.path.join(OUT, f"{name}.webp")
    im.save(out, "WEBP", quality=78, method=6)
    # 2x preview utk srcset? cukup 640 utk kartu kecil
    sm = os.path.join(OUT, f"{name}-640.webp")
    im2 = im.resize((640, int(640 * im.height / im.width)), Image.LANCZOS)
    im2.save(sm, "WEBP", quality=72, method=6)
    print(f"{name}: {im.size} {round(os.path.getsize(out)/1024)}KB + 640 {round(os.path.getsize(sm)/1024)}KB")
