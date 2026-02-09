Responsive SVG image with scalable hotspots

What this provides
- `index.html`: mounts your screenshot inside an SVG (viewBox-based) so overlay rectangles (<rect>) scale with the image. Clicking a hotspot logs an ID and flashes the area.
- `styles.css`: responsive rules for mobile-first layout and hotspot visuals.

How to use
1. Save the attached screenshot image file next to `index.html` and name it `screenshot.png` (or edit the `href` of the <image> tag in `index.html` to match your filename).
2. Open `index.html` in a browser. On desktop, use responsive/mobile emulation to preview.
3. To define your own hotspots:
   - Edit the <rect> elements inside the SVG. The example uses a `viewBox` of `0 0 1000 2000`.
   - Coordinates are in that viewBox space. You can click anywhere on the SVG and check the console to get the SVG coordinates printed (helpful for placing hotspots).

Customizing coordinates
- The console prints coordinates when you click the SVG. Use those numbers as x/y for the top-left corner of a rect.
- width/height should be sized in the same coordinate space (example hotspots are 200x200 in the viewBox units).

Accessibility & next steps
- For keyboard accessibility and semantic links, replace <rect> overlays with <a> elements inside the SVG or map the rect clicks to visible buttons outside the SVG.
- You can add focus styles and tabindex handling to make hotspots keyboard accessible.

Try it locally (PowerShell):
# from the folder containing index.html and screenshot.png
# Start a small local HTTP server (Python 3 required):
python -m http.server 8000; # then open http://localhost:8000/index.html in your browser

Notes
- If your actual screenshot has a different pixel aspect ratio, update the SVG viewBox and <image> width/height to match your image's aspect and size to make placement exact.
- I intentionally used a simple viewBox so coordinates are small and easy to edit; adapt the numbers to your image pixel size if desired.
