import puppeteer from 'puppeteer';

async function check() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err.toString()));
  
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 1000));
  
  const h1Text = await page.evaluate(() => {
    const el = document.querySelector('h1');
    return el ? el.innerText : 'NO H1 FOUND';
  });
  console.log('FOUND H1:', h1Text);
  await browser.close();
}

check().catch(console.error);
