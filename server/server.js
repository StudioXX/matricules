const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const config = require('../config/config');
const db = require('./db');

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());

// our logger settings
if (config.env === 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger(config.morgan_log_level));
}

// connect to db
db.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Connected to db`);
  }
});

// handle API Router
const apiRouter = express.Router();

apiRouter.use('/documents', require('./documents/documents'));

apiRouter.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// connect our api router to our main app
app.use('/api', apiRouter);

module.exports = { app, server, };
