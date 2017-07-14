/**
 * Created by jmichelin on 7/13/17.
 */
var express = require('express');
var router = express.Router();
var request = require("request");


/* get show form */
router.get('/', function(req, res, next) {
  // res.render('commits', {
  //   title: 'Commits'
  // });
  res.render('commentForm', {
    title: 'Comments'}
    );
  //res.send('hello')
});

/* post commits listing. */
router.post('/:username?/:repoName?', function(req, res, next) {
  console.log("Inside GET", req);
  let commits = '';
  let username = req.body.username;
  let repoName = req.body.repoName;
  let options = {
    method: 'GET',
    url: 'https://api.github.com/repos/' + username + '/' + repoName + '/comments',
    headers:
      { 'postman-token': '0a5971e3-97fb-c661-29da-74d81882456b',
        'cache-control': 'no-cache',
        'User-Agent': 'jmichelin',
        'Content-Type': 'application/json; charset=utf-8'}
  };
  request(options, function (error, response, body) {
    //console.log('+++ filename: commits.js functionName: get callback expected to see ', body);
    if (error) throw new Error(error);
    comments = JSON.parse(body);
    //console.log(body);
    //console.log('typeof \n', typeof body)
    //res.send(body);
    res.render('comments', {
      title: 'Comments',
      commits: comments,
      username: username,
      repoName: repoName
    });
  });

});

module.exports = router;
