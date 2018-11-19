const express = require('express');

const Meals = require('../models/Meals.js');
const Sleeps = require('../models/Sleeps.js');
const Exercises = require('../models/Exercises.js');
const uuidv1 = require('uuid/v1');

const router = express.Router();

var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


/**
 * Post meal activity to user schedule
 * @name POST/ meal
 */
router.post('/addmeal', (req, res) => {
  const name = req.body.name;
  const userId = req.session.userId;
  const mealId = uuidv1();
  const mealSize = req.body.mealSize
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const daysOfWeek = req.body.daysOfWeek;

  let response = { message: "Successfully created meal", meal: mealId, activitySuccess: true}
  if (!userId) {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }

  daysOfWeek.foreach(e => {
    const meal = { name: name, userId: userId, mealId: mealId, mealSize: mealSize,
      startTime: startTime, endTime: endTime, day: e};

      Meals.addMeal(meal);
  })
    res.status(200).json(response).end();


});

/**
 * Post sleep activity to user schedule
 * @name POST/ meal
 */
router.post('/addsleep', (req, res) => {
  const userId = req.session.userId;
  const name = req.body.name;
  const sleepId = uuidv1();
  const startTime = req.body.wakeUpTime;
  const day = req.body.day;

  const sleep = { name: name, userId: userId, sleepId: sleepId,
    wakeUpTime: startTime, day: day};
  let response = { message: "Successfully created meal", sleep: sleep, activitySuccess: true}

  if(userId) {
    Sleeps.addSleep(sleep);
    res.status(200).json(response).end();
  } else {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }
});

/**
 * Post exercise activity to user schedule
 * @name POST/ meal
 */
router.post('/addexercise', (req, res) => {
  const userId = req.session.userId;
  const name = req.body.name;
  const exerciseId = uuidv1();
  const startTime = req.body.startTime;
  const endTime = endTime;
  const daysOfWeek = req.body.daysOfWeek;


  if(!userId){
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }

  daysOfWeek.foreach(e => {
    let exerciseActivity = { name: name, userId: userId, exerciseId: exerciseId, startTime: startTime,
      day: e};

    Exercises.addExercise(exerciseActivity);

  });
  let response = { message: "Successfully created exercise", activitySuccess: true}

  res.status(200).json(response).end();
});

  function errorCheck() {
    let sleep = Sleeps.findUserSleeps(express.session.userId);
    let meal = Meals.findUserMeals(express.session.userId);
    let exercise = Exercises.findUserExercises(express.session.userId);

    week.forEach(e => {

    })

  }

  function sleepActivityCheck() {

  }

  function midnightCheck() {

  }

  function exerciseCheck() {

  }

module.exports = router;
