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

const query = `SELECT node.vid,content_type_content_document.field_title_value as name,node.title,keywordsmap.name as keywords,mediums.medium,from_unixtime(content_type_content_document.field_date_value) as date
FROM node 
LEFT OUTER JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN content_type_content_document on content_type_content_document.vid=node.vid
JOIN (SELECT term_node.tid,term_data.name as medium,term_node.vid as documentID,vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium') as mediums on mediums.documentID=node.vid
WHERE node.type='content_document';`

connection.query(query, function(err, rows, fields) {
  if (err) throw err;
  var file = 'fullarchives.json'
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
