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