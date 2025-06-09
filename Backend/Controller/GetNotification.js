const db = require('../server').db;

const getNotifications = (req, res) => {
  const guarantorId = req.user.Employee_id;

  const query = `
    SELECT lg.*, 
           gt.Employee_Fname AS guarantor_fname,
           lt.Employee_Fname AS loan_taker_fname
    FROM loan_guarantors lg
    JOIN general_employee gt ON lg.guarantor_id = gt.Employee_id
    JOIN general_employee lt ON lg.loan_taker_id = lt.Employee_id
    WHERE lg.guarantor_id = ? AND lg.status = 'pending'
  `;

  db.query(query, [guarantorId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    const notifications = results.map(row => ({
      id: row.id,
      message: `Dear ${row.guarantor_fname}, can you be my guarantor to ${row.loan_taker_fname}?`,
      status: row.status
    }));

    res.json({ success: true, notifications });
  });
};

module.exports = {getNotifications};
