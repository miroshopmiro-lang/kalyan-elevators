import puppeteer from './Fable-build-home-elevators/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:8080/';
const WORKSPACE_DIR = 'C:\\Users\\risha\\OneDrive\\Desktop\\Kalyan-Elevators-Website';

const PAGES = [
  { file: 'capsule-elevators.html', folder: 'Fable-build-capsule-elevators', name: 'capsule_elevators' },
  { file: 'commercial-elevators.html', folder: 'Fable-build-commercial-elevators', name: 'commercial_elevators' },
  { file: 'hospital-elevators.html', folder: 'Fable-build-hospital-elevators', name: 'hospital_elevators' },
  { file: 'car-elevators.html', folder: 'Fable-build-car-elevators', name: 'car_elevators' },
  { file: 'freight-elevators.html', folder: 'Fable-build-freight-elevators', name: 'freight_elevators' },
  { file: 'goods-elevators.html', folder: 'Fable-build-goods-elevators', name: 'goods_elevators' },
  { file: 'structural-elevators.html', folder: 'Fable-build-structural-elevators', name: 'structural_elevators' }
];

async function run() {
  console.log('Launching Edge...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1280,1000'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  for (const item of PAGES) {
    const url = BASE_URL + item.file;
    const outputDir = path.join(WORKSPACE_DIR, item.folder);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`\nProcessing ${item.file} -> Saving to ${item.folder}...`);
    console.log(`Navigating to ${url}...`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 3000));

      console.log('Taking full page screenshot...');
      await page.screenshot({
        path: path.join(outputDir, `${item.name}_full.png`),
        fullPage: true
      });

      console.log('Taking above-the-fold screenshot...');
      await page.screenshot({ path: path.join(outputDir, '0_above_fold.png') });

      // Reset scroll position before segmented scrolling
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise(r => setTimeout(r, 500));

      // Take segmented screenshots by scrolling
      for (let scrollIdx = 1; scrollIdx <= 5; scrollIdx++) {
        console.log(`Scrolling (scroll ${scrollIdx})...`);
        await page.evaluate((scrollDistance) => {
          window.scrollBy(0, scrollDistance);
        }, 800);

        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: path.join(outputDir, `scroll_${scrollIdx}.png`) });
      }
      console.log(`Finished ${item.file} successfully!`);
    } catch (err) {
      console.error(`Error processing ${item.file}:`, err.message);
    }
  }

  await browser.close();
  console.log('\nAll pages processed successfully!');
}

run().catch(console.error);
