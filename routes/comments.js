/**
 * Created by jmichelin on 7/13/17.
 */
var express = require('express');
var router = express.Router();
var request = require("request");
const { URL } = require('url');


/* get show form */
router.get('/', function(req, res, next) {
  console.log("inside GET");
  res.render('commentForm', {
    title: 'Comments'}
    );
  //res.send('hello')
});

/* post comments listing. */
router.post('/:username?/:repoName?', function(req, res, next) {
  //console.log("Inside POST", req);
  let repoURL = req.body.repoURL || '';
  let username = '';
  let repoName = '';
  if(req.body.repoURL) {
    const myURL = new URL(req.body.repoURL);
    let myPaths = myURL.pathname.split('/');
    console.log('username from path ' + myPaths[1]);
    console.log('repo from path ' + myPaths[2]);
    username = myPaths[1];
    repoName = myPaths[2];
  } else {
    username = req.body.username;
    repoName = req.body.repoName;
  }


  let comments = '';
  let message='';
  let options = {
    method: 'GET',
    url: 'https://api.github.com/repos/' + username + '/' + repoName + '/comments',
    headers:
      {'cache-control': 'no-cache',
        'User-Agent': username,
        'Content-Type': 'application/json; charset=utf-8'}
  };
  request(options, function (error, response, body) {
    //console.log('+++ filename: comments.js functionName: get callback expected to see ', body);
    if (error) throw new Error(error);
    comments = JSON.parse(body);
    //console.log(body);
    //console.log('typeof \n', typeof body)
    //res.send(body);
    console.log('comments ', comments)
    if(comments.message === 'Not Found' || comments == undefined) {
      console.log("Not Found");
      message = 'No Comments Found';
    } else {
      let plural = comments.length > 1 ? 's':'';
      message = comments.length + ' comment' + plural + ' found';
    }

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
