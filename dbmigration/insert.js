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

    // split languages in description
    // db.collection('documents').find().forEach(function(doc) {
    //   if (doc.field_content_description_value !== null && doc.field_content_description_value.indexOf('== en ==') > -1) {
    //     console.log('we fix this one');
    //     const splitted = doc.field_content_description_value.replace('== fr ==', '').split('== en ==');
    //     doc.field_content_description_value = splitted[1];
    //     doc.field_content_description_french = splitted[0];
    //     db.collection('documents').save(doc);
    //   }
    // });

    // split notes
    // db.collection('documents').find().forEach(function(doc) {
    //   if (typeof doc.notes === 'string'){
    //     console.log('fixing');
    //     const splitted = doc.notes.split('+');
    //     let notes = []
    //     for (let i = 0; i < splitted.length; i += 1) {
    //       if (splitted[i] !== '') {
    //         notes.push(splitted[i]);
    //       }
    //     }
    //     doc.notes = notes;
    //     db.collection('documents').save(doc);
    //   }
    // });

    // rename fields
    db.collection('documents').updateMany( {}, {$rename:{'field_content_description_value': 'description', 'field_sujet_value': 'sujet',
   'field_physical_description_value': 'physical_description', 'field_content_description_french': 'description_fr', 'field_sujet_french': 'sujet_fr'} } )
  //   db.collection('documents').update({}, { $rename: { 'formed_title': 'title', 'field_content_description_value': 'description', 'field_sujet_value': 'sujet',
  //  'field_physical_description_value': 'physical_description', 'field_content_description_french': 'description_fr', 'field_sujet_french': 'sujet_fr',
  // } }, false, true);

    // remove HTML
    // db.collection('documents').find().forEach(function(doc) {
    //   if (doc.notes_french !== null) {
    //     doc.notes_french = doc.notes_french.replace(/<(?:.|\n)*?>/gm, '');
    //     // console.log(doc.field_content_description_value);
    //     db.collection('documents').save(doc);
    //   }
    // });

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
