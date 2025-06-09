const db = require('../server').db;

// Fetch all branch manager approvals
const getApprovals = (req, res) => {
  const sql = `SELECT * FROM branch_manager_approvals`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });
    return res.json({ success: true, data: results });
  });
};

// Approve a specific request
const approveRequest = (req, res) => {
  const requestId = req.body.id; // Approval ID from branch_manager_approval table

  const getRequestSql = `
    SELECT * FROM branch_manager_approvals WHERE id = ? AND final IS NULL
  `;

  db.query(getRequestSql, [requestId], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });
    if (results.length === 0)
      return res.status(404).json({ success: false, message: 'Request not found or already approved.' });

    const request = results[0];

    // Step 1: Update the final column
    const updateSql = `
      UPDATE branch_manager_approvals SET final = 'Approved' WHERE id = ?
    `;

    db.query(updateSql, [requestId], (updateErr) => {
      if (updateErr) return res.status(500).json({ success: false, error: updateErr });

      // Step 2: Insert into finance table
      const insertSql = `
        INSERT INTO finance (loan_taker_id, guarantor_id)
        VALUES (?, ?)
      `;

      db.query(insertSql, [request.loan_taker_id, request.guarantor_id], (insertErr) => {
        if (insertErr) return res.status(500).json({ success: false, error: insertErr });

        return res.json({
          success: true,
          message: 'Loan request approved and sent to finance.'
        });
      });
    });
  });
};

module.exports = { getApprovals, approveRequest };
