const fetch = require('node-fetch');

fetch('https://france-geojson.gregoiredavid.fr/repo/departements.geojson')
  .then((res) => res.json())
  .then((data) =>
    data.features.map((dep) => {
      if (dep.properties.code === '38') console.log(dep.properties.nom);
    })
  );
