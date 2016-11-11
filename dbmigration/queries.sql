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

SELECT term_node.tid, term_data.name as medium, term_node.vid as documentID, vocabulary.name as type
FROM term_node
JOIN term_data ON term_node.tid=term_data.tid
JOIN vocabulary ON term_data.vid=vocabulary.vid and vocabulary.name='Médium';

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