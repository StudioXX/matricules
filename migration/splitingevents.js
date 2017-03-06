const mongodb = require('mongodb');
const fs = require('fs');
const jsonfile = require('jsonfile');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://conan:conan@ds127389.mlab.com:27389/matriculesevents';

const eventtypemap = [
	{
		"term_id": 564,
    "termenglish": 565,
		"name": "Autre",
	},
	{
		"term_id": 518,
    "termenglish": 543,
		"name": "Discussion",
	},
	{
		"term_id": 520,
    "termenglish": 545,
		"name": "Exposition",
	},
	{
		"term_id": 519,
    "termenglish": 544,
		"name": "Performance",
	},
	{
		"term_id": 521,
    "termenglish": 546,
		"name": "Présentation",
  }
];

const formationmap = [
	{
		"term_id": 537,
    "english": 541,
		"name": "Activités éducatives",
	},
	{
		"term_id": 536,
    "english": 542,
		"name": "Ateliers",
	}
]

const pubmap = [
	{
		"term_id": 539,
    "english": 548,
		"name": "Appel"
	},
	{
		"term_id": 538,
    "english": 547,
		"name": "Bulletin",
	},
	{
		"term_id": 540,
    "english": 549,
		"name": "Offre"
	}
]

const keywordsmap = JSON.parse(fs.readFileSync('./newkeywordsmap.json', 'utf8'));

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // operate on events
    db.collection('realevents').find().forEach(function(doc) {
      doc.specialprojectstaxenglish = [];
        doc.specialprojectstaxfrench = [];
        if (doc.bodyenglish !== null && doc.bodyenglish.toLowerCase().includes('htmlles')) {
          doc.specialprojectstaxenglish.push(562);
          doc.specialprojectstaxfrench.push(523);
        }
        if (doc.bodyfrench !== null && doc.bodyfrench.toLowerCase().includes('htmlles')) {
          doc.specialprojectstaxenglish.push(562);
          doc.specialprojectstaxfrench.push(523);
        }

        if (doc.bodyenglish !== null && doc.bodyenglish.toLowerCase().includes('residency')) {
          doc.specialprojectstaxenglish.push(563);
          doc.specialprojectstaxfrench.push(522);
        }
        if (doc.bodyfrench !== null && doc.bodyfrench.toLowerCase().includes('résidence')) {
          doc.specialprojectstaxenglish.push(563);
          doc.specialprojectstaxfrench.push(522);
        }

      doc.eventtypeenglish = [];
      doc.eventtypefrench = [];
      // if (doc.keywords.includes('realevents') || doc.keywords.includes('educational activities') || doc.keywords.includes('activités éducatives') || doc.keywords.includes('xxmediation') || doc.keywords.includes('mediation') || doc.keywords.includes('médiation')) {
      //     doc.eventtypeenglish.push(541);
      //     doc.eventtypefrench.push(537);
      //   } else if (doc.bodyenglish && (doc.bodyenglish.includes('education') || doc.bodyenglish.includes('educational activities') || doc.bodyenglish.includes('activités éducatives') || doc.bodyenglish.includes('xxmediation') || doc.bodyenglish.includes('mediation') || doc.bodyenglish.includes('médiation'))) {
      //     doc.eventtypeenglish.push(541);
      //     doc.eventtypefrench.push(537);
      //   } else if (doc.bodyfrench && (doc.bodyfrench.includes('education') || doc.bodyfrench.includes('educational activities') || doc.bodyfrench.includes('activités éducatives') || doc.bodyenglish.includes('xxmediation') || doc.bodyfrench.includes('mediation') || doc.bodyfrench.includes('médiation'))) {
      //     doc.eventtypeenglish.push(541);
      //     doc.eventtypefrench.push(537);
      //   }  else {
      //     doc.eventtypeenglish.push(542);
      //     doc.eventtypefrench.push(536);
      //   }

      if (doc.keywords.includes('discussion') || doc.bodyfrench.toLowerCase().includes('discussion') || doc.bodyenglish.toLowerCase().includes('discussion')) {
          doc.eventtypeenglish.push(543);
          doc.eventtypefrench.push(518);
        } else if (doc.keywords.includes('exposition') || doc.bodyfrench.toLowerCase().includes('exposition') || doc.bodyenglish.toLowerCase().includes('exposition')) {
          doc.eventtypeenglish.push(545);
          doc.eventtypefrench.push(520);
        } else if (doc.keywords.includes('performance') || doc.bodyfrench.toLowerCase().includes('performance') || doc.bodyenglish.toLowerCase().includes('performance')) {
          doc.eventtypeenglish.push(544);
          doc.eventtypefrench.push(519);
        } else if (doc.keywords.includes('présentation') || doc.bodyfrench.toLowerCase().includes('présentation') || doc.bodyenglish.toLowerCase().includes('présentation')) {
          doc.eventtypeenglish.push(546);
          doc.eventtypefrench.push(521);
        } else {
          doc.eventtypeenglish.push(565);
          doc.eventtypefrench.push(564);
        }
      
      // doc.eventtypeenglish = [];
      // doc.eventtypefrench = [];
      // if (doc.keywords.includes('bulletin') || doc.keywords.includes('newsletter') || doc.keywords.includes('Bulletin du Studio XX') || doc.keywords.includes('annonces') || doc.keywords.includes('annoncement')) {
      //     doc.eventtypeenglish.push(547);
      //     doc.eventtypefrench.push(538);
      //   } else if (doc.bodyenglish && (doc.bodyenglish.includes('bulletin') || doc.bodyenglish.includes('newsletter') || doc.bodyenglish.includes('Bulletin du Studio XX') || doc.bodyenglish.includes('annonces') || doc.bodyenglish.includes('annoncement'))) {
      //     doc.eventtypeenglish.push(547);
      //     doc.eventtypefrench.push(538);
      //   } else if (doc.bodyfrench && (doc.bodyfrench.includes('bulletin') || doc.bodyfrench.includes('newsletter') || doc.bodyfrench.includes('Bulletin du Studio XX') || doc.bodyfrench.includes('annonces') || doc.bodyfrench.includes('annoncement'))) {
      //     doc.eventtypeenglish.push(547);
      //     doc.eventtypefrench.push(538);
      //   } else if (doc.keywords.includes('call') || doc.keywords.includes('appel') || doc.keywords.includes('submission')) {
      //     doc.eventtypeenglish.push(548);
      //     doc.eventtypefrench.push(539);
      //   } else if (doc.bodyenglish && (doc.bodyenglish.includes('call for') || doc.bodyenglish.includes('appel de') || doc.bodyenglish.includes('submissions'))) {
      //     doc.eventtypeenglish.push(548);
      //     doc.eventtypefrench.push(539);
      //   } else if (doc.bodyfrench && (doc.bodyfrench.includes('call for') || doc.bodyfrench.includes('appel de') || doc.bodyfrench.includes('submissions'))) {
      //     doc.eventtypeenglish.push(548);
      //     doc.eventtypefrench.push(539);
      //   } else if (doc.keywords.includes('offer') || doc.keywords.includes('job') || doc.keywords.includes('employment') || doc.keywords.includes('offre') || doc.keywords.includes('internship')) {
      //     doc.eventtypeenglish.push(548);
      //     doc.eventtypefrench.push(539);
      //   } else if (doc.bodyenglish && (doc.bodyenglish.includes('offer') || doc.bodyenglish.includes('job') || doc.bodyenglish.includes('employment') || doc.bodyenglish.includes('offre') || doc.bodyenglish.includes('internship'))) {
      //     doc.eventtypeenglish.push(549);
      //     doc.eventtypefrench.push(540);
      //   } else if (doc.bodyfrench && (doc.bodyfrench.includes('offer') || doc.bodyfrench.includes('job') || doc.bodyfrench.includes('employment') || doc.bodyfrench.includes('offre') || doc.bodyfrench.includes('internship'))) {
      //     doc.eventtypeenglish.push(549);
      //     doc.eventtypefrench.push(540);
      //   }
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