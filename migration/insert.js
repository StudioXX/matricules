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
    //   if (doc.links !== null && doc.links.constructor === Array) {
    //     doc.links = doc.links.join()
    //     console.log(doc.links);
    //     db.collection('documents').save(doc);
    //   }
    // });

    // convert characters
    // db.collection('documents').find().forEach(function(doc) {
    //   if (typeof doc.description === 'string') {
    //     doc.description = doc.description.replace('&eacute;', 'é');
    //     doc.description = doc.description.replace('&Eacute;', 'É');
    //     doc.description = doc.description.replace('&agrave;', 'à');
    //     doc.description = doc.description.replace('<p>', '');
    //     doc.description = doc.description.replace('</p>', '');
    //   }

    //   if (typeof doc.description_fr === 'string') {
    //     doc.description_fr = doc.description_fr.replace('&eacute;', 'é');
    //     doc.description_fr = doc.description_fr.replace('&Eacute;', 'É');
    //     doc.description_fr = doc.description_fr.replace('&agrave;', 'à');
    //     doc.description_fr = doc.description_fr.replace('<p>', '');
    //     doc.description_fr = doc.description_fr.replace('</p>', '');
    //   }

    //   if (typeof doc.sujet === 'string') {
    //     doc.sujet = doc.sujet.replace('&eacute;', 'é');
    //     doc.sujet = doc.sujet.replace('&Eacute;', 'É');
    //     doc.sujet = doc.sujet.replace('&agrave;', 'à');
    //     doc.sujet = doc.sujet.replace('<p>', '');
    //     doc.sujet = doc.sujet.replace('</p>', '');
    //   }

    //   if (typeof doc.sujet_fr === 'string') {
    //     doc.sujet_fr = doc.sujet_fr.replace('&eacute;', 'é');
    //     doc.sujet_fr = doc.sujet_fr.replace('&Eacute;', 'É');
    //     doc.sujet_fr = doc.sujet_fr.replace('&agrave;', 'à');
    //     doc.sujet_fr = doc.sujet_fr.replace('<p>', '');
    //     doc.sujet_fr = doc.sujet_fr.replace('</p>', '');
    //   }

    //   if (typeof doc.notes === 'string') {
    //     doc.notes = doc.notes.replace('&eacute;', 'é');
    //     doc.notes = doc.notes.replace('&Eacute;', 'É');
    //     doc.notes = doc.notes.replace('&agrave;', 'à');
    //     doc.notes = doc.notes.replace('<p>', '');
    //     doc.notes = doc.notes.replace('</p>', '');
    //   }

    //   db.collection('documents').save(doc);
    // });

    // insert null fields
    db.collection('documents').find().forEach(function(doc) {
      if (doc.sujet_fr === undefined) {
        doc.sujet_fr = '';
        db.collection('documents').save(doc);
      }
    });

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

    // // split notes
    // db.collection('documents').find().forEach(function(doc) {
    //     doc.notes = doc.notes.toString();
    //     db.collection('documents').save(doc);
    // });

    // rename fields
  //   db.collection('documents').updateMany( {}, {$rename:{'field_content_description_value': 'description', 'field_sujet_value': 'sujet',
  //  'field_physical_description_value': 'physical_description', 'field_content_description_french': 'description_fr', 'field_sujet_french': 'sujet_fr'} } )
  // //   db.collection('documents').update({}, { $rename: { 'formed_title': 'title', 'field_content_description_value': 'description', 'field_sujet_value': 'sujet',
  // //  'field_physical_description_value': 'physical_description', 'field_content_description_french': 'description_fr', 'field_sujet_french': 'sujet_fr',
  // // } }, false, true);

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
