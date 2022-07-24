
import bodyParser from "body-parser";
import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Universities Website API",
        version: "1.0.0",
        description: "The universities website server"
      },
      servers: [
        {
          url: "http://localhost:5000", 
          description: "Development server" 
        },
        {
          url: 'https://universities-website-api.herokuapp.com/',
          description: 'Remote server',
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            name: 'auth-token',
            in: 'header'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    apis: ["src/routes/*.js"]
  };
  
  const specs = swaggerJsDoc(options);




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/ruiAPI_docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

import registerRoute from './routes/registerRoutes.js'
import contactRoute from './routes/contactRoute.js'
import loginRoute from './routes/loginRoute.js'

app.use('/register', cors(corsOptions), registerRoute);
app.use('/contact', cors(corsOptions), contactRoute);
app.use('/login', cors(corsOptions), loginRoute);




mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true});
mongoose.connection.once("open", ()=>{
    console.log("connected to Mongo DB");
})
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`The server is running on ${port}`);
})

