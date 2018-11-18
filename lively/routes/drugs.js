const express = require('express');

const Drugs = require('../models/Drugs');

const router = express.Router();

router.post('/', (req, res) => {
  res.render('index', { title: 'Lively' });
});

/**
 * Create a short.
 * @name POST/api/drugs
 */
router.post('/api/drugs/saveDrugs', (req, res) => {
  const data = req.body.data;
  Drugs.changeDrugData(data, req.sessionID);
  res.status(200).json({message: "Drugs Saved"}).end();
});


module.exports = router;
