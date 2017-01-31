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

        // keywords = keywords.concat(toptermwords);
        

        // keywords.forEach((keyword) => {
        //   if (keyword[0] === ' ') {
        //     keyword = keyword.substring(1);
        //   }
        // })

        // for (let i = 0; i < keywords.length; i += 1) {
        //   if (keywords[i][0] === " ") {
        //     console.log(keywords[i])
        //     keywords[i] = keywords[i].substring(1);
        //   }
        // }

        // doc.keywords = keywords;

        // insert participants
        const people = nlp.text(doc.bodyenglish).people();
        const names = people.map((person) => person.text);
        doc.participants = names;

        // replace HTML entities
        // doc.bodyfrench = doc.bodyfrench.replace('&eacute;', 'é');
        // doc.bodyenglish = doc.bodyenglish.replace('&Eacute;', 'É');
        // doc.bodyenglish = doc.bodyenglish.replace('&agrave;', 'à');
        // doc.bodyenglish = doc.bodyenglish.replace('&rsquo;', "'");
        // doc.bodyenglish = doc.bodyenglish.replace('&nbsp;', ' ');
        
        // doc.bodyenglish = entities.decode(doc.bodyenglish);

        // remove HTML
        // doc.bodyenglish = doc.bodyenglish.replace(/<(?:.|\n)*?>/gm, '');

        db.collection('events').save(doc);
    });
  }
});
