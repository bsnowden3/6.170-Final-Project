const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const Users = require('../models/Users');
const uuidv1 = require('uuid/v1');
var sanitizer = require('sanitizer');


/**
 * Serves homepage.
 * @name GET/
 */
router.get('/', (req, res) => {
  res.render('index', { title: 'Lively' });
});


/**
 * Create User
 * @name POST/signUp
 */
router.post("/signUp", async function(req, res) {
  const user = await Users.findUser(sanitizer.escape(req.body.username)); 
  const username = req.body.username;
  const password = req.body.password;
  const userId = getRandomId();
  if(!username || !password){
    res.status(400).json({
      error: `Missing Credentials`
    }).end();
  }
  else if (user[0] !== undefined) {
    res.status(409).json({
      error: `username already exists`
    }).end();
  }
  else {
    await Users.addOne(userId,username, password)
    await Users.addSessionId(req.session.id, userId);
    req.session.userId = userId
    req.session.username = req.body.username;
    req.session.save();
    res.status(200).json({message: "Signed In!"}).end();
  }
});


/**
 * Sign In User
 * @name POST/logIn
 */
router.post("/logIn", async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  const user = await Users.findUser(req.body.username);

  if(!username || !password){
    res.status(400).json({
      error: `Missing Credentials`
    }).end();
  }
  else if (user[0] !== undefined) {
    req.session.userId = user[0].id;
    req.session.username = user[0].username;
    await Users.addSessionId(req.session.id, user[0].id);
    req.session.save();
    res.status(200);
    res.json({message: "Signed In!"});
  }

  else if(!bcrypt.compareSync(password, user[0].password) ){
    res.status(404);
    res.json({message: "Wrong Password"}).end();
  }
  else {
    res.status(404).json({message: "User Does Not Exist"}).end();

  }
});

/**
 * signs out a user
 * @name POST/signout
 */
router.post("/signout", async function(req,res){
  if(req.session.username){
      await Users.removeUserSession(req.session.id);
      req.session.destroy();
      res.status(200).json({
          message: `Successfully signed-out` 
      }).end();
  } else{
      res.status(400).json({
          error: `You must first sign-in in order to sign-out`
      }).end();
  }
});


/**
 * helper function for getting a random unique id
 */
var getRandomId = function(){
  return uuidv1();
}


module.exports = router;
