const CONFIG = require('./../config.json')
const fs = require('fs');
const {Repo} = require('./repo')
const {Parser} = require('json2csv');

const repos = CONFIG.repos;

// order the fields for CSV file
const fields = ['login', 'name', 'location', 'avatar', 'url'];

//folder that contains fetched data
var dir = './data';

//create parser for converting data from JSON to csv
const parser = new Parser({fields});

//main function
async function run() {
  for (const r of repos) {
    console.log(`--${r.name} repo is processing--`)

    const repo = new Repo(r.owner, r.name);
    
    console.log('Data fetching...')
    
    await repo.fetchContributersPersonalData();

    console.log('Data converting from json to csv...')

    const csv = parser.parse(repo.contributers);
    
    console.log('Data writing to file....')
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(`./data/${r.name}.csv`, csv);
    
    console.log(`-----Processed-----`)
    console.log("-------------------------------")
  }

  console.log('Completed!')
}

run();
