const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Meals = require('../models/Meals');
const Drugs = require('../models/Drugs');
const Sleeps = require('../models/Sleeps');
const Exercises = require('../models/Exercises');


/**
 * given a user ID get a user's sleeps, meals, drugs, and exercises
 * @name GET/
 */
router.get('/userData', (req, res) => {
  
});




