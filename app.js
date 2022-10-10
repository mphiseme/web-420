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
const mongoose = require("mongoose");
//const ComposerApi = require("./routes/phiseme-composer-routes");
//const PersonApi = require("./routes/phiseme-person-routes");
//const UserApi = require("./routes/phiseme-session-routes");
//const CustomerApi = require("./routes/phiseme-node-shopper-routes");
const TeamApi = require("./capstone/routes/team-routes");


//const port = process.env.Port || 3000;
const app = express();
app.set("port", process.env.PORT || 3000);

// app.use statements bellow
app.use(express.json());
app.use(express.urlencoded({"extended":true}))

const conn = 'mongodb+srv://web420_user:s3cret@buwebdev-cluster-1.96qtg.mongodb.net/web420DB?retryWrites=true&w=majority';
mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log(`Connection is made to web420DB on MongoDB Atlas Successfully`);
}).catch(err =>{
    console.log(`MongoDB Error: ${err.message}`)
})

const options = {
    definition: { 
        openapi:'3.0.0',
    info: {
        title: 'WEB 420 RESTful APIs',
        version: '1.0.0'
    },

    },
   // apis: ['./routes/*.js'],
    apis: ['./capstone/routes/team-routes.js'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
//app.use("/api", ComposerApi);
//app.use("/api",PersonApi);
//app.use("/api",UserApi);
//app.use("/api",CustomerApi);
app.use("/api", TeamApi)


 http.createServer(app).listen(app.get("port"), function (){
    console.log(`Listening on port ${app.get("port")}`);
})
 



 



