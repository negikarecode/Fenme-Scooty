import puppeteer from 'puppeteer-core';

async function testDropdown() {
  console.log("==========================================");
  console.log("TESTING NAVBAR WING DROPDOWN & TOP BAR");
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

  // 1. Verify Top Bar single line & contents
  const topBarText = await page.$eval('aside[aria-label="Announcement"]', el => el.innerText);
  console.log("Top bar text:", topBarText.replace(/\n/g, ' '));
  if (!topBarText.includes("100% Female Trainers") || !topBarText.includes("6 Cities") || !topBarText.includes("+91 96256 95363")) {
    throw new Error("Top bar missing expected content");
  }
  if (topBarText.includes("Switch Version (Mahila / Purush)")) {
    throw new Error("Top bar still contains duplicate Switch Version link");
  }

  // Check top bar height (single line should be ~35px - 45px)
  const topBarBox = await page.$eval('aside[aria-label="Announcement"]', el => {
    const rect = el.getBoundingClientRect();
    return { height: rect.height, width: rect.width };
  });
  console.log("Top bar dimensions at 1440px:", topBarBox);
  if (topBarBox.height > 55) {
    throw new Error(`Top bar wrapped into multiple lines: height is ${topBarBox.height}px`);
  }

  // 2. Check Navbar dimensions & single line at 1440px
  const navBox = await page.$eval('header', el => {
    const rect = el.getBoundingClientRect();
    return { height: rect.height, width: rect.width };
  });
  console.log("Header dimensions at 1440px:", navBox);

  // 3. Verify Wing Dropdown button initial state
  const dropdownBtn = await page.$('#wing-dropdown-button');
  if (!dropdownBtn) throw new Error("Wing dropdown button not found");
  const btnText = await page.evaluate(el => el.innerText, dropdownBtn);
  console.log("Dropdown button text on /:", btnText);
  if (!btnText.includes("Women (Mahila)")) {
    throw new Error(`Expected 'Women (Mahila)', got: ${btnText}`);
  }

  // 4. Click Wing Dropdown button
  console.log("Clicking Wing Dropdown button...");
  await dropdownBtn.click();
  await new Promise(r => setTimeout(r, 200));

  // 5. Check options menu
  const menu = await page.$('div[role="menu"]');
  if (!menu) throw new Error("Dropdown menu failed to open");
  const menuText = await page.evaluate(el => el.innerText, menu);
  console.log("Menu options:\n", menuText);
  if (!menuText.includes("Women (Mahila)") || !menuText.includes("Men (Purush)")) {
    throw new Error("Dropdown missing menu options");
  }

  // 6. Click 'Men (Purush)' option
  const menOption = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('div[role="menu"] button'));
    return buttons.find(b => b.innerText.includes('Men (Purush)'));
  });
  if (!menOption) throw new Error("Men option button not found");
  console.log("Clicking 'Men (Purush)' option...");
  await menOption.click();
  await new Promise(r => setTimeout(r, 300));

  // 7. Verify URL changed to /men
  const currentUrl = page.url();
  console.log("Current URL after selection:", currentUrl);
  if (!currentUrl.includes('/men')) {
    throw new Error(`Expected URL to contain '/men', got: ${currentUrl}`);
  }

  // 8. Verify scroll is at top (0, 0)
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log("Scroll Y on /men:", scrollY);
  if (scrollY !== 0) {
    throw new Error(`Expected scrollY === 0, got: ${scrollY}`);
  }

  // 9. Verify button now says 'Men (Purush)'
  const updatedBtnText = await page.$eval('#wing-dropdown-button', el => el.innerText);
  console.log("Dropdown button text on /men:", updatedBtnText);
  if (!updatedBtnText.includes("Men (Purush)")) {
    throw new Error(`Expected 'Men (Purush)', got: ${updatedBtnText}`);
  }

  // 10. Verify Men's top bar content
  const menTopBarText = await page.$eval('aside[aria-label="Announcement"]', el => el.innerText);
  console.log("Men top bar text:", menTopBarText.replace(/\n/g, ' '));
  if (!menTopBarText.includes("Experienced Male Trainers")) {
    throw new Error("Men top bar missing 'Experienced Male Trainers'");
  }

  // 11. Test 1280px viewport
  console.log("\n>>> Testing 1280px Viewport...");
  await page.setViewport({ width: 1280, height: 800 });
  await new Promise(r => setTimeout(r, 200));

  const topBar1280 = await page.$eval('aside[aria-label="Announcement"]', el => el.getBoundingClientRect().height);
  const header1280 = await page.$eval('header', el => el.getBoundingClientRect().height);
  console.log(`1280px: Top bar height = ${topBar1280}px, Header height = ${header1280}px`);

  if (topBar1280 > 55) {
    throw new Error(`Top bar wrapped on 1280px: height is ${topBar1280}px`);
  }
  if (header1280 > 85) {
    throw new Error(`Header wrapped on 1280px: height is ${header1280}px`);
  }

  await browser.close();
  console.log("\n[PASS] All dropdown and navbar single-line checks passed successfully!");
}

testDropdown().catch(err => {
  console.error("\n[FAIL] Test error:", err);
  process.exit(1);
});
