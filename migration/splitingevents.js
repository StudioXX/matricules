const mongodb = require('mongodb');
const fs = require('fs');
const jsonfile = require('jsonfile');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://conan:conan@ds127389.mlab.com:27389/matriculesevents';

const keywordsmap = [
 {
   "french": "3D",
   "english": "3D",
   "synonymes": "3d sandde, modélisation, modeling, sandde, Blender, blender 3D"
 },
 {
   "french": "action",
   "english": "action",
   "synonymes": "intervention"
 },
 {
   "french": "animation",
   "english": "animation",
   "synonymes": "film d'animation, Animation 3d, experimental animation and sound"
 },
 {
   "french": "interactivité",
   "english": "interactivity",
   "synonymes": "max/msp, Arduino, processing, MAX, MSP, MAX MSP, max msp, jitter, pure data, pure-data, sensor"
 },
 {
   "french": "photographie",
   "english": "photography",
   "synonymes": "photo, photos"
 },
 {
   "french": "écrits",
   "english": "writing",
   "synonymes": "text, texte, Edit-a-thon, essai, essay, literature, embroidery, screenwriting, écriture"
 },
 {
   "french": "vidéo",
   "english": "video",
   "synonymes": "videos, digital montage, experimental video, montage video, con vidéo, Unfolding Sequences"
 },
 {
   "french": "récit",
   "english": "storytelling",
   "synonymes": "digital storytelling, récits, experimental narrative, conte, récits numérique"
 },
 {
   "french": "dessin",
   "english": "drawing",
   "synonymes": ""
 },
 {
   "french": "gif animé",
   "english": "animated gif",
   "synonymes": "gif"
 },
 {
   "french": "illustration",
   "english": "illustration",
   "synonymes": "artist. illustration"
 },
 {
   "french": "danse",
   "english": "dance",
   "synonymes": "chorégraphie, choregraphy, vidéodanse, videodance, transformation as a result of editing images, transformation par le biais de l’image et du montage"
 },
 {
   "french": "djing",
   "english": "djing",
   "synonymes": "dj"
 },
 {
   "french": "impression",
   "english": "print",
   "synonymes": "imprimé, posters, sérigraphie, screen printing"
 },
 {
   "french": "impression 3D",
   "english": "3D printing",
   "synonymes": "3D print"
 },
 {
   "french": "art web",
   "english": "web art",
   "synonymes": "e-art, net art"
 },
 {
   "french": "art électronique",
   "english": "electronic art",
   "synonymes": "arts électroniques, documentation oeuvres électroniques, documentation electronic art, microcontrôleurs, microcontroller, bending, micro-controllers, circuits, électroniques, circuit, electronics, circuit bending, électronique, electronic, circuitry, electrical, electro, électro-bricolage, electronics art, Handmade electronics lab, haut-parleurs de papier, kinetic art, art cinétique, microcontrolers, art cinétique, captation, Electromode, Hartman, Le laboratoire d'électronique artisanale"
 },
 {
   "french": "art médiatique",
   "english": "media art",
   "synonymes": "nouveaux médias, new medias, new media, medias arts, arts médiatiques, media arts"
 },
 {
   "french": "post-internet",
   "english": "post-internet",
   "synonymes": ""
 },
 {
   "french": "installation",
   "english": "installation",
   "synonymes": "installation sonore, installation sonore immersive"
 },
 {
   "french": "installation vidéo",
   "english": "video installation",
   "synonymes": "con vidéo, Allison Moore, Anne-Marie Bouchard"
 },
 {
   "french": "improvisation",
   "english": "improvisation",
   "synonymes": "improviser, improvisatrice, improv-electronics, impro electronique"
 },
 {
   "french": "art interactif",
   "english": "interactive art",
   "synonymes": "installation interactive, interactive, interactive media, interactive science centre, interfaces, médias interactifs, Funda Senova, Josée Brouillard, rachel jacobs, Zoe Bacchus"
 },
 {
   "french": "art sonore",
   "english": "sound art",
   "synonymes": "son, sonore, ardour, paysage sonore, environnement sonore, hyper écoute, noise, sound installation, sound-space, soundscape, spatialisation, asound, babin, cricket tree crow, ctrl-alt-del, enregistrement, record, sonic, supermicmac, tanz, tiny, Tracing the Sharawadji"
 },
 {
   "french": "art visuel",
   "english": "visual art",
   "synonymes": "arts visuels, visual arts, art visuels, visuals arts, art plastiques, arts plastiques, playwright"
 },
 {
   "french": "art numérique",
   "english": "digital art",
   "synonymes": "arts numériques, digital arts, elektra, digital art, digital arts, media numerique, médias numériques, numérique, art logiciel, art réseau, curatorial, software art festival, wave"
 },
 {
   "french": "art public",
   "english": "public art",
   "synonymes": "public art lab, art social, art social. collaboration, art monumental, social art"
 },
 {
   "french": "art participatif",
   "english": "participatory art",
   "synonymes": "participation, co-création, particpation, engrenage noir, FB 105, femmes br@nchées 105, Kayle Brandon, SOUCCS, tricot, yarnbombing"
 },
 {
   "french": "architecture",
   "english": "architecture",
   "synonymes": "landscape architect"
 },
 {
   "french": "bioart",
   "english": "bioart",
   "synonymes": "biohacking, biopolitics, bioresource engineering, biotechnological, biodesign"
 },
 {
   "french": "électroacoustique",
   "english": "electroacoustic",
   "synonymes": "électroacoustic, acoustique, electroacoustic music"
 },
 {
   "french": "environnement immersif",
   "english": "immersive environment",
   "synonymes": "immersive environments, environnements immersifs, environnements sensibles"
 },
 {
   "french": "édition",
   "english": "publishing",
   "synonymes": "editor, autopublication, booksprint, manga, zine, zines, publications, Self-publishing"
 },
 {
   "french": "effets spéciaux",
   "english": "special effects",
   "synonymes": "VFX,  écran vert, green screen"
 },
 {
   "french": "design",
   "english": "design",
   "synonymes": "designer, design graphique, design graphic, designer web, graphic design, graphic designer, graphiste"
 },
 {
   "french": "film",
   "english": "movie",
   "synonymes": "filmmaker, documentaire, documentary, court métrage, films, movies, short independent film, short, fifa, image+nation, Mad Parade, screening"
 },
 {
   "french": "performance",
   "english": "performance",
   "synonymes": "cyberpermance, performance en ligne, performance video, stand-up, confessions, Eastern Bloc, ENCUENTRO, EROS FRANKENSTEIN, show, skol, spectacle, speedshow, Studio 303, tagny duff, viva"
 },
 {
   "french": "jeu",
   "english": "game",
   "synonymes": "ludique, playful, jeux, aventure, jeu vidéo, jeux vidéo, video game, jeu, gaming, games, girl games, videogame, replay: a memory game, adventure, arcadia festival, salon ludique, serious, tools"
 },
 {
   "french": "application mobile",
   "english": "mobile application",
   "synonymes": "application, unity 3D, unity, applications, médias mobiles, Léa Jeanmougin"
 },
 {
   "french": "intervention publique",
   "english": "public intervention",
   "synonymes": ""
 },
 {
   "french": "vjing",
   "english": "vjing",
   "synonymes": "salon FB 100, WW salon 100"
 },
 {
   "french": "multiplateforme",
   "english": "multi platform",
   "synonymes": "multi-plateforme, cross media, multi-plateform, multiplateform, numériques, trans-media"
 },
 {
   "french": "multimédia",
   "english": "multimedia",
   "synonymes": "multimédias, gimp, photoshop"
 },
 {
   "french": "musique",
   "english": "music",
   "synonymes": "hip hop, musique électronique, electronic music, composition, band, Chip music, folk music, groupe, group, music actuelle festival, music technology, alternate, breakbeat, breakbeats, concert, pop, pop tropicale, songs, audio hygiene, gazelle, indie, parlour treats, tropical-pop, Tyr Jami, ultrared, and musician, Syndja, violin, violon, violoncelle"
 },
 {
   "french": "robotique",
   "english": "robotic",
   "synonymes": "robots, robotics"
 },
 {
   "french": "spoken word",
   "english": "spoken word",
   "synonymes": ""
 },
 {
   "french": "projection",
   "english": "projection",
   "synonymes": "projection, mapping"
 },
 {
   "french": "peinture",
   "english": "painting",
   "synonymes": ""
 },
 {
   "french": "poésie",
   "english": "poetry",
   "synonymes": "Montreal poetry slam"
 },
 {
   "french": "réalité augmentée",
   "english": "augmented reality",
   "synonymes": ""
 },
 {
   "french": "réalité virtuelle",
   "english": "virtual reality",
   "synonymes": "VR"
 },
 {
   "french": "remix",
   "english": "remix",
   "synonymes": "détournement, detourment"
 },
 {
   "french": "stéreoscopie",
   "english": "stereoscopy",
   "synonymes": "stereoscopique, stereoscopic"
 },
 {
   "french": "sculpture",
   "english": "sculpture",
   "synonymes": ""
 },
 {
   "french": "télévision",
   "english": "television",
   "synonymes": "Victoria Keddie"
 },
 {
   "french": "voix",
   "english": "voice",
   "synonymes": "chant, choeur, choeur maha, chorale, art vocal, alternate, singer, classical, vocal, opera"
 },
 {
   "french": "théâtre",
   "english": "theater",
   "synonymes": "puppets"
 },
 {
   "french": "multidisciplinarité",
   "english": "multidisciplinarity",
   "synonymes": "artiste multidisciplinaire, multidisciplinaire, multidisciplinary artist, multidisciplinary"
 },
 {
   "french": "interdisciplinarité",
   "english": "interdisciplinarity",
   "synonymes": "artiste interdisciplinaire, indisciplinarity artist, artist interdisciplinary, vasistas"
 },
 {
   "french": "",
   "english": "",
   "synonymes": ""
 },
 {
   "french": "vieillissement",
   "english": "aging",
   "synonymes": ""
 },
 {
   "french": "activisme",
   "english": "activism",
   "synonymes": "activist, activiste, hacktivism, freedom, liberté, No Logo, artivistic, autour de l'agora, seechange.org, shual, alphabétisation numérique, digital literacy, cdeacf"
 },
 {
   "french": "agentivité",
   "english": "agency",
   "synonymes": ""
 },
 {
   "french": "anonymat",
   "english": "anonymity",
   "synonymes": ""
 },
 {
   "french": "archives",
   "english": "archives",
   "synonymes": "matricules, archivage, archiving, archival material, catalogage"
 },
 {
   "french": "autochtone",
   "english": "indigenous",
   "synonymes": "aboriginal, firsts nations, inuit, native, premières nations, qwm"
 },
 {
   "french": "bien-être",
   "english": "self-care",
   "synonymes": ""
 },
 {
   "french": "communauté",
   "english": "community",
   "synonymes": "China, Chine, Chinese women, chinoises, communautaire, le fridge"
 },
 {
   "french": "communs",
   "english": "commons",
   "synonymes": "comun"
 },
 {
   "french": "corps",
   "english": "body",
   "synonymes": "fat, goddesses"
 },
 {
   "french": "capitalisme",
   "english": "capitalism",
   "synonymes": "capitalist"
 },
 {
   "french": "cartographie",
   "english": "cartography",
   "synonymes": "map"
 },
 {
   "french": "censure",
   "english": "censorship",
   "synonymes": "Oppression Aesthetics"
 },
 {
   "french": "centre d’artistes autogéré",
   "english": "artist-run centre",
   "synonymes": "centre d'artistes, artist run center"
 },
 {
   "french": "cinéma",
   "english": "cinema",
   "synonymes": "cinema out of the box, realisatrices equitables, Entr'elles, eye, FNC"
 },
 {
   "french": "collaboration",
   "english": "collaboration",
   "synonymes": "collectif, collective, collective project"
 },
 {
   "french": "communication",
   "english": "communication",
   "synonymes": "promotion"
 },
 {
   "french": "culture",
   "english": "culture",
   "synonymes": "cultural specificity, cultural organization, cultural blending"
 },
 {
   "french": "cyberféminisme",
   "english": "cyberfeminism",
   "synonymes": "cyberespace"
 },
 {
   "french": "création",
   "english": "creation",
   "synonymes": "indisciplinaire, indisciplinairy, interstices"
 },
 {
   "french": "DIY",
   "english": "DIY",
   "synonymes": "fais-le-toi-même, do it yourself, faites-le-vous-même, légitimation et économie du savoir culture DIY"
 },
 {
   "french": "direct",
   "english": "live",
   "synonymes": "en direct, live art, live code sound"
 },
 {
   "french": "données",
   "english": "data",
   "synonymes": "base de données, bases de données, database, data storage, databases, library, DXLab, visualisation, vizualisation"
 },
 {
   "french": "diversité",
   "english": "diversity",
   "synonymes": "maghrébines, métissage culturel, ethnicity, noirs, black history month, black lives matter, spécificité culturelle, lebanon, afro to the future, afrofuturiste, Sharrae Lyon, Shirin Neshat, Ytasha Womack,  ethnoculturalisme, ethnoculturalism"
 },
 {
   "french": "droit d'auteur",
   "english": "copyright",
   "synonymes": "copyleft, droits d'auteurs"
 },
 {
   "french": "économie",
   "english": "economy",
   "synonymes": "économie sociale, economic, finance, financement, financing, funding, fund, comptabilité"
 },
 {
   "french": "éducation",
   "english": "education",
   "synonymes": "étudiants, gouter"
 },
 {
   "french": "égoportrait",
   "english": "selfie",
   "synonymes": ""
 },
 {
   "french": "émancipation",
   "english": "emancipation",
   "synonymes": ""
 },
 {
   "french": "empouvoirement ",
   "english": "empowerment",
   "synonymes": ""
 },
 {
   "french": "environnement",
   "english": "environment",
   "synonymes": "recyclage, recycling, ecology, écologie, abeilles, bees, environments, forêt, Forest, génie des bioressources, militarization climate change, militarisation, bramchées, réchauffement climatique, récupération"
 },
 {
   "french": "espace",
   "english": "space",
   "synonymes": "location, espaces, locaux, lab, panorama"
 },
 {
   "french": "espace public",
   "english": "public space",
   "synonymes": "extérieur, outside, public, Quartier 20.14, social art"
 },
 {
   "french": "queer",
   "english": "queer",
   "synonymes": "La Sala Rossa"
 },
 {
   "french": "féminisme",
   "english": "feminism",
   "synonymes": "féministe, féminist, femmes, women, cyclo-feminism, féminin, female, feminist alliances, feminist gaming, condition feminine, founder, Gabrielle Ancitil, quintessence, women's action, womeninview"
 },
 {
   "french": "festival",
   "english": "festival",
   "synonymes": ""
 },
 {
   "french": "flux",
   "english": "stream",
   "synonymes": "jenny-cam, streaming technologies, streaming"
 },
 {
   "french": "futur",
   "english": "future",
   "synonymes": "Future vision"
 },
 {
   "french": "globalisation",
   "english": "globalization",
   "synonymes": ""
 },
 {
   "french": "gestion",
   "english": "management",
   "synonymes": "administration"
 },
 {
   "french": "libre",
   "english": "open source",
   "synonymes": "open source software, logiciel libre, logiciel, linux, open-source, free software, free, libre graphics meeeting, open software, Ekwa Ekoko, Floh Herra-Vega"
 },
 {
   "french": "localisation",
   "english": "localisation",
   "synonymes": "GPS, map, geo based, géolocalisation, geolocalisation, site‐specific"
 },
 {
   "french": "genre",
   "english": "gender",
   "synonymes": "dynamique de genre, gender dynamics, gender equity, genders, gendercancon, transgender, superheart"
 },
 {
   "french": "piratage",
   "english": "hacking",
   "synonymes": "hackers, musées, museum"
 },
 {
   "french": "hacktivisme",
   "english": "hacktivism",
   "synonymes": ""
 },
 {
   "french": "histoire",
   "english": "history",
   "synonymes": "memory, histoiry, historic, historique, eniac, musée des ondes, mythologie, mythology, la pierre de Rosette, Rosetta Stone, capsule temporelle, time capsule"
 },
 {
   "french": "histoire de l'art",
   "english": "art history",
   "synonymes": ""
 },
 {
   "french": "humour",
   "english": "humor",
   "synonymes": ""
 },
 {
   "french": "identité",
   "english": "identity",
   "synonymes": "personnages virtuels"
 },
 {
   "french": "informatique",
   "english": "computing",
   "synonymes": "millennium, computer, ww2, software"
 },
 {
   "french": "image de soi",
   "english": "self-image",
   "synonymes": ""
 },
 {
   "french": "intergénération",
   "english": "intergeneration",
   "synonymes": "intergenerational"
 },
 {
   "french": "Internet",
   "english": "Internet",
   "synonymes": "Web, web 2.0, online, Googling, Internet Research, jigh speed, webcaméra, Web jam, wikipédia, recherche internet, recherche web, sémiologie, semiology, traffic"
 },
 {
   "french": "intervention",
   "english": "intervention",
   "synonymes": ""
 },
 {
   "french": "confidentialité",
   "english": "privacy",
   "synonymes": ""
 },
 {
   "french": "LGBTQ",
   "english": "LGBTQ",
   "synonymes": "lesbian"
 },
 {
   "french": "langage",
   "english": "language",
   "synonymes": ""
 },
 {
   "french": "liberté",
   "english": "liberty",
   "synonymes": ""
 },
 {
   "french": "marginalisation",
   "english": "marginalization",
   "synonymes": "marginalisé, marginalized"
 },
 {
   "french": "maison",
   "english": "home",
   "synonymes": ""
 },
 {
   "french": "memes",
   "english": "memes",
   "synonymes": ""
 },
 {
   "french": "médiation",
   "english": "mediation",
   "synonymes": ""
 },
 {
   "french": "mémoire",
   "english": "memory",
   "synonymes": ""
 },
 {
   "french": "migration",
   "english": "migration",
   "synonymes": "migrations, immigration"
 },
 {
   "french": "misogynie",
   "english": "misogyny",
   "synonymes": "mansplaining"
 },
 {
   "french": "mobilité",
   "english": "mobility",
   "synonymes": "mobile, technologie mobile, mobile technology, mobile cinema, mobile media"
 },
 {
   "french": "mode",
   "english": "fashion",
   "synonymes": ""
 },
 {
   "french": "mouvements sociaux",
   "english": "social movements",
   "synonymes": "manifestation, change, transitions"
 },
 {
   "french": "nature",
   "english": "nature",
   "synonymes": "consciousness"
 },
 {
   "french": "nudité",
   "english": "nudity",
   "synonymes": ""
 },
 {
   "french": "politique",
   "english": "politics",
   "synonymes": "politic, colonialisme, colonialism, democracy, democratic, anti-impérialisme, journée sans culture, austerity, canadian media industry, polictics, political science, poltique, upgrade"
 },
 {
   "french": "pornographie",
   "english": "pornography",
   "synonymes": ""
 },
 {
   "french": "pouvoir",
   "english": "power",
   "synonymes": ""
 },
 {
   "french": "programmation",
   "english": "programming",
   "synonymes": "code, Boolean logic, bug, coding, computer programming, développeur logiciel, programmer, python, software developer"
 },
 {
   "french": "préjugés",
   "english": "prejudices",
   "synonymes": ""
 },
 {
   "french": "psychologie",
   "english": "psychology",
   "synonymes": "psychogeographie, psychisme, psyche"
 },
 {
   "french": "racisme",
   "english": "racism",
   "synonymes": "race, institutionnel racisme, prisons, sarah baartman"
 },
 {
   "french": "radio",
   "english": "radio",
   "synonymes": "opera radiophonique, radio host, radio show, radio-craft, radiophonic"
 },
 {
   "french": "représentation",
   "english": "representation",
   "synonymes": ""
 },
 {
   "french": "commerce électronique",
   "english": "e-commerce",
   "synonymes": "electronic commerce"
 },
 {
   "french": "hypermédia",
   "english": "hypermedia",
   "synonymes": ""
 },
 {
   "french": "médias",
   "english": "medias",
   "synonymes": "communication, media, presse, digital media"
 },
 {
   "french": "médias sociaux",
   "english": "social media",
   "synonymes": "social medias, facebook, twitter, réseaux sociaux, social networks"
 },
 {
   "french": "réseau",
   "english": "network",
   "synonymes": "connectivité, connectivity, reseau"
 },
 {
   "french": "pays",
   "english": "country",
   "synonymes": "land, terre"
 },
 {
   "french": "paysage",
   "english": "landscape",
   "synonymes": ""
 },
 {
   "french": "propriété intellectuelle",
   "english": "intellectual property",
   "synonymes": "Intellectual Property Rights"
 },
 {
   "french": "publicité",
   "english": "publicity",
   "synonymes": ""
 },
 {
   "french": "résistance",
   "english": "resistance",
   "synonymes": "sustainability"
 },
 {
   "french": "révolution",
   "english": "revolution",
   "synonymes": ""
 },
 {
   "french": "risque",
   "english": "risk",
   "synonymes": "risky"
 },
 {
   "french": "santé",
   "english": "health",
   "synonymes": "cancer, breast, breast cancer, autonomous sensory meridian response"
 },
 {
   "french": "sécurité",
   "english": "security",
   "synonymes": "espaces sûrs, safe spaces"
 },
 {
   "french": "développement web",
   "english": "web development",
   "synonymes": "site web, web, website, wordpress, WordPress, html, HTML, CSS, drupal, cms, web site, système de gestion des contenus, Html5, css3, web pages, création pages web, pages web, content management sytstem, creating web pages, design web, web design, website, website designing, websites, web programming, W3, seminar"
 },
 {
   "french": "science",
   "english": "science",
   "synonymes": ""
 },
 {
   "french": "science-fiction",
   "english": "science fiction",
   "synonymes": "alien nation"
 },
 {
   "french": "sexisme",
   "english": "sexism",
   "synonymes": ""
 },
 {
   "french": "sexualité",
   "english": "sexuality",
   "synonymes": "Contra-sexual Manifesto, érotisme, erotism, prostitution"
 },
 {
   "french": "sociologie",
   "english": "sociology",
   "synonymes": "social, socilogie, socio-politique, socio-political, socio-économie"
 },
 {
   "french": "solidarité",
   "english": "solidarity",
   "synonymes": "entraide"
 },
 {
   "french": "spiritualité",
   "english": "spirituality",
   "synonymes": "religion, foi, faith, arts and religion, arts plastiques et religion"
 },
 {
   "french": "subjectivité",
   "english": "subjectivity",
   "synonymes": ""
 },
 {
   "french": "subversion",
   "english": "subversion",
   "synonymes": "subversions"
 },
 {
   "french": "surveillance",
   "english": "surveillance",
   "synonymes": "webcam, closed-circuit video cameras, cyber surveillance, cybersurveillance, big brother"
 },
 {
   "french": "social",
   "english": "social",
   "synonymes": ""
 },
 {
   "french": "télécommunications",
   "english": "telecommunications",
   "synonymes": "telecomm, réseautique"
 },
 {
   "french": "technologie",
   "english": "technology",
   "synonymes": "technologies, machines, digital technologies, ICT, engineering, gadget, MIT, techno, technician, tech, technophobia"
 },
 {
   "french": "télévision",
   "english": "television",
   "synonymes": "reality tv"
 },
 {
   "french": "textile",
   "english": "textile",
   "synonymes": "fibres, Layne, textil"
 },
 {
   "french": "transexuel",
   "english": "transexual",
   "synonymes": ""
 },
 {
   "french": "transgenre",
   "english": "transgender",
   "synonymes": "trans"
 },
 {
   "french": "typographie",
   "english": "typography",
   "synonymes": ""
 },
 {
   "french": "vêtement",
   "english": "wearable",
   "synonymes": "wearable technology, clothing"
 },
 {
   "french": "violence",
   "english": "violence",
   "synonymes": "tragedy, 6 décembre, murder, polytechnique, tragédie /polytechnique, tragédie, septembre 2011"
 },
 {
   "french": "urbanité",
   "english": "urbanity",
   "synonymes": "cité, cities, ville, city, urbain, urban, urbanism, urbanisme"
 }
];

for (let i = 0; i < keywordsmap.length; i += 1) {
    keywordsmap[i].synonymes = keywordsmap[i].synonymes.split(", ");
}

const termidfrench = [
	{
		"term_id": 1947,
		"name": "3D",
		"slug": "3d",
		"term_group": 0,
		"term_taxonomy_id": 1947,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1948,
		"name": "action",
		"slug": "action",
		"term_group": 0,
		"term_taxonomy_id": 1948,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2007,
		"name": "activisme",
		"slug": "activisme",
		"term_group": 0,
		"term_taxonomy_id": 2007,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2008,
		"name": "agentivité",
		"slug": "agentivite",
		"term_group": 0,
		"term_taxonomy_id": 2008,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1949,
		"name": "animation",
		"slug": "animation",
		"term_group": 0,
		"term_taxonomy_id": 1949,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2009,
		"name": "anonymat",
		"slug": "anonymat",
		"term_group": 0,
		"term_taxonomy_id": 2009,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1985,
		"name": "application mobile",
		"slug": "application-mobile",
		"term_group": 0,
		"term_taxonomy_id": 1985,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1975,
		"name": "architecture",
		"slug": "architecture",
		"term_group": 0,
		"term_taxonomy_id": 1975,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2010,
		"name": "archives",
		"slug": "archives",
		"term_group": 0,
		"term_taxonomy_id": 2010,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1963,
		"name": "art électronique",
		"slug": "art-electronique",
		"term_group": 0,
		"term_taxonomy_id": 1963,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1969,
		"name": "art interactif",
		"slug": "art-interactif",
		"term_group": 0,
		"term_taxonomy_id": 1969,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1964,
		"name": "art médiatique",
		"slug": "art-mediatique",
		"term_group": 0,
		"term_taxonomy_id": 1964,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1972,
		"name": "art numérique",
		"slug": "art-numerique",
		"term_group": 0,
		"term_taxonomy_id": 1972,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1974,
		"name": "art participatif",
		"slug": "art-participatif",
		"term_group": 0,
		"term_taxonomy_id": 1974,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1973,
		"name": "art public",
		"slug": "art-public",
		"term_group": 0,
		"term_taxonomy_id": 1973,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1970,
		"name": "art sonore",
		"slug": "art-sonore",
		"term_group": 0,
		"term_taxonomy_id": 1970,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1971,
		"name": "art visuel",
		"slug": "art-visuel",
		"term_group": 0,
		"term_taxonomy_id": 1971,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1962,
		"name": "art web",
		"slug": "art-web",
		"term_group": 0,
		"term_taxonomy_id": 1962,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2011,
		"name": "autochtone",
		"slug": "autochtone",
		"term_group": 0,
		"term_taxonomy_id": 2011,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2012,
		"name": "bien-être",
		"slug": "bien-etre",
		"term_group": 0,
		"term_taxonomy_id": 2012,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1976,
		"name": "bioart",
		"slug": "bioart",
		"term_group": 0,
		"term_taxonomy_id": 1976,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2016,
		"name": "capitalisme",
		"slug": "capitalisme",
		"term_group": 0,
		"term_taxonomy_id": 2016,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2017,
		"name": "cartographie",
		"slug": "cartographie",
		"term_group": 0,
		"term_taxonomy_id": 2017,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2018,
		"name": "censure",
		"slug": "censure",
		"term_group": 0,
		"term_taxonomy_id": 2018,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2019,
		"name": "centre d’artistes autogéré",
		"slug": "centre-dartistes-autogere",
		"term_group": 0,
		"term_taxonomy_id": 2019,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2020,
		"name": "cinéma",
		"slug": "cinema",
		"term_group": 0,
		"term_taxonomy_id": 2020,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2021,
		"name": "collaboration",
		"slug": "collaboration",
		"term_group": 0,
		"term_taxonomy_id": 2021,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2085,
		"name": "commerce électronique",
		"slug": "commerce-electronique",
		"term_group": 0,
		"term_taxonomy_id": 2085,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2013,
		"name": "communauté",
		"slug": "communaute",
		"term_group": 0,
		"term_taxonomy_id": 2013,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2022,
		"name": "communication",
		"slug": "communication",
		"term_group": 0,
		"term_taxonomy_id": 2022,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2014,
		"name": "communs",
		"slug": "communs",
		"term_group": 0,
		"term_taxonomy_id": 2014,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2060,
		"name": "confidentialité",
		"slug": "confidentialite",
		"term_group": 0,
		"term_taxonomy_id": 2060,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2015,
		"name": "corps",
		"slug": "corps",
		"term_group": 0,
		"term_taxonomy_id": 2015,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2025,
		"name": "création",
		"slug": "creation",
		"term_group": 0,
		"term_taxonomy_id": 2025,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2023,
		"name": "culture",
		"slug": "culture",
		"term_group": 0,
		"term_taxonomy_id": 2023,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2024,
		"name": "cyberféminisme",
		"slug": "cyberfeminisme",
		"term_group": 0,
		"term_taxonomy_id": 2024,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1958,
		"name": "danse",
		"slug": "danse",
		"term_group": 0,
		"term_taxonomy_id": 1958,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1981,
		"name": "design",
		"slug": "design",
		"term_group": 0,
		"term_taxonomy_id": 1981,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1955,
		"name": "dessin",
		"slug": "dessin",
		"term_group": 0,
		"term_taxonomy_id": 1955,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2099,
		"name": "développement web",
		"slug": "developpement-web",
		"term_group": 0,
		"term_taxonomy_id": 2099,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2027,
		"name": "direct",
		"slug": "direct",
		"term_group": 0,
		"term_taxonomy_id": 2027,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2029,
		"name": "diversité",
		"slug": "diversite",
		"term_group": 0,
		"term_taxonomy_id": 2029,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2026,
		"name": "DIY",
		"slug": "diy",
		"term_group": 0,
		"term_taxonomy_id": 2026,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1959,
		"name": "djing",
		"slug": "djing",
		"term_group": 0,
		"term_taxonomy_id": 1959,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2028,
		"name": "données",
		"slug": "donnees",
		"term_group": 0,
		"term_taxonomy_id": 2028,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2030,
		"name": "droit d'auteur",
		"slug": "droit-dauteur",
		"term_group": 0,
		"term_taxonomy_id": 2030,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2031,
		"name": "économie",
		"slug": "economie",
		"term_group": 0,
		"term_taxonomy_id": 2031,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1952,
		"name": "écrits",
		"slug": "ecrits",
		"term_group": 0,
		"term_taxonomy_id": 1952,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1979,
		"name": "édition",
		"slug": "edition",
		"term_group": 0,
		"term_taxonomy_id": 1979,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2032,
		"name": "éducation",
		"slug": "education",
		"term_group": 0,
		"term_taxonomy_id": 2032,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1980,
		"name": "effets spéciaux",
		"slug": "effets-speciaux",
		"term_group": 0,
		"term_taxonomy_id": 1980,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2033,
		"name": "égoportrait",
		"slug": "egoportrait",
		"term_group": 0,
		"term_taxonomy_id": 2033,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1977,
		"name": "électroacoustique",
		"slug": "electroacoustique",
		"term_group": 0,
		"term_taxonomy_id": 1977,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2034,
		"name": "émancipation",
		"slug": "emancipation",
		"term_group": 0,
		"term_taxonomy_id": 2034,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2035,
		"name": "empouvoirement",
		"slug": "empouvoirement",
		"term_group": 0,
		"term_taxonomy_id": 2035,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2036,
		"name": "environnement",
		"slug": "environnement",
		"term_group": 0,
		"term_taxonomy_id": 2036,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1978,
		"name": "environnement immersif",
		"slug": "environnement-immersif",
		"term_group": 0,
		"term_taxonomy_id": 1978,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2037,
		"name": "espace",
		"slug": "espace",
		"term_group": 0,
		"term_taxonomy_id": 2037,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2038,
		"name": "espace public",
		"slug": "espace-public",
		"term_group": 0,
		"term_taxonomy_id": 2038,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2040,
		"name": "féminisme",
		"slug": "feminisme",
		"term_group": 0,
		"term_taxonomy_id": 2040,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2041,
		"name": "festival",
		"slug": "festival",
		"term_group": 0,
		"term_taxonomy_id": 2041,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1982,
		"name": "film",
		"slug": "film",
		"term_group": 0,
		"term_taxonomy_id": 1982,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2042,
		"name": "flux",
		"slug": "flux",
		"term_group": 0,
		"term_taxonomy_id": 2042,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2043,
		"name": "futur",
		"slug": "futur",
		"term_group": 0,
		"term_taxonomy_id": 2043,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2048,
		"name": "genre",
		"slug": "genre",
		"term_group": 0,
		"term_taxonomy_id": 2048,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2045,
		"name": "gestion",
		"slug": "gestion",
		"term_group": 0,
		"term_taxonomy_id": 2045,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1956,
		"name": "gif animé",
		"slug": "gif-anime",
		"term_group": 0,
		"term_taxonomy_id": 1956,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2044,
		"name": "globalisation",
		"slug": "globalisation",
		"term_group": 0,
		"term_taxonomy_id": 2044,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2050,
		"name": "hacktivisme",
		"slug": "hacktivisme",
		"term_group": 0,
		"term_taxonomy_id": 2050,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2051,
		"name": "histoire",
		"slug": "histoire",
		"term_group": 0,
		"term_taxonomy_id": 2051,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2052,
		"name": "histoire de l'art",
		"slug": "histoire-de-lart",
		"term_group": 0,
		"term_taxonomy_id": 2052,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2053,
		"name": "humour",
		"slug": "humour",
		"term_group": 0,
		"term_taxonomy_id": 2053,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2086,
		"name": "hypermédia",
		"slug": "hypermedia",
		"term_group": 0,
		"term_taxonomy_id": 2086,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2054,
		"name": "identité",
		"slug": "identite",
		"term_group": 0,
		"term_taxonomy_id": 2054,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1957,
		"name": "illustration",
		"slug": "illustration",
		"term_group": 0,
		"term_taxonomy_id": 1957,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2056,
		"name": "image de soi",
		"slug": "image-de-soi",
		"term_group": 0,
		"term_taxonomy_id": 2056,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1960,
		"name": "impression",
		"slug": "impression",
		"term_group": 0,
		"term_taxonomy_id": 1960,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1961,
		"name": "impression 3D",
		"slug": "impression-3d",
		"term_group": 0,
		"term_taxonomy_id": 1961,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1968,
		"name": "improvisation",
		"slug": "improvisation",
		"term_group": 0,
		"term_taxonomy_id": 1968,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2055,
		"name": "informatique",
		"slug": "informatique",
		"term_group": 0,
		"term_taxonomy_id": 2055,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1966,
		"name": "installation",
		"slug": "installation",
		"term_group": 0,
		"term_taxonomy_id": 1966,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1967,
		"name": "installation vidéo",
		"slug": "installation-video",
		"term_group": 0,
		"term_taxonomy_id": 1967,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1950,
		"name": "interactivité",
		"slug": "interactivite",
		"term_group": 0,
		"term_taxonomy_id": 1950,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2005,
		"name": "interdisciplinarité",
		"slug": "interdisciplinarite",
		"term_group": 0,
		"term_taxonomy_id": 2005,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2057,
		"name": "intergénération",
		"slug": "intergeneration",
		"term_group": 0,
		"term_taxonomy_id": 2057,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2058,
		"name": "Internet",
		"slug": "internet",
		"term_group": 0,
		"term_taxonomy_id": 2058,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2059,
		"name": "intervention",
		"slug": "intervention",
		"term_group": 0,
		"term_taxonomy_id": 2059,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1986,
		"name": "intervention publique",
		"slug": "intervention-publique",
		"term_group": 0,
		"term_taxonomy_id": 1986,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1984,
		"name": "jeu",
		"slug": "jeu",
		"term_group": 0,
		"term_taxonomy_id": 1984,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2062,
		"name": "langage",
		"slug": "langage",
		"term_group": 0,
		"term_taxonomy_id": 2062,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2061,
		"name": "LGBTQ",
		"slug": "lgbtq",
		"term_group": 0,
		"term_taxonomy_id": 2061,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2063,
		"name": "liberté",
		"slug": "liberte",
		"term_group": 0,
		"term_taxonomy_id": 2063,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2046,
		"name": "libre",
		"slug": "libre",
		"term_group": 0,
		"term_taxonomy_id": 2046,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2047,
		"name": "localisation",
		"slug": "localisation",
		"term_group": 0,
		"term_taxonomy_id": 2047,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2065,
		"name": "maison",
		"slug": "maison",
		"term_group": 0,
		"term_taxonomy_id": 2065,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2064,
		"name": "marginalisation",
		"slug": "marginalisation",
		"term_group": 0,
		"term_taxonomy_id": 2064,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2087,
		"name": "médias",
		"slug": "medias",
		"term_group": 0,
		"term_taxonomy_id": 2087,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2088,
		"name": "médias sociaux",
		"slug": "medias-sociaux",
		"term_group": 0,
		"term_taxonomy_id": 2088,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2067,
		"name": "médiation",
		"slug": "mediation",
		"term_group": 0,
		"term_taxonomy_id": 2067,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2066,
		"name": "memes",
		"slug": "memes",
		"term_group": 0,
		"term_taxonomy_id": 2066,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2068,
		"name": "mémoire",
		"slug": "memoire",
		"term_group": 0,
		"term_taxonomy_id": 2068,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2069,
		"name": "migration",
		"slug": "migration",
		"term_group": 0,
		"term_taxonomy_id": 2069,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2070,
		"name": "misogynie",
		"slug": "misogynie",
		"term_group": 0,
		"term_taxonomy_id": 2070,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2071,
		"name": "mobilité",
		"slug": "mobilite",
		"term_group": 0,
		"term_taxonomy_id": 2071,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2072,
		"name": "mode",
		"slug": "mode",
		"term_group": 0,
		"term_taxonomy_id": 2072,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2073,
		"name": "mouvements sociaux",
		"slug": "mouvements-sociaux",
		"term_group": 0,
		"term_taxonomy_id": 2073,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2004,
		"name": "multidisciplinarité",
		"slug": "multidisciplinarite",
		"term_group": 0,
		"term_taxonomy_id": 2004,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1989,
		"name": "multimédia",
		"slug": "multimedia",
		"term_group": 0,
		"term_taxonomy_id": 1989,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1988,
		"name": "multiplateforme",
		"slug": "multiplateforme",
		"term_group": 0,
		"term_taxonomy_id": 1988,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1990,
		"name": "musique",
		"slug": "musique",
		"term_group": 0,
		"term_taxonomy_id": 1990,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2074,
		"name": "nature",
		"slug": "nature",
		"term_group": 0,
		"term_taxonomy_id": 2074,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2075,
		"name": "nudité",
		"slug": "nudite",
		"term_group": 0,
		"term_taxonomy_id": 2075,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2090,
		"name": "pays",
		"slug": "pays",
		"term_group": 0,
		"term_taxonomy_id": 2090,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2091,
		"name": "paysage",
		"slug": "paysage",
		"term_group": 0,
		"term_taxonomy_id": 2091,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1994,
		"name": "peinture",
		"slug": "peinture",
		"term_group": 0,
		"term_taxonomy_id": 1994,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1983,
		"name": "performance",
		"slug": "performance",
		"term_group": 0,
		"term_taxonomy_id": 1983,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1951,
		"name": "photographie",
		"slug": "photographie",
		"term_group": 0,
		"term_taxonomy_id": 1951,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2049,
		"name": "piratage",
		"slug": "piratage",
		"term_group": 0,
		"term_taxonomy_id": 2049,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1995,
		"name": "poésie",
		"slug": "poesie",
		"term_group": 0,
		"term_taxonomy_id": 1995,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2076,
		"name": "politique",
		"slug": "politique",
		"term_group": 0,
		"term_taxonomy_id": 2076,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2077,
		"name": "pornographie",
		"slug": "pornographie",
		"term_group": 0,
		"term_taxonomy_id": 2077,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1965,
		"name": "post-internet",
		"slug": "post-internet",
		"term_group": 0,
		"term_taxonomy_id": 1965,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2078,
		"name": "pouvoir",
		"slug": "pouvoir",
		"term_group": 0,
		"term_taxonomy_id": 2078,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2080,
		"name": "préjugés",
		"slug": "prejuges",
		"term_group": 0,
		"term_taxonomy_id": 2080,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2079,
		"name": "programmation",
		"slug": "programmation",
		"term_group": 0,
		"term_taxonomy_id": 2079,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1993,
		"name": "projection",
		"slug": "projection",
		"term_group": 0,
		"term_taxonomy_id": 1993,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2092,
		"name": "propriété intellectuelle",
		"slug": "propriete-intellectuelle",
		"term_group": 0,
		"term_taxonomy_id": 2092,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2081,
		"name": "psychologie",
		"slug": "psychologie",
		"term_group": 0,
		"term_taxonomy_id": 2081,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2093,
		"name": "publicité",
		"slug": "publicite",
		"term_group": 0,
		"term_taxonomy_id": 2093,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2039,
		"name": "queer",
		"slug": "queer",
		"term_group": 0,
		"term_taxonomy_id": 2039,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2082,
		"name": "racisme",
		"slug": "racisme",
		"term_group": 0,
		"term_taxonomy_id": 2082,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2083,
		"name": "radio",
		"slug": "radio",
		"term_group": 0,
		"term_taxonomy_id": 2083,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1996,
		"name": "réalité augmentée",
		"slug": "realite-augmentee",
		"term_group": 0,
		"term_taxonomy_id": 1996,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1997,
		"name": "réalité virtuelle",
		"slug": "realite-virtuelle",
		"term_group": 0,
		"term_taxonomy_id": 1997,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1954,
		"name": "récit",
		"slug": "recit",
		"term_group": 0,
		"term_taxonomy_id": 1954,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1998,
		"name": "remix",
		"slug": "remix",
		"term_group": 0,
		"term_taxonomy_id": 1998,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2084,
		"name": "représentation",
		"slug": "representation",
		"term_group": 0,
		"term_taxonomy_id": 2084,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2089,
		"name": "réseau",
		"slug": "reseau",
		"term_group": 0,
		"term_taxonomy_id": 2089,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2094,
		"name": "résistance",
		"slug": "resistance",
		"term_group": 0,
		"term_taxonomy_id": 2094,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2095,
		"name": "révolution",
		"slug": "revolution",
		"term_group": 0,
		"term_taxonomy_id": 2095,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2096,
		"name": "risque",
		"slug": "risque",
		"term_group": 0,
		"term_taxonomy_id": 2096,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1991,
		"name": "robotique",
		"slug": "robotique",
		"term_group": 0,
		"term_taxonomy_id": 1991,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2097,
		"name": "santé",
		"slug": "sante",
		"term_group": 0,
		"term_taxonomy_id": 2097,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2100,
		"name": "science",
		"slug": "science",
		"term_group": 0,
		"term_taxonomy_id": 2100,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2101,
		"name": "science-fiction",
		"slug": "science-fiction",
		"term_group": 0,
		"term_taxonomy_id": 2101,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2000,
		"name": "sculpture",
		"slug": "sculpture",
		"term_group": 0,
		"term_taxonomy_id": 2000,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2098,
		"name": "sécurité",
		"slug": "securite",
		"term_group": 0,
		"term_taxonomy_id": 2098,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2102,
		"name": "sexisme",
		"slug": "sexisme",
		"term_group": 0,
		"term_taxonomy_id": 2102,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2103,
		"name": "sexualité",
		"slug": "sexualite",
		"term_group": 0,
		"term_taxonomy_id": 2103,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2110,
		"name": "social",
		"slug": "social",
		"term_group": 0,
		"term_taxonomy_id": 2110,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2104,
		"name": "sociologie",
		"slug": "sociologie",
		"term_group": 0,
		"term_taxonomy_id": 2104,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2105,
		"name": "solidarité",
		"slug": "solidarite",
		"term_group": 0,
		"term_taxonomy_id": 2105,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2106,
		"name": "spiritualité",
		"slug": "spiritualite",
		"term_group": 0,
		"term_taxonomy_id": 2106,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1992,
		"name": "spoken word",
		"slug": "spoken-word",
		"term_group": 0,
		"term_taxonomy_id": 1992,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1999,
		"name": "stéreoscopie",
		"slug": "stereoscopie",
		"term_group": 0,
		"term_taxonomy_id": 1999,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2107,
		"name": "subjectivité",
		"slug": "subjectivite",
		"term_group": 0,
		"term_taxonomy_id": 2107,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2108,
		"name": "subversion",
		"slug": "subversion",
		"term_group": 0,
		"term_taxonomy_id": 2108,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2109,
		"name": "surveillance",
		"slug": "surveillance",
		"term_group": 0,
		"term_taxonomy_id": 2109,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2112,
		"name": "technologie",
		"slug": "technologie",
		"term_group": 0,
		"term_taxonomy_id": 2112,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2111,
		"name": "télécommunications",
		"slug": "telecommunications",
		"term_group": 0,
		"term_taxonomy_id": 2111,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2001,
		"name": "télévision",
		"slug": "television",
		"term_group": 0,
		"term_taxonomy_id": 2001,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2113,
		"name": "textile",
		"slug": "textile",
		"term_group": 0,
		"term_taxonomy_id": 2113,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2003,
		"name": "théâtre",
		"slug": "theatre",
		"term_group": 0,
		"term_taxonomy_id": 2003,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2114,
		"name": "transexuel",
		"slug": "transexuel",
		"term_group": 0,
		"term_taxonomy_id": 2114,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2115,
		"name": "transgenre",
		"slug": "transgenre",
		"term_group": 0,
		"term_taxonomy_id": 2115,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2116,
		"name": "typographie",
		"slug": "typographie",
		"term_group": 0,
		"term_taxonomy_id": 2116,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2119,
		"name": "urbanité",
		"slug": "urbanite",
		"term_group": 0,
		"term_taxonomy_id": 2119,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2117,
		"name": "vêtement",
		"slug": "vetement",
		"term_group": 0,
		"term_taxonomy_id": 2117,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1953,
		"name": "vidéo",
		"slug": "video",
		"term_group": 0,
		"term_taxonomy_id": 1953,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2006,
		"name": "vieillissement",
		"slug": "vieillissement",
		"term_group": 0,
		"term_taxonomy_id": 2006,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2118,
		"name": "violence",
		"slug": "violence",
		"term_group": 0,
		"term_taxonomy_id": 2118,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 1987,
		"name": "vjing",
		"slug": "vjing",
		"term_group": 0,
		"term_taxonomy_id": 1987,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2002,
		"name": "voix",
		"slug": "voix",
		"term_group": 0,
		"term_taxonomy_id": 2002,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	}
]

const termidenglish = [
	{
		"term_id": 2120,
		"name": "3D",
		"slug": "3d-english",
		"term_group": 0,
		"term_taxonomy_id": 2120,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2192,
		"name": "3D printing",
		"slug": "3d-printing",
		"term_group": 0,
		"term_taxonomy_id": 2192,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2124,
		"name": "action",
		"slug": "action-english",
		"term_group": 0,
		"term_taxonomy_id": 2124,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2125,
		"name": "activism",
		"slug": "activism",
		"term_group": 0,
		"term_taxonomy_id": 2125,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2126,
		"name": "agency",
		"slug": "agency",
		"term_group": 0,
		"term_taxonomy_id": 2126,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2281,
		"name": "aging",
		"slug": "aging",
		"term_group": 0,
		"term_taxonomy_id": 2281,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2181,
		"name": "animated gif",
		"slug": "animated-gif",
		"term_group": 0,
		"term_taxonomy_id": 2181,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2127,
		"name": "animation",
		"slug": "animation-english",
		"term_group": 0,
		"term_taxonomy_id": 2127,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2128,
		"name": "anonymity",
		"slug": "anonymity",
		"term_group": 0,
		"term_taxonomy_id": 2128,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2130,
		"name": "architecture",
		"slug": "architecture-english",
		"term_group": 0,
		"term_taxonomy_id": 2130,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2131,
		"name": "archives",
		"slug": "archives-english",
		"term_group": 0,
		"term_taxonomy_id": 2131,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2185,
		"name": "art history",
		"slug": "art-history",
		"term_group": 0,
		"term_taxonomy_id": 2185,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2147,
		"name": "artist-run centre",
		"slug": "artist-run-centre",
		"term_group": 0,
		"term_taxonomy_id": 2147,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2249,
		"name": "augmented reality",
		"slug": "augmented-reality",
		"term_group": 0,
		"term_taxonomy_id": 2249,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2143,
		"name": "bioart",
		"slug": "bioart-english",
		"term_group": 0,
		"term_taxonomy_id": 2143,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2155,
		"name": "body",
		"slug": "body",
		"term_group": 0,
		"term_taxonomy_id": 2155,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2144,
		"name": "capitalism",
		"slug": "capitalism",
		"term_group": 0,
		"term_taxonomy_id": 2144,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2145,
		"name": "cartography",
		"slug": "cartography",
		"term_group": 0,
		"term_taxonomy_id": 2145,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2146,
		"name": "censorship",
		"slug": "censorship",
		"term_group": 0,
		"term_taxonomy_id": 2146,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2148,
		"name": "cinema",
		"slug": "cinema-english",
		"term_group": 0,
		"term_taxonomy_id": 2148,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2149,
		"name": "collaboration",
		"slug": "collaboration-english",
		"term_group": 0,
		"term_taxonomy_id": 2149,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2153,
		"name": "commons",
		"slug": "commons",
		"term_group": 0,
		"term_taxonomy_id": 2153,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2152,
		"name": "communication",
		"slug": "communication-en",
		"term_group": 0,
		"term_taxonomy_id": 2152,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2151,
		"name": "community",
		"slug": "community",
		"term_group": 0,
		"term_taxonomy_id": 2151,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2194,
		"name": "computing",
		"slug": "computing",
		"term_group": 0,
		"term_taxonomy_id": 2194,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2166,
		"name": "copyright",
		"slug": "copyright",
		"term_group": 0,
		"term_taxonomy_id": 2166,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2225,
		"name": "country",
		"slug": "country",
		"term_group": 0,
		"term_taxonomy_id": 2225,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2156,
		"name": "creation",
		"slug": "creation-english",
		"term_group": 0,
		"term_taxonomy_id": 2156,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2157,
		"name": "culture",
		"slug": "culture-english",
		"term_group": 0,
		"term_taxonomy_id": 2157,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2158,
		"name": "cyberfeminism",
		"slug": "cyberfeminism",
		"term_group": 0,
		"term_taxonomy_id": 2158,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2159,
		"name": "dance",
		"slug": "dance",
		"term_group": 0,
		"term_taxonomy_id": 2159,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2165,
		"name": "data",
		"slug": "data",
		"term_group": 0,
		"term_taxonomy_id": 2165,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2160,
		"name": "design",
		"slug": "design-english",
		"term_group": 0,
		"term_taxonomy_id": 2160,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2134,
		"name": "digital art",
		"slug": "digital-art",
		"term_group": 0,
		"term_taxonomy_id": 2134,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2163,
		"name": "diversity",
		"slug": "diversity",
		"term_group": 0,
		"term_taxonomy_id": 2163,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2121,
		"name": "DIY",
		"slug": "diy-english",
		"term_group": 0,
		"term_taxonomy_id": 2121,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2164,
		"name": "djing",
		"slug": "djing-english",
		"term_group": 0,
		"term_taxonomy_id": 2164,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2161,
		"name": "drawing",
		"slug": "drawing",
		"term_group": 0,
		"term_taxonomy_id": 2161,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2150,
		"name": "e-commerce",
		"slug": "e-commerce",
		"term_group": 0,
		"term_taxonomy_id": 2150,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2286,
		"name": "economy",
		"slug": "economy",
		"term_group": 0,
		"term_taxonomy_id": 2286,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2289,
		"name": "education",
		"slug": "education-en",
		"term_group": 0,
		"term_taxonomy_id": 2289,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2291,
		"name": "electroacoustic",
		"slug": "electroacoustic",
		"term_group": 0,
		"term_taxonomy_id": 2291,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2140,
		"name": "electronic art",
		"slug": "electronic-art",
		"term_group": 0,
		"term_taxonomy_id": 2140,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2292,
		"name": "emancipation",
		"slug": "emancipation-en",
		"term_group": 0,
		"term_taxonomy_id": 2292,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2169,
		"name": "empowerment",
		"slug": "empowerment",
		"term_group": 0,
		"term_taxonomy_id": 2169,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2170,
		"name": "environment",
		"slug": "environment",
		"term_group": 0,
		"term_taxonomy_id": 2170,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2213,
		"name": "fashion",
		"slug": "fashion",
		"term_group": 0,
		"term_taxonomy_id": 2213,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2178,
		"name": "feminism",
		"slug": "feminism",
		"term_group": 0,
		"term_taxonomy_id": 2178,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2174,
		"name": "festival",
		"slug": "festival-en",
		"term_group": 0,
		"term_taxonomy_id": 2174,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2175,
		"name": "film",
		"slug": "film-en",
		"term_group": 0,
		"term_taxonomy_id": 2175,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2177,
		"name": "future",
		"slug": "future",
		"term_group": 0,
		"term_taxonomy_id": 2177,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2202,
		"name": "game",
		"slug": "game",
		"term_group": 0,
		"term_taxonomy_id": 2202,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2179,
		"name": "gender",
		"slug": "gender",
		"term_group": 0,
		"term_taxonomy_id": 2179,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2182,
		"name": "globalization",
		"slug": "globalization",
		"term_group": 0,
		"term_taxonomy_id": 2182,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2230,
		"name": "hacking",
		"slug": "hacking",
		"term_group": 0,
		"term_taxonomy_id": 2230,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2183,
		"name": "hacktivism",
		"slug": "hacktivism",
		"term_group": 0,
		"term_taxonomy_id": 2183,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2255,
		"name": "health",
		"slug": "health",
		"term_group": 0,
		"term_taxonomy_id": 2255,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2184,
		"name": "history",
		"slug": "history",
		"term_group": 0,
		"term_taxonomy_id": 2184,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2207,
		"name": "home",
		"slug": "home",
		"term_group": 0,
		"term_taxonomy_id": 2207,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2186,
		"name": "humor",
		"slug": "humor",
		"term_group": 0,
		"term_taxonomy_id": 2186,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2187,
		"name": "hypermedia",
		"slug": "hypermedia-en",
		"term_group": 0,
		"term_taxonomy_id": 2187,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2188,
		"name": "identity",
		"slug": "identity",
		"term_group": 0,
		"term_taxonomy_id": 2188,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2189,
		"name": "illustration",
		"slug": "illustration-en",
		"term_group": 0,
		"term_taxonomy_id": 2189,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2171,
		"name": "immersive environment",
		"slug": "immersive-environment",
		"term_group": 0,
		"term_taxonomy_id": 2171,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2193,
		"name": "improvisation",
		"slug": "improvisation-en",
		"term_group": 0,
		"term_taxonomy_id": 2193,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2141,
		"name": "indigenous",
		"slug": "indigenous",
		"term_group": 0,
		"term_taxonomy_id": 2141,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2195,
		"name": "installation",
		"slug": "installation-en",
		"term_group": 0,
		"term_taxonomy_id": 2195,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2238,
		"name": "intellectual property",
		"slug": "intellectual-property",
		"term_group": 0,
		"term_taxonomy_id": 2238,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2132,
		"name": "interactive art",
		"slug": "interactive-art",
		"term_group": 0,
		"term_taxonomy_id": 2132,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2197,
		"name": "interactivity",
		"slug": "interactivity",
		"term_group": 0,
		"term_taxonomy_id": 2197,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2198,
		"name": "interdisciplinarity",
		"slug": "interdisciplinarity",
		"term_group": 0,
		"term_taxonomy_id": 2198,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2199,
		"name": "intergeneration",
		"slug": "intergeneration-en",
		"term_group": 0,
		"term_taxonomy_id": 2199,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2122,
		"name": "Internet",
		"slug": "internet-english",
		"term_group": 0,
		"term_taxonomy_id": 2122,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2200,
		"name": "intervention",
		"slug": "intervention-en",
		"term_group": 0,
		"term_taxonomy_id": 2200,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2226,
		"name": "landscape",
		"slug": "landscape",
		"term_group": 0,
		"term_taxonomy_id": 2226,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2203,
		"name": "language",
		"slug": "language",
		"term_group": 0,
		"term_taxonomy_id": 2203,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2123,
		"name": "LGBTQ",
		"slug": "lgbtq-english",
		"term_group": 0,
		"term_taxonomy_id": 2123,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2204,
		"name": "liberty",
		"slug": "liberty",
		"term_group": 0,
		"term_taxonomy_id": 2204,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2162,
		"name": "live",
		"slug": "live",
		"term_group": 0,
		"term_taxonomy_id": 2162,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2206,
		"name": "localisation",
		"slug": "localisation-en",
		"term_group": 0,
		"term_taxonomy_id": 2206,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2180,
		"name": "management",
		"slug": "management",
		"term_group": 0,
		"term_taxonomy_id": 2180,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2208,
		"name": "marginalization",
		"slug": "marginalization",
		"term_group": 0,
		"term_taxonomy_id": 2208,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2133,
		"name": "media art",
		"slug": "media-art",
		"term_group": 0,
		"term_taxonomy_id": 2133,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2219,
		"name": "medias",
		"slug": "medias-en",
		"term_group": 0,
		"term_taxonomy_id": 2219,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2221,
		"name": "meditation",
		"slug": "meditation",
		"term_group": 0,
		"term_taxonomy_id": 2221,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2209,
		"name": "memes",
		"slug": "memes-en",
		"term_group": 0,
		"term_taxonomy_id": 2209,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2222,
		"name": "memory",
		"slug": "memory",
		"term_group": 0,
		"term_taxonomy_id": 2222,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2210,
		"name": "migration",
		"slug": "migration-en",
		"term_group": 0,
		"term_taxonomy_id": 2210,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2211,
		"name": "misogyny",
		"slug": "misogyny",
		"term_group": 0,
		"term_taxonomy_id": 2211,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2129,
		"name": "mobile application",
		"slug": "mobile-application",
		"term_group": 0,
		"term_taxonomy_id": 2129,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2212,
		"name": "mobility",
		"slug": "mobility",
		"term_group": 0,
		"term_taxonomy_id": 2212,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2217,
		"name": "multi platform",
		"slug": "multi-platform",
		"term_group": 0,
		"term_taxonomy_id": 2217,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2215,
		"name": "multidisciplinary",
		"slug": "multidisciplinarity",
		"term_group": 0,
		"term_taxonomy_id": 2215,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2216,
		"name": "multimedia",
		"slug": "multimedia-en",
		"term_group": 0,
		"term_taxonomy_id": 2216,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2218,
		"name": "music",
		"slug": "music",
		"term_group": 0,
		"term_taxonomy_id": 2218,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2223,
		"name": "nature",
		"slug": "nature-en",
		"term_group": 0,
		"term_taxonomy_id": 2223,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2252,
		"name": "network",
		"slug": "network",
		"term_group": 0,
		"term_taxonomy_id": 2252,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2224,
		"name": "nudity",
		"slug": "nudity",
		"term_group": 0,
		"term_taxonomy_id": 2224,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2205,
		"name": "open source",
		"slug": "open-source",
		"term_group": 0,
		"term_taxonomy_id": 2205,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2227,
		"name": "painting",
		"slug": "painting",
		"term_group": 0,
		"term_taxonomy_id": 2227,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2135,
		"name": "participatory art",
		"slug": "participatory-art",
		"term_group": 0,
		"term_taxonomy_id": 2135,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2228,
		"name": "performance",
		"slug": "performance-en",
		"term_group": 0,
		"term_taxonomy_id": 2228,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2229,
		"name": "photography",
		"slug": "photography",
		"term_group": 0,
		"term_taxonomy_id": 2229,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2235,
		"name": "poetry",
		"slug": "poetry",
		"term_group": 0,
		"term_taxonomy_id": 2235,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2231,
		"name": "politics",
		"slug": "politics",
		"term_group": 0,
		"term_taxonomy_id": 2231,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2232,
		"name": "pornography",
		"slug": "pornography",
		"term_group": 0,
		"term_taxonomy_id": 2232,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2233,
		"name": "post-internet",
		"slug": "post-internet-en",
		"term_group": 0,
		"term_taxonomy_id": 2233,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2234,
		"name": "power",
		"slug": "power",
		"term_group": 0,
		"term_taxonomy_id": 2234,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2239,
		"name": "prejudices",
		"slug": "prejudices",
		"term_group": 0,
		"term_taxonomy_id": 2239,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2191,
		"name": "print",
		"slug": "print",
		"term_group": 0,
		"term_taxonomy_id": 2191,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2154,
		"name": "privacy",
		"slug": "privacy",
		"term_group": 0,
		"term_taxonomy_id": 2154,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2236,
		"name": "programming",
		"slug": "programming",
		"term_group": 0,
		"term_taxonomy_id": 2236,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2237,
		"name": "projection",
		"slug": "projection-en",
		"term_group": 0,
		"term_taxonomy_id": 2237,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2240,
		"name": "psychology",
		"slug": "psychology",
		"term_group": 0,
		"term_taxonomy_id": 2240,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2136,
		"name": "public art",
		"slug": "public-art",
		"term_group": 0,
		"term_taxonomy_id": 2136,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2201,
		"name": "public intervention",
		"slug": "public-intervention",
		"term_group": 0,
		"term_taxonomy_id": 2201,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2173,
		"name": "public space",
		"slug": "public-space",
		"term_group": 0,
		"term_taxonomy_id": 2173,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2241,
		"name": "publicity",
		"slug": "publicity",
		"term_group": 0,
		"term_taxonomy_id": 2241,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2288,
		"name": "publishing",
		"slug": "publishing",
		"term_group": 0,
		"term_taxonomy_id": 2288,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2242,
		"name": "queer",
		"slug": "queer-en",
		"term_group": 0,
		"term_taxonomy_id": 2242,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2243,
		"name": "racism",
		"slug": "racism",
		"term_group": 0,
		"term_taxonomy_id": 2243,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2244,
		"name": "radio",
		"slug": "radio-en",
		"term_group": 0,
		"term_taxonomy_id": 2244,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2245,
		"name": "remix",
		"slug": "remix-en",
		"term_group": 0,
		"term_taxonomy_id": 2245,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2246,
		"name": "representation",
		"slug": "representation-en",
		"term_group": 0,
		"term_taxonomy_id": 2246,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2253,
		"name": "resistance",
		"slug": "resistance-en",
		"term_group": 0,
		"term_taxonomy_id": 2253,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2254,
		"name": "revolution",
		"slug": "revolution-en",
		"term_group": 0,
		"term_taxonomy_id": 2254,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2247,
		"name": "risk",
		"slug": "risk",
		"term_group": 0,
		"term_taxonomy_id": 2247,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2248,
		"name": "robotic",
		"slug": "robotic",
		"term_group": 0,
		"term_taxonomy_id": 2248,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2256,
		"name": "science",
		"slug": "science-en",
		"term_group": 0,
		"term_taxonomy_id": 2256,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2257,
		"name": "science fiction",
		"slug": "science-fiction-en",
		"term_group": 0,
		"term_taxonomy_id": 2257,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2258,
		"name": "sculpture",
		"slug": "sculpture-en",
		"term_group": 0,
		"term_taxonomy_id": 2258,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2270,
		"name": "security",
		"slug": "security",
		"term_group": 0,
		"term_taxonomy_id": 2270,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2142,
		"name": "self-care",
		"slug": "self-care",
		"term_group": 0,
		"term_taxonomy_id": 2142,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2190,
		"name": "self-image",
		"slug": "self-image",
		"term_group": 0,
		"term_taxonomy_id": 2190,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2290,
		"name": "selfie",
		"slug": "selfie",
		"term_group": 0,
		"term_taxonomy_id": 2290,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2259,
		"name": "sexism",
		"slug": "sexism",
		"term_group": 0,
		"term_taxonomy_id": 2259,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2260,
		"name": "sexuality",
		"slug": "sexuality",
		"term_group": 0,
		"term_taxonomy_id": 2260,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2261,
		"name": "social",
		"slug": "social-en",
		"term_group": 0,
		"term_taxonomy_id": 2261,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2220,
		"name": "social media",
		"slug": "social-media",
		"term_group": 0,
		"term_taxonomy_id": 2220,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2214,
		"name": "social movements",
		"slug": "social-movements",
		"term_group": 0,
		"term_taxonomy_id": 2214,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2262,
		"name": "sociology",
		"slug": "sociology",
		"term_group": 0,
		"term_taxonomy_id": 2262,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2263,
		"name": "solidarity",
		"slug": "solidarity",
		"term_group": 0,
		"term_taxonomy_id": 2263,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2137,
		"name": "sound art",
		"slug": "sound-art",
		"term_group": 0,
		"term_taxonomy_id": 2137,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2172,
		"name": "space",
		"slug": "space",
		"term_group": 0,
		"term_taxonomy_id": 2172,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2168,
		"name": "special effects",
		"slug": "special-effects",
		"term_group": 0,
		"term_taxonomy_id": 2168,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2264,
		"name": "spirituality",
		"slug": "spirituality",
		"term_group": 0,
		"term_taxonomy_id": 2264,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2265,
		"name": "spoken word",
		"slug": "spoken-word-en",
		"term_group": 0,
		"term_taxonomy_id": 2265,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2266,
		"name": "stereoscopy",
		"slug": "stereoscopy",
		"term_group": 0,
		"term_taxonomy_id": 2266,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2251,
		"name": "storytelling",
		"slug": "storytelling",
		"term_group": 0,
		"term_taxonomy_id": 2251,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2176,
		"name": "stream",
		"slug": "stream",
		"term_group": 0,
		"term_taxonomy_id": 2176,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2267,
		"name": "subjectivity",
		"slug": "subjectivity",
		"term_group": 0,
		"term_taxonomy_id": 2267,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2268,
		"name": "subversion",
		"slug": "subversion-en",
		"term_group": 0,
		"term_taxonomy_id": 2268,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2269,
		"name": "surveillance",
		"slug": "surveillance-en",
		"term_group": 0,
		"term_taxonomy_id": 2269,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2271,
		"name": "technology",
		"slug": "technology",
		"term_group": 0,
		"term_taxonomy_id": 2271,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2277,
		"name": "telecommunications",
		"slug": "telecommunications-en",
		"term_group": 0,
		"term_taxonomy_id": 2277,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2278,
		"name": "television",
		"slug": "television-en",
		"term_group": 0,
		"term_taxonomy_id": 2278,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2272,
		"name": "textile",
		"slug": "textile-en",
		"term_group": 0,
		"term_taxonomy_id": 2272,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2273,
		"name": "theater",
		"slug": "theater",
		"term_group": 0,
		"term_taxonomy_id": 2273,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2274,
		"name": "transexual",
		"slug": "transexual",
		"term_group": 0,
		"term_taxonomy_id": 2274,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2275,
		"name": "transgender",
		"slug": "transgender",
		"term_group": 0,
		"term_taxonomy_id": 2275,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2276,
		"name": "typography",
		"slug": "typography",
		"term_group": 0,
		"term_taxonomy_id": 2276,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2279,
		"name": "urbanity",
		"slug": "urbanity",
		"term_group": 0,
		"term_taxonomy_id": 2279,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2280,
		"name": "video",
		"slug": "video-en",
		"term_group": 0,
		"term_taxonomy_id": 2280,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2196,
		"name": "video installation",
		"slug": "video-installation",
		"term_group": 0,
		"term_taxonomy_id": 2196,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2282,
		"name": "violence",
		"slug": "violence-en",
		"term_group": 0,
		"term_taxonomy_id": 2282,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2250,
		"name": "virtual reality",
		"slug": "virtual-reality",
		"term_group": 0,
		"term_taxonomy_id": 2250,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2138,
		"name": "visual art",
		"slug": "visual-art",
		"term_group": 0,
		"term_taxonomy_id": 2138,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2283,
		"name": "vjing",
		"slug": "vjing-en",
		"term_group": 0,
		"term_taxonomy_id": 2283,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2284,
		"name": "voice",
		"slug": "voice",
		"term_group": 0,
		"term_taxonomy_id": 2284,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2285,
		"name": "wearable",
		"slug": "wearable",
		"term_group": 0,
		"term_taxonomy_id": 2285,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2139,
		"name": "web art",
		"slug": "web-art",
		"term_group": 0,
		"term_taxonomy_id": 2139,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2167,
		"name": "web development",
		"slug": "web-development-en",
		"term_group": 0,
		"term_taxonomy_id": 2167,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	},
	{
		"term_id": 2287,
		"name": "writing",
		"slug": "writing",
		"term_group": 0,
		"term_taxonomy_id": 2287,
		"taxonomy": "keywords",
		"description": "",
		"parent": 0,
		"count": 0,
		"filter": "raw"
	}
]

keywordsmap.forEach((obj) => {
  termidfrench.forEach(frenchid => {
    if (obj.french == frenchid.name) {
      obj.frenchkeywordid = frenchid.term_id;
    }
  })

  termidenglish.forEach(englishid => {
    if (obj.english == englishid.name) {
      obj.englishkeywordid = englishid.term_id;
    }
  })
})

const keywordsmap2 = JSON.parse(fs.readFileSync('./keywordsmap.json', 'utf8'));

// console.log(keywordsmap);
// var file = './keywordsmap.json';
// jsonfile.writeFileSync(file, keywordsmap)

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // operate on events
    db.collection('events').find().forEach(function(doc) {
        doc.keywordsenglish = [];
        doc.keywordsfrench = [];
        doc.keywords.forEach((keyword) => {
            keywordsmap2.forEach((map) => {
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
        db.collection('events').save(doc);
    });
  }
});





