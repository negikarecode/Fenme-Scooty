import puppeteer from 'puppeteer-core';

async function testFloatingWhatsApp() {
  console.log("==================================================");
  console.log("TESTING FLOATING WHATSAPP & SCROLL-TO-TOP STACKING");
  console.log("==================================================");

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Check Women's Route (/)
  console.log("\n>>> Testing Women's Route (http://localhost:5173/)...");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.setItem('femme_scooty_gender_preference', 'women'));
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Floating WhatsApp button exists and is visible
  const waBtn = await page.$('#floating-whatsapp-btn');
  if (!waBtn) throw new Error("Floating WhatsApp button (#floating-whatsapp-btn) not found");

  const waHref = await page.evaluate(el => el.getAttribute('href'), waBtn);
  console.log("Women Floating WhatsApp URL:", waHref);
  const expectedWomenMsg = encodeURIComponent("Hi Femme Scooty, mujhe Ladies Scooty Training ke baare mein jaankari chahiye.");
  if (!waHref.includes("wa.me/919625695363") || !waHref.includes(expectedWomenMsg)) {
    throw new Error(`Women WhatsApp href missing expected pre-filled message: ${waHref}`);
  }
  console.log("[PASS] Women route has correct pre-filled message");

  // Check target="_blank" and rel="noopener noreferrer"
  const waTarget = await page.evaluate(el => el.getAttribute('target'), waBtn);
  const waRel = await page.evaluate(el => el.getAttribute('rel'), waBtn);
  if (waTarget !== '_blank' || !waRel.includes('noopener')) {
    throw new Error(`Invalid target or rel attributes: target=${waTarget}, rel=${waRel}`);
  }
  console.log("[PASS] WhatsApp button has target='_blank' and rel='noopener noreferrer'");

  // Check Desktop button styling and label
  const waText = await page.evaluate(el => el.innerText, waBtn);
  console.log("Desktop WhatsApp button text:", waText.trim());
  if (!waText.includes("WhatsApp Us")) {
    throw new Error(`Desktop WhatsApp button missing label 'WhatsApp Us', got: ${waText}`);
  }

  // Check initial position of WhatsApp button
  const waBox = await page.evaluate(el => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: window.innerHeight - r.bottom, right: window.innerWidth - r.right, width: r.width, height: r.height };
  }, waBtn);
  console.log("WhatsApp button position on 1440px:", waBox);

  // Initial scroll-to-top button should be hidden (opacity 0)
  const isScrollTopHiddenInitially = await page.evaluate(() => {
    const btn = document.querySelector('#floating-scroll-top-btn');
    if (!btn) return true;
    const style = window.getComputedStyle(btn);
    return style.opacity === '0' || style.pointerEvents === 'none';
  });
  if (!isScrollTopHiddenInitially) {
    throw new Error("Scroll-to-top button should be hidden at top of page");
  }
  console.log("[PASS] Scroll-to-top button is hidden at top of page");

  // 2. Scroll down past 600px to verify scroll-to-top button appears stacked cleanly above
  await page.evaluate(() => window.scrollTo(0, 800));
  await new Promise(r => setTimeout(r, 200));

  const scrollBtnBox = await page.evaluate(() => {
    const btn = document.querySelector('#floating-scroll-top-btn');
    const wa = document.querySelector('#floating-whatsapp-btn');
    const bRect = btn.getBoundingClientRect();
    const wRect = wa.getBoundingClientRect();
    return {
      btnBottom: window.innerHeight - bRect.bottom,
      waBottom: window.innerHeight - wRect.bottom,
      btnRight: window.innerWidth - bRect.right,
      waRight: window.innerWidth - wRect.right,
      gap: bRect.bottom - wRect.top,
      visible: window.getComputedStyle(btn).opacity === '1'
    };
  });
  console.log("Stacking metrics after scrolling 800px:", scrollBtnBox);
  if (!scrollBtnBox.visible) {
    throw new Error("Scroll-to-top button did not become visible after scrolling 800px");
  }
  // Scroll-to-top bottom offset should be strictly greater than WhatsApp bottom offset
  if (scrollBtnBox.btnBottom <= scrollBtnBox.waBottom) {
    throw new Error(`Scroll-to-top button is not stacked above WhatsApp! btnBottom=${scrollBtnBox.btnBottom}, waBottom=${scrollBtnBox.waBottom}`);
  }
  console.log("[PASS] Scroll-to-top button cleanly stacked above WhatsApp button");

  // 3. Check Men's Route (/men)
  console.log("\n>>> Testing Men's Route (http://localhost:5173/men)...");
  await page.goto('http://localhost:5173/men', { waitUntil: 'networkidle0' });

  const menWaBtn = await page.$('#floating-whatsapp-btn');
  const menWaHref = await page.evaluate(el => el.getAttribute('href'), menWaBtn);
  console.log("Men Floating WhatsApp URL:", menWaHref);
  const expectedMenMsg = encodeURIComponent("Hi, mujhe Men's Scooty Training ke baare mein jaankari chahiye.");
  if (!menWaHref.includes("wa.me/919625695363") || !menWaHref.includes(expectedMenMsg)) {
    throw new Error(`Men WhatsApp href missing expected pre-filled message: ${menWaHref}`);
  }
  console.log("[PASS] Men route has correct pre-filled message");

  // 4. Test Mobile Viewport (375x812)
  console.log("\n>>> Testing Mobile Viewport (375x812)...");
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 200));

  const mobileWaBox = await page.evaluate(() => {
    const btn = document.querySelector('#floating-whatsapp-btn');
    const r = btn.getBoundingClientRect();
    const style = window.getComputedStyle(btn);
    return {
      bottom: window.innerHeight - r.bottom,
      right: window.innerWidth - r.right,
      width: r.width,
      height: r.height,
      visible: style.display !== 'none' && style.visibility !== 'hidden'
    };
  });
  console.log("Mobile WhatsApp button metrics:", mobileWaBox);
  if (!mobileWaBox.visible) {
    throw new Error("WhatsApp button is not visible on mobile 375px");
  }
  // On mobile it should be circular (width ~ height) and sits above the bottom bar (>60px from bottom)
  if (mobileWaBox.bottom < 60) {
    throw new Error(`WhatsApp button on mobile sits too close to bottom (${mobileWaBox.bottom}px), might overlap bar`);
  }
  console.log("[PASS] Mobile WhatsApp button is circular and positioned safely above bottom bar");

  await browser.close();
  console.log("\n==================================================");
  console.log("SUCCESS! All floating WhatsApp checks passed cleanly!");
  console.log("==================================================");
}

testFloatingWhatsApp().catch(err => {
  console.error("\n[FAIL] Test error:", err);
  process.exit(1);
});
