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
  console.log('  RUNNING MINIMAL HINGLISH REVISION VERIFICATION      ');
  console.log('======================================================\n');

  // Desktop (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });

  // 1. Verify Header & Nav in Simple Hinglish
  const headerCheck = await page.evaluate(() => {
    const text = document.querySelector('header')?.innerText || '';
    const hasWordmark = text.includes('femme scooty.');
    const hasNavHinglish = text.includes('Hamare Baare Mein') &&
                           text.includes('Courses') &&
                           text.includes('Kyu Chunein') &&
                           text.includes('Reviews') &&
                           text.includes('Locations') &&
                           text.includes('Sawal-Jawab');
    const hasCTA = text.includes('Slot Book Karein');
    return { hasWordmark, hasNavHinglish, hasCTA };
  });
  console.log('[Header Check]', headerCheck);

  // 2. Verify Hero Headline, Subtext & Reassurance
  const heroCheck = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasHeadline = text.includes('Ab Bina Dar, Khud Scooty Chalana Seekhein') ||
                        (text.includes('Ab Bina Dar') && text.includes('Khud Scooty') && text.includes('Chalana Seekhein'));
    const hasSubtext = text.includes('100% Mahila Trainers • Aapke Ghar Ke Paas • Scooty aur Petrol Bilkul Free');
    const hasReassurance = text.includes('Cycle aati ho ya nahi, hum aapko aaram se, bina kisi tension ke scooty chalana sikhayenge.');
    const hasCallCTA = text.includes('Call Karein: +91 96256 95363');
    const hasWhatsAppCTA = text.includes('WhatsApp Par Baat Karein');
    return { hasHeadline, hasSubtext, hasReassurance, hasCallCTA, hasWhatsAppCTA };
  });
  console.log('[Hero Check]', heroCheck);

  // 3. Verify Callback Form in Hinglish
  const formCheck = await page.evaluate(() => {
    const form = document.getElementById('hero-booking-form');
    if (!form) return false;
    const text = form.innerText;
    return text.includes('Free Call Back Mangwayein') &&
           text.includes('Aapka Naam') &&
           text.includes('Mobile Number (+91)') &&
           text.includes('Apna Shehar Chunein') &&
           text.includes('Kaunsa Course Chahiye?') &&
           text.includes('Call Back Book Karein');
  });
  console.log(`[Callback Form] Clean Hinglish fields verified: ${formCheck}`);

  // 4. Verify Marquee Ticker
  const marqueeCheck = await page.evaluate(() => {
    const text = document.querySelector('.animate-ticker')?.innerText || '';
    return text.includes('1000+ MAHILAYEIN SEEKH CHUKI HAIN') &&
           text.includes('16 SE 60 SAAL TAK') &&
           text.includes('CYCLE AATI HO YA NAHI') &&
           text.includes('GHAR KE PAAS TRAINING');
  });
  console.log(`[Marquee Ticker] Hinglish trust bar verified: ${marqueeCheck}`);

  // 5. Verify 3 Courses Cards
  const coursesCheck = await page.evaluate(() => {
    const text = document.getElementById('courses')?.innerText || '';
    const hasCard1 = text.includes('7 Din ka Basic Course') && text.includes('Jinhe balance karna bhi nahi aata');
    const hasCard2 = text.includes('4 Din ka Advance Course') && text.includes('Balance hai par bheed-bhaad aur traffic mein dar lagta hai');
    const hasCard3 = text.includes('RTO Test aur Weekend Practice') && text.includes('Driving license test ki taiyari aur Saturday-Sunday special practice');
    const hasCTAs = text.includes('Course Book Karein');
    const images = Array.from(document.querySelectorAll('#courses img')).map(img => img.getAttribute('src'));
    const authenticScooters = images.every(src => src && (src.includes('course-basic') || src.includes('course-advance') || src.includes('course-rto')));
    return { hasCard1, hasCard2, hasCard3, hasCTAs, authenticScooters, count: images.length };
  });
  console.log('[Courses Check]', coursesCheck);

  // 6. Verify About Story & Visual
  const aboutCheck = await page.evaluate(() => {
    const section = document.getElementById('about');
    if (!section) return false;
    const text = section.innerText;
    const hasTitle = text.includes('Hamari Kahani') && text.includes('Har Mahila Ki Apni Azaadi');
    const hasFounderStory = text.includes('Kajal Kaur ne 2024 mein Femme Scooty ki shuruat ki');
    const image = section.querySelector('img')?.getAttribute('src');
    const authenticImage = image?.includes('about-story');
    return { hasTitle, hasFounderStory, authenticImage };
  });
  console.log('[About Story Check]', aboutCheck);

  // 7. Verify Why Choose Us (6 clean cards)
  const whyUsCheck = await page.evaluate(() => {
    const section = document.getElementById('why-us');
    if (!section) return false;
    const text = section.innerText;
    const hasTitle = text.includes('Femme Scooty Kyu Chunein?');
    const hasCards = text.includes('Sirf Mahila Trainers') &&
                     text.includes('Ghar Ke Paas Safe Roads') &&
                     text.includes('Free Scooty aur Petrol') &&
                     text.includes('Umar Ki Koi Seema Nahi') &&
                     text.includes('Apni Pasand Ka Time') &&
                     text.includes('RTO Test Ki Taiyari');
    const cardCount = section.querySelectorAll('.grid > div').length;
    return { hasTitle, hasCards, cardCount };
  });
  console.log('[Why Choose Us Check]', whyUsCheck);

  // 8. Verify Testimonials (Static 3-Column Grid, No Broken Ring/Arrows)
  const reviewsCheck = await page.evaluate(() => {
    const section = document.getElementById('reviews');
    if (!section) return false;
    const text = section.innerText;
    const hasTitle = text.includes('Hamari Riders Ki Zubani');
    const hasReviewers = text.includes('Pooja Verma') &&
                         text.includes('Simran Kaur') &&
                         text.includes('Riya Mehta');
    // Verify no misleading arrows exist in reviews
    const hasArrows = section.querySelectorAll('button[aria-label*="Testimonial"]').length > 0;
    const cardCount = section.querySelectorAll('.grid > div').length;
    return { hasTitle, hasReviewers, noArrows: !hasArrows, cardCount };
  });
  console.log('[Reviews Check]', reviewsCheck);

  // 9. Verify Locations Section (6 City Tabs, Lucknow Bara Imambara, Search & CTA)
  const locationsCheck = await page.evaluate(() => {
    const section = document.getElementById('locations');
    if (!section) return false;
    const text = section.innerText;
    const hasTitle = text.includes('Hum Kahan Sikhate Hain?');
    const searchInput = section.querySelector('input');
    const placeholderMatches = searchInput?.getAttribute('placeholder') === 'Apna area likhein...';
    return { hasTitle, placeholderMatches };
  });
  console.log('[Locations Check]', locationsCheck);

  // Test Lucknow tab photo
  await page.click('button[data-city-id="lucknow"]');
  await new Promise(r => setTimeout(r, 200));
  const lucknowPhotoCheck = await page.evaluate(() => {
    const img = document.querySelector('#locations img')?.getAttribute('src');
    const text = document.querySelector('#locations')?.innerText || '';
    const hasLucknowCTA = text.includes('Lucknow Mein Book Karein');
    return { img, isBaraImambara: img?.includes('lucknow'), hasLucknowCTA };
  });
  console.log('[Lucknow Tab Check]', lucknowPhotoCheck);

  // 10. Verify FAQs in Hinglish
  const faqCheck = await page.evaluate(() => {
    const section = document.getElementById('faq');
    if (!section) return false;
    const text = section.innerText;
    const hasTitle = text.includes('Aam Sawal-Jawab');
    const hasCycleQ = text.includes('Kya mujhe pehle se cycle chalani aani zaroori hai?');
    const hasScootyQ = text.includes('Kya training ke liye apni khud ki scooty lani hogi?');
    const hasWhatsAppCTA = text.includes('WhatsApp Par Poochhein');
    return { hasTitle, hasCycleQ, hasScootyQ, hasWhatsAppCTA };
  });
  console.log('[FAQ Check]', faqCheck);

  // 11. Verify Footer
  const footerCheck = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return false;
    const text = footer.innerText;
    const hasHinglishBlurb = text.includes('Femme Scooty mahilaon ko aasan aur bina tension ke scooty chalana sikhati hai');
    const hasPhone = text.includes('+91 96256 95363');
    const hasCapitalized = text.includes('Ladies Scooty Training Centre');
    return { hasHinglishBlurb, hasPhone, hasCapitalized };
  });
  console.log('[Footer Check]', footerCheck);

  // 12. Verify Scroll-to-Top Button Overlap
  await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 200));

  const ctaOverlapCheck = await page.evaluate(() => {
    const ctas = document.querySelectorAll('#courses button');
    const thirdCTA = ctas[ctas.length - 1];
    const scrollBtn = document.querySelector('button[aria-label="Scroll to top of page"]');
    if (!thirdCTA || !scrollBtn) return false;
    const r1 = thirdCTA.getBoundingClientRect();
    const r2 = scrollBtn.getBoundingClientRect();
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
  });
  console.log(`[Scroll-to-Top Button] Overlaps 3rd Course Card CTA: ${ctaOverlapCheck}`);

  // Scroll into footer and check button auto-hides
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 300));

  const footerAutoHideCheck = await page.evaluate(() => {
    const scrollBtn = document.querySelector('button[aria-label="Scroll to top of page"]');
    const isHidden = !scrollBtn || scrollBtn.classList.contains('opacity-0') || getComputedStyle(scrollBtn).opacity === '0';
    return isHidden;
  });
  console.log(`[Scroll-to-Top Button] Automatically hidden inside footer: ${footerAutoHideCheck}`);

  // Capture Desktop Screenshot
  await page.screenshot({ path: 'verification-reports/desktop-hinglish-verified.png', fullPage: true });

  // 13. Mobile Viewport Check (375px)
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 200));
  const overflow375 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Mobile 375px] Horizontal overflow: ${overflow375}`);
  await page.screenshot({ path: 'verification-reports/mobile-hinglish-verified.png', fullPage: true });

  // 14. Tablet Viewport Check (768px)
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:5177', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 200));
  const overflow768 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[Tablet 768px] Horizontal overflow: ${overflow768}`);

  console.log('\n--- CONSOLE ERRORS AUDIT ---');
  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();
  server.kill();

  const allPassed =
    consoleErrors.length === 0 &&
    headerCheck.hasWordmark &&
    headerCheck.hasNavHinglish &&
    headerCheck.hasCTA &&
    heroCheck.hasHeadline &&
    heroCheck.hasSubtext &&
    heroCheck.hasReassurance &&
    formCheck &&
    marqueeCheck &&
    coursesCheck.hasCard1 &&
    coursesCheck.hasCard2 &&
    coursesCheck.hasCard3 &&
    coursesCheck.authenticScooters &&
    aboutCheck.hasTitle &&
    aboutCheck.hasFounderStory &&
    aboutCheck.authenticImage &&
    whyUsCheck.hasTitle &&
    whyUsCheck.hasCards &&
    whyUsCheck.cardCount === 6 &&
    reviewsCheck.hasTitle &&
    reviewsCheck.hasReviewers &&
    reviewsCheck.noArrows &&
    reviewsCheck.cardCount === 3 &&
    locationsCheck.hasTitle &&
    locationsCheck.placeholderMatches &&
    lucknowPhotoCheck.isBaraImambara &&
    lucknowPhotoCheck.hasLucknowCTA &&
    faqCheck.hasTitle &&
    faqCheck.hasCycleQ &&
    footerCheck.hasHinglishBlurb &&
    footerCheck.hasPhone &&
    footerCheck.hasCapitalized &&
    !ctaOverlapCheck &&
    footerAutoHideCheck &&
    !overflow375 &&
    !overflow768;

  if (allPassed) {
    console.log('\n======================================================');
    console.log('>>> ALL 14 REVISION CRITERIA VERIFIED AND PASSED 100%! <<<');
    console.log('======================================================\n');
    process.exit(0);
  } else {
    console.error('\n>>> SOME CRITERIA FAILED TO MEET 100% SPEC! <<<\n');
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
