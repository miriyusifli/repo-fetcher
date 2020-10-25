const {fetch} = require('./fetch.js')

class Contributer {
  constructor(login, avatar, url) {
    this.login = login;
    this.avatar = avatar;
    this.url = url;
  }

  async fetchPersonalData() {
    let data = await fetch(this.url);
    this.name = data.name;
    this.location = data.location;
  }
}

module.exports.Contributer = Contributer;