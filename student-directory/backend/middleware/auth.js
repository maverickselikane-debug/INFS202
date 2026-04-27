const jwt = require('jsonwebtoken');

// This middleware checks if the user is logged in
function authMiddleware(req, res, next) {
  // Get the token from the request headers
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token, please log in' });
  }

  try {
    // Verify the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
