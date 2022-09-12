/*
; Title:  phiseme-person-routes.js
; Author: Manel Phiseme
; Date:   9/11/2022
; Description: model for person API
*/
const Express = require("express");
const Router = Express.Router();
const Person = require("../models/phiseme-person.js");

/**
 * findAllPersons
 *  @openapi 
paths:
  /persons
     Get:
      summary: find all person listed
      responses:
        "200": # status code
           description: An array of composers in Json
           content:
              application/json:
                schema:  
                  type: array  
                  items:
                    type: String
        "501": # status code
           description: MongoDB Exception
        "500": # status code
           description: Server Exception
 * 
 */ 
Router.get('/persons', async(rep, res) =>{
    try{
        Person.find('[]', function(err, persons){
            if(err){
                res.status(501).send("MongoDB Exception");
            }else{
                // return list of person
                res.json(persons);
            }
        })
    }catch(error){
        res.status(500).send("Server Exception");
        console.log(error);
    }
})

/**
 * createPerson
 * @openapi 
 * 
 "/persons"
     post:
     summary: Create a person
     RequestBody:
      content:
       application/json:
         schema:
          type: object;
     Responses:     
       "200": # status code
        description: New person add
       "500": # status code
        description: Server Exception 
        "501": # status code
        description: MongoDB Exception
        default: 
        description: Unexpected error 
 * 
 */
Router.post("/persons", async(req, res)=>{
    try{
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
                roles: req.body.roles,
                dependents: req.body.dependents,
                birthDate: req.body.birthDate
        }
        Person.create(newPerson, function(err, addPerson){
            if(err){
                res.status("501").send("Array of person documents");
            }else{
                 // Return created person
                res.status(addPerson)
            }
        })
    }catch(error){
        resizeTo.status("500").send("Server Exception");
        console.log(error)
    }
})

module.exports = Router;