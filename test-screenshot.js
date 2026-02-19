import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match design
  await page.setViewport({ width: 1200, height: 800 });
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'current-implementation.png',
      fullPage: true
    });
    
    console.log('Screenshot saved as current-implementation.png');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();