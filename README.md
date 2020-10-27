# repo-fetcher

## How to configure?
Open *config.json* and set the following parameters.
- **auth_token:** Set the authentication token in order to use [GitHub API](https://docs.github.com/en/free-pro-team@latest/rest). Check the [link](https://octokit.github.io/rest.js/v18#authentication) to get more information about authentication.
- **repos:** Set the repositories that you want to fetch data about. It is possible to define multiple repositories.
  - **owner:** Owner of the repository
  - **name:** name of the repository\
*For example:* https://github.com/miriyusifli/repo-fetcher should be set like that
```
{
  "owner": "miriyusifli",
  "name": "repo-fetcher"
}
```
## How to run?
Run the following command to fetch data. \
```
$ npm run start
```
After successful completion check ```data``` folder.