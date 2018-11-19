const express = require('express');

const Drugs = require('../models/Drugs');

const router = express.Router();

/**
 * Create a short.
 * @name POST/api/drugs
 */
router.post('/saveDrugs', (req, res) => {
  const data = req.body.data;
  Drugs.changeDrugData(data, req.sessionID);
  res.status(200).json({message: "Drugs Saved"}).end();
});


module.exports = router;
