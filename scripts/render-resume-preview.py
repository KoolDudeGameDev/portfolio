"""Render the resume PDF's page into the image the résumé dialog shows.

The dialog shows a picture of the page rather than embedding the PDF: an
<object> embed depends on the browser's PDF plugin, which phones and some
desktop setups don't have, and then the visitor gets an empty panel. The PDF
itself stays one click away for download and text selection.

Run after every resume export, so the picture never drifts from the file:

    pip install pypdfium2 pillow
    npm run resume:preview
"""

from pathlib import Path

import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "public" / "assets" / "Kyle_Gregory_Ibo_Resume.pdf"
OUT = ROOT / "public" / "assets" / "resume-preview.webp"

# 2x the widest the dialog ever draws the sheet (~800px), so text stays crisp
# on high-density screens without shipping a poster-sized file.
WIDTH = 1600

doc = pdfium.PdfDocument(str(PDF))
if len(doc) != 1:
    raise SystemExit(f"expected a one-page resume, got {len(doc)} pages")

page = doc[0]
scale = WIDTH / page.get_width()
image = page.render(scale=scale).to_pil().convert("RGB")
# Lossless: flat text compresses better this way than lossy does, and stays sharp.
image.save(OUT, "WEBP", lossless=True, method=6)
print(f"{OUT.relative_to(ROOT)}  {image.width}x{image.height}  {OUT.stat().st_size / 1024:.0f}KB")
