// const config = require('./db')
// const User = require('../models/user')

// let JwtStrategy = require('passport-jwt').Strategy,
//   ExtractJwt = require('passport-jwt').ExtractJwt
// let opts = {}

// module.exports = function (passport) {
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
//   opts.secretOrKey = config.secret

//   passport.use(
//     new JwtStrategy(opts, function (jwt_payload, done) {
//       User.findOne({ id: jwt_payload.sub }, function (err, user) {
//         if (err) {
//           return done(err, false)
//         }
//         if (user) {
//           return done(null, user)
//         } else {
//           return done(null, false)
//           // or you could create a new account
//         }
//       })
//     })
//   )
// }
