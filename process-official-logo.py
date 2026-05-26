"""Regenerate INEXC logo PNGs from the official brand lockup (white on navy)."""
from PIL import Image, ImageChops


SRC = r'assets/inexc-logo-official-source.png'
OUT_MAIN = r'assets/inexc-logo-white.png'
OUT_MAIN_ALT = r'assets/inexc-logo.png'
OUT_SM = r'assets/inexc-logo-white-sm.png'
OUT_SM_ALT = r'assets/inexc-logo-sm.png'
OUT_ICON = r'assets/inexc-icon.png'


def trim(im: Image.Image) -> Image.Image:
    bg = Image.new('RGBA', im.size, (0, 0, 0, 0))
    diff = ImageChops.difference(im.convert('RGBA'), bg)
    bbox = diff.getbbox()
    return im.crop(bbox) if bbox else im


def upscale_if_small(im: Image.Image, min_width: int = 840) -> Image.Image:
    if im.width >= min_width:
        return im
    scale = min_width / im.width
    return im.resize(
        (int(im.width * scale), int(im.height * scale)),
        Image.Resampling.LANCZOS,
    )


def crop_icon(im: Image.Image) -> Image.Image:
    w, h = im.size
    icon = im.crop((0, 0, int(w * 0.30), h))
    icon = trim(icon)
    side = max(icon.width, icon.height)
    canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    ox = (side - icon.width) // 2
    oy = (side - icon.height) // 2
    canvas.paste(icon, (ox, oy), icon if icon.mode == 'RGBA' else None)
    return canvas.resize((256, 256), Image.Resampling.LANCZOS)


def main():
    im = Image.open(SRC).convert('RGBA')
    full = upscale_if_small(trim(im))
    sm = full.resize((420, int(420 * full.height / full.width)), Image.Resampling.LANCZOS)
    icon = crop_icon(im)

    full.save(OUT_MAIN, format='PNG', optimize=True)
    full.save(OUT_MAIN_ALT, format='PNG', optimize=True)
    sm.save(OUT_SM, format='PNG', optimize=True)
    sm.save(OUT_SM_ALT, format='PNG', optimize=True)
    icon.save(OUT_ICON, format='PNG', optimize=True)
    print('official logo preserved:', full.size)
    print('icon:', icon.size)


if __name__ == '__main__':
    main()
