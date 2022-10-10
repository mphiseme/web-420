/*
; Title:  team.js
; Author: Manel Phiseme
; Date:   10/4/2022
; Description: model for team player
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const players = new Schema({
    firstName: {String},
    lastName: {String},
    salary: {Number}
})
const teamSchema = new Schema({
    name:{String},
    mascot:{String},
    players:[players]
})

module.exports = mongoose.model("Team",teamSchema)

