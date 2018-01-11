const Trip = require('../models/trip')
const Location = require('../models/location')
const Itinerary = require('../models/itinerary')
// const mongoose = require('mongoose')

exports.new = (req,res) => {
  res.render('trip/newTrip')
}

exports.create = (req,res) => {
  req.checkBody('tripName', 'Trip Name cannot be empty').notEmpty()
  req.checkBody('countrySelect', 'Country cannot be empty').notEmpty()
  req.checkBody('dateFrom', 'Starting Date cannot be empty').notEmpty()
  req.checkBody('dateTo', 'End Date cannot be empty').notEmpty()
  let errors = req.validationErrors()
  if (errors) {
    res.render('trip/newTrip',{errors:errors})
  }
  else {
    Trip.create({
      tripName : req.body.tripName,
      country : req.body.countrySelect,
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
        req.flash('success', 'Trip created')
        res.redirect('/trip/main?id='+trip.id)
      }
    }) //end err
  } //end else
}

exports.main = (req,res) => {
  if (req.query.id != null) {
    let query = {
      "_id" : req.query.id
    }
    Trip.findOne(query).exec((err, data) => {
      if (err) {
        console.log(err)
        req.flash('error', 'Trip not found')
        res.redirect('/home')
      }
      else {
        let dateObj = {
          'dateFrom': getISODate(data.dateFrom),
          'dateTo': getISODate(data.dateTo),
          'dateFromUTC': getUTCDateNoTime(data.dateFrom),
          'dateToUTC': getUTCDateNoTime(data.dateTo)
        }
        let fkTripId = {
          tripId: data.id
        }
        Location.find(fkTripId).exec((err2, data2) => {
          if (err2) {
            console.log(err2)
          }
          else {
            Itinerary.find(fkTripId).sort({date: 'asc'}).exec((err3, data3) => {
              if (err3) {
                console.log(err3)
              }
              else {
                res.render('trip/tripMain',{"results":data, "results2":data2, "dateObj":dateObj, "results3":data3})
              }
            })//End Itinerary.find
          }
        })//End Location.find
      }
    })//End Trip.findOne
  }//End if query id not null
  else {
    req.flash('error', 'Trip not found')
    res.redirect('/home')
  }
}

exports.delete = (req,res) => {
  if (req.body.tripId != null) {
    Trip.findByIdAndRemove(req.body.tripId, err => {
      if (err) {
        console.log(err)
        req.flash('error', 'Error removing Trip')
        res.redirect('/home')
      } else {
        // let objId = mongoose.Types.ObjectId(req.body.tripId)
        // let fkTripId = {
        //   tripId: objId
        // }
        // Location.deleteMany({fkTripId}, err => {if (err) console.log(err)})
        // Itinerary.deleteMany({fkTripId}, err => {if (err) console.log(err)})
        req.flash('success', 'Trip removed')
        res.redirect('/home')
      }
    })
  } else {
    req.flash('error', 'Error removing Trip')
    res.redirect('/home')
  }
}

function getISODate(string) {
  return new Date(string).toISOString().slice(0, -1)
}

function getUTCDateNoTime(string) {
  return new Date(string).toUTCString().slice(0, -13)
}
