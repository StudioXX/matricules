// this helper is used to initially populate the mongo db

const fs = require('fs');
const mongodb = require('mongodb');
const express = require('express');
const path = require('path');
const natural = require('natural');
const nlp = require('nlp_compromise');
const Entities = require('html-entities').XmlEntities;

const app = express();

const entities = new Entities();

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://conan:conan@ds127389.mlab.com:27389/matriculesevents';

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // fs.readFile('eventsfinal.json', 'utf8', (err, data) => {
    //   if (err) throw err;
    //   const json = JSON.parse(data);
    //   db.collection('events').drop();
    //   db.collection('events').insert(json, (error, result) => {
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



    // this converts our date field in db to ISOdate objects for mongodb
    // db.collection('documents').find({}).forEach(function(doc) { 
    // doc.date=new Date(doc.date * 1000);
    // console.log(doc.date);
    // db.collection('documents').save(doc); 
    // })


    // operate on events
    db.collection('events').find().forEach(function(doc) {
        // let keywords = doc.keywords || [];
        // keywords = keywords.split(",");

        // // insert keywords
        // const TfIdf = natural.TfIdf;
        // const tfidf = new TfIdf();
        // tfidf.addDocument(doc.bodyenglish);
        // const topterms = tfidf.listTerms(0).slice(0, 5);
        // const toptermwords = topterms.map((word) => word.term);
        // doc.keywords = doc.keywords.concat(toptermwords);
        
        // if (!Array.isArray(doc.participants)) {
        //   doc.participants = doc.participants.split(", ");
        // }


        // if (doc.keywords === null) {
        //   doc.keywords = []
        // }
        
        
        // db.collection('events').save(doc);

        // insert participants

        // if (doc.participants === null) {
        //   doc.participants = []
        // }
        // const people = nlp.text(doc.bodyenglish).people();
        // const names = people.map((person) => person.text);
        // console.log(names);
        // doc.participants = doc.participants.concat(names);

        // replace HTML entities
        // doc.bodyfrench = doc.bodyfrench.replace('&eacute;', 'é');
        // doc.bodyenglish = doc.bodyenglish.replace('&Eacute;', 'É');
        // doc.bodyenglish = doc.bodyenglish.replace('&agrave;', 'à');
        // doc.bodyenglish = doc.bodyenglish.replace('&rsquo;', "'");
        // doc.bodyenglish = doc.bodyenglish.replace('&nbsp;', ' ');
        
        // doc.bodyenglish = entities.decode(doc.bodyenglish);

        // remove HTML
        // doc.bodyenglish = doc.bodyenglish.replace(/<(?:.|\n)*?>/gm, '');

        const uniqueArray = doc.allmatricules.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })

        doc.allmatricules = uniqueArray;

        // let audio;
        // if (doc.audio === null) {
        //   audio = []
        // } else {
        //   audio = doc.audio.split(", ");
        // }
      
        // let communiq;
        // if (doc.communiq === null) {
        //   communiq = []
        // } else {
        //   communiq = doc.communiq.split(", ");
        // }

        // let docs;
        // if (doc.docs === null) {
        //   docs = []
        // } else {
        //   docs = doc.docs.split(", ");
        // }

        // let gallery;
        // if (doc.gallery === null) {
        //   gallery = []
        // } else {
        //   gallery = doc.gallery.split(", ");
        // }

        // let program;
        // if (doc.program === null) {
        //   program = []
        // } else {
        //   program = doc.program.split(", ");
        // }

        // let videos;
        // if (doc.videos === null) {
        //   videos = []
        // } else {
        //   videos = doc.videos.split(", ");
        // }

        // const allmatricules = audio.concat(communiq, docs, gallery, program, videos);

        // doc.allmatricules = allmatricules;
        db.collection('events').save(doc);
    });
  }
});
