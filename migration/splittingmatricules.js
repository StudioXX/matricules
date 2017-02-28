// this helper is used to initially populate the mongo db

const fs = require('fs');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://studio:studio@ds151117.mlab.com:51117/matricules';

const keywordsmap = JSON.parse(fs.readFileSync('./keywordsmap.json', 'utf8'));

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // operate on events
    db.collection('documents').find().forEach(function(doc) {
        doc.keywordsenglish = [];
        doc.keywordsfrench = [];
        doc.keywords.forEach((keyword) => {
            keywordsmap.forEach((map) => {
              if (map.synonymes.includes(keyword) || map.french === keyword) {
                  if (map.englishkeywordid) {
                    doc.keywordsenglish.push(map.englishkeywordid);
                  }
                  if (map.frenchkeywordid) {
                    doc.keywordsfrench.push(map.frenchkeywordid);
                  }
              }
            });
        });
        console.log(doc.keywordsenglish);
        console.log(doc.keywordsfrench);
        db.collection('documents').save(doc);
    });
  }
});
