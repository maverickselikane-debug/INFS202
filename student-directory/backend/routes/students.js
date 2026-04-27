const express = require('express');
const router = express.Router();
const db = require('../database');
const authMiddleware = require('../middleware/auth');

// GET /api/students - get all students (supports search with ?search=name)
router.get('/', authMiddleware, (req, res) => {
  const search = req.query.search || '';

  let query = "SELECT * FROM students";
  let params = [];

  // If there is a search term, filter by name or course
  if (search) {
    query = "SELECT * FROM students WHERE name LIKE ? OR course LIKE ? OR email LIKE ?";
    params = [`%${search}%`, `%${search}%`, `%${search}%`];
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting students' });
    }
    res.json(rows);
  });
});

// GET /api/students/:id - get one student by ID
router.get('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM students WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting student' });
    }

    if (!row) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(row);
  });
});

// POST /api/students - add a new student
router.post('/', authMiddleware, (req, res) => {
  const { name, email, course, year, phone } = req.body;

  // Validation
  if (!name || !email || !course || !year) {
    return res.status(400).json({ message: 'Name, email, course and year are required' });
  }

  // Simple email check
  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  db.run(
    "INSERT INTO students (name, email, course, year, phone) VALUES (?, ?, ?, ?, ?)",
    [name, email, course, year, phone || ''],
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Return the new student
      db.get("SELECT * FROM students WHERE id = ?", [this.lastID], (err, row) => {
        res.status(201).json(row);
      });
    }
  );
});

// DELETE /api/students/:id - delete a student
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM students WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting student' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  });
});

module.exports = router;
