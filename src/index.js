const CONFIG = require('./../config.json')
const {Repo} = require('./repo')

var repo = CONFIG.repos[0]

async function run() {
  repo = new Repo(repo.owner, repo.name);
  await repo.fetchCollaborators();
  await repo.collaborators[0].fetchPersonalData();
  console.log(repo.collaborators[0]);
}

run();
