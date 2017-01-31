// this file queries the old matricules db (or a copy of it) and outputs to JSON

const express = require ('express');
const mysql = require ('mysql');
const jsonfile = require('jsonfile');

const app = express();

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'matricules',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' 
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

const query = `SELECT * FROM keywordseventsprogram`

connection.query(query, function(err, rows, fields) {
  if (err) throw err;
  var file = 'keywordseventsprogram.json'
  let allitems = [];
  for (i=0; i<rows.length; i++) {
      const string=JSON.stringify(rows[i]);
      const json =  JSON.parse(string);
      allitems.push(json);
  }
  jsonfile.writeFile(file, allitems, function (err) {
  console.error(err)
  return;
})
});


app.get('/', function (req, res) {
  res.sendfile('fullarchives.json')
});

app.listen(3000, function () {
  console.log('listening on port 3000')
})
