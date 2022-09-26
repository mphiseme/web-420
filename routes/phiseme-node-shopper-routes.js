/*
; Title:  phiseme-composer-routes.js
; Author: Manel Phiseme
; Date:   9/20/2022
; Description: model for composer API
*/
const Express = require("express");
const { createIndexes } = require("../models/phiseme-customer");
const Router = Express.Router();
const Customer = require("../models/phiseme-customer");

/**
 * /api/customers
  post:
    description: Api to create a Customer
    summary: This is an API to create a Customer  
    RequestBody:
      content:
        json/application:
          schema:
            required:
             -firstName
             -lastName
             -userName
            properties:
              firstName:
              type: String
              lastName:
              type: String
        responses:
           200:
           description: Customer added to MongoDB
           500:
           description: Server Exception 
           5001:
           description: MongoDB Exception
 */

Router.post("/api/customers", async(req, res)=>{
    try{
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const userName = req.body.userName;

        const newCustomer = {
            firstName: firstName,
            lastName: lastName,
            userName: userName
        }

        Customer.create(newCustomer, function(err, customer){
            if(err){
                res.status(501).send("MongoDB Exception")
            }else {
                res.json(customer)
            }
        })

    } catch(err){
        res.status(500).send("MongoDB Exception")

    }
})

/**
 * createInvoiceByUserName  
 * @openapi 
/api/customers/:username/invoices
   post:
     description: Api to create user by username
     summary: This is an Api to create a username
     requestBody:
       content:
          json/application:
             schema:
             Required:
               -username
               -subtotal
               -tax
               -dateCreated
               -dateShipped
               -lineItems
             properties:
              username:
               type: String
              subtotal:
                type: String
              tax: 
                 type: String
              dateCreated:
                 type: String
              dateShipped:
                 type: String
              lineItems:
                 type: Array
        Responses:
          200:
          description: Customer added to MongoDB
          500:
          description: Server Exception 
          501:
          description: Server Exception
 */
  
    
Router.post("/api/customers/:username/invoices", async(req, res)=>{
    try{
        const username = req.body.username;
        Customer.findOne({username:username}, function(err, customer){
            if(err){
                console.log(customer)
                res.status(501).send("MongoDB Exception");                
            }else{
                res.status(200).send("Customer added to MongoDB")             
                
            };
            let newInvoice = {
               username: req.body.username,
                subtotal: req.body.subtotal,
                 tax: req.body.tax,
                 dateCreated: req.body.dateCreated,
                 dateShipped: req.body.dateShipped,
                 lineItems: req.body.lineItems,
            };
            customer.invoices.push(newInvoice);
            customer.same();
        })
    }catch(error){
      res.status(500).send("Server Exception")

    }
})

/**
 * 
 * /api/customers/:username/invoices
  post:
   description: api to get all invoice by user name
   summary: This is an API to get invoices by username
   requestBody:
      content:
        json/application:
          schema:
            required:
              -username
            properties:
              username:
              type: String
        responses:
           200:
           description: Customer added to MongoDB
           500:
           description: Server Exception 
           501:
           description: MongoDB Exception
 */           

Router.get("/api/customers/:username/invoices", async(req, res)=>{
  try{

 
  Customer.findOne({username:req.body.username}, function(err, customer){
        if(err){
            res.status(501).send("MongoDB Exception")

        }else{
            res.json(customer.invoices)
        }
    })
  } catch(error){
    resizeTo.status(500).send("Server Exception ")
  } 
}
)
module.exports = Router;
        