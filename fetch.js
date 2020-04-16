const fetch = require('node-fetch');

const puppeteer = require('puppeteer');

const url =
  'https://www.data.gouv.fr/fr/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/';

(async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: './datasets/',
  });

  const dataSets = await page.evaluate(() => {
    const resources = document.querySelector('div.resources-list');
    let dataSets = [];
    let articles = resources.querySelectorAll('article');
    articles.forEach((article) => {
      let articleJson = {};
      try {
        articleJson.btn = article.querySelectorAll('a.btn.btn-sm.btn-primary')[
          '1'
        ];
        articleJson.name = article.querySelector('h4.ellipsis').innerText;
        articleJson.link = article.querySelectorAll('a.btn.btn-sm.btn-primary')[
          '1'
        ]['href'];
      } catch (exception) {}
      dataSets.push(articleJson);
    });
    return dataSets;
  });

  i = 0;
  while (i < dataSets.length) {
    try {
      fetch(dataSets[i].link, { method: 'GET' })
        .then((res) => res.text())
        .then((data) => console.log(data));
    } catch (exception) {}
    i++;
  }
  await browser.close();
})(url);
