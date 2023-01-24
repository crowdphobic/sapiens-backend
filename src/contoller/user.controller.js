const becrypt = require('bcryptjs');
const {userQuery} = require('../models/user.model')
const {token} = require('../util/authentication')


// user related controller.
const userController = {
  // user signup controller.
  signup: async function(data) {
    try {
      const salt = becrypt.genSaltSync(10);
      data.password = becrypt.hashSync(data.password, salt);
      const result  = await userQuery.userSignup(data);
      if(result instanceof Error) {
        throw new Error("SOMETHING WENT WRONG");
      }
      return result;
    } catch (error) {
      return error;
    }
  },
  //user login controller.
  login: async function(data) {
    try {
      const userDetail = await userQuery.userLogin(data.email);
      if(userDetail instanceof Error){
        throw new Error("SOMETHING WENT WRONG");
      }
      if(becrypt.compareSync(data.password, userDetail.password)) {
        delete userDetail.password;
        const jwtToken = token.sign({"name": userDetail.name, "email": userDetail.email});
        userDetail.userToken = jwtToken; 
        return userDetail;
      }else {
        return {"msg": "password is not correct"};
      }
    } catch (error) {
      return error; 
    }
  },
  //user preference updation controller.
  updatePreference: async function(data) {
    try {
      const preferenceUpdation = await userQuery.updatePreference(data);
      if(preferenceUpdation instanceof Error) {
        throw new Error("SOMETHING WENT WRONG");
      }
      return preferenceUpdation;
    } catch (error) {
      return error
    }
  }
}

module.exports.userController = userController;