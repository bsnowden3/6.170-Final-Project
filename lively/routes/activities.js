const express = require('express');

const Meals = require('../models/Meals.js');
const Sleeps = require('../models/Sleeps.js');
const Exercises = require('../models/Exercises.js');
const uuidv1 = require('uuid/v1');

const router = express.Router();

/**
 * Post meal activity to usgiter schedule
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


  let response = { message: "Successfully created meal", meal: mealId, activitySuccess: true};

  if(milToInt(startTime)  >= milToInt(endTime)) {
    res.status(400).json({message: "Unsuccessful activity creation! Endtime Before Starttime!."}).end();
  }

  if (!userId) {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }

  let fail = false;

  for(let i = 0; i < daysOfWeek.length; i++) {
    const meal = { name: name, userId: userId, mealId: mealId, mealSize: mealSize,
      startTime: startTime, endTime: endTime, day: daysOfWeek[i]};

      Meals.addMeal(meal);

      response = { message: "Successfully created meal", meal: Meals.getAllMeals(), activitySuccess: true};

      // if(!sleepActivityCheck(meal, userId) && !activityCheck(meal, userId, "meal")){
      //     Meals.addMeal(meal);
      // }
      // else{
      //   fail = true;

      //   break;
      // }
  }
    if(fail) {
      res.status(400).json({message: "Unsuccessful activity creation! Shedule Conflicts!."}).end();
    }
    else {
      res.status(200).json(response).end();
    }


});

router.get('/allActivities', (req, res) => {

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

      let response = { message: "Succesfully retrieved user data!", data: userData};

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
  const daysOfWeek = req.body.daysOfWeek;


  let response = { message: "Successfully created sleep", activitySuccess: true}
  if (!userId) {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }

  let fail = false;

  for(let i = 0; i < daysOfWeek.length; i++) {
    const sleep = { name: name, userId: userId, sleepId: sleepId,
      startTime: startTime, day: daysOfWeek[i]};


      Sleeps.addSleep(sleep);
      // if(checkSleepInsert(sleep, userId)){

      // }
      // else{
      //   fail = true;

      //   break;
      // }
  }
    if(fail) {
      res.status(400).json({message: "Unsuccessful activity creation! Shedule Conflicts!."}).end();
    }
    else {
      res.status(200).json(response).end();
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
  const endTime = req.body.endTime;
  const daysOfWeek = req.body.daysOfWeek;

  if(milToInt(startTime)  >= milToInt(endTime)) {
    res.status(400).json({message: "Unsuccessful activity creation! Endtime Before Starttime!."}).end();
  }

  let response = { message: "Successfully created exercise", activitySuccess: true}

  if(!userId){
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }


  let fail = false;
  for(let i = 0; i < daysOfWeek.length; i++) {
    let exerciseActivity = { name: name, userId: userId, exerciseId: exerciseId, startTime: startTime,
      day: daysOfWeek[i]};

      Exercises.addExercise(exerciseActivity);

    // if(!sleepActivityCheck(exerciseActivity, userId) && !activityCheck(exerciseActivity, userId, "exercise")){

    // }
    // else{
    //   fail = true;

    //   break;
    // }
  }

  if(fail) {
    res.status(400).json({message: "Unsuccessful activity creation! Shedule Conflicts!."}).end();
  }
  else {
    res.status(200).json(response).end();
  }

});

  function sleepActivityCheck(addition, userId) {
    let currentSleep = Sleeps.findUserSleeps(userId);
    for(let i = 0; i < currentSleep.length; i++) {
      if(currentSleep[i].day == addition.day){
        if (milToInt(currentSleep[i].startTime) >= milToInt(addition.startTime)){
          return true;
        }
      }
    }
    return false;

  }
  //TODO WARN USERS OF OVERWRITING
  function activityCheck(addition, userId, type) {
    let activities;
    if (type == "exercise"){
      activities = Meals.findUserMeals(userId);
    }
    else{
      activities = Exercises.findUserExercises(userId);

    }

    return checkOverlap(addition, activities);

  }

  function checkSleepInsert(addition, userId) {
    let exercise = Exercises.findUserExercises(userId);
    let meal = Meals.findUserMeals(userId);

    if (checkSleepOverlap(addition, exercise) || checkSleepOverlap(addition, meal)) {
      return true;
    }
    return false;

  }

  function checkSleepOverlap(addition, activities) {
    for(let i = 0; i < activities.length; i++) {
      if(activities[i].day == addition.day){
        if (milToInt(addition.startTime)  >= milToInt(activities[i].startTime)
            && milToInt(addition.startTime)  <= milToInt(activities[i].endTime)){
          return true;
        }
      }
    }
    return false;
  }


  function checkOverlap(addition, activities) {
    for(let i = 0; i < activities.length; i++) {
      if(activities[i].day == addition.day){
        if (milToInt(addition.startTime)  >= milToInt(activities[i].startTime)
            && milToInt(addition.startTime)  <= milToInt(activities[i].endTime)){
          return true;
        }
        else if (milToInt(addition.endTime)  >= milToInt(activities[i].startTime)
        && milToInt(addition.endTime)  <= milToInt(activities[i].endTime)){
          return true;
        }
        else if (milToInt(addition.startTime)  <= milToInt(activities[i].startTime)
        && milToInt(addition.endTime)  >= milToInt(activities[i].endTime)) {
          return true;
        }
      }
    }
    return false;
  }

  function milToInt(mil) {
    let string = "";
    string += mil[0];
    string += mil[1];
    string += mil[3];
    string += mil[4];

    return parseInt(string, 10);
  }


module.exports = router;
