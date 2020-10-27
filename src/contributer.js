const {fetch} = require('./fetch.js')

class Contributer {
  constructor(login, avatar, url,commitCount,additionsCount,deletionsCount) {
    this.login = login;
    this.avatar = avatar;
    this.url = url;
    this.commitCount = commitCount;
    this.additionsCount = additionsCount;
    this.deletionsCount = deletionsCount;
  }

  async fetchPersonalData() {
    let data = await fetch(this.url);
    this.name = data.name;
    this.location = data.location;
  }
}

module.exports.Contributer = Contributer;