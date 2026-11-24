import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function startServer() {
  const serverProcess = spawn('python3', ['-m', 'http.server', '5177', '--directory', 'dist'], {
    stdio: 'ignore'
  });

  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://localhost:5177/', (res) => {
          if (res.statusCode === 200) resolve(true);
          else reject();
        });
        req.on('error', reject);
        req.end();
      });
      console.log('Static server started at http://localhost:5177');
      return serverProcess;
    } catch {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  throw new Error('Server failed to start');
}

async function runTests() {
  const server = await startServer();
  fs.mkdirSync('verification-reports', { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('\n======================================================');
  console.log('  VERIFYING 2-COURSE BALANCED GRID & CLEAN DROPDOWNS  ');
  console.log('======================================================\n');

  // Set preference to avoid popup blocking checks
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('femme_scooty_gender_preference', 'women'));
  await page.reload({ waitUntil: 'networkidle0' });

  // 1. Check Women's Version (Desktop 1440px)
  await page.setViewport({ width: 1440, height: 900 });
  const womenCoursesCheck = await page.evaluate(() => {
    const section = document.getElementById('courses');
    if (!section) return { found: false };
    const cards = Array.from(section.querySelectorAll('.grid > div'));
    const titles = cards.map(c => c.querySelector('h3')?.innerText?.trim());
    const text = section.innerText;
    const hasRTO = text.includes('RTO Test aur Weekend Practice') || text.includes('License & Weekend Special');
    
    // Check form dropdown
    const select = document.querySelector('#hero-booking-form select[name="course"]');
    const options = Array.from(select?.querySelectorAll('option') || []).map(o => o.text);
    const dropdownHasRTO = options.some(o => o.includes('RTO') || o.includes('Weekend'));

    // Check equal heights
    const heights = cards.map(c => c.getBoundingClientRect().height);
    const equalHeight = Math.abs(heights[0] - heights[1]) < 4;

    return {
      count: cards.length,
      titles,
      hasRTO,
      dropdownCount: options.length,
      dropdownOptions: options,
      dropdownHasRTO,
      equalHeight,
      heights
    };
  });
  console.log('[Women Version Course Check]:', womenCoursesCheck);
  await page.screenshot({ path: 'verification-reports/women-2-courses-desktop.png' });

  // 2. Check Men's Version (/men on Desktop 1440px)
  await page.goto('http://localhost:5177/men', { waitUntil: 'networkidle0' });
  const menCoursesCheck = await page.evaluate(() => {
    const section = document.getElementById('courses');
    if (!section) return { found: false };
    const cards = Array.from(section.querySelectorAll('.grid > div'));
    const titles = cards.map(c => c.querySelector('h3')?.innerText?.trim());
    const text = section.innerText;
    const hasRTO = text.includes('RTO Test aur Weekend Practice') || text.includes('License & Weekend Special');

    // Check form dropdown
    const select = document.querySelector('#hero-booking-form select[name="course"]');
    const options = Array.from(select?.querySelectorAll('option') || []).map(o => o.text);
    const dropdownHasRTO = options.some(o => o.includes('RTO') || o.includes('Weekend'));

    // Check equal heights
    const heights = cards.map(c => c.getBoundingClientRect().height);
    const equalHeight = Math.abs(heights[0] - heights[1]) < 4;

    return {
      count: cards.length,
      titles,
      hasRTO,
      dropdownCount: options.length,
      dropdownOptions: options,
      dropdownHasRTO,
      equalHeight,
      heights
    };
  });
  console.log('[Men Version Course Check]:', menCoursesCheck);
  await page.screenshot({ path: 'verification-reports/men-2-courses-desktop.png' });

  // 3. Mobile Check (375px) on both versions
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });
  const overflowWomen = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Mobile 375px Women] Horizontal overflow: ${overflowWomen}`);
  await page.screenshot({ path: 'verification-reports/women-2-courses-mobile.png' });

  await page.goto('http://localhost:5177/men', { waitUntil: 'networkidle0' });
  const overflowMen = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Mobile 375px Men] Horizontal overflow: ${overflowMen}`);
  await page.screenshot({ path: 'verification-reports/men-2-courses-mobile.png' });

  console.log('\n--- CONSOLE ERRORS AUDIT ---');
  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();
  server.kill();

  const allPassed =
    consoleErrors.length === 0 &&
    womenCoursesCheck.count === 2 &&
    !womenCoursesCheck.hasRTO &&
    womenCoursesCheck.dropdownCount === 2 &&
    !womenCoursesCheck.dropdownHasRTO &&
    womenCoursesCheck.equalHeight &&
    menCoursesCheck.count === 2 &&
    !menCoursesCheck.hasRTO &&
    menCoursesCheck.dropdownCount === 2 &&
    !menCoursesCheck.dropdownHasRTO &&
    menCoursesCheck.equalHeight &&
    !overflowWomen &&
    !overflowMen;

  if (allPassed) {
    console.log('\n======================================================');
    console.log('>>> 2-COURSE CLEANUP VERIFIED AND PASSED 100%!     <<<');
    console.log('======================================================\n');
    process.exit(0);
  } else {
    console.error('\n>>> SOME CRITERIA FAILED SPEC! <<<\n');
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
