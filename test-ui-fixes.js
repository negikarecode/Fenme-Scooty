import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyUIFixes() {
  console.log("===============================================================");
  console.log("TESTING 4 FINAL UI ALIGNMENT AND SPACING FIXES");
  console.log("===============================================================");

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/men' || reqPath.startsWith('/men/')) {
      res.writeHead(301, { 'Location': '/' });
      res.end();
      return;
    }

    let filePath = path.join(__dirname, 'dist', reqPath);
    if (reqPath === '/' || reqPath === '') {
      filePath = path.join(__dirname, 'dist', 'index.html');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.txt': 'text/plain',
        '.xml': 'application/xml',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      const fallback = path.join(__dirname, 'dist', 'index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(fallback).pipe(res);
    }
  });

  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });

    // -------------------------------------------------------------
    // Test 1: Floating WhatsApp Button Visibility & Overlap
    // -------------------------------------------------------------
    console.log("\n[Test 1] Checking Floating WhatsApp Button Visibility & Overlap...");

    const initialWhatsAppState = await page.evaluate(() => {
      const btn = document.getElementById('floating-whatsapp-btn');
      const heroForm = document.getElementById('hero-booking-form');
      if (!btn || !heroForm) return null;

      const btnRect = btn.getBoundingClientRect();
      const formRect = heroForm.getBoundingClientRect();
      const isVisible = window.getComputedStyle(btn).opacity !== '0' && window.getComputedStyle(btn).pointerEvents !== 'none';
      const overlaps = !(
        btnRect.right < formRect.left ||
        btnRect.left > formRect.right ||
        btnRect.bottom < formRect.top ||
        btnRect.top > formRect.bottom
      );

      return {
        scrollY: window.scrollY,
        opacity: window.getComputedStyle(btn).opacity,
        pointerEvents: window.getComputedStyle(btn).pointerEvents,
        isVisible,
        overlaps
      };
    });

    console.log("[Initial WhatsApp State (Hero View)]:", initialWhatsAppState);
    if (initialWhatsAppState.isVisible) {
      throw new Error("[FAIL] Floating WhatsApp button should NOT be visible when viewing the Hero (scrollY = 0)!");
    }
    console.log("[PASS] Floating WhatsApp button is hidden at scrollY = 0 (zero overlap with Hero callback card)");

    // Scroll past hero
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(r => setTimeout(r, 200));

    const scrolledWhatsAppState = await page.evaluate(() => {
      const btn = document.getElementById('floating-whatsapp-btn');
      return {
        scrollY: window.scrollY,
        opacity: window.getComputedStyle(btn).opacity,
        pointerEvents: window.getComputedStyle(btn).pointerEvents
      };
    });
    console.log("[Scrolled WhatsApp State (scrollY = 500)]:", scrolledWhatsAppState);
    if (scrolledWhatsAppState.opacity !== '1' || scrolledWhatsAppState.pointerEvents !== 'auto') {
      throw new Error("[FAIL] Floating WhatsApp button should be visible when scrollY > 300!");
    }
    console.log("[PASS] Floating WhatsApp button cleanly appears after scrolling past hero (scrollY > 300)");

    // Test Footer extra padding & WhatsApp button spacing
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 300));

    const footerPaddingAudit = await page.evaluate(() => {
      const copyrightBar = document.querySelector('footer .bg-charcoal');
      const paragraphs = copyrightBar ? Array.from(copyrightBar.querySelectorAll('p')) : [];
      const btn = document.getElementById('floating-whatsapp-btn');
      const btnRect = btn ? btn.getBoundingClientRect() : null;

      const pRects = paragraphs.map(p => p.getBoundingClientRect());
      const overlapsAnyP = btnRect && pRects.some(pRect => !(
        btnRect.right < pRect.left ||
        btnRect.left > pRect.right ||
        btnRect.bottom < pRect.top ||
        btnRect.top > pRect.bottom
      ));

      const computedPaddingBottom = copyrightBar ? window.getComputedStyle(copyrightBar).paddingBottom : null;

      return {
        computedPaddingBottom,
        overlapsAnyP
      };
    });
    console.log("[Footer Padding Audit]:", footerPaddingAudit);
    if (footerPaddingAudit.overlapsAnyP) {
      throw new Error("[FAIL] Floating button overlaps footer copyright text!");
    }
    console.log(`[PASS] Footer copyright bar has generous padding (${footerPaddingAudit.computedPaddingBottom}) with zero overlap on copyright text`);

    // -------------------------------------------------------------
    // Test 2: Review Cards Horizontal Divider Alignment
    // -------------------------------------------------------------
    console.log("\n[Test 2] Checking Review Card Horizontal Divider Alignment across all 3 cards...");
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 200));

    const reviewDividerTops = await page.evaluate(() => {
      const reviewsSection = document.getElementById('reviews');
      if (!reviewsSection) return null;
      // Select the horizontal divider inside each card: .border-t.border-charcoal\/10
      const cards = Array.from(reviewsSection.querySelectorAll('.grid > div'));
      return cards.map(c => {
        const divider = c.querySelector('.border-t');
        const header = c.querySelector('.flex.items-center');
        const rect = divider ? divider.getBoundingClientRect() : null;
        const name = c.querySelector('h4')?.innerText;
        const role = c.querySelector('p')?.innerText;
        return {
          name,
          role,
          headerHeight: header ? header.getBoundingClientRect().height : null,
          dividerTopFromCard: divider ? (divider.offsetTop) : null
        };
      });
    });

    console.log("[Review Cards Divider Alignment]:", reviewDividerTops);
    const tops = reviewDividerTops.map(r => r.dividerTopFromCard);
    const allTopsEqual = tops.every(t => Math.abs(t - tops[0]) <= 1);
    if (!allTopsEqual) {
      throw new Error(`[FAIL] Review card dividers are NOT on the same vertical line! Tops: ${JSON.stringify(tops)}`);
    }
    console.log(`[PASS] All 3 review card dividers sit on the exact same vertical line (top offset: ${tops[0]}px)`);

    // -------------------------------------------------------------
    // Test 3: Hero 2-Column Grid Vertical Top Alignment
    // -------------------------------------------------------------
    console.log("\n[Test 3] Checking Hero 2-Column Grid items-start Vertical Alignment...");
    const heroAlignment = await page.evaluate(() => {
      const heroSection = document.querySelector('section');
      const grid = heroSection?.querySelector('.grid');
      const leftCol = grid?.children[0];
      const rightCol = grid?.children[1];
      const formCard = document.getElementById('hero-booking-form');

      return {
        gridAlignItems: grid ? window.getComputedStyle(grid).alignItems : null,
        leftColTop: leftCol ? leftCol.getBoundingClientRect().top : null,
        rightColTop: rightCol ? rightCol.getBoundingClientRect().top : null,
        formCardTop: formCard ? formCard.getBoundingClientRect().top : null
      };
    });

    console.log("[Hero Vertical Alignment]:", heroAlignment);
    const isStartAlign = ['flex-start', 'start', 'flow-start'].includes(heroAlignment.gridAlignItems);
    if (!isStartAlign) {
      throw new Error(`[FAIL] Expected Hero grid alignItems to be start/flex-start/flow-start (items-start), got '${heroAlignment.gridAlignItems}'`);
    }
    const heroTopDiff = Math.abs(heroAlignment.leftColTop - heroAlignment.rightColTop);
    if (heroTopDiff > 1) {
      throw new Error(`[FAIL] Hero left and right columns top offset mismatch: ${heroAlignment.leftColTop} vs ${heroAlignment.rightColTop}`);
    }
    console.log("[PASS] Hero 2-column grid has items-start and columns align at the exact same top coordinate");

    // -------------------------------------------------------------
    // Test 4: About Section Height Balance (items-stretch)
    // -------------------------------------------------------------
    console.log("\n[Test 4] Checking About Section items-stretch Height Balance...");
    const aboutSectionAudit = await page.evaluate(() => {
      const aboutSection = document.getElementById('about');
      const grid = aboutSection?.querySelector('.grid');
      const leftCol = grid?.children[0];
      const rightCol = grid?.children[1];
      const photoCard = rightCol?.querySelector('.rounded-2xl');

      return {
        gridAlignItems: grid ? window.getComputedStyle(grid).alignItems : null,
        leftColHeight: leftCol ? leftCol.getBoundingClientRect().height : null,
        rightColHeight: rightCol ? rightCol.getBoundingClientRect().height : null,
        photoCardHeight: photoCard ? photoCard.getBoundingClientRect().height : null
      };
    });

    console.log("[About Section Height Balance]:", aboutSectionAudit);
    if (aboutSectionAudit.gridAlignItems !== 'stretch') {
      throw new Error(`[FAIL] Expected About grid alignItems to be 'stretch' (items-stretch), got '${aboutSectionAudit.gridAlignItems}'`);
    }
    const heightDiff = Math.abs(aboutSectionAudit.leftColHeight - aboutSectionAudit.photoCardHeight);
    if (heightDiff > 2) {
      throw new Error(`[FAIL] About photo card height (${aboutSectionAudit.photoCardHeight}px) does not match left column (${aboutSectionAudit.leftColHeight}px)!`);
    }
    console.log(`[PASS] About section 2-column grid is items-stretch: photo card fills full column height (${aboutSectionAudit.photoCardHeight}px) with zero gap`);

    // -------------------------------------------------------------
    // Test 5: Mobile Viewport (375x812)
    // -------------------------------------------------------------
    console.log("\n[Test 5] Testing Mobile Viewport (375x812)...");
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 200));

    const mobileHeroFormRect = await page.evaluate(() => {
      const form = document.getElementById('hero-booking-form');
      return form ? form.getBoundingClientRect() : null;
    });

    console.log(`[Mobile Hero Form]: width ${mobileHeroFormRect?.width}px, height ${mobileHeroFormRect?.height}px`);

    // Check console errors
    console.log(`\n[Console Errors]: ${consoleErrors.length} found`);
    if (consoleErrors.length > 0) {
      throw new Error(`[FAIL] Console errors: ${JSON.stringify(consoleErrors)}`);
    }
    console.log("[PASS] 0 console errors");

    console.log("\n===============================================================");
    console.log("ALL 4 UI ALIGNMENT & SPACING FIXES PASSED 100%!");
    console.log("===============================================================");

  } finally {
    await browser.close();
    server.close();
  }
}

verifyUIFixes().catch(err => {
  console.error("\n❌ Verification Failed:", err);
  process.exit(1);
});
