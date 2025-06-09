const db = require('../server').db; // Make sure server.js exports db
const moment = require('moment');   // We'll use moment to calculate age

// You may need to install moment: npm install moment

const Eligibility = (Employee_id, callback) => {
    // const Employee_id="EMP002";
  if (!Employee_id) {
    return callback({ success: false, message: 'Employee ID is required' });
  }

  const query = 'SELECT Employee_Fname, Employee_Lname, Employee_DOB, isPermanent FROM general_employee WHERE Employee_id = ?';
  
  db.query(query, [Employee_id], (err, results) => {
    if (err) {
      return callback({ success: false, message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return callback({ success: false, message: 'Employee not found' });
    }

    const emp = results[0];
    const fullName = `${emp.Employee_Fname} ${emp.Employee_Lname}`;

    const age = moment().diff(moment(emp.Employee_DOB), 'years');

    if (age < 55 && emp.isPermanent === 1) {
      return callback({
        success: true,
        message: `Dear ${fullName}, you are eligible.`
      });
    } else {
      return callback({
        success: true,
        message: `Dear ${fullName}, you are not eligible.`
      });
    }
  });
  
};

module.exports = { Eligibility };
