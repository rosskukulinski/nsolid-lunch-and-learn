var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('./db');

module.exports = router;

router.get('/', function(req, res) {
  var users;
  var queueLength;
  db.getUsers(function (err, users) {
    if (err) {
      res.statusCode = 500;
      return res.end('Oops');
    }
    res.render('index', {
      users: users
    });
  });
});
