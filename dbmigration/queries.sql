/*
SQL queries for matricules
*/

SELECT  m.*
FROM    (
        SELECT  nid, MAX(vid) AS mvid
        FROM    content_type_content_document
        GROUP BY
                nid
        ) q
JOIN    content_type_content_document m
ON      (m.nid, m.vid) = (q.nid, q.mvid)

/*
only certain columns
*/

SELECT  m.field_title_value, field_content_description_value, field_date_value
FROM    (
        SELECT  nid, MAX(vid) AS mvid
        FROM    content_type_content_document
        GROUP BY
                nid
        ) q
JOIN    content_type_content_document m
ON      (m.nid, m.vid) = (q.nid, q.mvid)

/*
get categories
*/

SELECT  name, tid
FROM   term_data
WHERE (vid=1)

/*
vid key:
1 - category
2 - ??
3 - medium
4 - support
5 - keyword
*/

/*
select all vocab
*/

SELECT term_node.tid, term_data.name, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid

/* 
select only keywords
*/

SELECT term_node.tid, term_data.name, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Keywords';


/*
create categorie map*/

INSERT INTO categoriemap
SELECT term_node.tid, term_node.vid as documentID,vocabulary.name as type, term_data.name
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Catégorie';

/*
get all keywords for each node
*/

SELECT term_node.tid, term_node.vid as documentID, vocabulary.name as type, GROUP_CONCAT(term_data.name SEPARATOR ', ') as name
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Keywords'
GROUP by documentID

/*
merge map
*/

SELECT node.vid, content_type_content_document.field_title_value as name, node.title, keywordsmap.name as keywords
FROM node 
JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN content_type_content_document on content_type_content_document.vid=node.vid
WHERE node.type='content_document'

/*
return keywordless documents
*/

SELECT node.vid, node.title, keywordsmap.name as keywords, node.created
FROM node 
LEFT JOIN keywordsmap ON keywordsmap.documentID=node.vid
WHERE keywordsmap.documentID IS NULL 
AND node.type='content_document'

/*
return mediums
*/

SELECT term_node.tid, term_node.vid as documentID, vocabulary.name as type, term_data.name as medium
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium';

/*
return support and insert into map table
*/

INSERT into supportmap
SELECT term_node.tid, term_node.vid as documentID, vocabulary.name as type, term_data.name as support
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Support';

/*
get links and format as json
*/
SELECT
  vid,
  GROUP_CONCAT(CONCAT('{url:"', field_lien_url, '", title:"',field_lien_title,'"}')) links
FROM
  content_field_lien
GROUP BY
  vid

/*
full query
*/

SELECT node.vid, content_type_content_document.field_title_value as name, node.title, keywordsmap.name as keywords, mediums.medium, content_type_content_document.field_date_value
FROM node 
LEFT OUTER JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN content_type_content_document on content_type_content_document.vid=node.vid
JOIN (SELECT term_node.tid, term_data.name as medium, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium') as mediums on mediums.documentID=node.vid
WHERE node.type='content_document'


/*
get subject

use LEFT OUTER JOIN to include null values
*/

SELECT node.vid, content_type_content_document.field_title_value as formed_title, node.title as accession_number, keywordsmap.name as keywords, mediums.medium, content_type_content_document.field_date_value as date, content_field_sujet.field_sujet_value
FROM node 
LEFT OUTER JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN content_type_content_document on content_type_content_document.vid=node.vid
JOIN (SELECT term_node.tid, term_data.name as medium, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium') as mediums on mediums.documentID=node.vid
LEFT OUTER JOIN content_field_sujet on content_field_sujet.vid=mediums.documentID
WHERE node.type='content_document'

/*
add categories
*/

SELECT content_type_content_document.field_title_value as formed_title, node.title as accession_number, keywordsmap.name as keywords, mediums.medium, content_type_content_document.field_date_value as date, content_field_sujet.field_sujet_value, categoriemap.name as categorie
FROM node 
LEFT OUTER JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN content_type_content_document on content_type_content_document.vid=node.vid
JOIN (SELECT term_node.tid, term_data.name as medium, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium') as mediums on mediums.documentID=node.vid
LEFT OUTER JOIN content_field_sujet on content_field_sujet.vid=mediums.documentID
LEFT OUTER JOIN categoriemap on categoriemap.documentID=content_type_content_document.vid
WHERE node.type='content_document'

/*
add support
*/

SELECT content_type_content_document.field_title_value as formed_title, node.title as accession_number, keywordsmap.name as keywords, mediums.medium, content_type_content_document.field_date_value as date, content_field_sujet.field_sujet_value, categoriemap.name as categorie, supportmap.name as support
FROM node 
LEFT OUTER JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN content_type_content_document on content_type_content_document.vid=node.vid
JOIN (SELECT term_node.tid, term_data.name as medium, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium') as mediums on mediums.documentID=node.vid
LEFT OUTER JOIN content_field_sujet on content_field_sujet.vid=mediums.documentID
LEFT OUTER JOIN categoriemap on categoriemap.documentID=content_type_content_document.vid
LEFT OUTER JOIN supportmap on supportmap.documentID=content_type_content_document.vid
WHERE node.type='content_document'

/*
with links
*/
SELECT content_type_content_document.field_title_value as formed_title, content_type_content_document.field_content_description_value, node.title as accession_number, keywordsmap.name as keywords, mediums.medium, content_type_content_document.field_date_value as date, content_field_sujet.field_sujet_value, categoriemap.name as categorie, supportmap.name as support, content_type_content_document.field_physical_description_value, linksmap.links as links
FROM node 
LEFT OUTER JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN content_type_content_document on content_type_content_document.vid=node.vid
JOIN (SELECT term_node.tid, term_data.name as medium, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium') as mediums on mediums.documentID=node.vid
LEFT OUTER JOIN content_field_sujet on content_field_sujet.vid=mediums.documentID
LEFT OUTER JOIN categoriemap on categoriemap.documentID=content_type_content_document.vid
LEFT OUTER JOIN supportmap on supportmap.documentID=content_type_content_document.vid
LEFT OUTER JOIN linksmap on linksmap.vid=content_type_content_document.vid
WHERE node.type='content_document'

/*
with notes
*/
SELECT content_type_content_document.field_title_value as formed_title, content_type_content_document.field_content_description_value, node.title as accession_number, keywordsmap.name as keywords, mediums.medium, content_type_content_document.field_date_value as date, content_field_sujet.field_sujet_value, categoriemap.name as categorie, supportmap.name as support, content_type_content_document.field_physical_description_value, linksmap.links as links, notesmap.notes
FROM node 
LEFT OUTER JOIN keywordsmap ON keywordsmap.documentID=node.vid
JOIN content_type_content_document on content_type_content_document.vid=node.vid
JOIN (SELECT term_node.tid, term_data.name as medium, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium') as mediums on mediums.documentID=node.vid
LEFT OUTER JOIN content_field_sujet on content_field_sujet.vid=mediums.documentID
LEFT OUTER JOIN categoriemap on categoriemap.documentID=content_type_content_document.vid
LEFT OUTER JOIN supportmap on supportmap.documentID=content_type_content_document.vid
LEFT OUTER JOIN linksmap on linksmap.vid=content_type_content_document.vid
LEFT OUTER JOIN notesmap on notesmap.vid=content_type_content_document.vid
WHERE node.type='content_document'
