// this helper is used to initially populate the mongo db

const fs = require('fs');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://conan:conan@ds153239.mlab.com:53239/matriculesparticipants';

const frenchids = [ { "term_id": 524, "name": "artiste", "slug": "artiste", "term_group": 0, "term_taxonomy_id": 524, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 525, "name": "auteur-e", "slug": "auteur-e", "term_group": 0, "term_taxonomy_id": 525, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 530, "name": "bénévoles", "slug": "benevoles", "term_group": 0, "term_taxonomy_id": 530, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 527, "name": "chercheur-e", "slug": "chercheur-e", "term_group": 0, "term_taxonomy_id": 527, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 535, "name": "commanditaire", "slug": "commanditaire", "term_group": 0, "term_taxonomy_id": 535, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 526, "name": "commissaire", "slug": "commissaire", "term_group": 0, "term_taxonomy_id": 526, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 529, "name": "employé-e", "slug": "employe-e", "term_group": 0, "term_taxonomy_id": 529, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 532, "name": "membre", "slug": "membre", "term_group": 0, "term_taxonomy_id": 532, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 534, "name": "partenaire culturel et communautaire", "slug": "partenaire-culturel-et-communautaire", "term_group": 0, "term_taxonomy_id": 534, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 533, "name": "partenaire public", "slug": "partenaire-public", "term_group": 0, "term_taxonomy_id": 533, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 528, "name": "professeur-e", "slug": "professeur-e", "term_group": 0, "term_taxonomy_id": 528, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 531, "name": "stagiaire", "slug": "stagiaire", "term_group": 0, "term_taxonomy_id": 531, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" } ]

const englishids = [ { "term_id": 550, "name": "artist", "slug": "artist", "term_group": 0, "term_taxonomy_id": 550, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 551, "name": "author", "slug": "author", "term_group": 0, "term_taxonomy_id": 551, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 560, "name": "cultural and community partner", "slug": "cultural-and-community-partner", "term_group": 0, "term_taxonomy_id": 560, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 552, "name": "curator", "slug": "curator", "term_group": 0, "term_taxonomy_id": 552, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 557, "name": "employee", "slug": "employee", "term_group": 0, "term_taxonomy_id": 557, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 555, "name": "intern", "slug": "intern", "term_group": 0, "term_taxonomy_id": 555, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 559, "name": "member", "slug": "member", "term_group": 0, "term_taxonomy_id": 559, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 561, "name": "public partner", "slug": "public-partner", "term_group": 0, "term_taxonomy_id": 561, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 553, "name": "researcher", "slug": "researcher", "term_group": 0, "term_taxonomy_id": 553, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 558, "name": "sponsor", "slug": "sponsor", "term_group": 0, "term_taxonomy_id": 558, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 554, "name": "teacher", "slug": "teacher", "term_group": 0, "term_taxonomy_id": 554, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 556, "name": "volunteer", "slug": "volunteer", "term_group": 0, "term_taxonomy_id": 556, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" } ]

const parttypemap = [
 {
   "french": "artiste",
   "english": "artist",
   "synonymes": "artiste en résidence, musician, artistes, musicienne, interdisciplinary artist, réalisatrice, vidéaste, videographer, photographer, photographe, artiste sonore, sound artist, composer, productrice, producer, actress, architect, architecte, architecte paysagiste, artsit, artste, cellist, choregrapher, cinéaste, compositeur, digital muralist, digital artist, directrice photo, directrices photo, directrice de la photographie, director, documentariste, accordionist, artiste multimedia, image-making artist, inflatables, gonflables, irationalists, media artist, media designer, musicien, painter, performer, performeuse, productrice radio, sound designer, sound ecologist, sound performer, soundscape artist, sound architect, video artist, visual artist, sonic artist"
 },
 {
   "french": "auteur-e",
   "english": "author",
   "synonymes": "écrivaine, writer, auteur, éditrice, journalist, journalisme, journalism, philosopher, songwriter, rédactrice en chef, scénariste"
 },
 {
   "french": "commissaire",
   "english": "curator",
   "synonymes": "comissaire, conservatrice"
 },
 {
   "french": "chercheur-e",
   "english": "researcher",
   "synonymes": "chercheur, scholar, théoricienne, theorist"
 },
 {
   "french": "professeur-e",
   "english": "teacher",
   "synonymes": "professor, professeure, educator, instructor, trainer"
 },
 {
   "french": "employé-e",
   "english": "employee",
   "synonymes": ""
 },
 {
   "french": "bénévoles",
   "english": "volunteer",
   "synonymes": "blogger, blogueur"
 },
 {
   "french": "stagiaire",
   "english": "intern",
   "synonymes": ""
 },
 {
   "french": "membre",
   "english": "member",
   "synonymes": ""
 },
 {
   "french": "partenaire public",
   "english": "public partner",
   "synonymes": ""
 },
 {
   "french": "partenaire culturel et communautaire",
   "english": "cultural and community partner",
   "synonymes": ""
 },
 {
   "french": "commanditaire",
   "english": "sponsor",
   "synonymes": ""
 }
]

parttypemap.forEach((obj) => {
  frenchids.forEach(frenchid => {
    if (obj.french == frenchid.name.toLowerCase()) {
      obj.parttypeidfrench = frenchid.term_id;
    }
  })

  englishids.forEach(englishid => {
    if (obj.english == englishid.name.toLowerCase()) {
      obj.parttypeidenglish = englishid.term_id;
    }
  })
})

// console.log(parttypemap);

// const keywordsmap = JSON.parse(fs.readFileSync('./keywordsmap.json', 'utf8'));

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // operate on events
    db.collection('participants').find().forEach(function(doc) {
    //   if (doc.field_lien_url) {
    //   const text = doc.field_lien_title || doc.field_lien_url;
    //   const link = '<br><a href="' + doc.field_lien_url + '">' + text + "</a>";
    //   doc.bodyenglish = doc.bodyenglish += link;
    //   doc.bodyfrench = doc.bodyfrench += link;
    //   console.log(doc.bodyenglish);
    //   console.log(doc.bodyfrench);
    // }
        doc.parttypeeng = [];
        doc.parttypefr = [];
        doc.keywords.forEach((keyword) => {
            parttypemap.forEach((map) => {
              if (map.synonymes.includes(keyword) || map.french === keyword || map.english === keyword) {
                if (map.parttypeidenglish) {
                    doc.parttypeeng.push(map.parttypeidenglish);
                  }
                  if (map.parttypeidfrench) {
                    doc.parttypefr.push(map.parttypeidfrench);
                  }
              }
            });
          
          parttypemap.forEach((map) => {
            if (doc.bodyenglish.includes(map.english) || doc.bodyfrench.includes(map.french)) {
              doc.parttypeeng.push(map.parttypeidenglish);
              doc.parttypefr.push(map.parttypeidfrench);
            }
          });
        });
        db.collection('participants').save(doc);
    });
  }
});
