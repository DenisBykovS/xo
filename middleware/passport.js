const JswStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const config = require('../config/db')

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
}

module.exports = (passport) => {
  passport.use(
    new JswStrategy(option, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id')

        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (error) {
        console.log(error)
      }
    })
  )
}
