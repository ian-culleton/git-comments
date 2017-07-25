/**
 * Created by jmichelin on 7/13/17.
 */
var express = require('express');
var router = express.Router();
var request = require("request");
const {URL} = require('url');
var mongoose = require('mongoose');


require('dotenv').config();

console.log('process.env', process.env.DB_URL);


mongoose.connect(process.env.DB_URL, {
  useMongoClient: true,
  /* other options */
});

var CommentsModel = require('../models/comments');

// var comment = new CommentsModel({
//   "url": "https://api.github.com/repos/HashtableHippos/applican-/comments/23102207",
//   "html_url": "https://github.com/HashtableHippos/applican-/commit/a5ce85a7ef7f6ae14555b268be2f244edbe49add#commitcomment-23102207",
//   "id": 231022071,
//   "user": {
//     "login": "ian-culleton",
//     "id": 18315897,
//     "avatar_url": "https://avatars1.githubusercontent.com/u/18315897?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/ian-culleton",
//     "html_url": "https://github.com/ian-culleton",
//     "followers_url": "https://api.github.com/users/ian-culleton/followers",
//     "following_url": "https://api.github.com/users/ian-culleton/following{/other_user}",
//     "gists_url": "https://api.github.com/users/ian-culleton/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/ian-culleton/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/ian-culleton/subscriptions",
//     "organizations_url": "https://api.github.com/users/ian-culleton/orgs",
//     "repos_url": "https://api.github.com/users/ian-culleton/repos",
//     "events_url": "https://api.github.com/users/ian-culleton/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/ian-culleton/received_events",
//     "type": "User",
//     "site_admin": false
//   },
//   "position": 1,
//   "line": 1,
//   "path": "db/seed.js",
//   "commit_id": "a5ce85a7ef7f6ae14555b268be2f244edbe49add",
//   "created_at": "2017-07-14T17:40:35Z",
//   "updated_at": "2017-07-14T17:40:35Z",
//   "body": "Why is this seed file in the `db` directory, rather than the `seeds` directory in the project root?  \r\n\r\n"
// });

// let commentQuery = CommentsModel.findOne({id: comment.id});
//
// commentQuery.findOne(function (err, currComment) {
//   if (err) throw err;
//   if (currComment) {
//     console.log('findOne Comment', currComment);
//   } else {
//     comment.save(function (err) {
//       if (err) throw err;
//
//       console.log('Comment saved successfully! ', comment);
//     });
//   }
//
// })


// CommentsModel.findOneAndUpdate(
//   {id: 23102207},
//   comment,
//   {upsert: true, new: true},
//   function(err, doc) {
//   if (err) throw err;
//
//   console.log(doc, ' Comment saved successfully!');
// });

/* get show form */
router.get('/', function (req, res, next) {
  console.log("inside GET");
  res.render('commentForm', {
      title: 'Comments'
    }
  );
  //res.send('hello')
});

/* post comments listing. */
router.post('/:username?/:repoName?', function (req, res, next) {
  //console.log("Inside POST", req);
  let repoURL = req.body.repoURL || '';
  let username = '';
  let repoName = '';
  if (req.body.repoURL) {
    const myURL = new URL(req.body.repoURL);
    let myPaths = myURL.pathname.split('/');
    //console.log('username from path ' + myPaths[1]);
    //console.log('repo from path ' + myPaths[2]);
    username = myPaths[1];
    repoName = myPaths[2];
  } else {
    username = req.body.username;
    repoName = req.body.repoName;
  }


  let comments = '';
  let message = '';
  let options = {
    method: 'GET',
    url: 'https://api.github.com/repos/' + username + '/' + repoName + '/comments',
    headers:
      {
        'cache-control': 'no-cache',
        'User-Agent': username,
        'Content-Type': 'application/json; charset=utf-8'
      }
  };
  request(options, function (error, response, body) {
    //console.log('+++ filename: comments.js functionName: get callback expected to see ', body);
    if (error) throw new Error(error);
    comments = JSON.parse(body);
    // console.log(body);
    // console.log('typeof \n', typeof body)
    // res.send(body);
    // console.log('comments ', comments)
    if(comments.length === 0) {
      console.log("Not Found");
      message = 'No Comments Found';
    } else {
      let plural = comments.length > 1 ? 's' : '';
      message = comments.length + ' comment' + plural + ' found';
    }
    //
    for (let i = 0; i <= comments.length - 1; i++) {
      //console.log(comments[i]);


      var commentQuery = CommentsModel.findOne({id: comments[i].id});
      commentQuery.findOne(function (err, currComment) {
        if (err) throw err;
        if (currComment) {
          console.log('Comment Already Exists: commentID=> ', comments[i].id);
        } else {
          var comment = new CommentsModel(comments[i]);
          comment.save(function (err) {
            if (err) throw err;

            console.log('New comment saved successfully: ', comments[i].id);
          });
        }
      });
    }
    //res.send(body);
    res.render('comments', {
      message: message,
      title: 'Comments',
      comments: comments,
      username: username,
      repoName: repoName,
      repoURL: repoURL
    });
  });

});


module.exports = router;
