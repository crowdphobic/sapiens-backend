## SAPIENS-BACKEND
This is the code for the sapiens backend which accomodate all the api call required by the front-end.

## Requirements
For development, you will only need Node.js v16.4.0 and npm 7.18.1 . you can also download the [nvm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) here to manage different versions
of nodejs and npm.

## Install

    $ git https://github.com/crowdphobic/sapiens-backend.git
    $ cd sapiens-backend
    $ npm install

**NOTE** If you are using windows system then do use git bash (or other linux/unix terminal) as your terminal because we have some npm which only compiles in linux/unix environment.

## Running the project on local
   TO Run the code
   1. npm install
   2. npm start or node index.js
 
## Environment
The environment can be managed by creating a .env file in the root of the project.
Following are the environment variables that can be set using the .env file.
* `PORT`:This Variable will change the port on which sapiend-backend runs. We recommend using 3001.
* `DBCONNECTION`:This variable is used to connect databse.
* `SECRETKEY`: This variable is used to set secret key of jwt.


  