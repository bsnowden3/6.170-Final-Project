const express = require('express');

const Drugs = require('../models/Drugs');

const router = express.Router();

/**
 * Saves the drug selection the user made
 * @name POST/api/drugs/saveDrugs
 */
router.post('/saveDrugs', (req, res) => {
  const data = req.body.data;
  Drugs.changeDrugData(data, req.sessionID);
  res.status(200).json({message: "Drugs Saved"}).end();
});


module.exports = router;
