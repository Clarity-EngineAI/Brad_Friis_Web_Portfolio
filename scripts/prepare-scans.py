#!/usr/bin/env python3
"""Turn the reference source documents into publishable page images.

Run from the repository root with the project virtual environment:

    .venv/bin/python scripts/prepare-scans.py

Everything under `src/assets/letters/` is produced by this script. Do not hand-edit
those files: rerunning will overwrite them, and a redaction that exists only in a
hand-edited output is a redaction nobody can audit.

There are two kinds of source. The three oldest letters are photographs of a page
lying on dark cloth, so they are redacted, cropped to the page and scaled down. The
newer ones are PDFs that Brad redacted before export, so they are only rasterised.

Redactions here are painted before scaling, which destroys the covered pixels
rather than hiding them. There is no layer, no vector box and no text underneath.

The PDFs need a different guarantee, because two of them carry a real text layer.
Covering text with a filled box leaves it selectable and is not a redaction at all,
so the script refuses to publish a PDF whose text layer still contains contact
details. Both currently pass because the details were deleted, not covered.

Coordinates are fractions of the whole page, measured after EXIF rotation and
before cropping, so they survive any retuning of the crop threshold.

Only personal contact details are redacted. Organisational details on the
letterheads publish as written: Brad confirmed on 13 August 2026 that those
premises and numbers are long defunct, and a role address such as
`adplus@adplus.co.nz` identifies nobody. A named individual's address is different
in kind and always comes off, however old it is.
"""

import re
import sys
from pathlib import Path

import numpy as np
import pymupdf
from PIL import Image, ImageDraw, ImageOps

REFERENCES = Path("Brad Friis Resumes/References")
FINALS = REFERENCES / "redacted and cropped finals"
OUTPUT = Path("src/assets/letters")

# One tone for every redaction in every document, matching the boxes already baked
# into the PDFs Brad exported. A flat light grey reads as a deliberate removal;
# white pretends nothing was there and black looks censored.
REDACTION_GREY = (230, 230, 230)

LONG_EDGE = 1800
JPEG_QUALITY = 90

# The cloth is dark, but a lighter fabric edge creeps into the top of some frames,
# so a plain brightness test is not enough. A row or column only counts as page when
# most of it is bright, which the fabric never manages.
PAGE_THRESHOLD = 170
PAGE_COVERAGE = 0.3
CROP_INSET = 6
DETECT_SCALE = 4

# Photographs: source file -> output name and redaction boxes, each box given as
# (left, top, right, bottom) in fractions of the EXIF-corrected source.
PHOTOGRAPHS: dict[str, tuple[str, list[tuple[float, float, float, float]]]] = {
    "Adplus Advertising.jpg": ("adplus-advertising.jpg", []),
    "Hawkes Bay Tourism.jpg": (
        "hawkes-bay-tourism.jpg",
        # Hamish Lowry's work email, on the line below "General Manager". The gap
        # between that line's ascenders and the descenders of "Manager" above it is
        # about nine pixels at full size, so this band is deliberately tight.
        [(0.135, 0.7217, 0.485, 0.7495)],
    ),
    "Canwest Media.jpg": (
        "canwest-media.jpg",
        # Philip Lemon's email and mobile, the two lines below "The Radio Network".
        [(0.185, 0.7845, 0.462, 0.8130)],
    ),
}

# PDFs Brad redacted before export. The Rototuna file has a .png extension but is a
# PDF; the extension is wrong at source and renaming it would break his own copy.
DOCUMENTS: dict[str, str] = {
    "Andrew_Bergh.pdf": "andrew-bergh",
    "Rototuna_High_School_final.png": "rototuna-high-schools",
    "Brad Friis - Reference The Industry School.pdf": "the-industry-school",
    "PowerSchool.pdf": "powerschool",
    # No redaction needed: the letter carries no address, phone or email anywhere
    # on either page, only the Sancta Maria College crest and Naicker's typed
    # signature block.
    "Lawrence_Naicker_Reference.pdf": "sancta-maria-college",
}

# A text layer must not still contain what the boxes appear to cover.
# Three shapes: any email address, an NZ number, and a +1 North American number.
# The last was added on 20 August 2026 for the PowerSchool email, the first source
# from outside New Zealand — the NZ pattern alone would have passed its phone line.
FORBIDDEN = re.compile(
    r"[\w.+-]+@[\w-]+\.[\w.]+"
    r"|\b0[2-9]\d[\s-]?\d{3}[\s-]?\d{3,4}\b"
    r"|\+1\s*\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}\b"
)


def page_bounds(image: Image.Image) -> tuple[int, int, int, int]:
    """Bounding box of the sheet of paper within the photograph."""
    small = image.convert("L").resize((image.width // DETECT_SCALE, image.height // DETECT_SCALE))
    mask = np.asarray(small) > PAGE_THRESHOLD
    rows = np.flatnonzero(mask.mean(axis=1) > PAGE_COVERAGE)
    cols = np.flatnonzero(mask.mean(axis=0) > PAGE_COVERAGE)
    if not rows.size or not cols.size:
        return (0, 0, *image.size)
    return (
        max(int(cols[0]) * DETECT_SCALE + CROP_INSET, 0),
        max(int(rows[0]) * DETECT_SCALE + CROP_INSET, 0),
        min(int(cols[-1]) * DETECT_SCALE - CROP_INSET, image.width),
        min(int(rows[-1]) * DETECT_SCALE - CROP_INSET, image.height),
    )


def prepare_photograph(name: str) -> None:
    output_name, boxes = PHOTOGRAPHS[name]
    image = ImageOps.exif_transpose(Image.open(REFERENCES / name)).convert("RGB")
    width, height = image.size

    draw = ImageDraw.Draw(image)
    for left, top, right, bottom in boxes:
        draw.rectangle(
            (int(left * width), int(top * height), int(right * width), int(bottom * height)),
            fill=REDACTION_GREY,
        )

    page = image.crop(page_bounds(image))
    scale = LONG_EDGE / max(page.size)
    if scale < 1:
        page = page.resize((round(page.width * scale), round(page.height * scale)), Image.LANCZOS)

    page.save(OUTPUT / output_name, quality=JPEG_QUALITY)
    print(f"  {width}x{height} -> {page.width}x{page.height}  {output_name}")


def prepare_document(name: str) -> list[str]:
    stem = DOCUMENTS[name]
    document = pymupdf.open(FINALS / name)

    leaked = FORBIDDEN.findall("\n".join(page.get_text() for page in document))
    if leaked:
        raise SystemExit(
            f"REFUSING TO PUBLISH {name}: its text layer still contains {leaked}. "
            "The boxes are covering live text, which is not a redaction. "
            "Re-export with the details deleted."
        )

    dpi = round(72 * LONG_EDGE / max(document[0].rect.width, document[0].rect.height))
    written = []
    for index, page in enumerate(document, start=1):
        suffix = "" if document.page_count == 1 else f"-{index}"
        output_name = f"{stem}{suffix}.png"
        pixmap = page.get_pixmap(dpi=dpi)
        pixmap.save(OUTPUT / output_name)
        print(f"  {dpi}dpi -> {pixmap.width}x{pixmap.height}  {output_name}")
        written.append(output_name)
    return written


if __name__ == "__main__":
    print("Photographs, redacted and cropped:")
    for name in PHOTOGRAPHS:
        prepare_photograph(name)

    print("\nDocuments, text layer checked and rasterised:")
    for name in DOCUMENTS:
        prepare_document(name)

    print("\nAll scans rebuilt.", file=sys.stderr)
