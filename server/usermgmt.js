const express = require('express');

function createRouter(db) {
  const router = express.Router();

  // the routes are defined here
  router.post('/login', (req, res, next) => {
    var sql = "SELECT * FROM users WHERE email='" + req.body.email + "' and password='" + req.body.password + "'";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).json({status: 'error'});
      } else if (rows.length === 1) {
        console.log('User found');
        res.status(200).json({status: 'ok', id: rows[0].id });
      } else {
        console.log('user not found');
        res.status(200).json({status: 'not_found'});
      }
    });
  });

  router.post('/register', (req, res, next) => {
    var sql = "SELECT * FROM users WHERE email='" + req.body.email + "' and password='" + req.body.password + "'";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).json('error');
      } else if (rows.length === 1) {
        console.log('User already exists. Cannot register');
        res.status(200).json('user_exists');
      } else {
        let attributes = [req.body.first_name, req.body.last_name, req.body.email, req.body.password];
        var sql = "INSERT INTO users (first_name,last_name,email,password) VALUES (?,?,?,?)";
        db.run(sql, attributes, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json('error');
          } else {
            console.log('user registered');
            res.status(200).json('ok');
          }
        });
      }
    });
  });

  return router;
}

module.exports = createRouter;