const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
require('./models/Tournament');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');
const expressWinston = require('express-winston');

const tournaments = require('./routes/tournaments');
const users = require('./routes/users');
const seedData = require('./routes/seedData');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// request logging
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  msg: 'HTTP {{req.method}} {{req.url}}'
}));

app.use('/api/tournaments', tournaments);
app.use('/api/seed/seedData', seedData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error logging

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json('An error occurred while attempting to process your request. ' + res.locals.error);
});

module.exports = app;
