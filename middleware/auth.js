const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization'];

  if (!token) return res.status(403).send('Token required');

  jwt.verify(token, 'SECRET_KEY', (err, student) => {
    if (err) return res.status(403).send('Invalid token');
    req.student = student;
    next();
  });
};
module.exports = authenticateToken;