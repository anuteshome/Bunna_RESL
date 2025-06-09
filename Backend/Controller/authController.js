const db = require('../server').db; // We'll export db from server.js
const jwt = require('jsonwebtoken');

// Login function
const login = (req, res) => {
  const { Employee_id, password } = req.body;

  if (!Employee_id || !password) {
    return res.status(400).json({ message: 'Employee ID and password are required' });
  }

  const query = 'SELECT * FROM general_employee WHERE Employee_id = ?';
  db.query(query, [Employee_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid Employee ID or password' });
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid Employee ID or password' });
    }
    // jwt
    const token = jwt.sign(
      { Employee_id: user.Employee_id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Logged in successfully',
      employee: {
        id: user.Employee_id,
        token,
        name: `${user.Employee_Fname} ${user.Employee_Lname}`,
        role: user.role,
      }
    });
  });
};





module.exports = { login };