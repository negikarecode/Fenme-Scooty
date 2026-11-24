import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function startServer() {
  const serverProcess = spawn('python3', ['-m', 'http.server', '5176', '--directory', 'dist'], {
    stdio: 'ignore'
  });

  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://localhost:5176/', (res) => {
          if (res.statusCode === 200) resolve(true);
          else reject();
        });
        req.on('error', reject);
        req.end();
      });
      console.log('Static server started at http://localhost:5176');
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

  console.log('\n=============================================');
  console.log('  RUNNING FULL AUTOMATED VERIFICATION SUITE  ');
  console.log('=============================================\n');

  // Desktop (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5176', { waitUntil: 'networkidle0' });

  // 1. Horizontal Overflow Test
  const overflow1440 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Desktop 1440px] Horizontal overflow: ${overflow1440 ? 'FAILED' : 'PASSED (0px overflow)'}`);

  // 2. Checkpoint 3: Courses Cards Equal Heights
  const courseCardHeights = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#courses .grid > div'));
    return cards.map(c => Math.round(c.getBoundingClientRect().height));
  });
  const coursesEqual = courseCardHeights.length === 3 && Math.max(...courseCardHeights) === Math.min(...courseCardHeights);
  console.log(`[Courses Grid] Equal heights: ${coursesEqual ? 'PASSED' : 'FAILED'} (Heights: ${courseCardHeights.join('px, ')}px)`);

  // 3. Checkpoint 3: Testimonials Cards Equal Heights
  const testimonialCardHeights = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#reviews .hidden.lg\\:grid > div'));
    return cards.map(c => Math.round(c.getBoundingClientRect().height));
  });
  const testimonialsEqual = testimonialCardHeights.length === 3 && Math.max(...testimonialCardHeights) === Math.min(...testimonialCardHeights);
  console.log(`[Testimonials Grid] Equal heights: ${testimonialsEqual ? 'PASSED' : 'FAILED'} (Heights: ${testimonialCardHeights.join('px, ')}px)`);

  // 4. Checkpoint 3: Why Choose Us - 6 Balanced Items
  const whyUsCardCount = await page.evaluate(() => document.querySelectorAll('#why-us .grid > div').length);
  const whyUsBalanced = whyUsCardCount === 6;
  console.log(`[Why Choose Us] 6-Card Grid: ${whyUsBalanced ? 'PASSED (Balanced 3x2)' : 'FAILED (Count: ' + whyUsCardCount + ')'}`);

  // 5. Checkpoint 3: City Tabs Switching
  const cities = [
    { id: 'lucknow', name: 'Lucknow' },
    { id: 'mathura', name: 'Mathura' },
    { id: 'jodhpur', name: 'Jodhpur' },
    { id: 'ghaziabad', name: 'Ghaziabad' },
    { id: 'faridabad', name: 'Faridabad' },
    { id: 'delhi', name: 'Delhi' }
  ];

  let allTabsWorking = true;
  for (const c of cities) {
    await page.click(`button[data-city-id="${c.id}"]`);
    await new Promise(r => setTimeout(r, 100));
    const activeCityText = await page.evaluate(() => document.querySelector('#locations h3')?.textContent?.trim());
    const matches = activeCityText === c.name;
    if (!matches) allTabsWorking = false;
    console.log(`[Locations Tab] Clicked "${c.name}" -> Active Card Heading: "${activeCityText}" (${matches ? 'PASSED' : 'FAILED'})`);
  }

  // 6. Checkpoint 4: Testimonials Carousel Navigation on Mobile/Tablet View
  await page.setViewport({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle0' });

  const initialSlide = await page.evaluate(() => document.querySelector('#reviews span.font-mono')?.textContent?.trim());
  await page.click('#reviews button[aria-label="Next Testimonial"]');
  await new Promise(r => setTimeout(r, 150));
  const nextSlide = await page.evaluate(() => document.querySelector('#reviews span.font-mono')?.textContent?.trim());
  await page.click('#reviews button[aria-label="Previous Testimonial"]');
  await new Promise(r => setTimeout(r, 150));
  const prevSlide = await page.evaluate(() => document.querySelector('#reviews span.font-mono')?.textContent?.trim());

  const carouselWorking = initialSlide === '01 / 03' && nextSlide === '02 / 03' && prevSlide === '01 / 03';
  console.log(`[Testimonials Carousel] Slide navigation: ${carouselWorking ? 'PASSED' : 'FAILED'} (01 -> ${nextSlide} -> ${prevSlide})`);

  // 7. Checkpoint 4: FAQ Accordion Toggle
  const faq1Before = await page.evaluate(() => document.querySelectorAll('#faq button[aria-expanded]')[0].getAttribute('aria-expanded'));
  const faqButtons = await page.$$('#faq button[aria-expanded]');
  await faqButtons[1].click();
  await new Promise(r => setTimeout(r, 150));
  const faq2After = await page.evaluate(() => document.querySelectorAll('#faq button[aria-expanded]')[1].getAttribute('aria-expanded'));
  const faqWorking = faq1Before === 'true' && faq2After === 'true';
  console.log(`[FAQ Accordion] Expand/Collapse: ${faqWorking ? 'PASSED' : 'FAILED'}`);

  // 8. Checkpoint 4: Callback Form Validation & Submission
  await page.evaluate(() => document.getElementById('hero-booking-form')?.scrollIntoView());
  
  await page.type('input[name="fullName"]', 'Sanya Kapoor');
  await page.type('input[name="phone"]', '1234');
  await page.click('#hero-booking-form button[type="submit"]');
  await new Promise(r => setTimeout(r, 150));
  const errorText = await page.evaluate(() => document.querySelector('#hero-booking-form .text-red-600')?.textContent?.trim());
  const errorVerified = errorText === 'Please enter a valid 10-digit mobile number';
  console.log(`[Form Validation] Short phone rejection: ${errorVerified ? 'PASSED' : 'FAILED'} ("${errorText}")`);

  await page.click('input[name="phone"]', { clickCount: 3 });
  await page.type('input[name="phone"]', '9876543210');
  await page.click('#hero-booking-form button[type="submit"]');
  await new Promise(r => setTimeout(r, 600));

  const confirmationGreeting = await page.evaluate(() => document.querySelector('#hero-booking-form h4')?.textContent?.trim());
  const hasWhatsAppCTA = await page.evaluate(() => document.querySelector('#hero-booking-form button')?.textContent?.includes('WhatsApp'));
  const formSuccessVerified = confirmationGreeting === 'Thank You, Sanya Kapoor!' && hasWhatsAppCTA;
  console.log(`[Form Submission] Confirmation state: ${formSuccessVerified ? 'PASSED' : 'FAILED'} ("${confirmationGreeting}")`);

  // Check overflow on mobile (375px)
  const overflow375 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Mobile 375px] Horizontal overflow: ${overflow375 ? 'FAILED' : 'PASSED (0px overflow)'}`);
  await page.screenshot({ path: 'verification-reports/mobile-full.png', fullPage: true });

  // Tablet Viewport Check (768px)
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:5176', { waitUntil: 'networkidle0' });
  const overflow768 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Tablet 768px] Horizontal overflow: ${overflow768 ? 'FAILED' : 'PASSED (0px overflow)'}`);
  await page.screenshot({ path: 'verification-reports/tablet-full.png', fullPage: true });

  // Desktop Viewport Full Screenshot (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5176', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'verification-reports/desktop-full.png', fullPage: true });

  console.log('\n--- CONSOLE LOGS & ERRORS AUDIT ---');
  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();
  server.kill();

  const allPassed =
    consoleErrors.length === 0 &&
    !overflow1440 &&
    !overflow768 &&
    !overflow375 &&
    coursesEqual &&
    testimonialsEqual &&
    whyUsBalanced &&
    allTabsWorking &&
    carouselWorking &&
    faqWorking &&
    errorVerified &&
    formSuccessVerified;

  if (allPassed) {
    console.log('\n>>> ALL 4 CHECKPOINTS PASSED WITH 100% SUCCESS! <<<\n');
    process.exit(0);
  } else {
    console.error('\n>>> SOME TESTS FAILED! <<<\n');
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
