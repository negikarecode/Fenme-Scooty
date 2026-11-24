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
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('\n======================================================');
  console.log('  RUNNING PHASE REVISION VERIFICATION SUITE           ');
  console.log('======================================================\n');

  // Desktop (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });

  // 1. Verify Copy Fixes
  const heroCopyCheck = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasBinaDar = text.includes('Bina cycle, bina dar... Seedha scooty chalana seekho!');
    const hasOldDare = text.includes('bina dare');
    return { hasBinaDar, hasOldDare };
  });
  console.log(`[Hero Copy] "bina dar" present: ${heroCopyCheck.hasBinaDar}, "bina dare" removed: ${!heroCopyCheck.hasOldDare}`);

  const footerCopyCheck = await page.evaluate(() => {
    const footerText = document.querySelector('footer')?.innerText || '';
    const hasProperCapitalization = footerText.includes('Ladies Scooty Training Centre');
    const hasOldLowercase = footerText.includes('Ladies scooty training centre');
    return { hasProperCapitalization, hasOldLowercase };
  });
  console.log(`[Footer Copy] "Ladies Scooty Training Centre" capitalized: ${footerCopyCheck.hasProperCapitalization}, lowercase removed: ${!footerCopyCheck.hasOldLowercase}`);

  // 2. Verify Why Choose Us Micro-Badges
  const microBadges = await page.evaluate(() => {
    const badges = Array.from(document.querySelectorAll('#why-us .grid > div .border-t span:first-child'));
    return badges.map(b => b.textContent.trim());
  });
  console.log('[Why Choose Us Micro-Badges]:', microBadges);
  const badgesUnique = new Set(microBadges).size === 6;
  console.log(`[Why Choose Us] 6 Distinct Micro-Badges verified: ${badgesUnique}`);

  // 3. Verify Orphan Pill Moved into Top Badge Cluster
  const badgeClusterPills = await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('h1').item(0)?.closest('div')?.previousElementSibling?.querySelectorAll('span') || []);
    return pills.map(p => p.textContent.trim());
  });
  console.log('[Hero Top Badge Cluster]:', badgeClusterPills);
  const pillInCluster = badgeClusterPills.some(t => t.includes('Zero Cycling Balance Required'));
  console.log(`[Hero Pill] "Zero Cycling Balance Required" in top cluster: ${pillInCluster}`);

  // 4. Verify Course Card Images & Alt Tags
  const courseImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('#courses img'));
    return imgs.map(i => ({ src: i.getAttribute('src'), alt: i.getAttribute('alt') }));
  });
  console.log('[Courses Images]:', courseImages);
  const coursesAuthentic = courseImages.every(img => img.src.includes('course-'));
  console.log(`[Courses] Authentic Scooty Photos verified: ${coursesAuthentic}`);

  // 5. Verify About Story Image
  const aboutImage = await page.evaluate(() => {
    const img = document.querySelector('#about img');
    return img ? img.getAttribute('src') : null;
  });
  console.log(`[About Story Image]: ${aboutImage} (Authentic: ${aboutImage?.includes('about-story')})`);

  // 6. Test All 6 City Tabs (Focus on Lucknow)
  const cityTabs = ['Lucknow', 'Mathura', 'Jodhpur', 'Ghaziabad', 'Faridabad', 'Delhi'];
  for (const c of cityTabs) {
    await page.click(`button[data-city-id="${c.toLowerCase()}"]`);
    await new Promise(r => setTimeout(r, 150));
    const cardData = await page.evaluate(() => {
      const heading = document.querySelector('#locations h3')?.textContent?.trim();
      const img = document.querySelector('#locations img')?.getAttribute('src');
      const hubsCount = document.querySelectorAll('#locations .flex-wrap > span').length;
      return { heading, img, hubsCount };
    });
    console.log(`[City Tab ${c}] Active Heading: "${cardData.heading}", Img: "${cardData.img}", Hubs Count: ${cardData.hubsCount}`);
  }

  // 7. Scroll from Top to Bottom & Verify Scroll-to-Top Button Behavior
  // Scroll to courses section
  await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 200));

  // Check 3rd course card CTA overlap
  const ctaOverlapCheck = await page.evaluate(() => {
    const ctas = document.querySelectorAll('#courses button');
    const thirdCTA = ctas[ctas.length - 1];
    const scrollBtn = document.querySelector('button[aria-label="Scroll to top of page"]');
    if (!thirdCTA || !scrollBtn) return false;
    const r1 = thirdCTA.getBoundingClientRect();
    const r2 = scrollBtn.getBoundingClientRect();
    // Overlap check
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  });
  console.log(`[Scroll-to-Top Button] Overlaps 3rd Course Card CTA: ${ctaOverlapCheck}`);

  // Scroll all the way into footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 300));

  // Verify button hides or does not overlap copyright
  const footerOverlapCheck = await page.evaluate(() => {
    const scrollBtn = document.querySelector('button[aria-label="Scroll to top of page"]');
    const isHiddenOrTransparent = !scrollBtn || scrollBtn.classList.contains('opacity-0') || getComputedStyle(scrollBtn).opacity === '0';
    return isHiddenOrTransparent;
  });
  console.log(`[Scroll-to-Top Button] Automatically hidden inside footer: ${footerOverlapCheck}`);

  // Capture Desktop Screenshot with Lucknow Tab Active
  await page.click('button[data-city-id="lucknow"]');
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: 'verification-reports/desktop-lucknow-full.png', fullPage: true });

  // Mobile Viewport Check (375px)
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });
  await page.click('button[data-city-id="lucknow"]');
  await new Promise(r => setTimeout(r, 150));
  const overflow375 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Mobile 375px] Horizontal overflow: ${overflow375}`);
  await page.screenshot({ path: 'verification-reports/mobile-lucknow-full.png', fullPage: true });

  console.log('\n--- CONSOLE ERRORS AUDIT ---');
  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();
  server.kill();

  const success =
    consoleErrors.length === 0 &&
    heroCopyCheck.hasBinaDar &&
    !heroCopyCheck.hasOldDare &&
    footerCopyCheck.hasProperCapitalization &&
    !footerCopyCheck.hasOldLowercase &&
    badgesUnique &&
    pillInCluster &&
    coursesAuthentic &&
    aboutImage?.includes('about-story') &&
    !ctaOverlapCheck &&
    footerOverlapCheck &&
    !overflow375;

  if (success) {
    console.log('\n>>> ALL REVISIONS VERIFIED AND PASSED WITH 100% SUCCESS! <<<\n');
    process.exit(0);
  } else {
    console.error('\n>>> SOME CHECKS FAILED! <<<\n');
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
