const {Contributer} = require('./contributer.js')
const {Github} = require('./octokit.js')

class Repo {
  constructor(owner, name) {
    this.owner = owner;
    this.name = name;
    this.contributers = [];
  }

  async fetchContributers() {
    let page = 1;
    while (true) {
      const {data: contributers} = await Github.repos.listContributors({
            owner: this.owner,
            repo: this.name,
            page: page,
            anon: true
          });

      if (contributers.length == 0) break;

      for (const c of contributers) {
        const username = c.login;
        const commitCount = c.contributions;
        const name = c.name;

        const contributor = new Contributer(username, name, commitCount);
        if (contributor.name == undefined)
          await contributor.fetchPersonalData();

        this.contributers.push(contributor);
      }
      page++;
    }
  }
}

module.exports.Repo = Repo;