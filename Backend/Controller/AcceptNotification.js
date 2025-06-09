const db = require('../server').db;

const acceptNotification = (req, res) => {
  const guarantorId = req.user.Employee_id; // from JWT token
  const userResponse = req.body.response;

  // Step 0: Require explicit 'yes' response
  if (userResponse !== 'yes') {
    return res.status(400).json({
      success: false,
      message: "You must confirm with 'yes' to accept the request."
    });
  }

  // Step 1: Get the latest pending request for this guarantor
  const getRequestSql = `
    SELECT id AS requestId, loan_taker_id 
    FROM loan_guarantors 
    WHERE guarantor_id = ? AND status = 'pending'
    ORDER BY id DESC LIMIT 1
  `;

  db.query(getRequestSql, [guarantorId], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No pending guarantor requests found." });
    }

    const { requestId, loan_taker_id: loanTakerId } = results[0];

    // Step 2: Update the request status to accepted
    const updateSql = `
      UPDATE loan_guarantors 
      SET status = 'accepted' 
      WHERE id = ?
    `;

    db.query(updateSql, [requestId], (updateErr) => {
      if (updateErr) return res.status(500).json({ success: false, error: updateErr });

      // Step 3: Insert into branch_manager_approval
      const insertSql = `
        INSERT INTO branch_manager_approvals (loan_taker_id, guarantor_id, 	approval_status)
        VALUES (?, ?, 'approved')
      `;

      db.query(insertSql, [loanTakerId, guarantorId], (insertErr) => {
        if (insertErr) return res.status(500).json({ success: false, error: insertErr });

        // Step 4: Get names for confirmation message
        const getNamesSql = `
          SELECT 
            (SELECT CONCAT(Employee_Fname, ' ', Employee_Lname) FROM general_employee WHERE Employee_id = ?) AS loanTakerName,
            (SELECT CONCAT(Employee_Fname, ' ', Employee_Lname) FROM general_employee WHERE Employee_id = ?) AS guarantorName
        `;

        db.query(getNamesSql, [loanTakerId, guarantorId], (nameErr, nameResults) => {
          if (nameErr) return res.status(500).json({ success: false, error: nameErr });

          const { loanTakerName, guarantorName } = nameResults[0];

          return res.json({
            success: true,
            message: `You are accepted to be the guarantor for ${loanTakerName}. Approval sent to Branch Manager.`,
            data: {
              loan_taker_id: loanTakerId,
              guarantor_id: guarantorId,
              loanTakerName,
              guarantorName
            }
          });
        });
      });
    });
  });
};

module.exports = { acceptNotification };
