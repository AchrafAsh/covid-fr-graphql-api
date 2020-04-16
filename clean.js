const fs = require('fs');

fs.readFile(
  './donnees-hospitalieres-covid19-2020-04-14-19h00.csv',
  'utf-8',
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);
