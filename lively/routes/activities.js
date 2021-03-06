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
  const mealSize = req.body.mealSize
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const daysOfWeek = req.body.daysOfWeek;


  //let responseMessage = { message: "Successfully created meal", meal: mealId, activitySuccess: true};

  if(milToInt(startTime)  >= milToInt(endTime)) {
    res.status(400).json({message: "Unsuccessful activity creation! Endtime Before Start time!."}).end();
  }

  if (!userId) {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }

  let fail = false;

  for(let i = 0; i < daysOfWeek.length; i++) {
    let mealId = uuidv1();
    const meal = { name: name, userId: userId, mealId: mealId, mealSize: mealSize,
      startTime: startTime, endTime: endTime, day: daysOfWeek[i]};

      Meals.addMeal(meal);

      responseMessage = { message: "Successfully created meal", meal: Meals.findUserMeals(userId), activitySuccess: true};

      // sleepActivityCheck(meal, userId);
      // if(!sleepActivityCheck(meal, userId) && !activityCheck(meal, userId, "meal")){
      //     Meals.addMeal(meal);
      // }
      // else{
      //   fail = true;

      //   break;
      // }
  }
    if(fail) {
      res.status(400).json({message: "Unsuccessful activity creation! Schedule Conflicts!."}).end();
    }
    else {
      res.status(200).json(responseMessage).end();
    }
});

router.get('/allActivities', async (req, res) => {

  let userId = req.session.userId;

    if(!userId) {
      res.status(400).json({ message: "Unsuccessful activity creation! Schedule Conflicts!." }).end();
    }

    const meals = await Meals.findUserMeals(userId);
    const sleeps = await Sleeps.findUserSleeps(userId);
    const ex = await Exercises.findUserExercises(userId);

    let userData = { meals: meals,
      sleeps: sleeps,
      exercises: ex };

      let responseMessage = { message: "Succesfully retrieved user data!", data: userData};

    res.status(200).json(responseMessage).end();
});

/**
 * Get meal activity to user schedule
 * @name GET/ allMeals
 */
router.get('/allMeals', async (req, res) => {

  let userId = req.session.userId;

    if(!userId) {
      res.status(400).json({ message: "Unsuccessful activity creation! Schedule Conflicts!." }).end();
    }

    const meals = await Meals.findUserMeals(userId);

    let responseMessage = { message: "Succesfully retrieved user meal data", meals: meals };

    res.status(200).json(responseMessage).end();
});

/**
 * Get sleep activity to user schedule
 * @name POST/ meal
 */
router.get('/allSleeps', async (req, res) => {

  let userId = req.session.userId;

    if(!userId) {
      res.status(400).json({ message: "Unsuccessful activity creation! Schedule Conflicts!." }).end();
    }

    let sleeps = await Sleeps.findUserSleeps(userId).then(res => res).catch(error => console.log(error));

    let responseMessage = { message: "Succesfully retrieved user sleep data!", sleeps: sleeps  };

    res.status(200).json(responseMessage).end();
});

/**
 * Get meal activity to user schedule
 * @name GET/ allExercises
 */
router.get('/allExercises', async (req, res) => {

  let userId = req.session.userId;

    if(!userId) {
      res.status(400).json({ message: "Unsuccessful activity creation! Schedule Conflicts!." }).end();
    }

    let exercises = await Exercises.findUserExercises(userId).then(res => res).catch(error => console.log(error));

    let responseMessage = { message: "Succesfully retrieved user meal data", exercises: exercises };

    res.status(200).json(responseMessage).end();
});

/**
 * Post sleep activity to user schedule
 * @name POST/ meal
 */
router.post('/addsleep', async (req, res) => {
  const userId = req.session.userId;
  const name = req.body.name;
  const startTime = req.body.startTime;
  const daysOfWeek = req.body.daysOfWeek;


  let responseMessage = { message: "Successfully created sleep", activitySuccess: true}
  if (!userId) {
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }

  let fail = false;

  for(let i = 0; i < daysOfWeek.length; i++) {

      let sleepId = uuidv1();
      await Sleeps.addSleep(sleepId, startTime, daysOfWeek[i], userId).then(res => res).catch(error => console.log(error));
      // if(checkSleepInsert(sleep, userId)){
      //   Sleeps.addSleep(sleep);
      // }
      // else{
      //   fail = true;

      //   break;
      // }
  }
    if(fail) {
      res.status(400).json({message: "Unsuccessful activity creation! Schedule Conflicts!."}).end();
    }
    else {
      res.status(200).json(responseMessage).end();
    }

});

/**
 * Post exercise activity to user schedule
 * @name POST/ meal
 */
router.post('/addexercise', async (req, res) => {
  const userId = req.session.userId;
  const name = req.body.name;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const daysOfWeek = req.body.daysOfWeek;

  if(milToInt(startTime)  >= milToInt(endTime)) {
    res.status(400).json({message: "Unsuccessful activity creation! Endtime Before Start time!."}).end();
  }

  let responseMessage = { message: "Successfully created exercise", activitySuccess: true}

  if(!userId){
    res.status(400).json({message: "Unsuccessful activity creation! Missing permissions."}).end();
  }


  let fail = false;
  for(let i = 0; i < daysOfWeek.length; i++) {
      let exerciseId = uuidv1();
      Exercises.addExercise(exerciseId, name, startTime, endTime, daysOfWeek[i], userId).then(res => res).catch(error => console.log(error));

    // if(!sleepActivityCheck(exerciseActivity, userId) && !activityCheck(exerciseActivity, userId, "exercise")){
    //   Exercises.addExercise(exerciseActivity);
    // }
    // else{
    //   fail = true;

    //   break;
    // }
  }

  if(fail) {
    res.status(400).json({message: "Unsuccessful activity creation! Schedule Conflicts!."}).end();
  }
  else {
    res.status(200).json(responseMessage).end();
  }

});

/**
 * Delete exercise activity from user schedule
 * @name DELETE exercise
 */
router.delete('/removeExercise', async (req, res) => {
  if(!(req.session.userId === undefined)) {
    console.log("Printing response body", req);
    console.log(req.body.exerciseId);
    let response = await Exercises.deleteExercise(req.body.exerciseId);
    console.log(response);
    res.status(200).json(response).end();
  } else {
    let error = {message: "Error! userId undefined"}
    res.status(400).json(error).end();
  }
});

/**
 * Delete sleep activity from user schedule
 * @name DELETE sleep
 */
router.delete('/removeSleep', async (req, res) => {
  if(!(req.session.userId === undefined)) {
    console.log("Printing response body", req);
    console.log(req.body.sleepId);
    let response = await Sleeps.deleteSleep(req.body.sleepId);
    console.log(response);
    res.status(200).json(response).end();
  } else {
    let error = {message: "Error! userId undefined"}
    res.status(400).json(error).end();
  }
});

/**
 * Delete meal activity from user schedule
 * @name DELETE meal
 */
router.delete('/removeMeal', async (req, res) => {
  if(!(req.session.userId === undefined)) {
    console.log(req.body.mealId);
    let response = await Meals.deleteUserMeal(req.body.mealId);
    res.status(200).json(response).end();
  } else {
    let error = {message: "Error! userId undefined"}
    res.status(400).json(error).end();
  }
});

  async function sleepActivityCheck(addition, userId) {
    const currentSleep = await Sleeps.findUserSleeps(userId);
    console.log(currentSleep);
    for(let i = 0; i < currentSleep.length; i++) {
      if(currentSleep[i].dayOfWeek == addition.day){
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
