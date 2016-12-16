const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const config = require('../config/config');
const secret = require('../config/secret');
const db = require('./db').connect(secret.mongo);

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'media')));
app.use(cors());

// our logger settings
if (config.env === 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger(config.morgan_log_level));
}

// handle API Router
const apiRouter = express.Router();

apiRouter.use('/documents', require('./documents/documents'));
apiRouter.use('/document', require('./document/document'));

apiRouter.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// connect our api router to our main app
app.use('/api', apiRouter);

app.all('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});

apiRouter.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/auth', require('./auth/auth'));

app.all('/auth', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
 });


module.exports = { app, server, };
