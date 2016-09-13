var r = require('rethinkdb');
var async = require('async');
var moment = require('moment');
var _ = require('lodash');

var api = module.exports = {};

var rethinkHost = process.env.RETHINKDB_DRIVER_SERVICE_HOST || 'localhost';

var db = 'demo';
var table = 'users';
var options = {
  host: rethinkHost,
  db: db
};
var conn;

api.getUsers = function getUsers(opts, callback) {
  r.table(table)
    // .orderBy(r.desc('registered')) // TODO: Use index!
    .orderBy({index: r.desc('registered')})
    .limit(1000)
    .run(conn, function(err, cursor) {
      if (err) {
        return callback(err);
      }
      cursor.toArray(function(err, result) {
        if (err) {
          return callback(err);
        }
        // TODO: Move moment calculation to the client
        _.each(result, function(user) {
          user.fromNow = moment(user.registered).fromNow();
        });
        return callback(null, result);
      });
    })
}

api.init = function (callback) {
  async.waterfall([
    function(callback) {
      r.connect(options, function (err, c) {
        if (err) {
          console.log(err);
          return callback(err);
        }
        conn = c;
        return callback();
      });
    },
    function(callback) {
      r.dbList().contains(db)
        .do(function(databaseExists) {
          return r.branch(
            databaseExists,
            { dbs_created: 0 },
            r.dbCreate(db)
          );
        }).run(conn, function (err, res) {
          if (err) {
            return callback(err);
          }
          conn.use(db);
          console.log('using demo db');
          return callback();
        });
    },
    function(callback) {
      r.tableList().contains(table)
        .do(function(tableExists) {
          return r.branch(
            tableExists,
            { tables_created: 0 },
            r.tableCreate(table)
          );
        }).run(conn, function (err, res) {
          if (err) {
            return callback(err);
          }
          console.log('users table exists');
          return callback();
        });
    },
    function(callback) {
      r.table(table).indexList().contains('registered')
        .do(function(indexExists) {
          return r.branch(
            indexExists,
            { indexes_created: 0 },
            r.table(table).indexCreate('registered')
          );
        }).run(conn, function (err, res) {
          if (err) {
            return callback(err);
          }
          console.log('registered index exists');
          return callback();
        });
    },
    function(callback) {
      r.table(table).indexList().contains('email')
        .do(function(indexExists) {
          return r.branch(
            indexExists,
            { indexes_created: 0 },
            r.table(table).indexCreate('email')
          );
        }).run(conn, function (err, res) {
          if (err) {
            return callback(err);
          }
          console.log('createdAt index exists');
          return callback();
        });
    }
  ], function (err) {
    if (err) {
      return callback(err);
    }
    console.log('Database connection up and running');
    return callback();
  })
}
