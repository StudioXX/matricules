const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({ extended: true, }));
app.use(express.static(path.resolve(__dirname, 'public')));

const url = 'mongodb://studio:studio@ds151117.mlab.com:51117/matricules';

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('nowison 3000');
});



