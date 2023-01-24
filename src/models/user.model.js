const mongoose = require('mongoose');

//user mongoose schema.
const userSchema =  new mongoose.Schema({
  name:{
    type: String,
    require: true,

  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  preference: {
    type: String,
    require: true,
    default: "#FFFFFF"
  }
})

const User = mongoose.model("User", userSchema);

//user related queries.
const userQuery = {
  userSignup: async function(data) {
    const checkUser = await User.findOne({"email": data.email});
    if(checkUser) return {"msg": "User Already Registered"};
    const registerUser = await User.create(data);
    return registerUser;
  },
  userLogin: async function(email){
    const userInfo = await User.findOne({"email": email}).lean();
    return userInfo;
  },
  updatePreference: async function(data) {
    const preference = await User.updateOne({"email": data.email}, {"preference": data.preference})
    return preference;
  }
}

module.exports.userQuery = userQuery;