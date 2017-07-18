var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  url: String,
  html_url: String,
  id: Number,
  user: Object,
  position: Number,
  line: Number,
  path: String,
  commit_id: String,
  created_at: Date,
  updated_at: Date,
  body: String
});

module.exports = CommentSchema;

/*
{
        "url": "https://api.github.com/repos/HashtableHippos/applican-/comments/23102207",
        "html_url": "https://github.com/HashtableHippos/applican-/commit/a5ce85a7ef7f6ae14555b268be2f244edbe49add#commitcomment-23102207",
        "id": 23102207,
        "user": {
            "login": "ian-culleton",
            "id": 18315897,
            "avatar_url": "https://avatars1.githubusercontent.com/u/18315897?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/ian-culleton",
            "html_url": "https://github.com/ian-culleton",
            "followers_url": "https://api.github.com/users/ian-culleton/followers",
            "following_url": "https://api.github.com/users/ian-culleton/following{/other_user}",
            "gists_url": "https://api.github.com/users/ian-culleton/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/ian-culleton/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/ian-culleton/subscriptions",
            "organizations_url": "https://api.github.com/users/ian-culleton/orgs",
            "repos_url": "https://api.github.com/users/ian-culleton/repos",
            "events_url": "https://api.github.com/users/ian-culleton/events{/privacy}",
            "received_events_url": "https://api.github.com/users/ian-culleton/received_events",
            "type": "User",
            "site_admin": false
        },
        "position": 1,
        "line": 1,
        "path": "db/seed.js",
        "commit_id": "a5ce85a7ef7f6ae14555b268be2f244edbe49add",
        "created_at": "2017-07-14T17:40:35Z",
        "updated_at": "2017-07-14T17:40:35Z",
        "body": "Why is this seed file in the `db` directory, rather than the `seeds` directory in the project root?  \r\n\r\n"
    },
 */