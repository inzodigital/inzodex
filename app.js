const express = require("express");
const sql = require("./db.js");

const app = express();

app.set('view engine', 'pug');

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