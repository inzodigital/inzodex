const express = require('express');
const mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "inzodex" });
});

// mysql connection
const config = {
  host: 'localhost',
  user: 'root',
  password: 'holdpls',
  database: 'inzodex'
};

// create the pool for mysql db
const pool = mysql.createPool(config);

console.log("Currently running on: ", process.platform);

module.exports = router;