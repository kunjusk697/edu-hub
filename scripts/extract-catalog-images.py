#!/usr/bin/env python3
"""Extract one JPEG per brochure line item from the catalog composite."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
CATALOG_SOURCE = Path(
    "/home/ubuntu/.cursor/projects/workspace/assets/dde36754-fc73-485b-bc1c-8f01ab09e464.jpg"
)
OUT_DIR = ROOT / "public" / "images" / "products"

FALLBACK_THEMES = {
    "cookware": ("#fff4e6", "#d9480f", "Cookware"),
    "appliances": ("#fff3bf", "#e85d04", "Appliance"),
    "storage": ("#e6fcf5", "#087f5b", "Thermoware"),
    "kitchen-tools": ("#f1f3f5", "#495057", "Tool"),
    "bakeware": ("#f8f0e3", "#9c6644", "Bakeware"),
    "bottles": ("#e7f5ff", "#1864ab", "Flask"),
    "dinnerware": ("#ebfbee", "#5c940d", "Serve"),
}

SERIES_FALLBACKS = {
    "aura": ("#d9480f", "Aura"),
    "marvel": ("#9c6644", "Marvel"),
    "pressure-cooker": ("#e8590c", "Cooker"),
    "appliance": ("#f08c00", "Appliance"),
    "thermoware": ("#087f5b", "Thermo"),
    "tools": ("#495057", "Tools"),
    "bottle": ("#1864ab", "Flask"),
    "dinnerware": ("#5c940d", "Serve"),
    "default": ("#495057", "Le Mam"),
}


def load_js_export(relative_path: str) -> dict:
    result = subprocess.run(
        ["node", "-e", f"console.log(JSON.stringify(require('./{relative_path}')))"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout)


def load_product_meta() -> list[dict]:
    products = load_js_export("src/data/products.js")
    return products


def crop_catalog_products(source: Image.Image, regions: dict[str, list[int]]) -> int:
    count = 0
    for product_id, box in regions.items():
        crop = source.crop(box)
        crop = crop.resize((320, 320), Image.Resampling.LANCZOS)
        crop.save(OUT_DIR / f"{product_id}.jpg", quality=88)
        count += 1
    return count


def make_card(path: Path, bg: str, label: str, subtitle: str) -> None:
    image = Image.new("RGB", (320, 320), bg)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((16, 16, 304, 304), radius=24, outline="#ffffff", width=3)
    draw.text((160, 130), label[:20], anchor="mm", fill="#ffffff", font=ImageFont.load_default())
    draw.text((160, 200), subtitle[:24], anchor="mm", fill="#f1f3f5", font=ImageFont.load_default())
    image.save(path, quality=88)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    regions = load_js_export("src/data/catalog-image-regions.js")
    products = load_product_meta()

    if CATALOG_SOURCE.exists():
        source = Image.open(CATALOG_SOURCE)
        cropped = crop_catalog_products(source, regions)
        print(f"Cropped {cropped} brochure products from catalog image")
    else:
        print(f"Catalog source not found: {CATALOG_SOURCE}")

    for product in products:
        target = OUT_DIR / f"{product['id']}.jpg"
        if target.exists():
            continue
        bg, _, label = FALLBACK_THEMES.get(product["categoryId"], ("#f8f9fa", "#495057", "Product"))
        make_card(target, bg if bg.startswith("#") else "#f8f9fa", product.get("sku", product["id"]), label)

    for name, (color, label) in SERIES_FALLBACKS.items():
        make_card(OUT_DIR / f"fallback-{name}.jpg", color, label, "Le Mam")

    print(f"Product images ready in {OUT_DIR} ({len(list(OUT_DIR.glob('*.jpg')))} files)")


if __name__ == "__main__":
    main()
