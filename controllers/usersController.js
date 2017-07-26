const User = require('../models/User')
const Event = require('../models/Event')
const passport = require('../config/passport')

const request = require('request')



  function list (req, res) {
    // getting all places from my list of places in the db
    Event.find({}, function (err, allEvents) {
      if (err) res.send(err)

      res.render('profile', {
        events: allEvents,
        flash: req.flash('errors')
      })
    })


  // getting all places from google place api
  // const apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  // const apiKey = `&key=${process.env.GOOGLE_PLACE_KEY}`
  // const qString = `query=hotels in new york`
  //
  // request(`${apiUrl}${qString}${apiKey}`, function (err, response, body) {
  //   if (err) res.send(err)
  //
  //   var data = JSON.parse(body)
  //
  //   res.render('users/new', {
  //     places: data.results
  //   })
  // })
}

function create (req, res, next) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })

  // newUser.events.push(req.body.event.id)

  newUser.save(function (err, createdUser) {
    if (err) {
      req.flash('errors', err.message)
      return res.redirect('/users/new')
    }
    passport.authenticate('local', {
      successRedirect: '/users/profile',
      failureRedirect: '/'
    })(req, res)
  })
}

function login (req, res) {
  passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login',
  failureFlash: 'Invalid username and/or password'
  })(req, res)
}


module.exports = {
  // show,
  create,
  // register,
  login,
  list
}
