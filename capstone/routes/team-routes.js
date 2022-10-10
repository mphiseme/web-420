/*
; Title:  phiseme-capstone-routes.js
; Author: Manel Phiseme
; Date:   10/11/2022
; Description: model for person API
*/
const Express = require("express");
const router = Express.Router();
const Team = require("../models/phiseme-team");

/**
 * findAllTeams
 * @openapi
 * paths:
/api/teams:
 get:
    summary: API to find all teams
    description: This find all the teams in collection
    responses:
      "200": #status code
           Description: An array of teams
           content:
             application/json:
               Schema:
                 type: array
                  items:
                    type: String
        "500": # status code
          description: Server Exception 
        "501": # status code
          description: MongoDB Exception
        default:
          description: Unexpected error
 */

router.get("/teams", async(req, res)=>{
  try{
    Team.find({}, function(err, teams){
      if(err){
        res.status(501).send("MongoDB Exception")
      }else {
        res.json(teams)
      }
    })

  } catch(error){
    res.status(500).send("Server Exception")
  }
})



/**
 * assignPlayerToTeam
 * @openapi
 * paths:
 /api/teams/:id/players
   post:
     Summary: Api to assign a player to a team
     description: This API add player to a team
     requestBody:
       content:
         application/json:
           schema:
             required:
               -id
               -firstName
               -lastName
               -salary
             properties:
              firstName:
               type: string
              lastName:
                type: string
              salary:
                type: string
     responses:
     "200": # status code
       description: Array of a play countDocuments
     "401": # status code
       description: Invalid teamId
     "500": # status code
       description: Server Exception 
     "501": # status code
       description: MongoDB Exception
 */

router.post('/teams/:id/players', async(req, res) =>{
  try{
    let teamId = req.params.id;
    Team.findOne({teamId:teamId}, function(err, team){
      if(err){
        res.status(501).send("MongoDB Exception")
      }else if(!team){
        res.status.apply(401).send("invalid teamId")
      }else{
        console.log(team);
        res.json(team)
      }
      const newPlayer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        salary: req.body.salary
      }
      team.players.push(newPlayer);
      team.save(function(err, result){
        if(err){
          console.log(err);
        }else {
          res.json(result);
        }
      })

    })
  } catch(error){
    res.status(501).send("MongoDB Exception")
  }
})
 


/**
 * findAllPlayersByTeamId
 * @openapi
 * api/teams/:id/players
  GET:
   summary: API to Find players by team ID
   description: return players by a team ID
   parameters:
       name: id
        in: paths 
        required: true
        description: Players document Id
        schema:
          type: String
   responses:
     '200':
       description: 200	Array of player documents
     '401':
       description: Invalid teamId
     '500':
       description: Server Exception 
     '501':
       description: MongoDB Exception
 */

router.get("/teams/:id/players", async(err, res)=>{
  try{
    let teamId = req.params.id;
    Team.findOne({teamId:teamId}, function(err, team){
      if(err){
        res.status(501).send("MongoDB Exception")
      }
      else if(!team){
        res.status(401).send("Invalid teamId")
      }else{
        res.json(team.players)
      }
    })
  }catch(error){
    res.status(500).send("MongoDB Exception")
  }
})



/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}
  Delete:
    Description: API to delete a team by ID
    Summary: Remove a team document from MongoDB
    parameters:
       -name: id
        in: path
        required: true
        description: Id of the document to remove
        schema:
          type: String
    responses:
       '200':
         description: Team document
       '401':
         description: Invalid teamId
       '500':
         description: Server Exception 
       '501':MongoDB Exception
 */

router.delete('/teams/:id', async(req, res)=>{
  try{
    Team.findByIdAndDelete({'_id':req.params.id}, function(err, team){
      if(err){
        console.log(err);
        res.status(501).send("MongoDB Exception")
      }else if(!team){
         res.status(401).send("Invalid teamId")
      }else{
        console.log(team)
        res.json(team)
      }
    })
  }catch(error){
    console.log(error)
    res.status(500).send("Server Exception")
  }
      
})

module.exports = router;
 



