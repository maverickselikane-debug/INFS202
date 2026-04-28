const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Please enter username and password' });

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = rows[0];

    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Logged in successfully', token, username: user.username });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
