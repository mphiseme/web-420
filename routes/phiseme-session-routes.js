/*
; Title:  phiseme-session-routes.js
; Author: Manel Phiseme
; Date:   9/18/2022
; Description: model for phiseme-session-routes API
*/

const express = require('express');
const router = express.Router();
const User = require("../models/phiseme-user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/***
 * register
 * @openapi 
/api/signup:
   post:
    description: Api signing
    summary: signing Api
    requestBody:
     content:
      application/json:
       schema:
        required:
          -userName
          -Password
          - emailAddress
          properties:
            userName:
             type: String
            Password:
             type: String
            emailAddress:
             type: String
    response:
         200:
         description: Registered User
         401:
         description: Username is already in User
         500:
         description: Server Exception
         501:
         description: MongoDB Exception
 */

router.post("/api/signup", async(req, res) =>{
    try{
      const userName = req.body.userName;
      const emailAddress = req.body.emailAddress;      
      User.findOne({userName:userName}, function(err, user){        
          if(!user){
            const hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds);
            const newRegisteredUser = {
              userName: userName,
              Password: hashedPassword,
              emailAddress: emailAddress
            }
            User.create(newRegisteredUser, function(err, user){
              if(err)
              {
                res.status(500).send("Server Exception")
              }else{
                res.json(user);
              }
            })
          }else {
            console.log("user already exist")
            res.status(401).send("401	Username is already in use");
          }  
      });
        
    }catch (error){
      console.log(error);
      res.status(500).send("500	Server Exception")      
    }
})

/***
 * register
 * @openapi
/api/login
  post:
    description: login api
    summary: api login
    requestBody:
        content:
        application/json:
            schema:
              required:
                -userName
                -Password
              properties:
                userName:
                  type: String
                password:
                  type: String
      responses:
          200:
          description: User logged in
          401:
          description: Invalid username and/or password
          500:
            description: Server Exception
          501:
            description: MongoDB Exception
  **/

router.post("/api/login", async(req, res)=>{
  try{
    User.findOne({userName: req.body.userName}, function(err, user){
      if(user){
        let passwordIsValid = bcrypt.hashSync(req.body.Password, user.password);
        if(passwordIsValid){
          console.log(user);
          res.status(200).send("User logged in")
        }else {
          res.status(401).send("Invalid username and/or password")
        }
      } else{
        console.log(err)
        res.status(501).send("MongoDB Exception")
      }
    })
  } catch (err){
    console.log(err);
    res.status(500).send("Server Exception")
  }
});

module.exports = router;
   