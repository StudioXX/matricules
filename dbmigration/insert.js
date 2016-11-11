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
    fs.readFile('fullarchives.json', 'utf8', (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      db.collection('documents').insert(json, (error, result) => {
        if (error) {
          console.log('error');
          db.close();
          process.exit();
        } else {
          console.log('success');
          db.close();
          process.exit();
        }
      });
    });
  }
});
