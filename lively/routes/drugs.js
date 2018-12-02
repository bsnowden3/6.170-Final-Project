const express = require('express');

const Drugs = require('../models/Drugs');

const router = express.Router();

/**
 * Saves the drug selection the user made
 * @name POST/api/drugs/saveDrugs
 */
router.post('/saveDrugs', async (req, res) => {
  const drug = req.body.data;
  Drugs.addDrug(drug, req.session.userId)
 
  res.status(200).json({message: "Drug Saved"}).end();
});


router.post('/createDrugs', async (req, res) => {
  const drug = req.body.name;
  Drugs.createDrug(drug, req.body.data);
 
  res.status(200).json({message: "Drug Saved"}).end();
});

/**
 * Saves the drug selection the user made
 * @name POST/api/drugs/saveDrugs
 */
router.delete('/wipeDrugs', async (req, res) => {
  await Drugs.wipeDrugData(req.session.userId);

  res.status(200).json({message: "Drugs Wiped!"}).end();


});

router.get('/getUserDrugs', (req, res) => {
  
  // res.status(200).json(Drugs.getDrugs()).end();
});

router.get('/getAllDrugs', async (req, res) => {

  const response = await Drugs.getDrugs();

  const allData = {};

  for(let i = 0; i < response.length; i++) {
    let name = response[i].name;
    allData[name] = {"frequency": response[i].frequency}
  }
  
  res.status(200).json(allData).end();
});


module.exports = router;
