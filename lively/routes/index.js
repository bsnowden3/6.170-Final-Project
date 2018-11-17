const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt-nodejs');

const Users = require('../models/Users');

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
  const user = req.body.username;
  const pass = req.body.password;

  if(!user || !pass){

    res.status(400);
    res.json({message: "Missing Credentials"});
  }
  else if (Users.checkUser(user)) {
    res.status(409);
    res.json({message: "User Already Exists"});
  }
  else {

    Users.addOne(user, pass)
    
    req.session.name = user;
    req.session.save();
    res.status(200);
    res.json({message: "Signed In!"});
    
  }
});


/**
 * Sign In User
 * @name POST/logIn
 */
router.post("/logIn", async function(req, res) {
  let user = req.body.username;
  let pass = req.body.password;
  
  if(!user || !pass){

    res.status(400);
    res.json({message: "Missing Credentials"});
  } 
  else if (!(Users.checkUser(user))) {
    res.status(404);
    res.json({message: "User Does Not Exist"});
  }

  else if(!bcrypt.compareSync(pass, Users.getPass(user)) ){
    res.status(404);
    res.json({message: "Wrong Password"});
  }
  else {
    req.session.name = user;
    req.session.save();
    res.status(200);
    res.json({message: "Signed In!"});
  }
});


module.exports = router;
