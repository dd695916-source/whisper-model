const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
  const svg = fs.readFileSync(process.argv[2], 'utf8');
  await p.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await p.waitForTimeout(300);
  await p.screenshot({ path: process.argv[3] });
  await b.close();
})();
