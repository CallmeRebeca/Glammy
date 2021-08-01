const express = require('express');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'taskboard7@gmail.com',
    pass: 'aplicatie123456'
  }
});
var mailOptions = {
  from: 'taskboard7@gmail.com',
  to: 'saslore@yahoo.com',
  subject: 'Order'
};

function createRouter(db) {
  const router = express.Router();

  // the routes are defined here
  router.post('/add', (req, res, next) => {
    var sql = "SELECT * FROM cos WHERE user_id=" + parseInt(req.body.user_id) + " AND name='" + req.body.title + "' AND pret=" +
      parseFloat(req.body.pret) + " AND descriere='" + req.body.descriere + "'";
    db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).json('error');
        } else if (rows.length === 1) {
          console.log('Product already exists in cart, increment quantity');
          var sql = "UPDATE cos SET bucati=" + (rows[0].bucati + 1);
          db.run(sql, [], (err) => {
            if (err) {
              console.log(err);
              res.status(500).json('error');
            } else {
              console.log('Product quantity incremented');
              res.status(200).json('ok');
            }
          });
        } else {
          console.log('Product does not exist in cart. add a new one with quantity 1');
          let attributes = [parseInt(req.body.user_id), req.body.title, parseFloat(req.body.pret), req.body.descriere, 1];
          var sql = "INSERT INTO cos (user_id, name, pret, descriere, bucati) VALUES (?,?,?,?,?)";
          db.run(sql, attributes, (err) => {
            if (err) {
              console.log(err);
              res.status(500).json('error');
            } else {
              console.log('Product added to cart');
              res.status(200).json('ok');
            }
          });
        }
    });
  });

  // the routes are defined here
  router.post('/products', (req, res, next) => {
    var sql = "SELECT * FROM cos WHERE user_id=" + parseInt(req.body.user_id);
    db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).json('error');
        } else {
          res.status(200).json({ status: 'ok', products: rows });
        }
    });
  });

  router.post('/checkout', (req, res, next) => {
    var sql = "SELECT * FROM cos WHERE user_id=" + parseInt(req.body.user_id);
    db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).json('error');
        } else {
          var total = 0;
          var message = `
          <h2>Order details</h2>
          <table style="width:100%">
          <tr>
            <th>Name</th>
            <th style="width: 75%;">Description</th>
            <th>Price</th>
            <th style="width: 50px;">Qty</th>
          </tr>
          `;
          for (let i = 0; i < rows.length; i++) {
            message += `<tr><td>${rows[i].name}</td><td>${rows[i].descriere}</td><td>$${rows[i].pret}</td><td>${rows[i].bucati}</td></tr>`;
            total += parseInt(rows[i].bucati) * parseFloat(rows[i].pret);
          }
          message += '</table>';
          message += `<h2>Total: $${total}</h2>`;
          mailOptions.html = message;
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          // Clean user cart
          var sql = "DELETE FROM cos WHERE user_id=" + parseInt(req.body.user_id);
          db.all(sql, [], (err, rows) => {
              if (err) {
                console.log(err);
                res.status(500).json('error');
              } else {
                res.status(200).json('ok');
              }
          });
        }
    });
  });

  return router;
}

module.exports = createRouter;