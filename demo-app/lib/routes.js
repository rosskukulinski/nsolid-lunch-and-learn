var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('./db');

module.exports = router;

router.get('/', function(req, res) {
  var users;
  var queueLength;
  async.parallel([
    function getUsers(callback) {
      db.getUsers({}, function (err, user) {
        users = user;
        return callback(err);
      });
    }
  ], function(err) {
    if (err) {
      res.statusCode = 500;
      return res.end('Oops');
    }
    res.render('index', {
      users: users
    });
  })
});
