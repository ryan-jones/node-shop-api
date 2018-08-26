const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const indexRouter = require('./routes');
const errorTypes = require('./core/errors/errors');
const ErrorHandler = require('./core/errors/error-handler');
const db = require('./core/database');
require('./schemas');

db();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
    res.status(200).json({})
  }
  next();
})
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))

app.use('/api', indexRouter);

// Handle unknown endpoints
app.use((req, res, next) => {
	next(errorTypes.notFound('Unknown endpoint'));
});

// Handle All other API errors
app.use(ErrorHandler);

module.exports = app;
