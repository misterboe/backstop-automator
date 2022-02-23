#!/usr/bin/env node

const Sitemapper = require('sitemapper');
const argv = require('minimist')(process.argv.slice(2));
const backstop = require('backstopjs');
const onReady = require('./backstopScripts/onReady')
const executePath = process.cwd();
const libPath = process.mainModule.path;
console.log(__dirname);

const scenarios = [];
const backstopConfig = {
  id: argv.url,
  scenarios,
  viewports: [
    {
      label: "desktop",
      width: 1920,
      height: 1080
    }
  ],
  paths: {
    bitmaps_reference: `./backstop_${argv.projectname}/bitmaps_reference`,
    bitmaps_test: `./backstop_${argv.projectname}/bitmaps_test`,
    engine_scripts: `${__dirname}/backstopScripts`,
    html_report: `./backstop_${argv.projectname}/html_report`,
    ci_report: `./backstop_${argv.projectname}/ci_report`
  },
  report: [
    "browser"
  ],
  engine: "puppeteer",
  engineOptions: {
    args: [
      "--no-sandbox"
    ]
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  delay: 1000,
  debug: false,
  debugWindow: false,
  onReadyScript: 'onReady.js'
};



const sitemapFetcher = async (url) => {
  const WebPage = new Sitemapper({
    url: `${url}/sitemap.xml`,
    timeout: 15000, // 15 seconds
  });
  try {
    const {sites} = await WebPage.fetch();
    return sites
  } catch (error) {
    console.log(error);
  }
};

if (argv.url && argv.projectname && argv.reference && argv.run){
  sitemapFetcher(argv.url).then(sites => {
    sites.map(url => {
      scenarios.push({
        "label": url,
        "url": url,
        "misMatchThreshold": 2,
        delay: 1000,
        "selectors": [
          "document"
        ],
        "hideSelectors": [
          "iframe"
        ]
      })
    })
    console.log(scenarios);
    backstop(argv.run, {config: backstopConfig})
    .then(() => {
      console.log('backstop successful');
    }).catch(() => {
      console.log('backstop failed');
    });
  });
} else {
  console.log('No Domain given, please use:');
  console.log('autoback --run=reference --projectname=projectname --url=https://projectname.local/ --reference=https://projectname.de/');
}
