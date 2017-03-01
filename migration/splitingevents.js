const mongodb = require('mongodb');
const fs = require('fs');
const jsonfile = require('jsonfile');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://conan:conan@ds127389.mlab.com:27389/matriculesevents';

const eventtypemap = [
	{
		"term_id": 2341,
    "termenglish": 2342,
		"name": "Autre",
	},
	{
		"term_id": 2323,
    "termenglish": 2327,
		"name": "Discussion",
	},
	{
		"term_id": 2325,
    "termenglish": 2328,
		"name": "Exposition",
	},
	{
		"term_id": 2324,
    "termenglish": 2329,
		"name": "Performance",
	},
	{
		"term_id": 2326,
    "termenglish": 2330,
		"name": "Présentation",
  }
];

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // operate on events
    db.collection('realevents').find().forEach(function(doc) {
      doc.eventtypeenglish = [];
      doc.eventtypefrench = [];
      if (doc.keywords.includes('expositions') || doc.keywords.includes('exhibitions') || doc.keywords.includes('exhibition') || doc.keywords.includes('exhibit')) {
          doc.eventtypeenglish.push(2328);
          doc.eventtypefrench.push(2325);
        } else if (doc.bodyenglish && (doc.bodyenglish.includes('presentation') || doc.bodyenglish.includes('presentations') || doc.bodyenglish.includes('conference') || doc.bodyenglish.includes('conférence') || doc.bodyenglish.includes('présentations') || doc.bodyenglish.includes('demonstration') || doc.bodyenglish.includes('artist talk'))) {
          doc.eventtypeenglish.push(2328);
          doc.eventtypefrench.push(2325);
        } else if (doc.bodyfrench && (doc.bodyfrench.includes('presentation') || doc.bodyfrench.includes('presentations') || doc.bodyfrench.includes('conference') || doc.bodyfrench.includes('conférence') || doc.bodyfrench.includes('présentations') || doc.bodyfrench.includes('demonstration') || doc.bodyfrench.includes('artist talk'))) {
          doc.eventtypeenglish.push(2328);
          doc.eventtypefrench.push(2325);
        } else if (doc.keywords.includes('discussions') || doc.keywords.includes('table ronde') || doc.keywords.includes('round table') || doc.keywords.includes('panel') || doc.keywords.includes('colloque') || doc.keywords.includes('debates')) {
          doc.eventtypeenglish.push(2327);
          doc.eventtypefrench.push(2323);
        } else if (doc.bodyenglish && (doc.bodyenglish.includes('discussions')|| doc.bodyenglish.includes('round table') || doc.bodyenglish.includes('panel') || doc.keywords.includes('debates'))) {
          doc.eventtypeenglish.push(2327);
          doc.eventtypefrench.push(2323);
        }  else if (doc.bodyfrench && (doc.bodyfrench.includes('discussion') || doc.bodyfrench.includes('table ronde') || doc.bodyfrench.includes('colloque'))) {
          doc.eventtypeenglish.push(2327);
          doc.eventtypefrench.push(2323);
        } else if (doc.keywords.includes('performance') || doc.keywords.includes('performances')) {
          doc.eventtypeenglish.push(2329);
          doc.eventtypefrench.push(2324);
        } else if (doc.bodyenglish && doc.bodyenglish.includes('performance')) {
          doc.eventtypeenglish.push(2329);
          doc.eventtypefrench.push(2324);
        } else if (doc.bodyfrench && doc.bodyfrench.includes('performance')) {
          doc.eventtypeenglish.push(2329);
          doc.eventtypefrench.push(2324);
        }  else if (doc.keywords.includes('presentation') || doc.keywords.includes('presentations') || doc.keywords.includes('conference') || doc.keywords.includes('conférence') || doc.keywords.includes('présentations') || doc.keywords.includes('demonstration') || doc.keywords.includes('artist talk')) {
          doc.eventtypeenglish.push(2330);
          doc.eventtypefrench.push(2326);
        } else if (doc.bodyenglish && (doc.bodyenglish.includes('presentation') || doc.bodyenglish.includes('presentations') || doc.bodyenglish.includes('conference') || doc.bodyenglish.includes('conférence') || doc.bodyenglish.includes('présentations') || doc.bodyenglish.includes('demonstration') || doc.bodyenglish.includes('artist talk'))) {
          doc.eventtypeenglish.push(2330);
          doc.eventtypefrench.push(2326);
        } else if (doc.bodyfrench && (doc.bodyfrench.includes('presentation') || doc.bodyfrench.includes('presentations') || doc.bodyfrench.includes('conference') || doc.bodyfrench.includes('conférence') || doc.bodyfrench.includes('présentations') || doc.bodyfrench.includes('demonstration') || doc.bodyfrench.includes('artist talk'))) {
          doc.eventtypeenglish.push(2330);
          doc.eventtypefrench.push(2326);
        } else {
          doc.eventtypeenglish.push(2342);
          doc.eventtypefrench.push(2341);
        }
        db.collection('realevents').save(doc);
    });
  }
});



// if (doc.category === 'COP' || doc.category === 'EVS' || doc.category === 'FBR' || doc.category === 'PRS') {
//           db.collection('realevents').save(doc);
//         } else if (doc.category === 'ADM' || doc.category === 'PUB') {
//           db.collection('publications').save(doc);
//         } else if (doc.category === 'FOR') {
//           db.collection('formations').save(doc);
//         } else if (doc.bodyenglish && doc.bodyenglish.toLowerCase().includes('workshop')) {
//           db.collection('formations').save(doc);
//         } else if (doc.bodyfrench && doc.bodyfrench.toLowerCase().includes('atelier')) {
//           db.collection('formations').save(doc);
//         } else {
//           db.collection('realevents').save(doc);
//         }








// doc.specialprojectstaxenglish = [];
//         doc.specialprojectstaxfrench = [];
//         if (doc.bodyenglish !== null && doc.bodyenglish.toLowerCase().includes('htmlles')) {
//           doc.specialprojectstaxenglish.push(2340);
//           doc.specialprojectstaxfrench.push(2337);
//         }
//         if (doc.bodyfrench !== null && doc.bodyfrench.toLowerCase().includes('htmlles')) {
//           doc.specialprojectstaxenglish.push(2340);
//           doc.specialprojectstaxfrench.push(2337);
//         }

//         if (doc.bodyenglish !== null && doc.bodyenglish.toLowerCase().includes('residency')) {
//           doc.specialprojectstaxenglish.push(2339);
//           doc.specialprojectstaxfrench.push(2338);
//         }
//         if (doc.bodyfrench !== null && doc.bodyfrench.toLowerCase().includes('résidence')) {
//           doc.specialprojectstaxenglish.push(2339);
//           doc.specialprojectstaxfrench.push(2338);
//         }