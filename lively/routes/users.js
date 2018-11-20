
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
router.get('/userData', (req, res) => {
  let userId = req.session.userId;

   if(!userId) {
     res.status(400).json({ message: "Unsuccessful activity creation! Shedule Conflicts!." }).end();
   }

   let meals = Meals.findUserMeals(userId);
   let sleeps = Sleeps.findUserSleeps(userId);
   let ex = Exercises.findUserExercises(userId);

   let userData = { meals: meals,
    sleeps: sleeps,
    exercises: ex };


    let responseMessage = { message: "Succesfully retrieved user data!", userData: userData};

   res.status(200).json(responseMessage).end();
});

module.exports = router;
