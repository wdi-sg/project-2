const Location = require('../models/location')

exports.create = (req,res) => {

  console.log("locationControl start")
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
