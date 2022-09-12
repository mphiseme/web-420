const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    text: {type: String},
});

const dependentSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String}
});

const personSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: String}
})

module.exports = mongoose.model("Person", personSchema)