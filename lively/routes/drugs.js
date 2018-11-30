const express = require('express');

const Drugs = require('../models/Drugs');

const router = express.Router();

/**
 * Saves the drug selection the user made
 * @name POST/api/drugs/saveDrugs
 */
router.post('/saveDrugs', async (req, res) => {
  const data = req.body.data;
  // Drugs.wipeDrugData(data, req.sessionID);
  for(let i = 0; i < data.length; i++) {
    let drug = data[i];
    // TODO: FIX STARTTIME
    // const response = await Drugs.changeData(drug, req.sessionID, "startTime");


  }
 
  res.status(200).json({message: "Drugs Saved"}).end();
});

router.get('/getAllDrugs', (req, res) => {
  res.status(200).json(Drugs.getDrugs()).end();
});


module.exports = router;
