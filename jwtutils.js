const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; 

// Generate JWT token
const generateToken = (username) => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
