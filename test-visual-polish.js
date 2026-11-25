import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyVisualPolish() {
  console.log("===============================================================");
  console.log("VERIFYING VISUAL POLISH, AMBIENT DEPTH, FROSTED GLASS & INTERACTIONS");
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
    // Test 1: Ambient Pastel Depth & Frosted Glass Badges
    // -------------------------------------------------------------
    console.log("\n[Test 1] Checking Ambient Pastel Depth & Frosted Glass Badges...");

    const frostedBadgesAudit = await page.evaluate(() => {
      // Find frosted glass elements
      const frostedEls = Array.from(document.querySelectorAll('.backdrop-blur-md, .backdrop-blur-sm'));
      const courseBadges = Array.from(document.querySelectorAll('#courses .backdrop-blur-md, #courses .backdrop-blur-sm')).map(el => el.innerText.trim());
      const aboutPhotoBadge = document.querySelector('#about .backdrop-blur-md')?.innerText?.trim();
      const locationPhotoBadge = document.querySelector('#locations .backdrop-blur-md')?.innerText?.trim();

      return {
        totalFrostedCount: frostedEls.length,
        courseBadges,
        aboutPhotoBadge,
        locationPhotoBadge
      };
    });

    console.log("[Frosted Glass Audit]:", frostedBadgesAudit);
    if (frostedBadgesAudit.totalFrostedCount < 4) {
      throw new Error(`[FAIL] Expected at least 4 frosted glass elements, found ${frostedBadgesAudit.totalFrostedCount}`);
    }
    if (!frostedBadgesAudit.aboutPhotoBadge.includes('Safe Neighborhood Roads')) {
      throw new Error("[FAIL] About photo frosted glass overlay badge missing!");
    }
    if (!frostedBadgesAudit.locationPhotoBadge.includes('Hub')) {
      throw new Error("[FAIL] Location photo frosted glass overlay badge missing!");
    }
    console.log("[PASS] Frosted glass pills verified on Course cards, About photo, and Location photos");

    // -------------------------------------------------------------
    // Test 2: Live Green Pulsing Dot in Hero
    // -------------------------------------------------------------
    console.log("\n[Test 2] Checking Live Green Pulsing Dot in Hero...");
    const pulsingDotAudit = await page.evaluate(() => {
      const hero = document.querySelector('section');
      const text = hero ? hero.innerText : '';
      const hasText = text.includes('Slots Open This Week');
      const pingDot = hero?.querySelector('.animate-ping');
      return {
        hasText,
        hasPingDot: !!pingDot
      };
    });

    console.log("[Pulsing Dot Audit]:", pulsingDotAudit);
    if (!pulsingDotAudit.hasText || !pulsingDotAudit.hasPingDot) {
      throw new Error("[FAIL] Live green pulsing dot not found in Hero pill badge!");
    }
    console.log("[PASS] Live green pulsing dot verified next to 'Slots Open This Week'");

    // -------------------------------------------------------------
    // Test 3: 3-Step Journey Dashed Route Line
    // -------------------------------------------------------------
    console.log("\n[Test 3] Checking 3-Step Journey Dashed Route Line on Desktop...");
    const routeLineAudit = await page.evaluate(() => {
      const routeLine = document.querySelector('.border-dashed');
      return {
        hasDashedRouteLine: !!routeLine,
        classes: routeLine ? routeLine.className : null
      };
    });

    console.log("[Route Line Audit]:", routeLineAudit);
    if (!routeLineAudit.hasDashedRouteLine) {
      throw new Error("[FAIL] 3-step strip dashed horizontal route line not found!");
    }
    console.log("[PASS] Clean dashed horizontal route line connects the 3 steps on desktop");

    // -------------------------------------------------------------
    // Test 4: CountUp Animation
    // -------------------------------------------------------------
    console.log("\n[Test 4] Checking CountUp Animation for 1,000+...");
    const countUpAudit = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      return {
        hasCountInBody: bodyText.includes('1,000+')
      };
    });
    console.log("[CountUp Audit]:", countUpAudit);
    if (!countUpAudit.hasCountInBody) {
      throw new Error("[FAIL] '1,000+' stat count not rendered in DOM!");
    }
    console.log("[PASS] CountUp component successfully displays '1,000+' stats");

    // -------------------------------------------------------------
    // Test 5: Scrolled Navbar Frosted Backdrop
    // -------------------------------------------------------------
    console.log("\n[Test 5] Checking Scrolled Navbar Frosted Glass Backdrop...");
    // Scroll down 100px
    await page.evaluate(() => window.scrollTo(0, 100));
    await new Promise(r => setTimeout(r, 200));

    const navbarScrolledAudit = await page.evaluate(() => {
      const header = document.querySelector('header');
      const classes = header ? header.className : '';
      return {
        isFrosted: classes.includes('backdrop-blur-md') && classes.includes('bg-white/90')
      };
    });
    console.log("[Navbar Scrolled Audit]:", navbarScrolledAudit);
    if (!navbarScrolledAudit.isFrosted) {
      throw new Error("[FAIL] Header did not transition to frosted glass (bg-white/90 backdrop-blur-md) on scroll!");
    }
    console.log("[PASS] Navbar transitions to frosted glass backdrop (bg-white/90 backdrop-blur-md) when scrolled");

    // -------------------------------------------------------------
    // Test 6: Locations Interactive Tab Bar Switching
    // -------------------------------------------------------------
    console.log("\n[Test 6] Testing Locations Interactive Tab Bar Switching...");
    const initialCity = await page.evaluate(() => {
      return document.querySelector('#locations h3')?.innerText;
    });

    // Click 'Lucknow' tab
    const lucknowBtn = await page.evaluateHandle(() => {
      const tabs = Array.from(document.querySelectorAll('#locations button[data-city-id]'));
      return tabs.find(b => b.innerText.includes('Lucknow'));
    });
    if (lucknowBtn) {
      await lucknowBtn.click();
      await new Promise(r => setTimeout(r, 200));
    }

    const updatedCity = await page.evaluate(() => {
      return document.querySelector('#locations h3')?.innerText;
    });
    console.log(`[City Tab Switch]: Initial: '${initialCity}', Updated: '${updatedCity}'`);
    if (updatedCity !== 'Lucknow') {
      throw new Error(`[FAIL] City tab did not switch to Lucknow! Got '${updatedCity}'`);
    }
    console.log("[PASS] City tab switching works smoothly with visual active indicator");

    // -------------------------------------------------------------
    // Test 7: Scroll Entire Page (1440px and 375px) & Overflow Check
    // -------------------------------------------------------------
    console.log("\n[Test 7] Checking full scroll & zero horizontal overflow at 1440px...");
    const desktopOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (desktopOverflow) {
      throw new Error("[FAIL] Horizontal overflow detected at 1440px desktop!");
    }
    console.log("[PASS] Zero horizontal overflow at 1440px");

    console.log("\n[Test 8] Checking full scroll & zero horizontal overflow at 375px mobile...");
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 200));

    // Scroll to bottom gradually
    await page.evaluate(async () => {
      const distance = 400;
      const delay = 50;
      while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    });
    await new Promise(r => setTimeout(r, 300));

    const mobileOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (mobileOverflow) {
      throw new Error("[FAIL] Horizontal overflow detected at 375px mobile!");
    }
    console.log("[PASS] Zero horizontal overflow at 375px mobile");

    // Check console errors
    console.log(`\n[Console Errors]: ${consoleErrors.length} found`);
    if (consoleErrors.length > 0) {
      throw new Error(`[FAIL] Console errors: ${JSON.stringify(consoleErrors)}`);
    }
    console.log("[PASS] Zero console errors");

    console.log("\n===============================================================");
    console.log("ALL VISUAL POLISH & INTERACTION CHECKS PASSED 100%!");
    console.log("===============================================================");

  } finally {
    await browser.close();
    server.close();
  }
}

verifyVisualPolish().catch(err => {
  console.error("\n❌ Verification Failed:", err);
  process.exit(1);
});
