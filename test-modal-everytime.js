import puppeteer from 'puppeteer-core';

async function testModalEverytime() {
  console.log("==========================================");
  console.log("TESTING MODAL OPENS EVERY TIME SITE IS VISITED");
  console.log("==========================================");

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. First visit to /
  console.log("\n[Test 1] Initial visit to / with empty localStorage...");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  let dialog = await page.$('div[role="dialog"]');
  if (!dialog) throw new Error("[FAIL] Modal did not open on initial visit to /!");
  console.log("[PASS] Modal opened on initial visit to /");

  // 2. Select Women option
  console.log("\n[Test 2] Selecting 'Women (Mahila)' option...");
  const womenBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('div[role="dialog"] button'));
    return buttons.find(b => b.innerText.includes('Women (Mahila)'));
  });
  await womenBtn.click();
  await new Promise(r => setTimeout(r, 200));

  dialog = await page.$('div[role="dialog"]');
  if (dialog) throw new Error("[FAIL] Modal should be closed after selecting Women!");
  const currentPath1 = await page.evaluate(() => window.location.pathname);
  const pref1 = await page.evaluate(() => localStorage.getItem('femme_scooty_gender_preference'));
  console.log(`[PASS] Modal closed. Current path: ${currentPath1}, Preference in localStorage: ${pref1}`);

  // 3. Second visit to / (preference is already 'women' in localStorage)
  console.log("\n[Test 3] Re-opening / when localStorage preference is already set...");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  dialog = await page.$('div[role="dialog"]');
  if (!dialog) throw new Error("[FAIL] Modal DID NOT open on second visit to / when preference existed!");
  console.log("[PASS] Modal OPENED on re-visit despite existing preference in localStorage!");

  // 4. Select Men option
  console.log("\n[Test 4] Selecting 'Men (Purush)' option...");
  const menBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('div[role="dialog"] button'));
    return buttons.find(b => b.innerText.includes('Men (Purush)'));
  });
  await menBtn.click();
  await new Promise(r => setTimeout(r, 300));

  dialog = await page.$('div[role="dialog"]');
  if (dialog) throw new Error("[FAIL] Modal should be closed after selecting Men!");
  const currentPath2 = await page.evaluate(() => window.location.pathname);
  const pref2 = await page.evaluate(() => localStorage.getItem('femme_scooty_gender_preference'));
  if (currentPath2 !== '/men') throw new Error(`[FAIL] Expected /men after selecting Men, got: ${currentPath2}`);
  console.log(`[PASS] Modal closed. Current path: ${currentPath2}, Preference in localStorage: ${pref2}`);

  // 5. Open / directly when preference in localStorage is 'men'
  console.log("\n[Test 5] Opening / when localStorage preference is 'men' (must NOT redirect silently to /men)...");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  dialog = await page.$('div[role="dialog"]');
  if (!dialog) throw new Error("[FAIL] Modal DID NOT open on visit to / when 'men' preference existed!");
  const currentPath3 = await page.evaluate(() => window.location.pathname);
  if (currentPath3 !== '/') throw new Error(`[FAIL] Opening / should stay on / under modal, but was redirected to: ${currentPath3}`);
  console.log(`[PASS] Modal OPENED and user is on / without silent redirection (path: ${currentPath3})!`);

  // 6. Test Close 'X' button
  console.log("\n[Test 6] Testing Close (X) button...");
  const closeBtn = await page.$('div[role="dialog"] button[aria-label="Close modal"]');
  if (!closeBtn) throw new Error("[FAIL] Close modal button not found!");
  await closeBtn.click();
  await new Promise(r => setTimeout(r, 200));

  dialog = await page.$('div[role="dialog"]');
  if (dialog) throw new Error("[FAIL] Modal did not close on clicking X button!");
  console.log("[PASS] Modal closed cleanly via X button.");

  // 7. Visit /men directly
  console.log("\n[Test 7] Visiting /men directly...");
  await page.goto('http://localhost:5173/men', { waitUntil: 'networkidle0' });
  dialog = await page.$('div[role="dialog"]');
  if (!dialog) throw new Error("[FAIL] Modal DID NOT open on direct visit to /men!");
  const currentPath4 = await page.evaluate(() => window.location.pathname);
  console.log(`[PASS] Modal OPENED on direct visit to /men (path: ${currentPath4})!`);

  await browser.close();
  console.log("\n==========================================");
  console.log("ALL MODAL EVERYTIME CHECKS PASSED 100%!");
  console.log("==========================================");
}

testModalEverytime().catch(err => {
  console.error(err);
  process.exit(1);
});
