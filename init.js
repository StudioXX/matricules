const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({ extended: true, }));
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

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// app.get('/documents', (req, res) => {
//   db.collection('documents').find.toArray((err, result) => {
//     if (err) return console.log(err);
//     // renders index.ejs
//     res.send(result);
//   });
// });

