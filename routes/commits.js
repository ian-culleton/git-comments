/**
 * Created by jmichelin on 7/13/17.
 */
var express = require('express');
var router = express.Router();
var request = require("request");

var options = {
  method: 'GET',
  url: 'https://api.github.com/repos/',
  headers:
    { 'postman-token': '0a5971e3-97fb-c661-29da-74d81882456b',
      'cache-control': 'no-cache',
      'User-Agent': 'jmichelin',
      'Content-Type': 'application/json; charset=utf-8'}
};

/* GET commits listing. */
router.get('/:username?/:repoName?', function(req, res, next) {
  console.log(req.params);
  let username = req.params.username;
  let repoName = req.params.repoName;
  options.url = options.url + username + '/' + repoName + '/comments';
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let commits = JSON.parse(response.body);
    //console.log(body);
    //console.log('typeof \n', typeof body)
    //res.send(body);
    res.render('commits', {
      title: 'Commits',
      commits: commits
    });
  });

});

module.exports = router;
