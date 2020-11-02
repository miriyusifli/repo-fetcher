const {fetch} = require('./fetch.js')

class Contributer {
  constructor(login, name, commitCount, url) {
    this.login = login;
    this.name = name;
    this.commitCount = commitCount;
    this.url = url;
  }

  async fetchPersonalData() {
    let data = await fetch(this.url);
    this.name = data.name;
  }
}

module.exports.Contributer = Contributer;