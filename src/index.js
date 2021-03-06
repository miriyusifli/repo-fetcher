const config = require('./../config.json')
const fs = require('fs');
const {Repo} = require('./repo')
const {Parser} = require('json2csv');

const repos = config.repos;

// order the fields for CSV file
const fields = ['username', 'name', 'commitCount'];

// folder that contains fetched data
var dir = './data';

// create parser for converting data from JSON to csv
const parser = new Parser({fields});

// main function
async function main() {
  for (const r of repos) {
    console.log(`--${r.owner}/${r.name} is processing--`)

    const repo = new Repo(r.owner, r.name);

    console.log('Data fetching...');

    await repo.fetchContributers();

    console.log('Data converting from json to csv...')

    const csv = parser.parse(repo.contributers);

    console.log('Data writing to file....')

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const currentDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

    fs.writeFileSync(`./data/${r.name}-${currentDateTime} UTC.csv`, csv);

    console.log(`-----Processed-----`)
    console.log('-------------------------------')
  }

  console.log('Completed!')
}

main();
