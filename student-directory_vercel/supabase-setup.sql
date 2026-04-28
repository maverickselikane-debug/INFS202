-- Run this in your Supabase SQL Editor to set up the database

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  course TEXT NOT NULL,
  year INTEGER NOT NULL,
  phone TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO students (name, email, course, year, phone) VALUES
  ('Alice Mokoena', 'alice@student.ac.bw', 'Computer Science', 2, '71234567'),
  ('Bongani Dube', 'bongani@student.ac.bw', 'Information Systems', 3, '72345678'),
  ('Chipo Sithole', 'chipo@student.ac.bw', 'Business IT', 1, '73456789'),
  ('David Nkosi', 'david@student.ac.bw', 'Computer Science', 4, '74567890'),
  ('Emily Tau', 'emily@student.ac.bw', 'Information Systems', 2, '75678901')
ON CONFLICT (email) DO NOTHING;
