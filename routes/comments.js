/**
 * Created by jmichelin on 7/13/17.
 */
var express = require('express');
var router = express.Router();
var request = require("request");


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
  let comments = '';
  let message='';
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
    //console.log('+++ filename: comments.js functionName: get callback expected to see ', body);
    if (error) throw new Error(error);
    comments = JSON.parse(body);
    //console.log(body);
    //console.log('typeof \n', typeof body)
    //res.send(body);
    console.log('comments ', comments)
    if(comments.length === 0) {
      console.log("Not Found");
      message = 'No Comments Fdound';
    } else {
      let plural = comments.length > 1 ? 's':'';
      message = comments.length + ' comment' + plural + ' found';
    }

    res.render('comments', {
      message: message,
      title: 'Comments',
      comments: comments,
      username: username,
      repoName: repoName
    });
  });

});

module.exports = router;
