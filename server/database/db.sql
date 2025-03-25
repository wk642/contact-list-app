-- create database

-- DROP the database first in case there's an existing one
DROP DATABASE wkcontactlistapp;
-- CREATE the database now
CREATE DATABASE wkcontactlistapp;

-- connect to the database
\connect wkcontactlistapp;

-- CREATE tables 
-- GROUPS -- have to create this first, or else the foreign key linking is not going to work.
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name VARCHAR,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONTACTS
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  phone_number VARCHAR(15),
  notes text,
  group_id UUID REFERENCES groups(id),
  profile_image BYTEA, --https://risingwave.com/blog/introduction-to-postgresql-bytea-data-type/
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserting minimum of 3 mock data
 -- GROUPS
 INSERT INTO groups (group_name) VALUES
 ('Family'),
 ('Work'),
 ('Friends');

-- CONTACTS
INSERT INTO contacts (first_name, last_name, email, phone_number, notes, profile_image, group_id) VALUES
 ('Winnie', 'Kelley', 'wk01@gmail.com', '555-111-1111', 'This is just a mock contact', NULL, (SELECT id FROM groups WHERE group_name = 'Family')),
 ('John', 'Dough', 'wk02@gmail.com', '555-111-1112', NULL, NULL, (SELECT id FROM groups WHERE group_name = 'Work')),
 ('Jane', 'Dough', 'wk03@gmail.com', '555-111-1113', 'Besties!!!', NULL, (SELECT id FROM groups WHERE group_name = 'Friends'));
