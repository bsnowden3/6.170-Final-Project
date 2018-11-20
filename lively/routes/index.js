const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const Users = require('../models/Users');
const uuidv1 = require('uuid/v1');


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
  const username = req.body.username;
  const password = req.body.password;
  const userId = getRandomId();
  if(!username || !password){
    res.status(400).json({
      error: `Missing Credentials`
    }).end();
  }
  else if (Users.findUser(username)) {
    res.status(409).json({
      error: `username already exists`
    }).end();
  }
  else {
    Users.addOne(userId,username, password)
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

  if(!username || !password){
    res.status(400).json({
      error: `Missing Credentials`
    }).end();
  }
  else if (Users.findUser(username) === undefined) {
    res.status(404).json({message: "User Does Not Exist"}).end();
  }

  else if(!bcrypt.compareSync(password, Users.getPass(username)) ){
    res.status(404);
    res.json({message: "Wrong Password"}).end();
  }
  else {
    const user = Users.findUser(username);
    req.session.userId = user.userId;
    req.session.username = user.username;
    req.session.save();
    res.status(200);
    res.json({message: "Signed In!"});
  }
});

/**
 * signs out a user
 * @name POST/signout
 */
router.post("/signout", (req,res) =>{
  if(req.session.username){
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
