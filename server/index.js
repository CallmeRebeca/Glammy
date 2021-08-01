const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usermgmt = require('./usermgmt');
const productmgmt = require('./productmgmt');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./glammy.db');

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(usermgmt(db))
  .use(productmgmt(db));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name VARCHAR(20) NOT NULL,
      last_name VARCHAR(20) NOT NULL,
      email VARCHAR(30) NOT NULL,
      password VARCHAR(20) NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS cos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL,
			name VARCHAR(30) NOT NULL,
			pret FLOAT NOT NULL,
      descriere VARCHAR(200) NOT NULL,
      bucati INTEGER NOT NULL
    )`);
  });
});
