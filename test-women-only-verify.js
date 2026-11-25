import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
  console.log("===============================================================");
  console.log("VERIFYING CLEAN WOMEN-ONLY FEMME SCOOTY EXPERIENCE");
  console.log("===============================================================");

  // -------------------------------------------------------------
  // Step 1: Static Files and Data Cleanup Check
  // -------------------------------------------------------------
  console.log("\n[Step 1] Checking removed files, routes & male data...");

  // GenderModal component must not exist
  if (fs.existsSync('src/components/GenderModal.tsx')) {
    throw new Error("[FAIL] src/components/GenderModal.tsx still exists!");
  }
  console.log("[PASS] GenderModal.tsx deleted");

  // menSiteData must not exist
  if (fs.existsSync('src/data/menSiteData.ts')) {
    throw new Error("[FAIL] src/data/menSiteData.ts still exists!");
  }
  console.log("[PASS] menSiteData.ts deleted");

  // dist/men folder must not exist
  if (fs.existsSync('dist/men')) {
    throw new Error("[FAIL] dist/men still exists in build output!");
  }
  console.log("[PASS] dist/men does not exist");

  // Male stock photos must not exist in public/images
  const malePhotos = [
    'public/images/men-course-basic.jpg',
    'public/images/men-course-advance.jpg',
    'public/images/men-course-rto.jpg',
    'public/images/men-about-story.jpg',
    'public/images/rajesh-sharma.png',
    'public/images/amit-patel.png',
    'public/images/harish-verma.png'
  ];
  for (const photo of malePhotos) {
    if (fs.existsSync(photo)) {
      throw new Error(`[FAIL] Male photo ${photo} still exists in public/images!`);
    }
  }
  console.log("[PASS] All male stock photos deleted from public/images");

  // -------------------------------------------------------------
  // Step 2: Vercel.json 301 Redirect Check
  // -------------------------------------------------------------
  console.log("\n[Step 2] Checking vercel.json 301 redirects...");
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
  const menRedirect = vercel.redirects?.find(r => r.source === '/men' && r.destination === '/' && r.permanent === true);
  if (!menRedirect) {
    throw new Error("[FAIL] vercel.json missing 301 permanent redirect from /men to /");
  }
  const menWildcardRedirect = vercel.redirects?.find(r => r.source === '/men/:path*' && r.destination === '/' && r.permanent === true);
  if (!menWildcardRedirect) {
    throw new Error("[FAIL] vercel.json missing 301 permanent redirect from /men/:path* to /");
  }
  const menRewrite = vercel.rewrites?.find(r => r.source === '/men');
  if (menRewrite) {
    throw new Error("[FAIL] vercel.json should NOT have a rewrite for /men");
  }
  console.log("[PASS] vercel.json has permanent 301 redirect from /men to / and no /men rewrite");

  // -------------------------------------------------------------
  // Step 3: Sitemap.xml Check
  // -------------------------------------------------------------
  console.log("\n[Step 3] Checking sitemap.xml...");
  const sitemap = fs.readFileSync('public/sitemap.xml', 'utf-8');
  if (sitemap.includes('/men')) {
    throw new Error("[FAIL] public/sitemap.xml still contains /men URL entry!");
  }
  if (!sitemap.includes('<loc>https://fenme-scooty.vercel.app/</loc>')) {
    throw new Error("[FAIL] public/sitemap.xml missing https://fenme-scooty.vercel.app/ entry");
  }
  console.log("[PASS] public/sitemap.xml contains strictly https://fenme-scooty.vercel.app/ without /men");

  // -------------------------------------------------------------
  // Step 4: Browser Testing on Live Server
  // -------------------------------------------------------------
  console.log("\n[Step 4] Starting HTTP server and running Puppeteer browser tests...");

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];

    // Simulate Vercel 301 redirect for /men and /men/*
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
      // SPA Fallback to index.html
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
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    // 4.1 Visit /
    console.log("\n[Test 4.1] Visiting / on desktop (1440x900)...");
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });

    // Check no modal popped up
    const modal = await page.$('div[role="dialog"]');
    if (modal) {
      throw new Error("[FAIL] Gender popup modal found in DOM on /!");
    }
    const pageText = await page.evaluate(() => document.body.innerText);
    if (pageText.includes('Welcome! Who is the training for?') || pageText.includes('Apna option chunein')) {
      throw new Error("[FAIL] Pop-up modal text found on /!");
    }
    console.log("[PASS] No entry modal popped up");

    // Check localStorage has no gender state
    const lsPref = await page.evaluate(() => localStorage.getItem('femme_scooty_gender_preference'));
    if (lsPref !== null) {
      throw new Error(`[FAIL] localStorage has residual gender state: ${lsPref}`);
    }
    console.log("[PASS] No gender preference in localStorage");

    // Check Navbar layout & removal of dropdown pill
    const navAudit = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const logo = header.querySelector('a')?.innerText?.trim();
      const navLinks = Array.from(header.querySelectorAll('nav button')).map(b => b.innerText.trim());
      const bookBtn = Array.from(header.querySelectorAll('button')).find(b => b.innerText.includes('Book a Slot'));
      const wingDropdownBtn = document.getElementById('wing-dropdown-button');
      const hasDropdownPill = header.innerText.includes('Women (Mahila)') || header.innerText.includes('Men (Purush)');

      return {
        logo,
        navLinks,
        hasBookBtn: !!bookBtn,
        hasWingDropdownId: !!wingDropdownBtn,
        hasDropdownPill
      };
    });

    console.log("[Navbar Audit]:", navAudit);
    if (navAudit.logo !== 'femme scooty.') {
      throw new Error(`[FAIL] Expected logo 'femme scooty.', found '${navAudit.logo}'`);
    }
    const expectedLinks = ['About Us', 'Courses', 'Why Us', 'Reviews', 'Locations', 'FAQs'];
    for (const link of expectedLinks) {
      if (!navAudit.navLinks.includes(link)) {
        throw new Error(`[FAIL] Missing navbar link: ${link}`);
      }
    }
    if (!navAudit.hasBookBtn) {
      throw new Error("[FAIL] Missing 'Book a Slot' CTA button in navbar");
    }
    if (navAudit.hasWingDropdownId || navAudit.hasDropdownPill) {
      throw new Error("[FAIL] Gender Selection dropdown pill still exists in navbar!");
    }
    console.log("[PASS] Navbar has clean 3-part layout and zero gender dropdown pills");

    // Check Footer: Quick Links & Copyright bar
    const footerAudit = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return null;
      const footerText = footer.innerText;
      const hasBadleinBtn = footerText.includes('Mahila / Purush Version Badlein');
      const hasVersionSwitcher = footerText.includes('Men (Purush) Version') || footerText.includes('Women (Mahila) Version');
      const hasWingLabel = footerText.includes("Men's Wing") || footerText.includes("Women's Wing");
      const copyrightText = footer.querySelector('.bg-charcoal')?.innerText || '';

      return {
        hasBadleinBtn,
        hasVersionSwitcher,
        hasWingLabel,
        copyrightText
      };
    });

    console.log("[Footer Audit]:", footerAudit);
    if (footerAudit.hasBadleinBtn) {
      throw new Error("[FAIL] Footer still has 'Mahila / Purush Version Badlein' button!");
    }
    if (footerAudit.hasVersionSwitcher) {
      throw new Error("[FAIL] Footer still has version switcher button!");
    }
    if (footerAudit.hasWingLabel) {
      throw new Error("[FAIL] Footer copyright bar still has 'Wing' label!");
    }
    if (!footerAudit.copyrightText.includes('Copyright © 2026 Ladies Scooty Training Centre | Femme Scooty | All Rights Reserved')) {
      throw new Error(`[FAIL] Unexpected copyright text: ${footerAudit.copyrightText}`);
    }
    console.log("[PASS] Footer is completely clean of any version switcher or Wing labels");

    // Check Floating WhatsApp button
    const whatsappHref = await page.evaluate(() => {
      const btn = document.getElementById('floating-whatsapp-btn');
      return btn ? btn.getAttribute('href') : null;
    });

    const expectedWhatsAppMsg = "Hi Femme Scooty, mujhe Ladies Scooty Training ke baare mein jaankari chahiye.";
    if (!whatsappHref || !whatsappHref.includes(encodeURIComponent(expectedWhatsAppMsg))) {
      throw new Error(`[FAIL] Floating WhatsApp button link mismatch. Got: ${whatsappHref}`);
    }
    console.log("[PASS] Floating WhatsApp button has exact pre-filled Ladies message");

    // 4.2 Test Mobile Viewport
    console.log("\n[Test 4.2] Testing mobile viewport (375x812)...");
    await page.setViewport({ width: 375, height: 812 });
    await page.reload({ waitUntil: 'networkidle0' });

    const mobileAudit = await page.evaluate(() => {
      const header = document.querySelector('header');
      const hasMobileDropdown = header ? (header.innerText.includes('Women') || header.innerText.includes('Men')) && !header.innerText.includes('femme scooty.') : false;
      return { hasMobileDropdown };
    });
    if (mobileAudit.hasMobileDropdown) {
      throw new Error("[FAIL] Mobile header still contains gender dropdown!");
    }

    // Click hamburger menu
    const hamburger = await page.$('header button[aria-label="Toggle Navigation Menu"]');
    if (!hamburger) throw new Error("[FAIL] Mobile hamburger menu button not found");
    await hamburger.click();
    await new Promise(r => setTimeout(r, 200));

    const drawerText = await page.evaluate(() => {
      const header = document.querySelector('header');
      return header?.innerText || '';
    });
    if (drawerText.includes('Switch to Men') || drawerText.includes('Mahila / Purush Modal')) {
      throw new Error("[FAIL] Mobile drawer still has gender switch buttons!");
    }
    console.log("[PASS] Mobile drawer menu contains only nav links, Call, and Book buttons");

    // 4.3 Test /men clean redirect to /
    console.log("\n[Test 4.3] Visiting /men to verify clean redirect to / ...");
    const response = await page.goto(`${baseUrl}/men`, { waitUntil: 'networkidle0' });
    const currentUrl = page.url();
    const currentPath = await page.evaluate(() => window.location.pathname);
    const pageTitle = await page.title();

    console.log(`[Redirect Result]: URL: ${currentUrl}, Path: ${currentPath}, Title: "${pageTitle}"`);

    if (currentPath !== '/') {
      throw new Error(`[FAIL] Expected path to be '/', got '${currentPath}'`);
    }
    if (!pageTitle.includes('Femme Scooty') || pageTitle.includes("Men's Wing")) {
      throw new Error(`[FAIL] Page title has incorrect branding or Men's Wing: ${pageTitle}`);
    }
    console.log("[PASS] Visiting /men redirects cleanly to / with correct women-only title");

    // Check console errors
    console.log(`\n[Console Errors check]: ${consoleErrors.length} errors found.`);
    if (consoleErrors.length > 0) {
      throw new Error(`[FAIL] Console errors encountered: ${JSON.stringify(consoleErrors)}`);
    }
    console.log("[PASS] Zero console errors across all visits and interactions");

    console.log("\n===============================================================");
    console.log("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!");
    console.log("===============================================================");

  } finally {
    await browser.close();
    server.close();
  }
}

runVerification().catch(err => {
  console.error("\n❌ Verification Failed:", err);
  process.exit(1);
});
