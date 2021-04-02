const express = require('express');
const mysql = require('mysql');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "inzodex" });
});

// mysql connection
const config = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
};

// create the pool for mysql db
const pool = mysql.createPool(config);

console.log("Currently running on: ", process.platform);

module.exports = router;