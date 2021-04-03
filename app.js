// dependencies
var createError = require('http-errors');
const express = require('express');
const path = require('path');
const mysql = require('mysql');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const favicon = require('serve-favicon');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db connection
// mysql connection
const config = {
	host: process.env.host,
  	user: process.env.user,
  	password: process.env.password,
  	database: process.env.database
};

// create the pool for mysql db
const pool = mysql.createPool(config);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// set favicon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// endpoint 00: randomly select a pokemon to show on home page
app.get('/', function(req, res) {
  
	// generate random number
	var num = Math.floor(Math.random() * 9) + 1;

	pool.query('SELECT name FROM inzodex WHERE id = ' + num, function(error, rows) {
		if (error) throw error

		// debug
		console.log(num);

		// grab pokemon name to pass to view
		var pokemon = rows[0].name;

		// send query results to client
		res.render('index', {title: 'inzodex', nameResult: pokemon});
  	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// exports
module.exports = pool;
module.exports = app;