const Trip = require('../models/trip')
const Location = require('../models/location')

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
        Location.find({
          tripId: data.id
        }).exec((err2, data2) => {
          if (err2) {
            console.log(err2)
          }
          else {
            res.render('trip/tripMain',{"results":data, "results2":data2})
            // res.render('trip/tripMain',{"results":data})
          }
        })
      }
    })
  }//End if query id not null
  else {
    req.flash('error', 'Trip not found')
    res.redirect('/home')
  }
}
