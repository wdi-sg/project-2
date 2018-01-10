const Location = require('../models/location')

exports.create = (req,res) => {
  Location.create(req.body, (err, trip) => {
    if (err) {
      console.log(err)
      req.flash('error', 'Location not added')
      res.end('{"error" : "Location not added", "status" : 200}')
      // res.redirect('/trip/main')
    } else {
      req.flash('success', 'Location added')
      res.end('{"success" : "Location added", "status" : 200}')
      // res.redirect('/trip/main')
    }
  }) //end err
}

exports.getAllForTrip = (req,res) => {
  Location.find({
    tripId: req.query.id
  }).exec((err, trip) => {
    if (err) {
      console.log(err)
      res.end('{"error" : "getAllForTrip", "status" : 200}')
    } else {
      res.send(trip)
      res.end('{"success" : "getAllForTrip", "status" : 200}')
    }
  }) //end err
}
