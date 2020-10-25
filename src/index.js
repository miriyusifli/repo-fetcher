const CONFIG = require('./../config.json')
const fs = require('fs');
const {Repo} = require('./repo')
const {Parser} = require('json2csv');

const repos = CONFIG.repos;

// order the fields for CSV file
const fields = ['login', 'name', 'location', 'avatar', 'url'];

//create parser for converting data from JSON to csv
const parser = new Parser({fields});

//main function
async function run() {
  for (const r of repos) {
    console.log(`--${r.name} repo is processing--`)
    const repo = new Repo(r.owner, r.name);
    console.log('Data fetching...')
    const contributers = await repo.fetchContributersPersonalData();

    console.log('Data converting from json to csv...')
    const csv = parser.parse(contributers);
    console.log('Data writing to file....')
    fs.writeFileSync('contributers.csv', csv);
    console.log(`--${r.name} repo processed--`)
    console.log("-------------------------------")
  }

  console.log('Completed!')
}

run();
