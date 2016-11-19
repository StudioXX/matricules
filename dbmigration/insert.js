// this helper is used to initially populate the mongo db

const fs = require('fs');
const mongodb = require('mongodb');
const express = require('express');
const path = require('path');

const app = express();

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://studio:studio@ds151117.mlab.com:51117/matricules';

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    // this converts our date field in db to ISOdate objects for mongodb
    // db.collection('documents').find({}).forEach(function(doc) { 
    // doc.date=new Date(doc.date * 1000);
    // console.log(doc.date);
    // db.collection('documents').save(doc); 
    // })

    // fix bad date fields
    // db.collection('documents').update({'accession_number':'2008EVS70607P'}, {$set: {date : new Date('May 1 2008')}}, {w:1}, function(err, result){
    // console.log(result);
    // });
    
    // this converts our keywords into an array
    // db.collection('documents').find().forEach(function(doc) {
    //   if (doc.keywords !== null && doc.keywords.constructor === String) {
    //     // console.log(doc.keywords);
    //     doc.keywords = doc.keywords.split(',');
    //     db.collection('documents').save(doc);
    //   }
    // });

    // remove HTML
    db.collection('documents').find().forEach(function(doc) {
      if (doc.field_content_description_value !== null) {
        doc.field_content_description_value = doc.field_content_description_value.replace(/<(?:.|\n)*?>/gm, '');
        // console.log(doc.field_content_description_value);
        db.collection('documents').save(doc);
      }
    });

    // this inserts our JSON file into the db
    // fs.readFile('fullarchives.json', 'utf8', (err, data) => {
    //   if (err) throw err;
    //   const json = JSON.parse(data);
    //   db.collection('documents').drop();
    //   db.collection('documents').insert(json, (error, result) => {
    //     if (error) {
    //       console.log('error');
    //       db.close();
    //       process.exit();
    //     } else {
    //       console.log('success');
    //       db.close();
    //       process.exit();
    //     }
    //   });
    // });
  }
});
