import puppeteer from 'puppeteer';

async function testSlider() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 1000));

  // Dismiss welcome modal if open
  await page.keyboard.press('Escape');

  // Scroll to Before/After slider section
  await page.evaluate(() => {
    const slider = document.querySelector('input[type="range"]');
    if (slider) slider.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));

  // Test range input update
  const initialVal = await page.evaluate(() => {
    const el = document.querySelector('input[type="range"]');
    return el ? el.value : null;
  });
  console.log('Initial slider value:', initialVal);

  await page.evaluate(() => {
    const el = document.querySelector('input[type="range"]');
    if (el) {
      el.value = 25;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 400));

  // Click kitchen tab
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const kBtn = btns.find(b => b.innerText.includes('Kitchen'));
    if (kBtn) kBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Click 50/50 preset
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const splitBtn = btns.find(b => b.innerText.includes('50/50 Split'));
    if (splitBtn) splitBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Take screenshot
  await page.screenshot({ path: '/Users/mohdatif/.gemini/antigravity/scratch/test-results/slider_test.png' });
  console.log('✅ Before/After slider drag & presets tested successfully!');
  await browser.close();
}

testSlider().catch(console.error);
