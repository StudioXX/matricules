// this helper is used to initially populate the mongo db

const fs = require('fs');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://conan:conan@ds153239.mlab.com:53239/matriculesparticipants';

const frenchids = [ { "term_id": 2295, "name": "Artiste", "slug": "artiste", "term_group": 0, "term_taxonomy_id": 2295, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2296, "name": "Auteur-e", "slug": "auteur-e", "term_group": 0, "term_taxonomy_id": 2296, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2301, "name": "Bénévoles", "slug": "benevoles", "term_group": 0, "term_taxonomy_id": 2301, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2298, "name": "Chercheur-e", "slug": "chercheur-e", "term_group": 0, "term_taxonomy_id": 2298, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2306, "name": "Commanditaire", "slug": "commanditaire", "term_group": 0, "term_taxonomy_id": 2306, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2297, "name": "Commissaire", "slug": "commissaire", "term_group": 0, "term_taxonomy_id": 2297, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2300, "name": "Employé-e", "slug": "employe-e", "term_group": 0, "term_taxonomy_id": 2300, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2303, "name": "Membre", "slug": "membre", "term_group": 0, "term_taxonomy_id": 2303, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2305, "name": "Partenaire culturel et communautaire", "slug": "partenaire-culturel-et-communautaire", "term_group": 0, "term_taxonomy_id": 2305, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2304, "name": "Partenaire public", "slug": "partenaire-public", "term_group": 0, "term_taxonomy_id": 2304, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2299, "name": "Professeur-e", "slug": "professeur-e", "term_group": 0, "term_taxonomy_id": 2299, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2302, "name": "Stagiaire", "slug": "stagiaire", "term_group": 0, "term_taxonomy_id": 2302, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" } ]

const englishids = [ { "term_id": 2307, "name": "Artist", "slug": "artist", "term_group": 0, "term_taxonomy_id": 2307, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2308, "name": "Author", "slug": "author", "term_group": 0, "term_taxonomy_id": 2308, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2315, "name": "Cultural and community partner", "slug": "cultural-and-community-partner", "term_group": 0, "term_taxonomy_id": 2315, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2312, "name": "Curator", "slug": "curator", "term_group": 0, "term_taxonomy_id": 2312, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2313, "name": "Employee", "slug": "employee", "term_group": 0, "term_taxonomy_id": 2313, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2318, "name": "Intern", "slug": "intern", "term_group": 0, "term_taxonomy_id": 2318, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2314, "name": "Member", "slug": "member", "term_group": 0, "term_taxonomy_id": 2314, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2316, "name": "Public partner", "slug": "public-partner", "term_group": 0, "term_taxonomy_id": 2316, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2310, "name": "Researcher", "slug": "researcher", "term_group": 0, "term_taxonomy_id": 2310, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2311, "name": "Sponsor", "slug": "sponsor", "term_group": 0, "term_taxonomy_id": 2311, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2317, "name": "Teacher", "slug": "teacher", "term_group": 0, "term_taxonomy_id": 2317, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" }, { "term_id": 2309, "name": "Volunteer", "slug": "volunteer", "term_group": 0, "term_taxonomy_id": 2309, "taxonomy": "participant_type", "description": "", "parent": 0, "count": 0, "filter": "raw" } ]

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

console.log(parttypemap);

// const keywordsmap = JSON.parse(fs.readFileSync('./keywordsmap.json', 'utf8'));

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // operate on events
    db.collection('participants').find().forEach(function(doc) {
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
