const jwt = require('jsonwebtoken')

const token = {
  sign: function(payload) {
    //generating jwt token.
    return jwt.sign(payload, process.env.SECRETKEY, {expiresIn: '7d'})
  },
  verify: async function(req, res, next) {
     // Get auth header value
     const bearerHeader = req.headers.authorization
     // Check if bearer is undefined
     if(typeof bearerHeader !== undefined){
       // Split at the space
      const bearer = bearerHeader.split(' ')
      // Get token from array
      const bearerToken = bearer[1]
      const tokenInfo = await jwt.verify(bearerToken, process.env.SECRETKEY);
      if(tokenInfo instanceof Error) {
        res.send({"msg": "INVALID TOKEN"})
      } else {
        next();
      }
     }
  }
}

module.exports.token = token