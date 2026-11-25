import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  console.log("=== PRERENDERING / FOR STATIC SEO & FAST CRAWLING ===");

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
  console.log("Prerendering / (Femme Scooty)...");
  const html = renderToString(React.createElement(App, { initialPath: '/' }));
  const rootDiv = '<div id="root">';
  if (!template.includes(rootDiv)) {
    throw new Error('dist/index.html does not contain <div id="root">');
  }
  const prerendered = template.replace(rootDiv, `${rootDiv}${html}`);
  fs.writeFileSync(templatePath, prerendered, 'utf-8');
  console.log(`[PASS] dist/index.html prerendered with ${html.length} characters.`);

  // 4. Ensure no dist/men exists
  const menDistPath = path.resolve(__dirname, 'dist/men');
  if (fs.existsSync(menDistPath)) {
    fs.rmSync(menDistPath, { recursive: true, force: true });
    console.log("[CLEAN] Removed dist/men folder.");
  }

  // 5. Clean up temporary SSR bundle
  fs.rmSync(path.resolve(__dirname, 'dist-ssr'), { recursive: true, force: true });
  console.log("[DONE] Prerendering complete and temporary files cleaned up.");
}

prerender().catch(err => {
  console.error("Prerender error:", err);
  process.exit(1);
});
