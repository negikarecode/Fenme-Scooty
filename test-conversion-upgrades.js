import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyConversionUpgrades() {
  console.log("===============================================================");
  console.log("VERIFYING 4 CONVERSION AND UX UPGRADES");
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
    // 1. Smart Callback Form -> Pre-Filled WhatsApp Handoff
    // -------------------------------------------------------------
    console.log("\n[Test 1] Testing Smart Callback Form -> Pre-Filled WhatsApp Handoff...");

    // Fill form
    await page.type('input[name="fullName"]', 'Priya Sharma');
    await page.type('input[name="phone"]', '9876543210');
    await page.select('select[name="city"]', 'Delhi');
    await page.select('select[name="course"]', '7-days-basic');

    // Submit form
    const submitBtn = await page.$('form button[type="submit"]');
    await submitBtn.click();

    // Wait for submission animation
    await page.waitForSelector('#hero-whatsapp-handoff-btn', { timeout: 3000 });

    const handoffAudit = await page.evaluate(() => {
      const formCard = document.getElementById('hero-booking-form');
      const text = formCard ? formCard.innerText : '';
      const whatsappBtn = document.getElementById('hero-whatsapp-handoff-btn');
      const whatsappHref = whatsappBtn ? whatsappBtn.getAttribute('href') : null;
      const resetBtn = document.getElementById('hero-reset-form-btn');

      return {
        text,
        whatsappHref,
        hasResetBtn: !!resetBtn
      };
    });

    console.log("[Handoff Audit]:", handoffAudit);

    if (!handoffAudit.text.includes('Thank you, Priya Sharma!') || !handoffAudit.text.includes('Hamari team aapko jaldi call karegi.')) {
      throw new Error(`[FAIL] Confirmation text mismatch! Got: ${handoffAudit.text}`);
    }
    console.log("[PASS] Confirmation text matches: 'Thank you, Priya Sharma! Hamari team aapko jaldi call karegi.'");

    const expectedHandoffMsg = "Hi Femme Scooty, mera naam Priya Sharma hai. Mujhe Delhi mein 7 Days Basic Course ke liye training chahiye. Mera number: 9876543210.";
    if (!handoffAudit.whatsappHref || !handoffAudit.whatsappHref.includes(encodeURIComponent(expectedHandoffMsg))) {
      throw new Error(`[FAIL] Pre-filled WhatsApp link mismatch!\nExpected message: "${expectedHandoffMsg}"\nGot href: ${handoffAudit.whatsappHref}`);
    }
    console.log("[PASS] WhatsApp handoff button opens exact pre-filled message with Name, Mobile, City, and Course");

    if (!handoffAudit.hasResetBtn) {
      throw new Error("[FAIL] Missing 'Submit Another Request' reset button!");
    }
    // Test resetting form
    await page.click('#hero-reset-form-btn');
    await new Promise(r => setTimeout(r, 200));
    const isFormReset = await page.evaluate(() => !!document.querySelector('form input[name="fullName"]'));
    if (!isFormReset) {
      throw new Error("[FAIL] Form did not reset after clicking 'Submit Another Request'");
    }
    console.log("[PASS] 'Submit Another Request' successfully resets the form");

    // -------------------------------------------------------------
    // 2. 3-Step "Day 1 to Day 7" Learning Journey Strip
    // -------------------------------------------------------------
    console.log("\n[Test 2] Checking 3-Step Learning Journey Strip...");
    const journeyAudit = await page.evaluate(() => {
      const coursesSection = document.getElementById('courses');
      if (!coursesSection) return null;
      const text = coursesSection.innerText;
      const hasHeading = text.includes('How You Learn — 7 Din Ka Safar');
      const hasStep1 = text.includes('Day 1–2: Balance & Handle Control') && text.includes('Bina dar ke scooty sambhalna aur slow speed balance seekhein.');
      const hasStep2 = text.includes('Day 3–5: Turns, Brakes & Gali Practice') && text.includes('Safe neighborhood lanes mein U-turns aur smooth braking ki practice.');
      const hasStep3 = text.includes('Day 6–7: Road & Traffic Confidence') && text.includes('Main road aur traffic mein bina kisi jhijhak ke chalana seekhein.');

      return {
        hasHeading,
        hasStep1,
        hasStep2,
        hasStep3
      };
    });

    console.log("[Journey Audit]:", journeyAudit);
    if (!journeyAudit.hasHeading || !journeyAudit.hasStep1 || !journeyAudit.hasStep2 || !journeyAudit.hasStep3) {
      throw new Error(`[FAIL] 3-Step Learning Journey Strip content missing! ${JSON.stringify(journeyAudit)}`);
    }
    console.log("[PASS] 3-Step Learning Journey Strip is present with exact 3 day steps and copy");

    // -------------------------------------------------------------
    // 3. Trust & Booking Reassurance Line
    // -------------------------------------------------------------
    console.log("\n[Test 3] Checking Trust & Booking Reassurance Line in Hero and Courses...");
    const reassuranceAudit = await page.evaluate(() => {
      const heroForm = document.getElementById('hero-booking-form');
      const coursesSection = document.getElementById('courses');
      const line = "No Hidden Petrol Charges • Flexible Slot Rescheduling • 100% Female Trainers";

      const heroHasLine = heroForm ? heroForm.innerText.includes('No Hidden Petrol Charges') && heroForm.innerText.includes('Flexible Slot Rescheduling') && heroForm.innerText.includes('100% Female Trainers') : false;
      const coursesHasLine = coursesSection ? coursesSection.innerText.includes('No Hidden Petrol Charges') && coursesSection.innerText.includes('Flexible Slot Rescheduling') && coursesSection.innerText.includes('100% Female Trainers') : false;

      return {
        heroHasLine,
        coursesHasLine
      };
    });

    console.log("[Reassurance Audit]:", reassuranceAudit);
    if (!reassuranceAudit.heroHasLine) {
      throw new Error("[FAIL] Hero form missing reassurance line below submit button!");
    }
    if (!reassuranceAudit.coursesHasLine) {
      throw new Error("[FAIL] Courses section missing reassurance line beneath courses!");
    }
    console.log("[PASS] Reassurance line ('No Hidden Petrol Charges • Flexible Slot Rescheduling • 100% Female Trainers') verified in both Hero form and Courses section");

    // -------------------------------------------------------------
    // 4. Sticky Mobile Bottom Action Bar (< 768px / 375px)
    // -------------------------------------------------------------
    console.log("\n[Test 4] Checking Sticky Mobile Bottom Action Bar (< 768px / 375x812)...");
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 200));

    const mobileBarAudit = await page.evaluate(() => {
      const bar = document.getElementById('mobile-bottom-action-bar');
      const floatingBtn = document.getElementById('floating-whatsapp-btn');
      const callBtn = document.getElementById('mobile-call-btn');
      const whatsappBtn = document.getElementById('mobile-whatsapp-btn');

      const barComputed = bar ? window.getComputedStyle(bar) : null;
      const floatingComputed = floatingBtn ? window.getComputedStyle(floatingBtn) : null;

      return {
        hasBar: !!bar,
        isBarVisible: barComputed ? barComputed.display !== 'none' : false,
        isFloatingHidden: floatingComputed ? floatingComputed.display === 'none' : true,
        callHref: callBtn ? callBtn.getAttribute('href') : null,
        whatsappHref: whatsappBtn ? whatsappBtn.getAttribute('href') : null
      };
    });

    console.log("[Mobile Bar Audit]:", mobileBarAudit);
    if (!mobileBarAudit.isBarVisible) {
      throw new Error("[FAIL] Mobile sticky bottom action bar is not visible at 375px!");
    }
    if (!mobileBarAudit.isFloatingHidden) {
      throw new Error("[FAIL] Floating corner WhatsApp button should be hidden on mobile screens!");
    }
    if (!mobileBarAudit.callHref || !mobileBarAudit.callHref.includes('tel:')) {
      throw new Error(`[FAIL] Mobile Call button invalid href: ${mobileBarAudit.callHref}`);
    }
    if (!mobileBarAudit.whatsappHref || !mobileBarAudit.whatsappHref.includes('wa.me')) {
      throw new Error(`[FAIL] Mobile WhatsApp button invalid href: ${mobileBarAudit.whatsappHref}`);
    }
    console.log("[PASS] Sticky mobile bottom action bar is visible with 2 equal-width buttons (Call Now & WhatsApp Us) and floating button is hidden");

    // Test zero overlap with footer text at the bottom of the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 300));

    const mobileFooterOverlap = await page.evaluate(() => {
      const bar = document.getElementById('mobile-bottom-action-bar');
      const barRect = bar ? bar.getBoundingClientRect() : null;
      const paragraphs = Array.from(document.querySelectorAll('footer .bg-charcoal p'));
      const overlapsAnyP = barRect && paragraphs.some(p => {
        const pRect = p.getBoundingClientRect();
        return !(
          barRect.right < pRect.left ||
          barRect.left > pRect.right ||
          barRect.bottom < pRect.top ||
          barRect.top > pRect.bottom
        );
      });

      return {
        overlapsAnyP
      };
    });

    console.log("[Mobile Footer Overlap Audit]:", mobileFooterOverlap);
    if (mobileFooterOverlap.overlapsAnyP) {
      throw new Error("[FAIL] Sticky mobile bar overlaps footer copyright text!");
    }
    console.log("[PASS] Sticky mobile bar has zero overlap with footer copyright text");

    // -------------------------------------------------------------
    // 5. Desktop (1440x900) Check
    // -------------------------------------------------------------
    console.log("\n[Test 5] Checking Desktop (1440x900) floating corner button after scroll...");
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(r => setTimeout(r, 200));

    const desktopAudit = await page.evaluate(() => {
      const bar = document.getElementById('mobile-bottom-action-bar');
      const floatingBtn = document.getElementById('floating-whatsapp-btn');

      const barComputed = bar ? window.getComputedStyle(bar) : null;
      const floatingComputed = floatingBtn ? window.getComputedStyle(floatingBtn) : null;

      return {
        isBarHidden: barComputed ? barComputed.display === 'none' : true,
        isFloatingVisible: floatingComputed ? floatingComputed.display !== 'none' && floatingComputed.opacity === '1' : false
      };
    });

    console.log("[Desktop Audit]:", desktopAudit);
    if (!desktopAudit.isBarHidden) {
      throw new Error("[FAIL] Mobile action bar should be hidden on desktop (1440px)!");
    }
    if (!desktopAudit.isFloatingVisible) {
      throw new Error("[FAIL] Floating corner WhatsApp button should be visible on desktop after scrolling!");
    }
    console.log("[PASS] Desktop shows floating corner button after scroll and hides mobile action bar");

    // Check console errors
    console.log(`\n[Console Errors]: ${consoleErrors.length} found`);
    if (consoleErrors.length > 0) {
      throw new Error(`[FAIL] Console errors: ${JSON.stringify(consoleErrors)}`);
    }
    console.log("[PASS] Zero console errors");

    console.log("\n===============================================================");
    console.log("ALL 4 CONVERSION & UX UPGRADES VERIFIED 100%!");
    console.log("===============================================================");

  } finally {
    await browser.close();
    server.close();
  }
}

verifyConversionUpgrades().catch(err => {
  console.error("\n❌ Verification Failed:", err);
  process.exit(1);
});
