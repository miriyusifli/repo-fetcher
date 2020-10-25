const {Octokit} = require('@octokit/core')
const config = require('./../config.json')

const octokit = new Octokit({auth: config.auth_token});

async function fetch(url, params) {
  const response = await octokit.request(url, params);
  return response.data;
}

module.exports.fetch = fetch;