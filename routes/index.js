const express = require('express');
const mysql = require('mysql');
var router = express.Router();

/* GET home page.
router.get('/', function(req, res, next) {
	res.render('index', { title: "inzodex" });
});
*/
console.log("Currently running on: ", process.platform);

module.exports = router;