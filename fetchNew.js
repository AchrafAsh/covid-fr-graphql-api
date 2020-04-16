const fetch = require('node-fetch');
const axios = require('axios');

// const url =
//   'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';

// fetch(url)
//   .then((res) => res.text())
//   .then((data) => {
//     let dataSet = [];
//     newData = data.split('\r\n');
//     newData.map((line) =>
//       dataSet.push({
//         department_number: line.split(';')[0],
//         sexe: parseInt(line.split(';')[1]),
//         day: line.split(';')[2],
//         hosp: parseInt(line.split(';')[3]),
//         rea: parseInt(line.split(';')[4]),
//         rad: parseInt(line.split(';')[5]),
//         dc: parseInt(line.split(';')[6]),
//       })
//     );
//     console.log(dataSet);
//   });

const query = `
  query {
    departments {
      day
      rad
      hosp
      dc
    }
  }
`;

const url = 'https://boiling-oasis-24571.herokuapp.com/graphql';

const opts = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query }),
};

fetch(url, opts)
  .then((res) => res.text())
  .then(console.log)
  .catch(console.error);
