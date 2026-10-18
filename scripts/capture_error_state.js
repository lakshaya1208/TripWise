import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  // Intercept and abort Wikipedia requests to simulate network failure
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.url().includes('wikipedia.org')) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });

  // Wait for ErrorState to appear
  await page.waitForSelector('button', { timeout: 10000 });
  await new Promise((r) => setTimeout(r, 1500));

  const screenshotPath = path.resolve(__dirname, '../screenshots/08_error_state.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('Saved error state screenshot to:', screenshotPath);

  await browser.close();
}

run().catch(console.error);
