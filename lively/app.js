const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const drugsRouter = require('./routes/drugs');
const activitiesRouter = require('./routes/activities');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist')));

app.use(session({ secret: 'super-secret-password', saveUninitialized: false, resave: true }));

app.use('/', indexRouter);
app.use('/api/activities', activitiesRouter)
app.use('/api/drugs', drugsRouter);

module.exports = app;
