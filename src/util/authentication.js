const jwt = require('jsonwebtoken')

const token = {
  sign: function(payload) {
    return jwt.sign(payload, process.env.SECRETKEY, {expiresIn: '7d'})
  },
  verify: function(payload) {

  }
}

module.exports.token = token