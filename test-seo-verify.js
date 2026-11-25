import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifySEO() {
  console.log("==========================================");
  console.log("TESTING TECHNICAL SEO, STRUCTURED DATA & REDIRECTS");
  console.log("==========================================");

  // 1. Robots.txt static check
  console.log("\n[Check 1] Verifying robots.txt...");
  const robots = fs.readFileSync('dist/robots.txt', 'utf-8');
  if (!robots.includes('User-agent: *') || !robots.includes('Allow: /')) {
    throw new Error("[FAIL] robots.txt missing User-agent: * or Allow: /");
  }
  if (!robots.includes('Sitemap: https://fenme-scooty.vercel.app/sitemap.xml')) {
    throw new Error("[FAIL] robots.txt missing Sitemap reference");
  }
  console.log("[PASS] robots.txt is valid and properly configured");

  // 2. Sitemap.xml static check
  console.log("\n[Check 2] Verifying sitemap.xml...");
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf-8');
  if (!sitemap.includes('https://fenme-scooty.vercel.app/</loc>') || !sitemap.includes('<priority>1.0</priority>')) {
    throw new Error("[FAIL] sitemap.xml missing https://fenme-scooty.vercel.app/ with priority 1.0");
  }
  if (!sitemap.includes('https://fenme-scooty.vercel.app/men</loc>') || !sitemap.includes('<priority>0.8</priority>')) {
    throw new Error("[FAIL] sitemap.xml missing https://fenme-scooty.vercel.app/men with priority 0.8");
  }
  console.log("[PASS] sitemap.xml lists both / and /men with correct priorities");

  // 3. Vercel.json 301 redirects check
  console.log("\n[Check 3] Verifying vercel.json 301 redirects...");
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf-8'));
  const redirectSources = vercel.redirects.map(r => r.source);
  const requiredRedirects = ['/thank-you', '/thank-you/', '/home', '/home/'];
  for (const req of requiredRedirects) {
    const found = vercel.redirects.find(r => r.source === req && r.destination === '/' && r.permanent === true);
    if (!found) {
      throw new Error(`[FAIL] vercel.json missing permanent 301 redirect for ${req} -> /`);
    }
  }
  console.log("[PASS] vercel.json contains permanent 301 redirects for WordPress migration");

  // 4. Inspect dist/index.html (Prerendered Women)
  console.log("\n[Check 4] Inspecting dist/index.html head & prerendered content...");
  const indexHtml = fs.readFileSync('dist/index.html', 'utf-8');
  
  const expectedTitleWomen = "Femme Scooty | Ladies Scooty Training Centre in Delhi NCR, Lucknow, Mathura &amp; Jodhpur";
  if (!indexHtml.includes(expectedTitleWomen) && !indexHtml.includes("Femme Scooty | Ladies Scooty Training Centre in Delhi NCR, Lucknow, Mathura & Jodhpur")) {
    throw new Error("[FAIL] dist/index.html does not contain expected title for /");
  }
  console.log("[PASS] dist/index.html title matches specification");

  const expectedCanonicalWomen = '<link rel="canonical" href="https://fenme-scooty.vercel.app/" />';
  if (!indexHtml.includes(expectedCanonicalWomen)) {
    throw new Error("[FAIL] dist/index.html missing canonical tag for https://fenme-scooty.vercel.app/");
  }
  console.log("[PASS] dist/index.html canonical URL is https://fenme-scooty.vercel.app/");

  const expectedDesc = "Learn scooty riding in 7 days with 100% female trainers near your home. Free scooty &amp; petrol included. Serving Delhi, Ghaziabad, Faridabad, Lucknow, Mathura &amp; Jodhpur. Call +91 96256 95363.";
  if (!indexHtml.includes(expectedDesc) && !indexHtml.includes("Learn scooty riding in 7 days with 100% female trainers")) {
    throw new Error("[FAIL] dist/index.html meta description does not match");
  }
  console.log("[PASS] dist/index.html meta description matches specification");

  // JSON-LD Schema Check
  const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!jsonLdMatch) {
    throw new Error("[FAIL] dist/index.html missing <script type=\"application/ld+json\">");
  }
  const schema = JSON.parse(jsonLdMatch[1]);
  if (schema.name !== "Femme Scooty") throw new Error("[FAIL] Schema name mismatch");
  if (schema.url !== "https://fenme-scooty.vercel.app/") throw new Error("[FAIL] Schema url mismatch");
  if (schema.telephone !== "+91-9625695363") throw new Error("[FAIL] Schema telephone mismatch");
  if (schema.founder !== "Kajal Kaur") throw new Error("[FAIL] Schema founder mismatch");
  const areas = ["Delhi", "Lucknow", "Mathura", "Jodhpur", "Ghaziabad", "Faridabad"];
  for (const a of areas) {
    if (!schema.areaServed.includes(a)) throw new Error(`[FAIL] Schema areaServed missing ${a}`);
  }
  console.log("[PASS] JSON-LD Schema.org LocalBusiness structured data is valid with all required fields");

  // Prerendered HTML Content Check
  if (!indexHtml.includes('Learn Scooty With Confidence') || !indexHtml.includes('1,000+')) {
    throw new Error("[FAIL] dist/index.html root div is empty or missing prerendered content!");
  }
  console.log("[PASS] dist/index.html contains prerendered content for instant Google crawling (no empty root div)");

  // 5. Inspect dist/men/index.html (Prerendered Men)
  console.log("\n[Check 5] Inspecting dist/men/index.html head & prerendered content...");
  const menHtml = fs.readFileSync('dist/men/index.html', 'utf-8');
  if (!menHtml.includes("Femme Scooty Men's Wing | Scooty Training in Delhi NCR, Lucknow, Mathura &amp; Jodhpur") &&
      !menHtml.includes("Femme Scooty Men's Wing | Scooty Training in Delhi NCR, Lucknow, Mathura & Jodhpur")) {
    throw new Error("[FAIL] dist/men/index.html does not contain expected title for /men");
  }
  console.log("[PASS] dist/men/index.html title matches specification");

  if (!menHtml.includes('<link rel="canonical" href="https://fenme-scooty.vercel.app/men" />')) {
    throw new Error("[FAIL] dist/men/index.html canonical URL should be https://fenme-scooty.vercel.app/men");
  }
  console.log("[PASS] dist/men/index.html canonical URL is https://fenme-scooty.vercel.app/men");

  if (!menHtml.includes('Experienced Male Trainers')) {
    throw new Error("[FAIL] dist/men/index.html missing prerendered Men content");
  }
  console.log("[PASS] dist/men/index.html contains prerendered Men content");

  // 6. Live browser testing
  console.log("\n[Check 6] Launching static HTTP server for dist/ & browser testing...");
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, 'dist', reqPath);
    if (reqPath === '/' || reqPath === '') {
      filePath = path.join(__dirname, 'dist', 'index.html');
    } else if (reqPath === '/men' || reqPath === '/men/') {
      filePath = path.join(__dirname, 'dist', 'men', 'index.html');
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
      res.writeHead(404);
      res.end('Not found');
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

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Test robots.txt over HTTP
  const robotsRes = await page.goto(`${baseUrl}/robots.txt`);
  if (robotsRes.status() !== 200) throw new Error(`[FAIL] /robots.txt returned status ${robotsRes.status()}`);
  const robotsHttpText = await page.evaluate(() => document.body.innerText);
  if (!robotsHttpText.includes('User-agent: *')) throw new Error("[FAIL] /robots.txt content invalid over HTTP");
  console.log("[PASS] /robots.txt loads cleanly over HTTP with status 200");

  // Test sitemap.xml over HTTP
  const sitemapRes = await page.goto(`${baseUrl}/sitemap.xml`);
  if (sitemapRes.status() !== 200) throw new Error(`[FAIL] /sitemap.xml returned status ${sitemapRes.status()}`);
  console.log("[PASS] /sitemap.xml loads cleanly over HTTP with status 200");

  // Test / page DOM
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });
  const liveAuditWomen = await page.evaluate(() => {
    const title = document.title;
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const h1Count = document.querySelectorAll('h1').length;
    const h1Text = document.querySelector('h1')?.innerText;
    const images = Array.from(document.querySelectorAll('img'));
    const missingAlt = images.filter(img => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === '');
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');

    return {
      title,
      canonical,
      h1Count,
      h1Text,
      totalImages: images.length,
      missingAltCount: missingAlt.length,
      metaDesc
    };
  });

  console.log('[Live Audit /]:', liveAuditWomen);
  if (liveAuditWomen.h1Count !== 1) throw new Error(`[FAIL] Expected exactly 1 <h1>, found ${liveAuditWomen.h1Count}`);
  if (liveAuditWomen.missingAltCount > 0) throw new Error(`[FAIL] Found ${liveAuditWomen.missingAltCount} images missing alt text`);
  if (!liveAuditWomen.canonical.includes('fenme-scooty.vercel.app')) throw new Error("[FAIL] Canonical tag missing or invalid on /");

  // Test /men page DOM
  await page.goto(`${baseUrl}/men`, { waitUntil: 'networkidle0' });
  const liveAuditMen = await page.evaluate(() => {
    const title = document.title;
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const h1Count = document.querySelectorAll('h1').length;
    const images = Array.from(document.querySelectorAll('img'));
    const missingAlt = images.filter(img => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === '');

    return {
      title,
      canonical,
      h1Count,
      totalImages: images.length,
      missingAltCount: missingAlt.length
    };
  });

  console.log('[Live Audit /men]:', liveAuditMen);
  if (liveAuditMen.h1Count !== 1) throw new Error(`[FAIL] Expected exactly 1 <h1> on /men, found ${liveAuditMen.h1Count}`);
  if (liveAuditMen.missingAltCount > 0) throw new Error(`[FAIL] Found ${liveAuditMen.missingAltCount} images missing alt text on /men`);
  if (liveAuditMen.canonical !== 'https://fenme-scooty.vercel.app/men') throw new Error(`[FAIL] Expected canonical https://fenme-scooty.vercel.app/men, got ${liveAuditMen.canonical}`);

  await browser.close();
  server.close();
  console.log("\n==========================================");
  console.log("ALL TECHNICAL SEO & STRUCTURED DATA CHECKS PASSED 100%!");
  console.log("==========================================");
}

verifySEO().catch(err => {
  console.error(err);
  process.exit(1);
});
