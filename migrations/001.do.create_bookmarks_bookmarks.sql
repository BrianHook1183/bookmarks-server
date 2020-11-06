create table bookmarks (
  id INTEGER primary key generated by default as identity,
  b_title varchar(255) NOT NULL,
  b_url varchar(255) NOT NULL,
  b_description text, 
  b_rating integer NOT NULL
);