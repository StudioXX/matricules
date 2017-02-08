SELECT node.nid, node.vid, node_revisions.body as body, node.title, keywordsmap.name as keywords, content_type_content_event.field_eventdate_value as start, content_type_content_event.field_eventdate_value2 as end
FROM node 
JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN node_revisions on node_revisions.vid=node.vid
JOIN content_type_content_event on node_revisions.vid=content_type_content_event.vid
WHERE node.type='content_event'

/* create english table */

CREATE TABLE eventsenglish
SELECT node.nid, node.vid, node.tnid, node.language, node_revisions.body as bodyenglish, node.title as titleenglish, keywordsmap.name as keywords, content_type_content_event.field_eventdate_value as start, content_type_content_event.field_eventdate_value2 as end
FROM node
JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN node_revisions on node_revisions.vid=node.vid
JOIN content_type_content_event on node_revisions.vid=content_type_content_event.vid
WHERE node.type='content_event' AND language='en'

/* merge event keywords onto documents */

CREATE TABLE keywordsevents
SELECT GROUP_CONCAT(term_data.name SEPARATOR ', ') as keywords, term_node.nid, content_field_linked_documents_video.field_linked_documents_video_nid as associateddoc, node.title as doctitle
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Keywords'
JOIN content_field_linked_documents_video on content_field_linked_documents_video.nid = term_node.nid
JOIN node on node.nid = content_field_linked_documents_video.field_linked_documents_video_nid
GROUP by nid

-- create eventsmerged table with both languages, keywords, participants
SELECT eventsenglish.tnid, eventsenglish.bodyenglish, eventsenglish.titleenglish, eventsenglish.start, eventsenglish.end, eventsfrench.titlefrench, eventsfrench.bodyfrench, CONCAT(eventsenglish.keywords, ', ',  eventsfrench.keywords) AS keywords
FROM eventsenglish
JOIN eventsfrench on eventsenglish.tnid = eventsfrench.tnid

/* merge participants onto eventsenglish table */

-- merge participants name onto content_field_participants table

SELECT content_field_participant.nid, GROUP_CONCAT(node_revisions.title SEPARATOR ', ') as names
FROM content_field_participant
JOIN node_revisions ON content_field_participant.field_participant_nid = node_revisions.nid
GROUP BY content_field_participant.nid


--- create table of events and their participants
SELECT DISTINCT content_field_participant.vid, content_field_participant.nid, content_field_participant.field_participant_nid, GROUP_CONCAT(node_revisions.title SEPARATOR ', ') as participants
FROM content_field_participant
JOIN node_revisions ON content_field_participant.field_participant_nid=node_revisions.nid
GROUP BY nid

-- merge these two tables
SELECT eventsmerged.tnid, eventsmerged.titleenglish, eventsmerged.titlefrench, eventsmerged.bodyenglish, eventsmerged.bodyfrench, eventsmerged.start, eventsmerged.end, eventsmerged.keywords, eventsparticipantsmap.participants
FROM eventsmerged
JOIN eventsparticipantsmap on eventsmerged.tnid=eventsparticipantsmap.nid

-- map associated docs onto participants

SELECT content_field_participant.nid, GROUP_CONCAT(node_revisions.title SEPARATOR ', ') as names, content_field_linked_documents.field_linked_documents_nid as associateddoc
FROM content_field_participant
JOIN node_revisions ON content_field_participant.field_participant_nid = node_revisions.nid
JOIN content_field_linked_documents on content_field_linked_documents.nid = content_field_participant.nid
GROUP BY content_field_participant.nid

SELECT content_field_participant.nid, GROUP_CONCAT(node_revisions.title SEPARATOR ', ') as names, content_field_linked_documents.field_linked_documents_nid as associateddoc
FROM content_field_participant
JOIN node_revisions ON content_field_participant.field_participant_nid = node_revisions.nid
left JOIN content_field_linked_documents on content_field_linked_documents.nid = content_field_participant.nid
GROUP BY content_field_participant.nid





--- merge events 

CREATE TABLE eventswithparticipantscategories
SELECT eventsmergedwithparticipants.tnid, eventsmergedwithparticipants.titleenglish, eventsmergedwithparticipants.titlefrench, eventsmergedwithparticipants.bodyenglish, eventsmergedwithparticipants.bodyfrench, eventsmergedwithparticipants.start, eventsmergedwithparticipants.end, eventsmergedwithparticipants.keywords, eventsmergedwithparticipants.participants, categoriemap.name
FROM eventsmergedwithparticipants
JOIN categoriemap on eventsmergedwithparticipants.tnid=categoriemap.id


SELECT eventswithparticipantscategories.tnid, eventswithparticipantscategories.titleenglish, eventswithparticipantscategories.titlefrench, eventswithparticipantscategories.bodyenglish, eventswithparticipantscategories.bodyfrench, eventswithparticipantscategories.start, eventswithparticipantscategories.end, eventswithparticipantscategories.keywords, eventswithparticipantscategories.participants, eventswithparticipantscategories.name as categorie, content_field_sujet.field_sujet_value
FROM eventswithparticipantscategories
JOIN content_field_sujet on content_field_sujet.nid=eventswithparticipantscategories.tnid




-- create participants table
SELECT node.nid, node.vid, node.tnid, node.language, node_revisions.body as bodyenglish, node.title as titleenglish, keywordsmap.name as keywords
FROM node
JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN node_revisions on node_revisions.vid=node.vid
JOIN content_type_content_entity on node_revisions.vid=content_type_content_entity.vid
WHERE node.type='content_entity' AND language='en'


---

SELECT eventsbilingue.tnid, eventsbilingue.bodyenglish, eventsbilingue.titleenglish, eventsbilingue.start, eventsbilingue.end, eventsbilingue.titlefrench, eventsbilingue.bodyfrench, eventsparticipantsmap.participants, categoriemap.name, content_field_sujet.field_sujet_value
FROM eventsbilingue
LEFT JOIN eventsparticipantsmap on eventsbilingue.tnid=eventsparticipantsmap.nid
LEFT JOIN categoriemap on eventsbilingue.tnid=categoriemap.id
LEFT JOIN content_field_sujet on content_field_sujet.nid=eventsbilingue.tnid
GROUP BY tnid

SELECT eventsbilingue.tnid, eventsbilingue.bodyenglish, eventsbilingue.titleenglish, eventsbilingue.start, eventsbilingue.end, eventsbilingue.titlefrench, eventsbilingue.bodyfrench, eventsparticipantsmap.participants, categoriemap.name, content_field_sujet.field_sujet_value
FROM eventsbilingue
LEFT JOIN eventsparticipantsmap on eventsbilingue.tnid=eventsparticipantsmap.nid
LEFT JOIN categoriemap on eventsbilingue.tnid=categoriemap.id
LEFT JOIN content_field_sujet on content_field_sujet.nid=eventsbilingue.tnid
LEFT JOIN keywordsmap ON keywordsmap.documentID=eventsbilingue.tnid
GROUP BY tnid






SELECT eventsbilingue.tnid, eventsbilingue.bodyenglish, eventsbilingue.titleenglish, eventsbilingue.start, eventsbilingue.end, eventsbilingue.titlefrench, eventsbilingue.bodyfrench, keywordsmap2.name as keywords, eventsparticipantsmap.participants, categoriemap.name, content_field_sujet.field_sujet_value, content_field_lien.field_lien_url, content_field_lien.field_lien_title
FROM eventsbilingue
LEFT JOIN eventsparticipantsmap on eventsbilingue.tnid=eventsparticipantsmap.nid
LEFT JOIN categoriemap on eventsbilingue.tnid=categoriemap.id
LEFT JOIN content_field_sujet on content_field_sujet.nid=eventsbilingue.tnid
LEFT JOIN keywordsmap2 ON keywordsmap2.nid=eventsbilingue.tnid
LEFT JOIN content_field_lien ON content_field_lien.nid = eventsbilingue.tnid
GROUP BY tnid


CREATE TABLE eventsrelatedgallery
SELECT term_node.nid, GROUP_CONCAT(node.title SEPARATOR ', ') AS gallery
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN content_field_linked_documents_galery on content_field_linked_documents_galery.nid = term_node.nid
JOIN node on node.nid = content_field_linked_documents_galery.field_linked_documents_galery_nid
GROUP by nid


-------- FINAL EVENTS TABLE
SELECT eventsalltaxes.tnid, eventsalltaxes.bodyenglish, eventsalltaxes.titleenglish, eventsalltaxes.titlefrench, eventsalltaxes.bodyfrench, eventsalltaxes.start, eventsalltaxes.end, eventsalltaxes.keywords, eventsalltaxes.participants, eventsalltaxes.name as category, eventsalltaxes.field_sujet_value as subject, eventsalltaxes.field_lien_url as linkurl, eventsalltaxes.field_lien_title as linktitle, eventsrelatedaudios.audio, eventsrelatedcommuniq.communiq, eventsrelateddocs.docs, eventsrelatedgallery.gallery, eventsrelatedprogram.program, eventsrelatedvideos.videos
FROM eventsalltaxes
LEFT JOIN eventsrelatedaudios on eventsrelatedaudios.nid = eventsalltaxes.tnid
LEFT JOIN eventsrelatedcommuniq on eventsrelatedcommuniq.nid = eventsalltaxes.tnid
LEFT JOIN eventsrelatedvideos on eventsrelatedvideos.nid = eventsalltaxes.tnid
LEFT JOIN eventsrelateddocs on eventsrelateddocs.nid = eventsalltaxes.tnid
LEFT JOIN eventsrelatedprogram on eventsrelatedprogram.nid = eventsalltaxes.tnid
LEFT JOIN eventsrelatedgallery on eventsrelatedgallery.nid = eventsalltaxes.tnid