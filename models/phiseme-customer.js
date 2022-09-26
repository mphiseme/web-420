const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
    name: {type:String},
    price: {type:Number},
    quantity: {type:Number}
})

const invoiceSchema = new Schema({
    subtotal: {type: Number},
        tax: {type: Number},
    dateCreated: {type: String},
    dateShipped: {type: String},
     lineItems: [lineItemSchema]
});

const customerSchema = new Schema({
    firstName: {type: String},
     lastName: {type: String},
     userName: {type: String},
     invoices: [invoiceSchema]
})

module.exports = mongoose.model("Customer",customerSchema)