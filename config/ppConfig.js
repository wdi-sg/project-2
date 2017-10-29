const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const Admin = require('../models/admin')

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  })
})

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done){
  User.findOne({email: email}, function(err, user){
    if(err) return done(err)
    if (!user) return done(null, false)
    user.validPassword(password,  (err, isMatch) => {
      if (err) return done(null, false)
      if (isMatch) return done(null, user)
      return done(null, false, { message: 'mismatched'})
    })
  })
}))

// passport.serializeAdmin(function(admin, done) {
//   done(null, admin.id);
// })
//
// passport.deserializeAdmin(function(id, done) {
//   Admin.findById(id, function(err, admin) {
//     done(err, admin);
//   })
// })
//
// passport.use(new LocalStrategy({
//   usernameField: 'admin[email]',
//   passwordField: 'admin[password]'
// }, function(email, password, done){
//   Admin.findOne({email: email}, function(err, user){
//     if(err) return done(err)
//     if (!admin) return done(null, false)
//     user.validPassword(password,  (err, isMatch) => {
//       if (err) return done(null, false)
//       if (isMatch) return done(null, user)
//       return done(null, false, { message: 'mismatched'})
//     })
//   })
// }))

module.exports = passport
