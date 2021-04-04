const express = require("express");
const bodyParser = require("body-parser");
const sql = require("db.js");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	// generate random integer
	var num = Math.floor(Math.random() * 9) + 1;

	// start query
	sql.query('SELECT name FROM inzodex WHERE id = ' + num, function(error, rows) {
		if (error) throw error

		console.log(num);

		// retrieve pokemon name to pass to view
		var pokemon = rows[0].name;

		// send query results to client
		res.render('index', {title: 'inzodex', nameResult: pokemon});
	});
});

// set port, listen for requests
app.listen(3000, () => {
	console.log("Server is running on port 3000.");
});


/* endpoint 00: select random pokemon name
app.get('/', function(req, res) {
	
	// generate random integer
	var num = Math.floor(Math.random() * 9) + 1;

	// start query
	pool.query('SELECT name FROM inzodex WHERE id = ' + num, function(error, rows) {
		if (error) throw error

		console.log(num);

		// retrieve pokemon name to pass to view
		var pokemon = rows[0].name;

		// send query results to client
		res.render('index', {title: 'inzodex', nameResult: pokemon});
	});
});
*/