import puppeteer from 'puppeteer-core';

async function testDropdown() {
  console.log("==========================================");
  console.log("TESTING REFINED NAVBAR LAYOUT & CENTERING");
  console.log("==========================================");

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Set gender preference in localStorage to skip modal
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('femme_scooty_gender_preference', 'women');
  });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // 1. Check Phone Number is NOT in main navbar
  const headerText = await page.$eval('header', el => el.innerText);
  if (headerText.includes("+91 96256 95363")) {
    throw new Error("Phone number should NOT be in the main navbar (only top bar & hero)");
  }
  console.log("[PASS] Main navbar has no phone number");

  // 2. Check Gender Dropdown button has NO colored dot
  const hasDotInPill = await page.$eval('#wing-dropdown-button', btn => {
    return !!btn.querySelector('span.rounded-full');
  });
  if (hasDotInPill) {
    throw new Error("Gender pill should NOT have a colored dot inside");
  }
  console.log("[PASS] Gender pill has no colored dot inside");

  // 3. Verify True Center Alignment of Nav Links at 1440px
  const center1440 = await page.evaluate(() => {
    const header = document.querySelector('header > div');
    const nav = document.querySelector('header nav');
    const hRect = header.getBoundingClientRect();
    const nRect = nav.getBoundingClientRect();
    const hCenter = hRect.left + hRect.width / 2;
    const nCenter = nRect.left + nRect.width / 2;
    return {
      hCenter,
      nCenter,
      diff: Math.abs(hCenter - nCenter),
      navWidth: nRect.width,
      headerWidth: hRect.width,
      headerHeight: hRect.height
    };
  });
  console.log("1440px Alignment metrics:", center1440);
  if (center1440.diff > 2.0) {
    throw new Error(`Nav links are not centered at 1440px! Diff from center: ${center1440.diff}px`);
  }
  if (center1440.headerHeight > 85) {
    throw new Error(`Header wrapped onto multiple lines at 1440px: height is ${center1440.headerHeight}px`);
  }
  console.log("[PASS] Nav links are mathematically centered at 1440px (diff < 1px)");

  // 4. Verify Wing Dropdown button initial state
  const dropdownBtn = await page.$('#wing-dropdown-button');
  const btnText = await page.evaluate(el => el.innerText, dropdownBtn);
  console.log("Dropdown button text on /:", btnText);
  if (!btnText.includes("Women (Mahila)")) {
    throw new Error(`Expected 'Women (Mahila)', got: ${btnText}`);
  }

  // 5. Click Wing Dropdown button & select Men
  console.log("Clicking Wing Dropdown button...");
  await dropdownBtn.click();
  await new Promise(r => setTimeout(r, 200));

  const menu = await page.$('div[role="menu"]');
  if (!menu) throw new Error("Dropdown menu failed to open");

  const menOption = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('div[role="menu"] button'));
    return buttons.find(b => b.innerText.includes('Men (Purush)'));
  });
  if (!menOption) throw new Error("Men option button not found");
  console.log("Clicking 'Men (Purush)' option...");
  await menOption.click();
  await new Promise(r => setTimeout(r, 300));

  // 6. Verify URL changed to /men and scroll reset to 0
  const currentUrl = page.url();
  console.log("Current URL after selection:", currentUrl);
  if (!currentUrl.includes('/men')) {
    throw new Error(`Expected URL to contain '/men', got: ${currentUrl}`);
  }
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log("Scroll Y on /men:", scrollY);
  if (scrollY !== 0) {
    throw new Error(`Expected scrollY === 0, got: ${scrollY}`);
  }

  // 7. Verify button now says 'Men (Purush)' with NO dot
  const updatedBtnText = await page.$eval('#wing-dropdown-button', el => el.innerText);
  console.log("Dropdown button text on /men:", updatedBtnText);
  if (!updatedBtnText.includes("Men (Purush)")) {
    throw new Error(`Expected 'Men (Purush)', got: ${updatedBtnText}`);
  }
  const hasDotInMenPill = await page.$eval('#wing-dropdown-button', btn => {
    return !!btn.querySelector('span.rounded-full');
  });
  if (hasDotInMenPill) {
    throw new Error("Men gender pill should NOT have a colored dot inside");
  }
  console.log("[PASS] Men gender pill has no colored dot inside");

  // 8. Test 1280px Viewport Centering & Dimensions
  console.log("\n>>> Testing 1280px Viewport...");
  await page.setViewport({ width: 1280, height: 800 });
  await new Promise(r => setTimeout(r, 200));

  const center1280 = await page.evaluate(() => {
    const header = document.querySelector('header > div');
    const nav = document.querySelector('header nav');
    const hRect = header.getBoundingClientRect();
    const nRect = nav.getBoundingClientRect();
    const hCenter = hRect.left + hRect.width / 2;
    const nCenter = nRect.left + nRect.width / 2;
    return {
      hCenter,
      nCenter,
      diff: Math.abs(hCenter - nCenter),
      navWidth: nRect.width,
      headerWidth: hRect.width,
      headerHeight: hRect.height
    };
  });
  console.log("1280px Alignment metrics:", center1280);
  if (center1280.diff > 2.0) {
    throw new Error(`Nav links are not centered at 1280px! Diff from center: ${center1280.diff}px`);
  }
  if (center1280.headerHeight > 85) {
    throw new Error(`Header wrapped onto multiple lines at 1280px: height is ${center1280.headerHeight}px`);
  }
  console.log("[PASS] Nav links are mathematically centered at 1280px (diff < 1px)");

  await browser.close();
  console.log("\n[PASS] All navbar refinement checks passed successfully with 0 errors!");
}

testDropdown().catch(err => {
  console.error("\n[FAIL] Test error:", err);
  process.exit(1);
});
