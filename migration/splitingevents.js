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

const formationmap = [
	{
		"term_id": 2320,
    "english": 2321,
		"name": "Activités éducatives",
	},
	{
		"term_id": 2319,
    "english": 2322,
		"name": "Ateliers",
	}
]

const pubmap = [
	{
		"term_id": 2332,
    "english": 2334,
		"name": "Appel"
	},
	{
		"term_id": 2331,
    "english": 2335,
		"name": "Bulletin",
	},
	{
		"term_id": 2333,
    "english": 2336,
		"name": "Offre"
	}
]


MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // operate on events
    db.collection('publications').find().forEach(function(doc) {
      doc.eventtypeenglish = [];
      doc.eventtypefrench = [];
      if (doc.keywords.includes('bulletin') || doc.keywords.includes('newsletter') || doc.keywords.includes('Bulletin du Studio XX') || doc.keywords.includes('annonces') || doc.keywords.includes('annoncement')) {
          doc.eventtypeenglish.push(2335);
          doc.eventtypefrench.push(2331);
        } else if (doc.bodyenglish && (doc.bodyenglish.includes('bulletin') || doc.bodyenglish.includes('newsletter') || doc.bodyenglish.includes('Bulletin du Studio XX') || doc.bodyenglish.includes('annonces') || doc.bodyenglish.includes('annoncement'))) {
          doc.eventtypeenglish.push(2335);
          doc.eventtypefrench.push(2331);
        } else if (doc.bodyfrench && (doc.bodyfrench.includes('bulletin') || doc.bodyfrench.includes('newsletter') || doc.bodyfrench.includes('Bulletin du Studio XX') || doc.bodyfrench.includes('annonces') || doc.bodyfrench.includes('annoncement'))) {
          doc.eventtypeenglish.push(2335);
          doc.eventtypefrench.push(2331);
        } else if (doc.keywords.includes('call') || doc.keywords.includes('appel') || doc.keywords.includes('submission')) {
          doc.eventtypeenglish.push(2334);
          doc.eventtypefrench.push(2332);
        } else if (doc.bodyenglish && (doc.bodyenglish.includes('call for') || doc.bodyenglish.includes('appel de') || doc.bodyenglish.includes('submissions'))) {
          doc.eventtypeenglish.push(2334);
          doc.eventtypefrench.push(2332);
        } else if (doc.bodyfrench && (doc.bodyfrench.includes('call for') || doc.bodyfrench.includes('appel de') || doc.bodyfrench.includes('submissions'))) {
          doc.eventtypeenglish.push(2334);
          doc.eventtypefrench.push(2332);
        } else if (doc.keywords.includes('offer') || doc.keywords.includes('job') || doc.keywords.includes('employment') || doc.keywords.includes('offre') || doc.keywords.includes('internship')) {
          doc.eventtypeenglish.push(2336);
          doc.eventtypefrench.push(2333);
        } else if (doc.bodyenglish && (doc.bodyenglish.includes('offer') || doc.bodyenglish.includes('job') || doc.bodyenglish.includes('employment') || doc.bodyenglish.includes('offre') || doc.bodyenglish.includes('internship'))) {
          doc.eventtypeenglish.push(2336);
          doc.eventtypefrench.push(2333);
        } else if (doc.bodyfrench && (doc.bodyfrench.includes('offer') || doc.bodyfrench.includes('job') || doc.bodyfrench.includes('employment') || doc.bodyfrench.includes('offre') || doc.bodyfrench.includes('internship'))) {
          doc.eventtypeenglish.push(2336);
          doc.eventtypefrench.push(2333);
        }
        db.collection('publications').save(doc);
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






// doc.eventtypeenglish = [];
//       doc.eventtypefrench = [];
//       if (doc.keywords.includes('education') || doc.keywords.includes('educational activities') || doc.keywords.includes('activités éducatives') || doc.keywords.includes('xxmediation') || doc.keywords.includes('mediation') || doc.keywords.includes('médiation')) {
//           doc.eventtypeenglish.push(2321);
//           doc.eventtypefrench.push(2320);
//         } else if (doc.bodyenglish && (doc.bodyenglish.includes('education') || doc.bodyenglish.includes('educational activities') || doc.bodyenglish.includes('activités éducatives') || doc.bodyenglish.includes('xxmediation') || doc.bodyenglish.includes('mediation') || doc.bodyenglish.includes('médiation'))) {
//           doc.eventtypeenglish.push(2321);
//           doc.eventtypefrench.push(2320);
//         } else if (doc.bodyfrench && (doc.bodyfrench.includes('education') || doc.bodyfrench.includes('educational activities') || doc.bodyfrench.includes('activités éducatives') || doc.bodyenglish.includes('xxmediation') || doc.bodyfrench.includes('mediation') || doc.bodyfrench.includes('médiation'))) {
//           doc.eventtypeenglish.push(2321);
//           doc.eventtypefrench.push(2320);
//         }  else {
//           doc.eventtypeenglish.push(2322);
//           doc.eventtypefrench.push(2319);
//         }
//         db.collection('formations').save(doc);




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