require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING

module.exports = (req, res, next) => {
  if (!req.user) {
    if (logging === 'true') console.log('ATTEMPTED TO ACCESS WITHOUT LOGIN'.red)
    res.redirect('/users/login')
  } else {
    if (logging === 'true') console.log('USER ACCESS GRANTED FOR USER: '.blue + req.user.name)
    next()
  }
}