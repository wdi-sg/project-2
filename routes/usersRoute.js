const express = require('express')
const usersRouter = express.Router()
const usersController = require('../controllers/usersController')

// /////////////////////////
// // User Database Related
// /////////////////////////

// usersRouter.get('/', function (req, res) {
//   res.render('signUp')
// })

// usersRouter.get('/signIn', function (req, res) {
//   res.render('users/signIn')
// })

// usersRouter.get('/signUp', function (req, res) {
//   res.render('users/signUp')
// })


// module.exports = usersRouter

// ///////////////////////////////
// // User Authentication Related
// ///////////////////////////////

const authController = require('../controllers/usersController')
const passport = require('../config/passport')

// path name
usersRouter.get('/signUp', function (req, res) {
  res.render('users/signUp') // view name
})

usersRouter.get('/signIn', function (req, res) {
  res.render('users/signIn')
})

usersRouter.post('/signIn',
 passport.authenticate('local', {
   successRedirect: '/home',
   failureRedirect: '/signUp'
 }))

usersRouter.post('/signUp', usersController.signUp)

module.exports = usersRouter
