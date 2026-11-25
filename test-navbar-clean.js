import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function verifyNavbar() {
  console.log("==========================================");
  console.log("VERIFYING CLEAN NAVBAR AT TOP-0 & HERO SPACING");
  console.log("==========================================");

  if (!fs.existsSync('./test-screenshots')) {
    fs.mkdirSync('./test-screenshots', { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const runCheck = async (url, routeName, viewport) => {
    const page = await browser.newPage();
    await page.setViewport(viewport);

    // Set localStorage preference first so modal doesn't block
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    await page.evaluate((isMenRoute) => {
      localStorage.setItem('femme_scooty_gender_preference', isMenRoute ? 'men' : 'women');
    }, routeName.includes('men'));

    await page.goto(url, { waitUntil: 'networkidle0' });

    // Dismiss modal if open so screenshots and measurements are clean
    const modalClose = await page.$('div[role="dialog"] button[aria-label="Close modal"]');
    if (modalClose) {
      await modalClose.click();
      await new Promise(r => setTimeout(r, 200));
    }

    // 1. Verify NO announcement bar exists in the DOM
    const announcementBar = await page.$('aside[aria-label="Announcement"]');
    if (announcementBar) {
      throw new Error(`[FAIL] Announcement bar still exists on ${routeName}!`);
    }
    console.log(`[PASS] ${routeName} (${viewport.width}px): Announcement bar is completely removed.`);

    // 2. Verify header position & bounding rect at top: 0
    const headerRect = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const rect = header.getBoundingClientRect();
      const style = window.getComputedStyle(header);
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: style.position,
        zIndex: style.zIndex,
        borderBottomWidth: style.borderBottomWidth,
        borderBottomColor: style.borderBottomColor,
        borderBottomStyle: style.borderBottomStyle,
        backgroundColor: style.backgroundColor
      };
    });

    if (!headerRect) {
      throw new Error(`[FAIL] Header element not found on ${routeName}!`);
    }

    if (Math.abs(headerRect.top) > 0.5) {
      throw new Error(`[FAIL] Header is NOT at top: 0 (top: ${headerRect.top}) on ${routeName}!`);
    }

    if (headerRect.position !== 'sticky') {
      throw new Error(`[FAIL] Header position is not sticky (got ${headerRect.position}) on ${routeName}!`);
    }

    if (headerRect.zIndex !== '40') {
      throw new Error(`[FAIL] Header zIndex is not 40 (got ${headerRect.zIndex}) on ${routeName}!`);
    }

    console.log(`[PASS] ${routeName} (${viewport.width}px): Header is cleanly at top-0, position: sticky, z-index: 40, height: ${headerRect.height}px.`);

    // 3. Verify Hero section starts directly under navbar with 0 gap
    const heroRect = await page.evaluate(() => {
      const header = document.querySelector('header');
      const hero = document.querySelector('main > section');
      if (!hero || !header) return null;
      const hRect = header.getBoundingClientRect();
      const sRect = hero.getBoundingClientRect();
      const heroComputed = window.getComputedStyle(hero);
      const firstChild = hero.querySelector('.max-w-7xl');
      const firstChildRect = firstChild ? firstChild.getBoundingClientRect() : null;

      return {
        headerBottom: hRect.bottom,
        heroTop: sRect.top,
        gap: sRect.top - hRect.bottom,
        heroPaddingTop: heroComputed.paddingTop,
        heroPaddingBottom: heroComputed.paddingBottom,
        breathingRoom: firstChildRect ? firstChildRect.top - hRect.bottom : null
      };
    });

    if (Math.abs(heroRect.gap) > 0.5) {
      throw new Error(`[FAIL] Gap between header and hero is ${heroRect.gap}px on ${routeName}! Expected 0.`);
    }

    console.log(`[PASS] ${routeName} (${viewport.width}px): Zero gap between header bottom and hero top (gap: ${heroRect.gap}px).`);
    console.log(`       Hero paddingTop: ${heroRect.heroPaddingTop}, Breathing room to content: ${heroRect.breathingRoom}px`);

    // 4. Test scrolling to verify sticky behavior at top-0
    await page.evaluate(() => window.scrollBy(0, 300));
    const scrolledHeaderTop = await page.evaluate(() => {
      const header = document.querySelector('header');
      return header.getBoundingClientRect().top;
    });

    if (Math.abs(scrolledHeaderTop) > 0.5) {
      throw new Error(`[FAIL] After scrolling 300px, header top is ${scrolledHeaderTop}px on ${routeName}!`);
    }
    console.log(`[PASS] ${routeName} (${viewport.width}px): Sticky behavior confirmed while scrolling (top: ${scrolledHeaderTop}px).`);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));

    // Take screenshot
    const filename = `./test-screenshots/${routeName}-${viewport.width}px.png`;
    await page.screenshot({ path: filename });
    console.log(`[SAVED] Screenshot saved to ${filename}`);

    await page.close();
  };

  // Run checks
  await runCheck('http://localhost:5173/', 'home-desktop', { width: 1440, height: 900 });
  await runCheck('http://localhost:5173/', 'home-mobile', { width: 375, height: 812 });
  await runCheck('http://localhost:5173/men', 'men-desktop', { width: 1440, height: 900 });
  await runCheck('http://localhost:5173/men', 'men-mobile', { width: 375, height: 812 });

  await browser.close();
  console.log("==========================================");
  console.log("ALL NAVBAR & HERO SPACING CHECKS PASSED!");
  console.log("==========================================");
}

verifyNavbar().catch(err => {
  console.error(err);
  process.exit(1);
});
