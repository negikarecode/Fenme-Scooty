import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  console.log("=== PRERENDERING / AND /MEN FOR STATIC SEO & FAST CRAWLING ===");

  // 1. Build SSR bundle
  console.log("Building SSR bundle...");
  await build({
    build: {
      ssr: 'src/App.tsx',
      outDir: 'dist-ssr',
      rollupOptions: {
        output: {
          format: 'es'
        }
      }
    }
  });

  const ssrPath = path.resolve(__dirname, 'dist-ssr/App.js');
  const { App } = await import(`file://${ssrPath}`);

  // 2. Read template built by standard vite build
  const templatePath = path.resolve(__dirname, 'dist/index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 3. Prerender Women (/)
  console.log("Prerendering / (Women)...");
  const womenHtml = renderToString(React.createElement(App, { initialPath: '/' }));
  const rootDiv = '<div id="root">';
  if (!template.includes(rootDiv)) {
    throw new Error('dist/index.html does not contain <div id="root">');
  }
  const prerenderedWomen = template.replace(rootDiv, `${rootDiv}${womenHtml}`);
  fs.writeFileSync(templatePath, prerenderedWomen, 'utf-8');
  console.log(`[PASS] dist/index.html prerendered with ${womenHtml.length} characters.`);

  // 4. Prerender Men (/men)
  console.log("Prerendering /men (Men)...");
  const menHtml = renderToString(React.createElement(App, { initialPath: '/men' }));
  
  // Customize head tags for Men
  let menTemplate = template
    .replace(
      '<title>Femme Scooty | Ladies Scooty Training Centre in Delhi NCR, Lucknow, Mathura &amp; Jodhpur</title>',
      "<title>Femme Scooty Men's Wing | Scooty Training in Delhi NCR, Lucknow, Mathura &amp; Jodhpur</title>"
    )
    .replace(
      '<link rel="canonical" href="https://femmescooty.in/" />',
      '<link rel="canonical" href="https://femmescooty.in/men" />'
    )
    .replaceAll(
      'content="Learn scooty riding in 7 days with 100% female trainers near your home. Free scooty &amp; petrol included. Serving Delhi, Ghaziabad, Faridabad, Lucknow, Mathura &amp; Jodhpur. Call +91 96256 95363."',
      'content="Learn scooty riding in 7 days with experienced male trainers near your home. Free scooty &amp; petrol included. Serving Delhi, Ghaziabad, Faridabad, Lucknow, Mathura &amp; Jodhpur. Call +91 96256 95363."'
    )
    .replace(
      'content="https://femmescooty.in/"',
      'content="https://femmescooty.in/men"'
    )
    .replaceAll(
      'content="Femme Scooty | Ladies Scooty Training Centre in Delhi NCR, Lucknow, Mathura &amp; Jodhpur"',
      "content=\"Femme Scooty Men's Wing | Scooty Training in Delhi NCR, Lucknow, Mathura &amp; Jodhpur\""
    )
    .replace(rootDiv, `${rootDiv}${menHtml}`);

  fs.mkdirSync(path.resolve(__dirname, 'dist/men'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, 'dist/men/index.html'), menTemplate, 'utf-8');
  console.log(`[PASS] dist/men/index.html prerendered with ${menHtml.length} characters.`);

  // 5. Clean up temporary SSR bundle
  fs.rmSync(path.resolve(__dirname, 'dist-ssr'), { recursive: true, force: true });
  console.log("[DONE] Prerendering complete and temporary files cleaned up.");
}

prerender().catch(err => {
  console.error("Prerender error:", err);
  process.exit(1);
});
