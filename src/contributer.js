const {Github} = require('./octokit.js')

class Contributer {
  constructor(username, name, commitCount) {
    this.username = username;
    this.name = name;
    this.commitCount = commitCount;
  }

  async fetchPersonalData() {
    const {data: user} = await Github.users.getByUsername({
      username:this.username
    });
    this.name = user.name;
  }
}

module.exports.Contributer = Contributer;