/*
; Title:  phiseme-capstone-routes.js
; Author: Manel Phiseme
; Date:   10/11/2022
; Description: model for person API
*/
const Express = require("express");
const router = Express.Router();
const Team = require("../models/phiseme-team.js");

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an array of team documents.
 *     summary: returns an array of team documents in JSON format.
 *     responses:
 *       '200':
 *         description: Array of Team Documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/teams', async(req, res)=>{
  try{
    Team.find({}, function(err, teams){
      if(err){
        res.status(501).send("MongoDB Exception")
      }else {
        res.json(teams)
      };
    });

  } catch(error){
    res.status(500).send("Server Exception")
  };
});

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Players
 *     description: API for adding a player to team in the database.
 *     summary: adds a player to a team document in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: team document id
 *         schema:
 *           type: number
 *     requestBody:
 *       description: player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player Document.
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.post('/teams/:id/players', async(req, res) =>{
  try{
    let teamId = req.params.id;
    Team.findOne({_id:teamId}, function(err, team){
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
      });

    });
  } catch(error){
    res.status(501).send("MongoDB Exception")
  }
})

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Players
 *     description: API for displaying all players in one team document.
 *     summary: returns array of players from one team document.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: team document id
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Array of Players.
 *       '401':
 *         description: Invalid teamId.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
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
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     description: API for deleting an existing team document.
 *     summary: deletes existing team document from database.
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: id to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team Document.
 *       '401':
 *         description: Invalid teamId.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
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
 



