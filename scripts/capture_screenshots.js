import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screenshotsDir = path.resolve(__dirname, '../screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  console.log('Launching installed Google Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  console.log('Navigating to http://127.0.0.1:5173/...');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2', timeout: 30000 });

  // 1. Wait for page load and destinations from Wikimedia
  console.log('Waiting for destination cards from Wikimedia API...');
  await page.waitForSelector('.destination-card', { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000)); // Allow photography to settle

  const screenshot1 = path.join(screenshotsDir, '01_explore_hero.png');
  await page.screenshot({ path: screenshot1, fullPage: false });
  console.log('Saved:', screenshot1);

  // 2. Test Real Autocomplete Search Dropdown
  console.log('Testing Autocomplete Dropdown with "Par"...');
  const searchInput = await page.$('input[role="combobox"]');
  if (searchInput) {
    await searchInput.click();
    await searchInput.type('Par', { delay: 100 });
    // Wait for dropdown to appear
    await page.waitForSelector('#autocomplete-dropdown-list', { timeout: 8000 });
    await new Promise((r) => setTimeout(r, 1200));
  }
  const screenshot2 = path.join(screenshotsDir, '02_autocomplete_dropdown.png');
  await page.screenshot({ path: screenshot2, fullPage: false });
  console.log('Saved:', screenshot2);

  // 3. Select suggestion from dropdown (Paris)
  console.log('Selecting Paris from autocomplete suggestions...');
  const options = await page.$$('#autocomplete-dropdown-list [role="option"]');
  if (options.length > 1) {
    await options[1].click(); // Click "Paris"
  } else if (options.length > 0) {
    await options[0].click();
  }
  await new Promise((r) => setTimeout(r, 2000));

  // 4. Destination Details Modal is now open
  console.log('Verifying Destination Details modal...');
  let modal = await page.$('[role="dialog"]');
  if (!modal) {
    const firstCard = await page.$('.destination-card');
    if (firstCard) await firstCard.click();
    await page.waitForSelector('[role="dialog"]', { timeout: 6000 });
  }
  await new Promise((r) => setTimeout(r, 1000));
  const screenshot3 = path.join(screenshotsDir, '03_destination_details_modal.png');
  await page.screenshot({ path: screenshot3, fullPage: false });
  console.log('Saved:', screenshot3);

  // 5. Add to My Trip from Modal
  console.log('Adding destination to My Trip from Modal...');
  const modalButtons = await page.$$('[role="dialog"] button');
  for (const btn of modalButtons) {
    const text = await page.evaluate((el) => el.innerText, btn);
    if (text && text.includes('Add to My Trip')) {
      await btn.click();
      await new Promise((r) => setTimeout(r, 600));
      break;
    }
  }

  // Close modal
  const closeDetailsBtn = await page.$('button[aria-label="Close details"]');
  if (closeDetailsBtn) {
    await closeDetailsBtn.click();
    await new Promise((r) => setTimeout(r, 600));
  }

  // Add another card from Explore
  const cards = await page.$$('.destination-card button');
  for (const btn of cards) {
    const text = await page.evaluate((el) => el.innerText, btn);
    if (text && text.includes('Add to Trip')) {
      await btn.click();
      await new Promise((r) => setTimeout(r, 600));
      break;
    }
  }

  // 6. Navigate to My Trip Page
  console.log('Navigating to My Trip page...');
  const navButtons = await page.$$('header nav button');
  for (const btn of navButtons) {
    const text = await page.evaluate((el) => el.innerText, btn);
    if (text && text.includes('My Trip')) {
      await btn.click();
      await new Promise((r) => setTimeout(r, 1200));
      break;
    }
  }
  const screenshot4 = path.join(screenshotsDir, '04_my_trip_populated.png');
  await page.screenshot({ path: screenshot4, fullPage: false });
  console.log('Saved:', screenshot4);

  // 7. Test Empty State on My Trip
  console.log('Testing Empty State on My Trip...');
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });
  const clearButtons = await page.$$('button');
  for (const btn of clearButtons) {
    const text = await page.evaluate((el) => el.innerText, btn);
    if (text && text.includes('Clear All')) {
      await btn.click();
      await new Promise((r) => setTimeout(r, 1200));
      break;
    }
  }
  const screenshot5 = path.join(screenshotsDir, '05_my_trip_empty_state.png');
  await page.screenshot({ path: screenshot5, fullPage: false });
  console.log('Saved:', screenshot5);

  // 8. Test About Modal
  console.log('Testing About Modal...');
  const aboutBtn = await page.$('header nav button:nth-child(3)');
  if (aboutBtn) {
    await aboutBtn.click();
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    await new Promise((r) => setTimeout(r, 800));
  }
  const screenshot7 = path.join(screenshotsDir, '07_about_modal.png');
  await page.screenshot({ path: screenshot7, fullPage: false });
  console.log('Saved:', screenshot7);

  // Close about dialog
  const closeAboutBtn = await page.$('button[aria-label="Close About dialog"]');
  if (closeAboutBtn) {
    await closeAboutBtn.click();
    await new Promise((r) => setTimeout(r, 600));
  }

  // 9. Mobile Viewport (390x844)
  console.log('Capturing Mobile Viewport (iPhone 14 / 390x844)...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await mobilePage.waitForSelector('.destination-card', { timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));

  const screenshot6 = path.join(screenshotsDir, '06_mobile_explore_view.png');
  await mobilePage.screenshot({ path: screenshot6, fullPage: false });
  console.log('Saved:', screenshot6);
  await mobilePage.close();

  // 10. Compile PDF
  console.log('Compiling screenshots into TripWise_Submission_Screenshots.pdf...');
  const pdfHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>TripWise — Recruitment Task Submission Screenshots</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 24px; background: #070b12; color: #f8fafc; }
          .header { text-align: center; margin-bottom: 28px; border-bottom: 2px solid #0284c7; padding-bottom: 20px; }
          h1 { color: #38bdf8; margin: 0 0 6px; font-size: 26px; }
          p { color: #94a3b8; font-size: 13px; margin: 4px 0; }
          .section { margin-bottom: 34px; page-break-inside: avoid; background: #0f172a; padding: 18px; border-radius: 12px; border: 1px solid #1e293b; }
          .section h2 { color: #ffffff; font-size: 17px; margin: 0 0 10px; display: flex; align-items: center; gap: 8px; }
          .section img { width: 100%; border-radius: 8px; border: 1px solid #334155; }
          .tag { font-size: 11px; background: rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 2px 8px; border-radius: 6px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>TripWise — Smart Travel Planner</h1>
          <p><strong>AWS Student Builder Group (SBG), VIT Chennai — Web Development Recruitment Task</strong></p>
          <p>Track: Frontend Development | Real-time Wikimedia & Wikipedia MediaWiki API Integration</p>
        </div>

        <div class="section">
          <h2><span class="tag">VIEW 1</span> Photography-Led Homepage & Full-Width Scenic Hero</h2>
          <img src="data:image/png;base64,${fs.readFileSync(screenshot1).toString('base64')}">
        </div>

        <div class="section">
          <h2><span class="tag">VIEW 2</span> Real-Time Autocomplete Search Dropdown with Thumbnails & Live Wikimedia Suggestions</h2>
          <img src="data:image/png;base64,${fs.readFileSync(screenshot2).toString('base64')}">
        </div>

        <div class="section">
          <h2><span class="tag">VIEW 3</span> Destination Details Modal — Real Extract, Metadata & Add to Trip</h2>
          <img src="data:image/png;base64,${fs.readFileSync(screenshot3).toString('base64')}">
        </div>

        <div class="section">
          <h2><span class="tag">VIEW 4</span> My Trip — Populated Itinerary with Day Sequencing, Notes & Reordering</h2>
          <img src="data:image/png;base64,${fs.readFileSync(screenshot4).toString('base64')}">
        </div>

        <div class="section">
          <h2><span class="tag">VIEW 5</span> My Trip — Contextual Empty State with Guidance Call-to-Action</h2>
          <img src="data:image/png;base64,${fs.readFileSync(screenshot5).toString('base64')}">
        </div>

        <div class="section">
          <h2><span class="tag">VIEW 6</span> About TripWise Modal — Architectural Overview & Recruitment Attribution</h2>
          <img src="data:image/png;base64,${fs.readFileSync(screenshot7).toString('base64')}">
        </div>

        <div class="section">
          <h2><span class="tag">VIEW 7</span> Mobile Responsive Viewport (iPhone 14 / 390x844)</h2>
          <div style="text-align: center;">
            <img style="max-width: 400px; margin: 0 auto;" src="data:image/png;base64,${fs.readFileSync(screenshot6).toString('base64')}">
          </div>
        </div>
      </body>
    </html>
  `;

  const pdfPage = await browser.newPage();
  await pdfPage.setContent(pdfHtml, { waitUntil: 'load' });
  const pdfPath = path.resolve(__dirname, '../TripWise_Submission_Screenshots.pdf');
  await pdfPage.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' }
  });
  console.log('Saved submission PDF:', pdfPath);

  await browser.close();
  console.log('All screenshots and PDF successfully generated!');
}

run().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
