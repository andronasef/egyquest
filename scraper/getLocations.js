import { chromium } from '@playwright/test';

async function getStreetViewsFromURL(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);
  await page.waitForLoadState('networkidle');

  // go to street views page
  await goToStreetViewsPage(page);

  // WAting for all locations to load
  await page.waitForSelector('a[data-photo-index]');

  //  loop through all locations and click on them
  const savedLocations = await getEachLocationIframe(page);

  return savedLocations;
  // save to file
  // saveLocationsToFile(savedLocations);
}

async function goToStreetViewsPage(page) {
  // Click on 360 button
  const btn360 = await page.getByText('360').first();
  if (btn360) {
    await btn360.click();
  }
}

async function getAllLocationsElements(page) {
  let locations = await page.$$('a[data-photo-index]');
  let length = locations.length;

  locations[length - 1].focus();
  await page.waitForTimeout(2000);

  if (length !== (await page.$$('a[data-photo-index]')).length) {
    return await getAllLocationsElements(page);
  }

  return locations;
}

async function getEachLocationIframe(page) {
  let savedLocations = [];

  for (const location of await getAllLocationsElements(page)) {
    // log index count of this
    console.log(
      'Location Index: ' + (await location.getAttribute('data-photo-index'))
    );

    try {
      await location.click();
      await page.waitForTimeout(2000);

      // click on 3 Dots Menu for Map to reach Embed Iframe
      await page.click('button[jsaction="titlecard.settings"]');

      // click last div with class goog-menuitem
      const menuItems = await page.$$('div.goog-menuitem');
      await menuItems[menuItems.length - 1].click();

      // select Embed map tab
      await page.waitForSelector('input[jsaction="pane.copyLink.clickInput"]');
      const buttons = await page.$$(
        'div[role="dialog"] div[role="tablist"] button'
      );
      await buttons[1].click({});

      // copy content Iframe
      const input = await page.$('input[jsaction="pane.embedMap.clickInput"]');
      const value = await input?.getAttribute('value');
      savedLocations.push(value);

      // close dialog
      await page.click('button[jsaction="modal.close"]');
    } catch (error) {
      console.log(error);
    }
  }

  return savedLocations;
}

// function saveLocationsToFile(locations) {
//   fs.writeFile(
//     'locations.json',
//     JSON.stringify({
//       location: 'Khan el-Khalili',
//       locations: locations,
//     }),
//     function (err) {
//       console.log(err);
//     }
//   );
// }

export default getStreetViewsFromURL;
