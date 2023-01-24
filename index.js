require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dbConnection = require('./src/config/mongoDbConfig')
const {userController} = require('./src/contoller/user.controller')
const {validation} = require('./src/config/validator')

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1mb' })); 
app.use(cors());
app.use(morgan('combined'))

// mongodb connection.
dbConnection.dbConfig();

//routes
 /**
  Endpoint for user signup.
  route:- /user/signup
  http:- POST
  reposonse:- currently signedup user information.
  **/
app.post("/user/signup", async (req, res) => {
  try {
    const validationError = [];
    if(! await validation.stringValidation(req.body.name)) validationError.push("Name is not Valid")
    if(! await validation.stringValidation(req.body.password)) validationError.push("Password is not valid")
    if(! await validation.stringValidation(req.body.preference)) validationError.push("Preference is not valid")
    if(! await validation.emailValidation(req.body.email)) validationError.push("Email is not valid")
    if(validationError.length) {
      return res.send(validationError);
    }
    const result = await userController.signup(req.body)
    res.send(result);
  } catch (error) {
    res.send({"Error": error, "msg": "SOMETHING WENT WRONG"});
  }
})

/**
  Endpoint for user login.
  route:- /user/login
  http:- POST
  reposonse:- user login information.
**/
app.post("/user/login", async (req, res)=> {
  try {
    const validationError = []
    if(! await validation.emailValidation(req.body.email)) validationError.push("Email is not valid")
    if(! await validation.stringValidation(req.body.password)) validationError.push("Password is not valid")
    if(validationError.length) {
      return res.send(validationError)
    }
    const result = await userController.login(req.body)
    res.send(result);
  } catch (error) {
    res.send({"Error": error, "msg": "SOMETHING WENT WRONG"});
  }

})

/**
  Endpoint for preference updation.
  route:- /user/preference
  http:- PUR
  reposonse:- preference updated message.
**/
app.put("/user/preference", async(req, res) =>{
  try {
    const validationError = [];
    if(! await validation.emailValidation(req.body.email)) validationError.push("Email is not valid")
    if(! await validation.stringValidation(req.body.preference)) validationError.push("Preference is not valid")
    if(validationError.length) {
      return res.send(validationError)
    }
    const result = await userController.updatePreference(req.body);
    res.send({"result": result, "msg": "preference updation successfull"});
  } catch (error) {
    res.send({"Error": error, "msg": "SOMETHING WENT WRONG"});
  }
})

//setting up server
app.listen(process.env.PORT || 3001, () =>{
  console.log("server connected", process.env.PORT)
})