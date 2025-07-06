const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
var fetchuser = require('../middleware/fetchuser');

// ROUTE 1 : Create a user using:  POST "/api/auth/createuser" . Do not require login

router.post('/createuser',[body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),],async (req,res)=>{
    console.log(req.body);
    let success = false;
    // If there are errors , return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // const user = User(req.body)      method used in very beginning
    // user.save()

    try{
      //Check whether the user with same email already exits
      let user = await User.findOne({email : req.body.email});
      if(user){
        return res.status(400).json({success, error : "Sorry an user with this email already exits"});
      }
      const salt = await bcrypt.genSalt(10);  // return promise
      const secPass = await bcrypt.hash(req.body.password,salt);
      // Create a new user
      user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      })
      const data = {
        user : {
          id : user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      console.log(authtoken);
      //res.json(user);
      success = true;
      res.json({success, authtoken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

// ROUTE 2 : Authenticate a user using :  POST "/api/auth/login" . Do not require login
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','password can not be blank').exists(),
  ],async (req,res)=>{
    let success = false;
    // If there are errors , return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success ,error : "Please try to login with correct credentials"});
      }
      const passCompare = await bcrypt.compare(password,user.password)
      if(!passCompare){
        return res.status(400).json({success , error : "Please try to login with correct credentials"});
      }
      const data = {
        user : {
          id : user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      console.log("Login successful");
      success = true;
      res.json({success, authtoken});

    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

  // ROUTE 3 : Get loggedin user Details using:  POST "/api/auth/getuser" . Login required
  router.post('/getuser',fetchuser,async (req,res)=>{
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
})
module.exports = router