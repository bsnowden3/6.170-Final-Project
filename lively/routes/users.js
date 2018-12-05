
const Users = require('../models/Users.js');
const Meals = require('../models/Meals.js');
const Drugs = require('../models/Drugs');
const Sleeps = require('../models/Sleeps');
const Exercises = require('../models/Exercises');
const express = require('express');
const router = express.Router();


//write the get call to get all user data given a user ID
//use the session.id to get the user id
/**
 * given a user ID get a user's sleeps, meals, drugs, and exercises
 * @name GET/
 */
router.get('/userData', async (req, res) => {
  let userId = req.session.userId;

   if(!userId) {
     res.status(400).json({ message: "Unsuccessful activity creation! Shedule Conflicts!." }).end();
   }

   const meals = await Meals.findUserMeals(userId);
   const sleeps = await Sleeps.findUserSleeps(userId);
   const ex = await Exercises.findUserExercises(userId);
   const drugs = await Drugs.getUserDrugs(userId);

   let userData = { meals: meals,
    sleeps: sleeps,
    exercises: ex,
    drugs: drugs };


    let responseMessage = { message: "Succesfully retrieved user data!", userData: userData};

   res.status(200).json(responseMessage).end();
});

router.post('/saveonboarding', async (req, res) => {
  let userId = req.session.userId;

   if(!(userId === undefined)) {
     let response = await Users.saveUserOnboardingStatus(userId);
     res.status(200).json(response).end();
   } else {
    res.status(400).json({ message: "Error userId not found" }).end();
   }
});

router.get('/checkOnbBoarding',async (req, res) => {
  let userId = req.session.userId;
  let response = await Users.findUserByID(userId);
  res.status(200).json(response).end();
});


router.get('/checkSession', async (req, res) => {
  const userId = req.session.userId;
  let response = await Users.checkUserInSession(userId);
  if(response[0] !== undefined){
    res.status(200).json("true").end();
  } else{
    res.status(200).json("false").end();
  }
})



module.exports = router;
