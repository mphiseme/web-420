/*
; Title:  phiseme-composer.js
; Author: Manel Phiseme
; Date:   9/4/2022
; Description: model for composer API
*/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const composerSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String}
})

module.exports = mongoose.model("composer", composerSchema);
