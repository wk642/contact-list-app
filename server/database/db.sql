-- create database

-- DROP the database first in case there's an existing one
DROP DATABASE 'wkcontactlistapp';
-- CREATE the database now
CREATE DATABASE "wkcontactlistapp";

-- connect to the database
\connect wkcontactlistapp;

-- CREATE tables
-- CONTACTS
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  phone_number VARCHAR(15),
  notes text,
  group_id UUID REFERENCES groups(id),
  profile_image VARBINARY(MAX), --using varbinary from https://stackoverflow.com/questions/29746501/which-data-type-should-be-used-for-saving-images-in-database
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};

-- GROUPS
CREATE TABLE IF NOT EXISTS groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name VARCHAR,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)