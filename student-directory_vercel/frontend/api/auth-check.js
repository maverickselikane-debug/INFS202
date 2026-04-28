const jwt = require('jsonwebtoken');

function authCheck(req, res) {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({ message: 'No token, please log in' });
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(401).json({ message: 'Token is not valid' });
    return null;
  }
}

module.exports = authCheck;
