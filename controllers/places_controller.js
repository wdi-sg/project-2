const Place = require('../models/Place')
const User = require('../models/User')
const Trip = require('../models/Trip')

function showMain(req, res) {
  User.findOne({
      _id: req.user.id
    })
    .populate('trips')
    .exec(function(err, foundUser) {
      if (err) {
        return res.send(err)
      }
      res.render('places/index', {
        theUser: foundUser,
        user: req.user
      })
    })
}

function showTopPlaces (req, res) {
  // console.log(req.query.city)
  if (!req.query.city) {
    Place.find({})
    .sort('-timesAdded')
    .limit(10)
    .exec(function (err, foundPlaces) {
      if (err) return res.send(err)
      // console.log(foundPlaces);
      return res.render('places/top', {
        user: req.user,
        places: foundPlaces
      })
    })
  } else {
    Place.find({
      $text: {
        $search: req.query.city
      }
    })
    .sort('timesAdded')
    .limit(10)
    .exec(function (err, foundPlaces) {
      if (err) return res.send(err)
      // console.log(foundPlaces);
      res.render('places/top', {
        user: req.user,
        places: foundPlaces
      })
    })
  }
}

function createOrUpdate(req, res) {
  Place.count({
    place_id: req.body.place_id
  }, function(err, count) {
    if (err) res.send(err)
    if (count === 0) {
      Place.create({
        name: req.body.name,
        address: req.body.address,
        place_id: req.body.place_id
      }, function(err, newPlace) {
        if (err) return res.send(err)
        console.log(newPlace)
        Trip.findOne({
          _id: req.body.id
        }, function(err, foundTrip) {
          if (err) return res.send(err)
          foundTrip.dates.forEach(function(date) {
            if (date.date === req.body.date) {
              date.places.push(newPlace.id)
            }
          })
          foundTrip.save()
          if (newPlace.trips.findIndex(function (id) {
            return id == foundTrip.id
          }) === -1) {
            newPlace.trips.push(foundTrip.id)
            newPlace.timesAdded += 1
            newPlace.save()
          }
        })
        return res.send(`Added ${newPlace.name}!`)
      })
    } else if (count === 1) {
      Place.findOne({
        place_id: req.body.place_id
      }, function(err, foundPlace) {
        if (err) return res.send(err)
        Trip.findOne({
          _id: req.body.id
        }, function(err, foundTrip) {
          if (err) return res.send(err)
          foundTrip.dates.forEach(function(date) {
            if (date.date === req.body.date) {
              var index = date.places.findIndex(function (place) {
                return place == foundPlace.id
              })
              if (index !== -1) {
                return res.send('Already Added Before!')
              } else {
                date.places.push(foundPlace.id)
                foundTrip.save()
                if (foundPlace.trips.findIndex(function (id) {
                  return id == foundTrip.id
                }) === -1) {
                  foundPlace.trips.push(foundTrip.id)
                  foundPlace.timesAdded += 1
                  foundPlace.save()
                }
                return res.send(`Added ${foundPlace.name}!`)
              }
            }
          })
        })
      })
    }
  })
}

function showOneOnMap (req, res) {
  User.findOne({
    _id: req.user.id
  })
  .populate('trips')
  .exec(function (err, foundUser) {
    if (err) {
      return res.send(err)
    }
    res.render('places/index', {
      theUser: foundUser,
      user: req.user,
      placeID: req.params.id
    })
  })
}

function showTripOnMap (req, res) {
  Trip.findOne({
    _id: req.params.tripid
  }, function (err, foundTrip) {
    if (err) return res.send(err)
    foundTrip.dates.forEach(function (date) {
      if (date.date === req.params.date) {
        var placesArray = []
        if (date.places.length === 0) return res.send({
          message: 'No place found for this date!',
          status: 'fail'
        })
        date.places.forEach(function (place) {
          Place.findOne({
            _id: place
          }, function (err, foundPlace) {
            if (err) return res.send(err)
            placesArray.push(foundPlace.place_id)
            if (placesArray.length === date.places.length) {
              return res.send(placesArray)
            }
          })
        })
      }
    })
  })
}

module.exports = {
  showMain,
  showTopPlaces,
  createOrUpdate,
  showOneOnMap,
  showTripOnMap
}
