const {Contributer} = require('./contributer.js')
const {fetch} = require('./fetch.js')

class Repo {
  constructor(owner, name) {
    this.owner = owner;
    this.name = name;
    this.contributers = [];
  }

  async fetchContributers() {
    let data = await fetch('GET /repos/:user/:repo/contributors',{user: this.owner, repo: this.name});
    data.forEach(
        c => this.contributers.push(
            new Contributer(c.login, c.avatar_url, c.url)));
  }

  async fetchContributersPersonalData(){
    await this.fetchContributers();
    for (const c of this.contributers) {
      await c.fetchPersonalData()
    }
  }
}

module.exports.Repo = Repo;