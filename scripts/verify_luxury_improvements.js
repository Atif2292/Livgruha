import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';

async function verifyAll() {
  console.log("Starting Vite dev server...");
  const server = spawn('npx', ['vite', '--port', '5179'], {
    cwd: process.cwd(),
    stdio: 'ignore'
  });

  await new Promise(r => setTimeout(r, 2000));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const artifactDir = '/Users/mohdatif/.gemini/antigravity/brain/1241d4a2-83b2-4fe7-8822-707e31236ad5';

  console.log("Navigating to http://localhost:5179/...");
  await page.goto('http://localhost:5179/', { waitUntil: 'networkidle0' });

  // 1. Capture Header & Logo
  console.log("Capturing 01_logo_and_header.png...");
  await page.screenshot({ path: path.join(artifactDir, '01_logo_and_header.png'), clip: { x: 0, y: 0, width: 1440, height: 400 } });

  // 2. Capture Brands We Work With
  console.log("Capturing 02_brand_logos_section.png...");
  const brandSection = await page.$('section:nth-of-type(2)');
  if (brandSection) {
    await brandSection.screenshot({ path: path.join(artifactDir, '02_brand_logos_section.png') });
  }

  // 3. Capture Before & After Section
  console.log("Capturing 03_before_after_section.png...");
  const beforeAfterSection = await page.$('section:nth-of-type(4)');
  if (beforeAfterSection) {
    await beforeAfterSection.screenshot({ path: path.join(artifactDir, '03_before_after_section.png') });
  }

  // 4. Capture Full Restructured Homepage Overview
  console.log("Capturing 04_restructured_homepage.png...");
  await page.screenshot({ path: path.join(artifactDir, '04_restructured_homepage.png'), fullPage: false });

  // 5. Test Welcome Lead Popup
  console.log("Clearing localStorage to test welcome popup...");
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  console.log("Capturing 05_welcome_lead_popup.png...");
  await page.screenshot({ path: path.join(artifactDir, '05_welcome_lead_popup.png') });

  // 6. Test Branches Page
  console.log("Testing Branches page...");
  await page.evaluate(() => {
    localStorage.setItem('livgruha_welcome_dismissed', 'true');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  // Click Branches in navbar
  const branchesBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const b = btns.find(el => el.innerText.includes('Branches'));
    if (b) { b.click(); return true; }
    return false;
  });
  await new Promise(r => setTimeout(r, 1000));
  console.log("Capturing 06_branches_hyderabad_page.png...");
  await page.screenshot({ path: path.join(artifactDir, '06_branches_hyderabad_page.png') });

  // 7. Test Contact Page
  const contactBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const b = btns.find(el => el.innerText.includes('Contact'));
    if (b) { b.click(); return true; }
    return false;
  });
  await new Promise(r => setTimeout(r, 1000));
  console.log("Capturing 07_contact_hyderabad_page.png...");
  await page.screenshot({ path: path.join(artifactDir, '07_contact_hyderabad_page.png') });

  await browser.close();
  server.kill();
  console.log("All verifications completed successfully!");
}

verifyAll().catch(err => {
  console.error(err);
  process.exit(1);
});
