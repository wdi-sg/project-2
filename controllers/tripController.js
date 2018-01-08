const passport = require('../helpers/ppInformation')
const Trip = require('../models/trip')

exports.new = (req,res) => {
  res.render('trip/newTrip')
}

exports.create = (req,res) => {
  req.checkBody('tripName', 'Trip Name cannot be empty').notEmpty()
  req.checkBody('country', 'Country cannot be empty').notEmpty()
  req.checkBody('dateFrom', 'Starting Date cannot be empty').notEmpty()
  req.checkBody('dateTo', 'End Date cannot be empty').notEmpty()
  let errors = req.validationErrors()
  if (errors) {
    res.render('trip/newTrip',{errors:errors})
  }
  else {
    Trip.create({
      tripName : req.body.tripName,
      country : req.body.country,
      city : req.body.city,
      dateFrom : req.body.dateFrom,
      dateTo : req.body.dateTo,
      users : [req.session.passport.user]
    }, (err, trip) => {
      if (err) {
        console.log(err)
        req.flash('error', 'Trip not created')
        res.redirect('/trip/new')
      } else {
        req.session.currentTripID = trip._id
        req.flash('success', 'Trip created')
        res.redirect('/trip/main')
      }
    }) //end err
  } //end else
}

exports.main = (req,res) => {
  let currentTripID = ""
  if (req.session.currentTripID != "") {
    currentTripID = req.session.currentTripID
    req.session.currentTripID = ""
  }
  else if (req.query.id != "") {
    currentTripID = req.query.id
  }
  let query = {
    "_id" : currentTripID
  }
  Trip.findOne(query).exec((err, data) => {
    if (err) {
      console.log(err)
      req.flash('error', 'Trip not found')
      res.redirect('/home')
    }
    else {
      res.render('trip/tripMain',{"results":data})
    }
  })
}
