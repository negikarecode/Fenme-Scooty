import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function verifyPill() {
  console.log("==========================================");
  console.log("VERIFYING GENDER PILL ALIGNMENT & PADDING");
  console.log("==========================================");

  if (!fs.existsSync('./test-screenshots')) {
    fs.mkdirSync('./test-screenshots', { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const checkPillAtScale = async (url, routeName, scale) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: scale });

    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    await page.evaluate((isMenRoute) => {
      localStorage.setItem('femme_scooty_gender_preference', isMenRoute ? 'men' : 'women');
    }, routeName === 'men');

    await page.goto(url, { waitUntil: 'networkidle0' });

    // Retrieve exact bounding client rects
    const metrics = await page.evaluate(() => {
      const btn = document.querySelector('#wing-dropdown-button');
      if (!btn) return null;
      const span = btn.querySelector('span');
      const svg = btn.querySelector('svg');
      const bRect = btn.getBoundingClientRect();
      const sRect = span.getBoundingClientRect();
      const vRect = svg.getBoundingClientRect();
      const bStyle = window.getComputedStyle(btn);
      const spanStyle = window.getComputedStyle(span);
      const svgStyle = window.getComputedStyle(svg);

      const borderLeft = parseFloat(bStyle.borderLeftWidth) || 0;
      const borderRight = parseFloat(bStyle.borderRightWidth) || 0;
      const borderTop = parseFloat(bStyle.borderTopWidth) || 0;
      const borderBottom = parseFloat(bStyle.borderBottomWidth) || 0;

      // Inner padding
      const leftPad = sRect.left - (bRect.left + borderLeft);
      const rightPad = (bRect.right - borderRight) - vRect.right;
      const gap = vRect.left - sRect.right;

      // Vertical centers
      const btnCenterY = bRect.top + bRect.height / 2;
      const textCenterY = sRect.top + sRect.height / 2;
      const svgCenterY = vRect.top + vRect.height / 2;

      return {
        btnText: span.innerText,
        bRect: { width: bRect.width, height: bRect.height },
        sRect: { width: sRect.width, height: sRect.height },
        vRect: { width: vRect.width, height: vRect.height },
        paddingLeft: leftPad,
        paddingRight: rightPad,
        paddingDiff: Math.abs(leftPad - rightPad),
        gap: gap,
        btnCenterY,
        textCenterY,
        svgCenterY,
        textToSvgCenterDiff: Math.abs(textCenterY - svgCenterY),
        textToBtnCenterDiff: Math.abs(textCenterY - btnCenterY),
        svgToBtnCenterDiff: Math.abs(svgCenterY - btnCenterY),
        spanLineHeight: spanStyle.lineHeight,
        spanFontSize: spanStyle.fontSize,
        svgWidth: svgStyle.width,
        svgHeight: svgStyle.height
      };
    });

    if (!metrics) {
      throw new Error(`[FAIL] Pill button #wing-dropdown-button not found on ${routeName}!`);
    }

    console.log(`\n--- Results for ${routeName} at ${scale * 100}% zoom ---`);
    console.log(`Button Text: "${metrics.btnText}"`);
    console.log(`Span Size: ${metrics.sRect.width.toFixed(2)}x${metrics.sRect.height.toFixed(2)}px (fontSize: ${metrics.spanFontSize}, lineHeight: ${metrics.spanLineHeight})`);
    console.log(`SVG Size: ${metrics.vRect.width.toFixed(2)}x${metrics.vRect.height.toFixed(2)}px`);
    console.log(`Left Padding: ${metrics.paddingLeft.toFixed(2)}px, Right Padding: ${metrics.paddingRight.toFixed(2)}px`);
    console.log(`Padding Diff: ${metrics.paddingDiff.toFixed(2)}px (gap between text & svg: ${metrics.gap.toFixed(2)}px)`);
    console.log(`Vertical Centers: Text=${metrics.textCenterY.toFixed(2)}, SVG=${metrics.svgCenterY.toFixed(2)}, Button=${metrics.btnCenterY.toFixed(2)}`);
    console.log(`Vertical Center Diff (Text vs SVG): ${metrics.textToSvgCenterDiff.toFixed(3)}px`);

    if (metrics.paddingDiff > 1.0) {
      throw new Error(`[FAIL] Left padding (${metrics.paddingLeft.toFixed(2)}px) does not equal right padding (${metrics.paddingRight.toFixed(2)}px)! Diff: ${metrics.paddingDiff.toFixed(2)}px`);
    }
    console.log(`[PASS] Left and right padding are symmetric within sub-pixel threshold!`);

    if (metrics.textToSvgCenterDiff > 0.5) {
      throw new Error(`[FAIL] Text and SVG vertical centerlines differ by ${metrics.textToSvgCenterDiff.toFixed(3)}px!`);
    }
    console.log(`[PASS] Text and Chevron share the exact vertical centerline (diff: ${metrics.textToSvgCenterDiff.toFixed(3)}px)!`);

    // Capture zoomed screenshot of the button element
    const btnHandle = await page.$('#wing-dropdown-button');
    const screenshotPath = `./test-screenshots/pill-${routeName}-${scale * 100}pct.png`;
    await btnHandle.screenshot({ path: screenshotPath });
    console.log(`[SAVED] Pill screenshot saved to ${screenshotPath}`);

    await page.close();
  };

  await checkPillAtScale('http://localhost:5173/', 'women', 1);
  await checkPillAtScale('http://localhost:5173/', 'women', 2);
  await checkPillAtScale('http://localhost:5173/men', 'men', 1);
  await checkPillAtScale('http://localhost:5173/men', 'men', 2);

  await browser.close();
  console.log("\n==========================================");
  console.log("ALL GENDER PILL ALIGNMENT CHECKS PASSED!");
  console.log("==========================================");
}

verifyPill().catch(err => {
  console.error(err);
  process.exit(1);
});
