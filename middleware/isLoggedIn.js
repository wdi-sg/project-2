require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING

module.exports = (req, res, next) => {
  if (!req.user) {
    if (logging) console.log('ATTEMPTED TO ACCESS WITHOUT LOGIN'.red)
    req.flash('error', 'please log in to access the page.')
    res.redirect('/users/login')
  } else {
    // if (logging) console.log('USER ACCESS GRANTED FOR USER: '.blue + req.user.name)
    next()
  }
}