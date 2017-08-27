const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Student = require('../models/student')
const Teacher = require('../models/teacher')

// it will store into the session, currently logged in user
// when success => next(null, foundUser)
passport.serializeUser(function (user, next) {
  next(null, user.id)
})

// it will open the session, and convert id stored in session into the actual user object, accessible in req.user
passport.deserializeUser(function (id, next) {
    Student.findById(id, function (err, user) {
      if (user) {
        next(err, user)
      } else {
        Teacher.findById(id, function (err, teacher) {
          next(err, teacher)
        })
      }
    })
})

// local strategy
passport.use(
  'local-student',
  new LocalStrategy(
    {
      usernameField: 'student[email]',
      passwordField: 'student[password]',
      passReqToCallback: true
    },
    localVerifyStudent
  )
)

passport.use(
  'local-teacher',
  new LocalStrategy(
    {
      usernameField: 'teacher[email]',
      passwordField: 'teacher[password]',
      passReqToCallback: true
    },
    localVerifyTeacher
  )
)

// verify callback for local strategy
function localVerifyStudent (req, passportEmail, passportPassword, next) {
  Student
  .findOne({
    email: passportEmail
  })
  .exec(function (err, foundUser) {
    if (err) {
      console.log('err', err)
      return next(err) // go to failureRedirect
    }

    if (foundUser && foundUser.validPassword(passportPassword)) {
      // console.log('success, redirect to /profile', foundUser)
      next(null, foundUser) // go to successRedirect
    } else {
      next()
    }
  })
}

function localVerifyTeacher (req, passportEmail, passportPassword, next) {
  Teacher
  .findOne({
    email: passportEmail
  })
  .exec(function (err, foundUser) {
    if (err) {
      console.log('err', err)
      return next(err) // go to failureRedirect
    }

    if (foundUser && foundUser.validPassword(passportPassword)) {
      // console.log('success, redirect to /profile', foundUser)
      next(null, foundUser) // go to successRedirect
    } else {
      next()
    }
  })
}

module.exports = passport
