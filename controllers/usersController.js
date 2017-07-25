const User = require('../models/User')
const Event = require('../models/Event')

const request = require('request')

// function login (req, res) {
//   // getting all places from my list of places in the db
//   Event.find({}, function (err, allEvents) {
//     if (err) res.send(err)
//
//     res.render('users/login', {
//       events: allEvents,
//       flash: req.flash('errors')
//     })
//   })
// }

function register (req, res) {
  // getting all places from my list of places in the db
  Event.find({}, function (err, allEvents) {
    if (err) res.send(err)

    res.render('users/new', {
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

  newUser.events.push(req.body.event.id)

  newUser.save(function (err, createdUser) {
    if (err) {
      // return res.send(err)
      req.flash('errors', err.message)
      return res.redirect('/users/new')

      // next(err)
    }

    res.send({
      reqbody: req.body,
      newUser: newUser,
      createdUser: createdUser
    })
  })

  // User.create(req.body.user, function (err, newUser) {
  //   if (err) {
  //     // flow if user is invalid
  //     // passing error message to /users
  //
  //     res.send(err)
  //     // res.redirect('/users')
  //   }
  //
  //   // flow is user is created
  //
  //   res.format({
  //     html: function () {
  //       res.redirect('/users/new')
  //     },
  //
  //     json: function () {
  //       res.send('respond for ajax')
  //     }
  //   })
  //   // res.redirect('/users/new')
  // })
}

module.exports = {
  create,
  register
  // login
}
