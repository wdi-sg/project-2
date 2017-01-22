const express = require('express')
const User = require('../models/user')
const router = express.Router()

const ejsValues = {
  title: 'Sign up'
}

/* GET users listing. */
router.get('/', (req, res) => {
  res.redirect('/')
})

router.get('/signup', (req, res) => {
  res.render('users/signup', ejsValues)
})

router.get('/login', (req, res) => {
  res.render('users/login', ejsValues)
})

router.post('/signup', (req, res) => {
  User.create(req.body, (err) => {
    if (err) console.log(err)
    else res.redirect('/users/login')
  })
})

module.exports = router
