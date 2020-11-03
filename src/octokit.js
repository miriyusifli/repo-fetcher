const {Octokit} = require('@octokit/rest')
const config = require('./../config.json')

const octokit = new Octokit({
  auth: config.auth_token
});


module.exports.Github = octokit;