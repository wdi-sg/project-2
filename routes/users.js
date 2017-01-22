require('colors')
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const passport = require('../config/passport')

router.get('/', (req, res) => {
  res.redirect('/')
})

router.get('/signup', (req, res) => {
  res.render('users/signup', {title: 'Sign up'})
})

router.get('/login', (req, res) => {
  res.render('users/login', {title: 'Log in'})
})

router.get('/logout', (req, res) => {
  console.log('USER HAS LOGGED OUT: '.blue + req.user.name)
  req.logout()
  res.redirect('/')
})

router.get('/destroyall', (req, res) => {
  if (process.env.NODE_ENV === 'test') {
    User.remove({}, (err) => {
      if (err) console.log(err)
      else {
        console.log('ALL USERS HAVE BEEN REMOVED FROM THE DATABASE'.underline.bold.red)
        res.redirect('/')
      }
    })
  } else res.redirect('/')
})

router.post('/signup', (req, res) => {
  User.create(req.body, (err) => {
    if (err) {
      // console.log(err)
      console.log('SIGNUP ERROR'.red)
      res.redirect('/users/signup')
    }
    else {
      console.log('USER SIGNUP SUCCESSFUL: '.blue + req.body.name)
      res.redirect('/users/login')
    }
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureMessage: true
}))

module.exports = router
