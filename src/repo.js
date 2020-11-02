const {Contributer} = require('./contributer.js')
const {fetch} = require('./fetch.js')

class Repo {
  constructor(owner, name) {
    this.owner = owner;
    this.name = name;
    this.contributers = [];
  }

  async fetchContributers() {
    let page = 1;
    while (true) {
      let data = await fetch(
          'GET /repos/:user/:repo/contributors?page=:page_num&per_page=100&anon=true',
          {user: this.owner, repo: this.name, page_num: page});
      if (data.length == 0) break;

      for (const c of data) {
        const login = c.login;
        const url = c.url;
        const commitCount = c.contributions;
        const name = c.name;

        const contributor = new Contributer(login, name, commitCount, url);
        if (contributor.name == undefined)
          await contributor.fetchPersonalData();

        this.contributers.push(contributor);
      }
      page++;
    }
  }
}

module.exports.Repo = Repo;