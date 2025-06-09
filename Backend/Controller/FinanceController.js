const db = require('../server').db;

// Get approved finance-related data
const getFinanceData = (req, res) => {
  const sql = `
    SELECT loan_taker_id, guarantor_id, approved_at, request 
    FROM finance
    WHERE request = 'Done'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }

    res.json({
      success: true,
      message: 'Approved finance data retrieved successfully.',
      data: results
    });
  });
};

module.exports = { getFinanceData };
