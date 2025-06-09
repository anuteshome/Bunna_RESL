const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Login



module.exports.db = db;

// Import controllers
const { login } = require('./Controller/authController');
const {Eligibility} =require('./Controller/eligibility')

// Sample rou te
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { authenticateToken } = require('./middleware/auth');
const { requestGuarantor } = require('./Controller/loanController');

app.post('/api/loan/guarantee', authenticateToken, requestGuarantor);

app.get('/api/eligibility', authenticateToken, (req, res) => {
  const employeeId = req.user.Employee_id;

  Eligibility(employeeId, (result) => {
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.json(result);
  });
});


const {getNotifications} = require('./Controller/GetNotification');
const {acceptNotification} = require('./Controller/AcceptNotification');

app.get('/api/loan/notifications', authenticateToken, getNotifications);
app.post('/api/loan/notifications/accept', authenticateToken, acceptNotification);


const { getApprovals, approveRequest } = require('./Controller/BranchManagerApproval');

// View all approvals
app.get('/api/manager/approvals', getApprovals);

// Approve request
app.post('/api/manager/approvals/approve', approveRequest);
// After successful login response:
const { getFinanceData } = require('./Controller/FinanceController');

app.get('/api/finance', getFinanceData);
// Login route
app.post('/api/login', login);


