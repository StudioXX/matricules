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
    // db.collection('documents').find().forEach(function(doc) {
    //   if (doc.sujet_fr === undefined) {
    //     doc.sujet_fr = '';
    //     db.collection('documents').save(doc);
    //   }
    // });

    // find duplicates
    // db.collection('documents').aggregate(
    //   {"$group" : { "_id": "$accession_number", "count": { "$sum": 1 }, "docs": {$push: "$accession_number"} }, },
    //   {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, function(err, result) {console.log(result)}
    // )

    // create folders
    // db.collection('documents').find().forEach(function(doc) {
    //   const filespath = doc.accession_number;
    //   console.log(number);
    //   fs.mkdirSync(`./server/media/${number}`);
    // });

  // FILE TYPES
  //   [ '.mpg',
  // '.JPG',
  // '.jpg',
  // '.mp3',
  // '',
  // '.jpeg',
  // '.gif',
  // '.sb-b08a6466-3VgJYt',
  // '.sb-b08a6466-v1OkyM',
  // '.txt',
  // '.sb-4c46bb26-MHQE65',
  // '.sb-4c46bb26-NYkQSZ',
  // '.sb-4c46bb26-tF4w57',
  // '.sb-4c46bb26-OuAjS4',
  // '.tif',
  // '.pdf',
  // '.mp4',
  // '.MOV',
  // '.eps',
  // '.ai',
  // '.indd',
  // '.png',
  // '.docx',
  // '.DS_Store',
  // '.CR2',
  // '.zip' ]

    // create file lists
    // const imgexts = ['.JPG', '.jpg', '.jpeg', '.gif', '.tif', '.png'];
    // db.collection('documents').find().forEach(function(doc) {
    //   const folderpath = `./server/media/${doc.accession_number}`;
    //   let images = [];
    //   fs.readdirSync(folderpath).map(function (file) {
    //     if (imgexts.indexOf(path.extname(file)) > -1) {
    //       // fs.unlink(`./server/media/${doc.accession_number}/${file}`);
    //       // console.log(`./server/media/${doc.accession_number}/${file}`);
    //       images.push(file);
    //     }
    //   });
    //   doc.images = images;
    //   db.collection('documents').save(doc);
    // });

    // do same for audio
    const imgexts = ['.JPG', '.jpg', '.jpeg', '.gif', '.tif', '.png'];
    db.collection('documents').find().forEach(function(doc) {
      const folderpath = `./server/media/${doc.accession_number}`;
      let audio = [];
      fs.readdirSync(folderpath).map(function (file) {
        if ((path.extname(file) === '.mp3') > -1) {
          // fs.unlink(`./server/media/${doc.accession_number}/${file}`);
          // console.log(`./server/media/${doc.accession_number}/${file}`);
          audio.push(file);
        }
      });
      doc.audio = audio;
      db.collection('documents').save(doc);
    });




    // fix dates
    // db.collection('documents').find().forEach(function(doc) {
    //     doc.date = new Date(doc.date);
    //     db.collection('documents').save(doc);
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

    // // split notes
    // db.collection('documents').find().forEach(function(doc) {
    //     doc.notes = doc.notes.toString();
    //     db.collection('documents').save(doc);
    // });

        // // create media fields
    // db.collection('documents').find().forEach(function(doc) {
    //   doc.videos = [];
    //   doc.photos = [];
    //   doc.audio = [];
    //   doc.otherfiles = [];
    //   db.collection('documents').save(doc);
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
