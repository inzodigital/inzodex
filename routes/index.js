var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Pokedex" });
});

console.log("Currently running on: ", process.platform);

module.exports = router;