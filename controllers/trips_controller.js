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
    return req.session.save(function () {
      res.redirect('/trips/create')
    })
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
      user: req.user
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
    user.trips.pull(req.params.id)
    user.save()
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
          foundPlace.trips.pull(req.params.id)
          foundPlace.timesAdded -= 1
          foundPlace.save()
        })
      }
    }
    res.send(deletedTrip)
  })
}

function removePlaceFromTrip(req, res) {
  Trip.findOne({
    _id: req.body.tripID
  }, function (err, foundTrip) {
    if (err) return res.send(err)
    foundTrip.dates.forEach(function(date) {
      if (date.date === req.body.date) {
          date.places.pull(req.body.placeID)
          foundTrip.save()
      }
    })
    var ifPlaceExist = foundTrip.dates.map(function (date) {
      var index = date.places.findIndex(function (placeID) {
        return placeID == req.body.placeID
      })
      if (index !== -1) return 'yes'
      else return 'no'
    })
    if (ifPlaceExist.includes('yes')) {
      return res.send('Successfully deleted! Place still exists in another date')
    } else {
      Place.findOne({
        _id: req.body.placeID
      }, function (err, foundPlace) {
        if (err) return res.send(err)
          foundPlace.trips.pull(req.body.tripID)
          foundPlace.timesAdded -= 1
          foundPlace.save()
        return res.send('Successfully deleted!')
      })
    }
  })
}

function checkIfPlaceAlreadyAdded (req, res) {
  Trip.findOne({
    _id: req.body.id
  }, function (err, foundTrip) {
    if (err) return res.send(err)
    foundTrip.dates.forEach(function (date) {
      if (date.date === req.body.date) {
        Place.count({
          place_id: req.body.place_id
        }, function (err, placeCount) {
          if (err) res.send(err)
          return res.send(placeCount)
        })
      }
    })
  })
}

module.exports = {
  create,
  showMain,
  showSelected,
  deleteSelected,
  removePlaceFromTrip,
  checkIfPlaceAlreadyAdded
}
