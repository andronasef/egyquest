import { chromium } from '@playwright/test';

// Experiment to scroll to end and get all locations

(async () => {
  // Setup
  const url =
    'https://www.google.com/maps/place/Khan+el-Khalili/@30.0477386,31.2622538,3a,75y,220.24h,86.74t/data=!3m8!1e1!3m6!1sAF1QipNk82pSOT3up9ngAl6XLBfsW0lRemM8Ug-qOvCz!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNk82pSOT3up9ngAl6XLBfsW0lRemM8Ug-qOvCz%3Dw224-h298-k-no-pi-0.112540185-ya299.88745-ro-0-fo100!7i11008!8i5504!4m9!3m8!1s0x145840eb2c0e580f:0x1761e0e461027d11!8m2!3d30.0477386!4d31.2622538!10e5!14m1!1BCgIgARICCAI!16s%2Fm%2F026lzw2?entry=ttu';

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);

  // Select All Street Views of the location
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('a[data-photo-index]');

  async function getAllLocations() {
    let locations = await page.$$('a[data-photo-index]');
    let length = locations.length;

    locations[length - 1].focus();
    await page.waitForTimeout(2000);

    if (length !== (await page.$$('a[data-photo-index]')).length) {
      return await getAllLocations();
    }

    return locations;
  }

  console.log('Getting all locations');
  console.log('---------------------');
  console.log('Locations length:' + (await getAllLocations()).length);
})();
