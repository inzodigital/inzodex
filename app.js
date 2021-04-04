const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const sql = require("./db.js");

// app and engine setup
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));

// default route
app.get('/', (req, res) => {
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

// account for environment port differences
const PORT = process.env.PORT || 3000;

// set port, listen for requests
app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT + '.');
});