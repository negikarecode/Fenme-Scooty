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
  console.log('  TESTING ENTRY POP-UP MODAL & MEN VERSION (/men)      ');
  console.log('======================================================\n');

  // STEP 1: Clear localStorage and verify modal appears on Desktop (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });

  const modalCheckDesktop = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return { visible: false };
    const text = dialog.innerText;
    return {
      visible: true,
      hasHeading: text.includes('Swagat Hai! Aap Kiske Liye Training Dekh Rahe Hain?'),
      hasOptionWomen: text.includes('Mahila (Women)') && text.includes('100% Mahila Trainers'),
      hasOptionMen: text.includes('Purush (Men)') && text.includes('Experienced Male Trainers'),
      hasSwitcherLink: text.includes('Mahila / Purush Version badal sakte hain'),
    };
  });
  console.log('[Step 1: Desktop Modal Check]', modalCheckDesktop);
  await page.screenshot({ path: 'verification-reports/modal-desktop.png' });

  // STEP 2: Verify modal on Mobile (375px)
  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });

  const modalCheckMobile = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return false;
    const overflow = document.documentElement.scrollWidth > window.innerWidth;
    return !overflow;
  });
  console.log(`[Step 2: Mobile 375px Modal Visible Without Overflow]: ${modalCheckMobile}`);
  await page.screenshot({ path: 'verification-reports/modal-mobile.png' });

  // STEP 3: Click "Purush (Men)" and verify navigation to /men
  await page.setViewport({ width: 1440, height: 900 });
  const buttons = await page.$$('div[role="dialog"] button');
  let clickedMen = false;
  for (const btn of buttons) {
    const text = await (await btn.getProperty('innerText')).jsonValue();
    if (text.includes('Purush (Men)')) {
      await btn.click();
      clickedMen = true;
      break;
    }
  }
  await new Promise(r => setTimeout(r, 400));

  const menNavCheck = await page.evaluate(() => {
    const path = window.location.pathname;
    const pref = localStorage.getItem('femme_scooty_gender_preference');
    const dialogClosed = !document.querySelector('div[role="dialog"]');
    return { path, pref, dialogClosed };
  });
  console.log('[Step 3: Click Purush Nav Check]', menNavCheck);

  // STEP 4: Inspect Men's Version Content & Theme on /men
  const menPageContent = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    const hasMenSubtext = bodyText.includes('Experienced Male Trainers • Ghar Ke Paas Training • Scooty aur Petrol Free');
    const hasMenAbout = bodyText.includes('purushon ke liye ye dedicated program shuru kiya');
    const hasMenReviewers = bodyText.includes('Rajesh Sharma') && bodyText.includes('Amit Patel') && bodyText.includes('Harish Verma');
    const hasMahilaSwitcher = bodyText.includes('Mahila Version Dekhein');

    const courseImages = Array.from(document.querySelectorAll('#courses img')).map(i => i.getAttribute('src'));
    const allMaleCoursePhotos = courseImages.every(s => s && s.includes('men-course-'));

    const aboutImage = document.querySelector('#about img')?.getAttribute('src');
    const isMaleAboutPhoto = aboutImage?.includes('men-about-story');

    const hasCityTabs = document.querySelectorAll('#locations button[data-city-id]').length === 6;

    return {
      hasMenSubtext,
      hasMenAbout,
      hasMenReviewers,
      hasMahilaSwitcher,
      allMaleCoursePhotos,
      isMaleAboutPhoto,
      hasCityTabs
    };
  });
  console.log('[Step 4: Men Page Content Check]', menPageContent);
  await page.screenshot({ path: 'verification-reports/men-page-desktop.png', fullPage: true });

  // STEP 5: Switch back to Women's version using Header Switcher
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('header button'));
    const womenBtn = buttons.find(b => b.innerText.includes('Mahila Version Dekhein'));
    if (womenBtn) womenBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const womenNavCheck = await page.evaluate(() => {
    const path = window.location.pathname;
    const pref = localStorage.getItem('femme_scooty_gender_preference');
    const bodyText = document.body.innerText;
    const hasWomenSubtext = bodyText.includes('100% Mahila Trainers • Aapke Ghar Ke Paas • Scooty aur Petrol Bilkul Free');
    const hasWomenReviewers = bodyText.includes('Pooja Verma') && bodyText.includes('Simran Kaur');
    const hasPurushSwitcher = bodyText.includes('Purush Version Dekhein');
    return { path, pref, hasWomenSubtext, hasWomenReviewers, hasPurushSwitcher };
  });
  console.log('[Step 5: Switch to Women Version Check]', womenNavCheck);
  await page.screenshot({ path: 'verification-reports/women-page-switched.png', fullPage: true });

  // STEP 6: Direct URL navigation to /men directly from clean browser tab
  const directMenPage = await browser.newPage();
  await directMenPage.goto('http://localhost:5177/men', { waitUntil: 'networkidle0' });
  const directMenCheck = await directMenPage.evaluate(() => {
    const text = document.body.innerText;
    const hasMenSubtext = text.includes('Experienced Male Trainers • Ghar Ke Paas Training • Scooty aur Petrol Free');
    const path = window.location.pathname;
    return { path, hasMenSubtext };
  });
  console.log('[Step 6: Direct /men Access Check]', directMenCheck);
  await directMenPage.close();

  // STEP 7: Mobile Viewport on /men (375px)
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5177/men', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 200));
  const overflowMen375 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Step 7: Mobile 375px /men Horizontal Overflow]: ${overflowMen375}`);
  await page.screenshot({ path: 'verification-reports/men-page-mobile.png', fullPage: true });

  console.log('\n--- CONSOLE ERRORS AUDIT ---');
  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();
  server.kill();

  const allPassed =
    consoleErrors.length === 0 &&
    modalCheckDesktop.visible &&
    modalCheckDesktop.hasHeading &&
    modalCheckDesktop.hasOptionWomen &&
    modalCheckDesktop.hasOptionMen &&
    modalCheckMobile &&
    clickedMen &&
    menNavCheck.path === '/men' &&
    menNavCheck.pref === 'men' &&
    menNavCheck.dialogClosed &&
    menPageContent.hasMenSubtext &&
    menPageContent.hasMenAbout &&
    menPageContent.hasMenReviewers &&
    menPageContent.hasMahilaSwitcher &&
    menPageContent.allMaleCoursePhotos &&
    menPageContent.isMaleAboutPhoto &&
    menPageContent.hasCityTabs &&
    womenNavCheck.path === '/' &&
    womenNavCheck.pref === 'women' &&
    womenNavCheck.hasWomenSubtext &&
    womenNavCheck.hasWomenReviewers &&
    womenNavCheck.hasPurushSwitcher &&
    directMenCheck.hasMenSubtext &&
    !overflowMen375;

  if (allPassed) {
    console.log('\n======================================================');
    console.log('>>> MODAL & MEN (/men) VERIFICATION PASSED 100%!   <<<');
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
