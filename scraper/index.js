import 'dotenv/config';
import getStreetViewsFromURL from './getLocations.js';
import pubEntryToDB from './pubEntryToDB.js';

(async () => {
  const name = process.env.NAME;
  const url = process.env.URL;

  console.log('Starting to Get Google Street Views for ' + name);

  const places = await getStreetViewsFromURL(url);

  console.log('Saving to Google Sheet');
  for (const place of places) {
    // wait 1 second between each entry
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // log index of place
    console.log(places.indexOf(place) + 1 + '/' + places.length);
    await pubEntryToDB(name, place);
  }

  console.log('Done!');
  process.exit(0);
})();
