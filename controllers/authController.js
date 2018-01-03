const User = require('../models/user')

exports.login = (req, res) => {
  res.render('users/login')
}

exports.register = (req, res) => {
  res.render('users/register')
}