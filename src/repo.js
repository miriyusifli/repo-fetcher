const {Contributer} = require('./contributer.js')
const {fetch} = require('./fetch.js')

class Repo {
  constructor(owner, name) {
    this.owner = owner;
    this.name = name;
    this.contributers = [];
  }

  async fetchContributers() {
    let data = await fetch('GET /repos/:user/:repo/stats/contributors',{user: this.owner, repo: this.name});
    data.forEach(
      c=>{
        const login=c.author.login;
        const avatar_url=c.author.avatar_url;
        const url=c.author.url;
        const commitCount=c.total;
        let additionsCount=0;
        let deletionsCount=0;

        c.weeks.forEach(
          w=>{
            additionsCount+=w.a;
            deletionsCount+=w.d;
          }
        )
      
      this.contributers.push(new Contributer(login, avatar_url, url,commitCount,additionsCount,deletionsCount))}
    );
  }

  async fetchContributersPersonalData(){
    await this.fetchContributers();
    for (const c of this.contributers) {
      await c.fetchPersonalData()
    }
  }
}

module.exports.Repo = Repo;