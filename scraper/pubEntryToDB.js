import axios from 'axios';

const GoogleFormURL =
  'https://docs.google.com/forms/d/e/1FAIpQLSePX85iFlcwh2Aqp71wwoJICDqSYZFSFkTlYFwqgyc-AupWSQ/formResponse';

async function pubEntryToDB(name, iframe) {
  try {
    await axios.postForm(GoogleFormURL, {
      'entry.920370709': name,
      'entry.2079262082': iframe,
    });
  } catch (error) {}
}

export default pubEntryToDB;
