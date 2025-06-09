const db = require('../server').db;
const moment = require('moment');

const requestGuarantor = (req, res) => {
  const loanTakerId = req.user.Employee_id;
  const guarantorIds = req.body.guarantors;

  if (!Array.isArray(guarantorIds) || guarantorIds.length === 0 || guarantorIds.length > 2) {
    return res.status(400).json({ message: "Please provide 1 or 2 guarantor IDs." });
  }

  const sql = `SELECT * FROM general_employee WHERE Employee_id IN (?, ?, ?)`;
  const queryParams = [loanTakerId, ...guarantorIds];

  db.query(sql, queryParams, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    const employees = {};
    results.forEach(emp => employees[emp.Employee_id] = emp);

    const loanTaker = employees[loanTakerId];
    const guarantor1 = employees[guarantorIds[0]];
    const guarantor2 = guarantorIds[1] ? employees[guarantorIds[1]] : null;

    if (!loanTaker || !guarantor1) return res.status(404).json({ message: "Required employee data missing." });

    const loanTakerSalary = Number(loanTaker.salary);
    const loanTakerName = `${loanTaker.Employee_Fname} ${loanTaker.Employee_Lname}`;

    const checkEligibility = (emp) => {
      const age = moment().diff(moment(emp.Employee_DOB), 'years');
      return age < 55 && emp.isPermanent === 1;
    };

    const g1Eligible = checkEligibility(guarantor1);
    const g1Salary = Number(guarantor1.salary);

    if (g1Eligible && g1Salary >= loanTakerSalary) {
      const msg = `Dear ${guarantor1.Employee_Fname}, can you be my guarantor to ${loanTakerName}?`;
      const insertSql = `INSERT INTO loan_guarantors (loan_taker_id, guarantor_id, request_message) VALUES (?, ?, ?)`;
      db.query(insertSql, [loanTakerId, guarantor1.Employee_id, msg], (err) => {
        if (err) return res.status(500).json({ message: "Insert failed", error: err });
        return res.json({ success: true, message: msg });
      });
    } else if (guarantor2) {
      const g2Eligible = checkEligibility(guarantor2);
      const g2Salary = Number(guarantor2.salary);

      if (g1Eligible && g2Eligible && g1Salary + g2Salary >= loanTakerSalary) {
        const msg1 = `Dear ${guarantor1.Employee_Fname}, can you be my guarantor to ${loanTakerName}?`;
        const msg2 = `Dear ${guarantor2.Employee_Fname}, can you be my guarantor to ${loanTakerName}?`;

        const insertSql = `INSERT INTO loan_guarantors (loan_taker_id, guarantor_id, request_message) VALUES ?`;
        const values = [
          [loanTakerId, guarantor1.Employee_id, msg1],
          [loanTakerId, guarantor2.Employee_id, msg2],
        ];

        db.query(insertSql, [values], (err) => {
          if (err) return res.status(500).json({ message: "Insert failed", error: err });
          return res.json({ success: true, message: [msg1, msg2] });
        });
      } else {
        return res.status(400).json({ message: "Guarantors are not eligible based on age or salary" });
      }
    } else {
      return res.status(400).json({ message: "First guarantor is not enough, please add a second one" });
    }
  });
};

module.exports = { requestGuarantor };
