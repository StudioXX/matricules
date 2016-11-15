const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const url = 'mongodb://studio:studio@ds151117.mlab.com:51117/matricules';

let db;

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 3000, () => {
    console.log('howison 3000');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post('/documents', (req, res) => {
  console.log(req.body);
  let searchparams = {};
  if (req.body.keyword !== 'all') {
    searchparams.keywords = req.body.keyword;
  }
  if (req.body.year !== 'all') {
    const year = req.body.year;
    const start = new Date(year, 1, 1);
    const end = new Date(year, 12, 31);
    searchparams.date = { $gte: start, $lt: end, };
  }
  console.log(searchparams);
  db.collection('documents').find(searchparams).sort({ date: -1, }).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

app.get('/getalldocs', (req, res) => {
  db.collection('documents').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

