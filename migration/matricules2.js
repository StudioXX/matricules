// this helper is used to initially populate the mongo db

const fs = require('fs');
const mongodb = require('mongodb');
const express = require('express');
const path = require('path');

const app = express();

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://conan:conan@ds117919.mlab.com:17919/matricules2';

const keywords = ['action',
  'animation',
  'audio',
  'interactivité',
  // 'photo',
  // 'texte',
  // 'vidéo',
  // 'collage',
  // 'dessin',
  // 'imprimé',
  // 'vieillissement',
  // 'activisme',
  // 'agentivité',
  // 'affiche',
  // 'alphabétisation numérique',
  // 'anonymat',
  // 'archives',
  // 'art',
  // 'art sonore',
  // 'art web',
  // 'artisanat',
  // 'autochtone',
  // 'bien-être',
  // 'biohacking',
  // 'biotechnologie',
  'blogue',
  'corps',
  'capitalisme',
  'censure',
  'centre d’artistes autogéré',
  'collaboration',
  'connectivité',
  'conservation des données',
  'construction sociale',
  'consumérisme',
  'culture',
  'culture du viol',
  'culture pop',
  'cyberféminisme',
  'detournement',
  'diffusion',
  'numérique',
  'discours',
  'documentaire',
  'données',
  'égoportrait',
  'emale',
  'émancipation',
  'engagement',
  'environnement',
  'entraide',
  'espaces sécuritaires',
  'ethnoculturel',
  'exhibitionnisme',
  'exposition',
  'queer',
  'féminisme',
  'femme',
  'film',
  'gratuit',
  'culture',
  'futur passé',
  'genre',
  'piratage',
  'hacktivisme',
  'histoire',
  "histoire de l'art",
  'HTMlles',
  'humour',
  'identité',
  'image de soi',
  'immobilité',
  'inclusion',
  'installation',
  'Internet',
  'intervention',
  'intimité',
  'jeu',
  'LGBTQ',
  'liberté',
  'ludique',
  'manifeste',
  'masculinité',
  'Matricules',
  'médiation',
  'memes',
  'mémoire',
  'misogynie',
  'mode',
  'mouvements sociaux',
  'musique',
  'musique électronique',
  'art web',
  'nudité',
  'patriarcat',
  'pédagogie',
  'performance',
  'personnage',
  'personne de couleur',
  'poésie',
  'politique',
  'pornographie',
  'pouvoir',
  'préjugés',
  'queer',
  'racisme',
  'radio',
  'recyclage',
  'rédaction',
  'religion',
  'remix',
  'représentation',
  'réseaux sociaux',
  // 'résistance',
  // 'révolution',
  // 'risque',
  // 'robotique',
  // 'santé',
  // 'sexisme',
  // 'sexualité',
  // 'signal',
  // 'socialisme',
  // 'sociologie de l’art',
  // 'solidarité',
  // 'subjectivité',
  // 'subversion',
  // 'surveillance',
  // 'sociale',
  // 'survie',
  // 'technologie',
  // 'télévision',
  // 'textile',
  // 'transexuel',
  // 'transgenre',
  'transition',
  'typographie',
  'vagabondage',
  'vedettariat',
  'vêtement',
  'vie',
  'vidéo'];

const artists =
  ['Adislén Reyes',
  'Adriana Calatayud',
  'Adriene Jenik',
  // 'Agnese Trocchi',
  'Aicha Raihari',
  'Aimée Darcel',
  'Alaska B',
  'Alejandra Maria Perez Nunez',
  'Alex Olson',
  'Alexa Cuesta',
  'Alexandra Haché',
  // 'Alice and the Serial Numbers',
  // 'Alice Jarry',
  // 'Alice Ming Wai Jim',
  // 'Alicia Felberbaum',
  // 'Alisha Fisher',
  // 'Alisha Wormsley',
  // 'Alison Craighead',
  // 'Alison Loader',
  // 'Allison Moore',
  // 'Allison Vishnovska',
  // 'Amanda Ramos',
  'Amanda Vincelli',
  'Amanda-É. Clément',
  'Amaranta Sánchez',
  'Amber Sansom',
  'Amélie Guérin',
  'Ana Rewakowicz',
  'Ana Rewakowicz',
  'Analays Alvarez Hernandez',
  'Andra McCartney',
  // 'Andra McCartneyest',
  // 'André Boulerice',
  // 'Andrea Cooper',
  // 'Andrea Holtslander',
  // 'Andrea Pare',
  // 'Andréa Schmidt',
  // 'Andrea-Jane Cornell',
  // 'Andrée Anne Vien',
  // 'Andrée Préfontaine',
  // 'Andreja Kuluncic',
  // 'Andrew Forster',
  // 'Andria Hickey',
  // 'Angela Dorrer',
  // 'Angharad Wynne-Jones',
  // 'Angie Eng',
  'Angie Persechino',
  'Anick St-Louis',
  'Anita Cotic',
  'Anna Falu',
  'Anna Friz',
  'Anna Lupien',
  'Anna Sarkissian',
  'Anna-Louise Cralo',
  'Annabelle Chvostek',
  'Annah Couey',
  'Anne Bertrand',
  'Anne Golden',
  'Anne Goldenberg',
  'Anne Lynagh',
  'Anne Michaud',
  'Anne Parisien',
  'Anne-Françoise Jacques',
  'Anne-Marie Bouchard',
  'Anne-Marie Morice',
  'Anne-Marie Trépanier',
  'Annick Bureaud',
  'Annick Germain',
  'Annie Briard',
  // 'Annie Kim Sangil',
  // 'Annie Lebel',
  // 'Annie Roy',
  // 'Annual Assistance to Media Arts Festivals Program',
  // 'Antoni Abad',
  // 'Antonia Hernandez',
  // 'Antonia Sealy',
  'Antye Greie',
  'Anurima Banerji',
  'Ariane De Blois',
  'Aude Crispel',
  'audrey samson',
  'Aurélie Pédron',
  'Ayesha Hameed',
  'Banff Centre',
  'Barbara Layne',
  'Barbara McGill Balfour',
  'Beatriz da Costa',
  'Beatriz Preciado',
  'Bérengère Marin Dubuard (Beewoo)',
  'Bernadette Houde',
  'Bernard Schutze',
  'Bernie Bankrupt',
  'Bethany Or',
  'Beverly Hood',
  'Blue Hawaii',
  'Bobbi Kozinuk',
  'Boulangeries Première Moisson',
  'Brenda Schiuma',
  'Brigitte Lebrasseur',
  'Sarah Choukah',
  'Sarah Cook',
  'Sarah Peebles',
  'Sarah Torrey',
  'Séverine Hubard',
  'Seynabou Diack',
  'Shaina Agbayani',
  'Sharon Daniel',
  'Sharon Hackett',
  'Shauna Janssen',
  'Shawna Dempsey',
  'Shayla Chilliak',
  'Shayo Detchema',
  'Sheila Urbanoski',
  'Sherryl Hamilton',
  'Sheryl Hamilton',
  'Shilpa Gupta',
  'Shirin Kouladjie',
  'Simon Cléroux-Campeau',
  'Simon Greffard',
  'Simone Viger',
  'Skawennati Tricia Fragnito',
  'Skid More',
  'Lucia D’Alete',
  'Luscious Lucia',
  'Lyllie Sue',
  'Lynn Cherny',
  'Lynn Hughes',
  'Lynne Marsh',
  'Lynne Trépanier',
  'M.-Chantale Desrosiers',
  'Magali Babin',
  'Mahalia Verna',
  'Maia Iotzova',
  'Maija Martin',
  'Maléa Gadoury',
  'Manon De Pauw',
  'Mara Verna',
  'Marc Heckmann',
  'Marcelle Roy',
  'Margaret Dragu',
  'Margot Jacobs',
  'Margot Lacroix',
  'Margot Lovejoy',
  'Maria Eugenia Trujillo',
  'Maria Isabel Rueda',
  'Maria Lantin',
  'Maria Legault',
  'Maria Miranda',
  'Marianne Cloutier'];

  const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

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
    db.collection('documents').find().forEach(function(doc) {
      const shuffled = shuffle(artists);
      const random = Math.floor((Math.random() * 2) + 1);
      if (random === 1) {
        doc.artists.push(shuffled[1]);
      } else {
        doc.artists.push(shuffled[2]);
      }
      // doc.artists = [];
        db.collection('documents').save(doc);
    });

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
    // const imgexts = ['.JPG', '.jpg', '.jpeg', '.gif', '.tif', '.png'];
    // db.collection('documents').find().forEach(function(doc) {
    //   const folderpath = `./server/media/${doc.accession_number}`;
    //   let audio = [];
    //   fs.readdirSync(folderpath).map(function (file) {
    //     if ((path.extname(file) === '.mp3')) {
    //       // fs.unlink(`./server/media/${doc.accession_number}/${file}`);
    //       // console.log(`./server/media/${doc.accession_number}/${file}`);
    //       audio.push(file);
    //     }
    //   });
    //   doc.audio = audio;
    //   db.collection('documents').save(doc);
    // });




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
