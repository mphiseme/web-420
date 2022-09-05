/*
; Title:  phiseme-composer-routes.js
; Author: Manel Phiseme
; Date:   9/4/2022
; Description: model for composer API
*/

const Express = require("express");
const router = Express.Router();
const Composer = require('../models/phiseme-composer');

/**
 * findAllComposers 
 * @openapi
 * 
 * paths:
  /composers:
    get:
      summary: Returns a list of composers
      description: Operation to get composers
      responses:
        "200": # status code
              description: An array of composers in Json
              content:
                application/json:
                  schema:
                    type: array
                    items:
                      type: string
        '500':    # status code
          description: Server Exceptions    
        '501':    # status code
          description: MongoDB Exceptions.
        default:
              description: Unexpected error                   
 * 
 */
router.get("/composers", async(req, res) => {
    try{
        Composer.find({}, function(err, composers){
            if(err){                
                res.status(501).send("MongoDB Exception");
            }else {
                console.log(composers);
                res.json(composers);
            }
        })
    } catch (error){
        res.status(500).send("Server Exception ")
        console.log(error);
    }

})

/**
 * findComposerByID 
 * @openapi
 * 
 *   /composers/{id}:
    get:
      summary: Returns a composer information by ID.
      parameters:
        - in: path
          name: id
          required: true
          schema:
             type: integer
             format: int64
             minimum: 1
      responses:
        '200':    # status code
          description: success!! no issues with Param
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
        '500':    # status code
          description: Server exceptions
        '501':    # status code
          description: MongoDB exceptions
        default:
          description: Unexpected error 
 * 
 */
router.get("/composers/:id", async(req, res) =>{
    try{  
        const id = req.params.id;      
        Composer.find({_id: id}, function(err, composer){
            if(err){
                res.status(501).send("MongoDB Exception");
            }else{
                res.json(composer)
            }
        })
    } catch (error){
        res.status(500).send("Server Exception")
    }
})

/**
 * createComposer
 * 
 * @openapi
 *     post:
      summary: Creates a new composer.
      requestBody:
        content:
          application/json:
            schema:
              type: object
      responses:
        '200':    # status code
          description: New composer added
        '500':    # status code
          description: Server Exceptions
        '501':    # status code
          description: MongoDB Exceptions.
        default:
          description: Unexpected error
 * 
 */
 router.post("/composers", async(req, res) =>{
    try{
        const newComp = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        Composer.create(newComp, function(err, addComposer){
            if(err){
                res.status(501).send("MongoDB Exception");
            } else {
                res.json(addComposer)
            }
        });
    } catch(error){
       res.status(500).send("Server Exception");
       console.log(error)
    }
 })

 module.exports = router;                        
