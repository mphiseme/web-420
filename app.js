/**
 *Title: app.js
 Author: Manel Phiseme
 Date: 8/14/2022
 Description: first RESTful api project.
 */ 

const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
//const mongoose = require("mongoose");

//const port = process.env.Port || 3000;
const app = express();
app.set("port", process.env.PORT || 3000);

// app.use statements bellow
app.use(express.json());
app.use(express.urlencoded({"extended":true}))

const options = {
    definition: { 
        openapi:'3.0.0',
    info: {
        title: 'WEB 420 RESTful APIs',
        version: '1.0.0'
    },

    },
    apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


 http.createServer(app).listen(app.get("port"), function (){
    console.log(`Listening on port ${app.get("port")}`);
})
 



 



