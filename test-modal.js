import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match design
  await page.setViewport({ width: 1200, height: 800 });
  
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // Wait for the add button and click it
    await page.waitForSelector('button[aria-label="Adicionar tarefa"]');
    await page.click('button[aria-label="Adicionar tarefa"]');
    
    // Wait for modal to appear
    await page.waitForSelector('.fixed.inset-0', { timeout: 3000 });
    
    // Take screenshot with modal open
    await page.screenshot({ 
      path: 'modal-test.png',
      fullPage: true
    });
    
    console.log('Modal screenshot saved as modal-test.png');
  } catch (error) {
    console.error('Error testing modal:', error);
  } finally {
    await browser.close();
  }
})();