const express = require('express');

const Meals = require('../models/Meals.js');
const Sleeps = require('../models/Sleeps.js');
const Exercises = require('../models/Exercises.js');
const uuidv1 = require('uuid/v1');

const router = express.Router();


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

  const meal = { name: name, userId: userId, mealId: mealId, mealSize: mealSize,
    startTime: startTime, endTime: endTime, daysOfWeek: daysOfWeek};
  response = { message: "Successfully created meal", meal: meal, activitySuccess: true}

  if(userId) {
    Meals.addMeal(meal);
    res.status(200).json(response).end();
  } else {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."})
  }
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
    wakeUpTime: wakeUpTime, day: day};
  response = { message: "Successfully created meal", sleep: sleep, activitySuccess: true}

  if(userId) {
    Sleeps.addSleep(sleep);
    res.status(200).json(response).end();
  } else {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."});
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

  exerciseActivity = { name: name, userId: userId, exerciseId: exerciseId,
    exerciseId: exerciseId, days: daysOfWeek};
  response = { message: "Successfully created meal", exercise: exerciseActivity, activitySuccess: true}

  if(userId) {
    Exercises.addExercise(exercise);
    res.status(200).json(response).end();
  } else {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."})
  }
});


module.exports = router;
