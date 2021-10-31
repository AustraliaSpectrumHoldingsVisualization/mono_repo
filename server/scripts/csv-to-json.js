// require csvtojson
const csv = require("csvtojson");
const fs = require("fs");

(async () => {

  const json = await csv()
      .fromFile('../server/data/Spectrum Holdings - v0.1.csv');

  jsonString = JSON.stringify(json); // convert it back to json
  
  fs.writeFile('../server/data/data.json', jsonString, 'utf8', () => {}); // write it back 

})();
