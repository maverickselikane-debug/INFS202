const pool = require('../db');
const authCheck = require('../auth-check');

module.exports = async (req, res) => {
  if (!authCheck(req, res)) return;

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
      if (!rows[0]) return res.status(404).json({ message: 'Student not found' });
      res.json(rows[0]);
    } catch {
      res.status(500).json({ message: 'Error getting student' });
    }
  }

  else if (req.method === 'DELETE') {
    try {
      const { rows } = await pool.query('DELETE FROM students WHERE id = $1 RETURNING id', [id]);
      if (!rows[0]) return res.status(404).json({ message: 'Student not found' });
      res.json({ message: 'Student deleted successfully' });
    } catch {
      res.status(500).json({ message: 'Error deleting student' });
    }
  }

  else {
    res.status(405).end();
  }
};
