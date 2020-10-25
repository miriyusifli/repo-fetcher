const {User} = require('./user.js')
const {fetch} = require('./fetch.js')

class Repo {
  constructor(owner, name) {
    this.owner = owner;
    this.name = name;
    this.collaborators = [];
  }

  async fetchCollaborators() {
    let data = await fetch('GET /repos/:user/:repo/collaborators',{user: this.owner, repo: this.name});
    data.forEach(
        c => this.collaborators.push(new User(c.login, c.avatar_url, c.url)));
  }
}

module.exports.Repo = Repo;