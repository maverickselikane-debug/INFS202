const sqlite3 = require('sqlite3').verbose();

// This creates a database file called students.db
const db = new sqlite3.Database('./students.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  // Users table for login/register
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Students table
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      course TEXT NOT NULL,
      year INTEGER NOT NULL,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add some sample students so the app isn't empty
  db.get("SELECT COUNT(*) as count FROM students", (err, row) => {
    if (row && row.count === 0) {
      const sampleStudents = [
        ['Alice Mokoena', 'alice@student.ac.bw', 'Computer Science', 2, '71234567'],
        ['Bongani Dube', 'bongani@student.ac.bw', 'Information Systems', 3, '72345678'],
        ['Chipo Sithole', 'chipo@student.ac.bw', 'Business IT', 1, '73456789'],
        ['David Nkosi', 'david@student.ac.bw', 'Computer Science', 4, '74567890'],
        ['Emily Tau', 'emily@student.ac.bw', 'Information Systems', 2, '75678901'],
      ];

      sampleStudents.forEach(s => {
        db.run(
          "INSERT INTO students (name, email, course, year, phone) VALUES (?, ?, ?, ?, ?)",
          s
        );
      });

      console.log('Sample students added');
    }
  });
});

module.exports = db;
