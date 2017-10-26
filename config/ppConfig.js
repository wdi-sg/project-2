const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const Student = require('../models/student')


passport.serializeUser((user, next) => {
  next(null, user.id) // this user with specific id. has logged in before
})

passport.deserializeUser((id, next) => {

  User.findById(id, function (err, admin) {
    console.log('deserializeUser user :', admin)
    if (admin) next(err, admin)
  })
  Student.findById(id, function (err, student) {
    console.log('deserializeUser user :', student)
    if (student) next(err, student)
  })

})

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, next) => {
  console.log('passport entered')
  User.findOne({email: email})
  .then(user => {
  if (!user) return next(null, false)
  user.validPassword(password, (err, isMatch) => {
    if (err) return next(err)
    if (isMatch) return next (null, user)
    return next(null, false, { message: 'mismatched'})
    })
  })
  .catch(err => next(err))
}))

passport.use(new LocalStrategy({
  usernameField: 'student[email]',
  passwordField: 'student[password]'
}, (email, password, next) => {
  console.log(email, password)
  Student.findOne({email: email})
  .then(student => {
    console.log(student)
  if (!student) return next(null, false)
  student.validPassword(password, (err, isMatch) => {
    if (err) return next(err)
    if (isMatch) return next (null, student)
    return next(null, false, { message: 'mismatched'})
    })
  })
  .catch(err => next(err))
}))

module.exports = passport
