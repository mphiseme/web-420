/*
; Title:  phiseme-user.js
; Author: Manel Phiseme
; Date:   9/13/2022
; Description: model for user API
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{type:String},
    Password:{type:String},
    emailAddress:{type:Array}
})

module.exports = mongoose.model('User', userSchema)