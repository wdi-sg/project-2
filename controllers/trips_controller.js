const Trip = require('../models/Trip')
const User = require('../models/User')
const Place = require('../models/Place')

function create (req, res) {
  const name = req.body.name
  const startDate = new Date(req.body.startDate)
  const endDate = new Date(req.body.endDate)
  function getDates (startDate, stopDate) {
    var dateArray = []
    var currentDate = new Date(startDate)
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateArray
  }
  var dates = getDates(startDate, endDate)
  var newDates = dates.map(function (date) {
    return date.toDateString()
  })
  for (var i = 0; i < newDates.length; i++) {
    newDates[i] = {
      date: newDates[i]
    }
  }
  var newTrip = new Trip({
    name: name,
    dates: newDates,
    user: req.user
  })
  newTrip.save(function (err, trip) {
    if (err) {
      req.flash('errors', err.message)
      return res.redirect('/trips/create')
    }
    User.findOne({
      _id: req.user.id
    }, function (err, user) {
      if (err) {
        req.flash('errors', err.message)
        return res.redirect('/trips/create')
      }
      // console.log(user, trip)
      user.trips.push(trip._id)
      user.save()
    })
    req.flash('message', 'New Trip Created.')
    return res.redirect('/trips/create')
  })
}

function showMain (req, res) {
  User.findOne({
    _id: req.user.id
  })
  .populate('trips')
  .exec(function (err, foundUser) {
    if (err) {
      res.redirect('/trips')
    }
    res.render('trips/index', {
      theUser: foundUser,
      user: req.user,
      flash: req.flash('message')
    })
  })
}

function showSelected (req, res) {
  Trip.findOne({
    _id: req.params.id
  })
  .populate('dates.places')
  .exec(function (err, foundTrip) {
    if (err) return res.send(err)
    res.send(foundTrip)
  })
}

function deleteSelected(req, res) {
  User.findOne({
    _id: req.user.id
  }, function (err, user) {
    if(err) return res.send(err)
    // console.log(user)
    // console.log(req.params.id);
    var index = user.trips.findIndex(function(trip) {
      return trip == req.params.id
    })
    // console.log(index);
    if (index !== -1) {
      user.trips.splice(index, 1)
      user.save()
    }
  })
  Trip.findOneAndRemove({
    _id: req.params.id
  }, function (err, deletedTrip) {
    if (err) return res.send(err)
    for (var i = 0; i < deletedTrip.dates.length; i++) {
      for (var j = 0; j < deletedTrip.dates[i].places.length; j++) {
        Place.findOne({
          _id: deletedTrip.dates[i].places[j]
        }, function (err, foundPlace) {
          if (err) res.send(err)
          // console.log(deletedTrip);
          // console.log(foundPlace);
          var index = foundPlace.trips.findIndex(function (id) {
            return id == deletedTrip.id
          })
          // console.log(index);
          if (index !== -1) {
            foundPlace.trips.splice(index, 1)
            foundPlace.save()
          }
        })
      }
    }
    res.send(deletedTrip)
  })
}

module.exports = {
  create,
  showMain,
  showSelected,
  deleteSelected
}
