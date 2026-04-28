const pool = require('../db');
const authCheck = require('../auth-check');

module.exports = async (req, res) => {
  if (!authCheck(req, res)) return;

  if (req.method === 'GET') {
    const search = req.query.search || '';
    try {
      const { rows } = search
        ? await pool.query(
            'SELECT * FROM students WHERE name ILIKE $1 OR course ILIKE $1 OR email ILIKE $1',
            [`%${search}%`]
          )
        : await pool.query('SELECT * FROM students ORDER BY id');
      res.json(rows);
    } catch {
      res.status(500).json({ message: 'Error getting students' });
    }
  }

  else if (req.method === 'POST') {
    const { name, email, course, year, phone } = req.body;

    if (!name || !email || !course || !year)
      return res.status(400).json({ message: 'Name, email, course and year are required' });
    if (!email.includes('@'))
      return res.status(400).json({ message: 'Please enter a valid email' });

    try {
      const { rows } = await pool.query(
        'INSERT INTO students (name, email, course, year, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, course, year, phone || '']
      );
      res.status(201).json(rows[0]);
    } catch {
      res.status(400).json({ message: 'Email already exists' });
    }
  }

  else {
    res.status(405).end();
  }
};
