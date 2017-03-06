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
const url = 'mongodb://conan:conan@ds153239.mlab.com:53239/matriculesparticipants';

const keywordsmap = JSON.parse(fs.readFileSync('./newkeywordsmap.json', 'utf8'));

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);


    // const events = JSON.parse(fs.readFileSync('events.json', 'utf8'));
    // console.log(events);


    // this converts our date field in db to ISOdate objects for mongodb
    // db.collection('documents').find({}).forEach(function(doc) { 
    // doc.date=new Date(doc.date * 1000);
    // console.log(doc.date);
    // db.collection('documents').save(doc); 
    // })


    // operate on events
    db.collection('participants').find().forEach(function(doc) {

      doc.keywordsenglish = [];
      doc.keywordsfrench = [];
      doc.keywords.forEach(keyword => {
        keywordsmap.forEach(map => {
          if (keyword === map.french || keyword === map.english || map.synonymes.includes(keyword)) {
            doc.keywordsenglish.push(map.englishid)
            doc.keywordsfrench.push(map.frenchid)
          }
        })
      })

        // let matricules = [];
        // const name = doc.titleenglish;
        // for (i = 0; i < events.length; i++) {
        //     if (events[i].participants.includes(name)) {
        //         matricules = matricules.concat(events[i].allmatricules)
        //     }
        // }
        // doc.matricules = matricules;
        // let keywords = doc.keywords || [];
        // keywords = keywords.split(",");

        // // insert keywords
        // const TfIdf = natural.TfIdf;
        // const tfidf = new TfIdf();
        // tfidf.addDocument(doc.bodyenglish);
        // const topterms = tfidf.listTerms(0).slice(0, 5);
        // const toptermwords = topterms.map((word) => word.term);
        // doc.keywords = doc.keywords.concat(toptermwords);
       
        // if (!Array.isArray(doc.keywords)) {
        //   doc.keywords = doc.keywords.split(", ");
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

        // const uniqueArray = doc.keywords.filter(function(item, pos, self) {
        //     return self.indexOf(item) == pos;
        // })

        // doc.keywords = uniqueArray;

        db.collection('participants').save(doc);
    });
  }
});
