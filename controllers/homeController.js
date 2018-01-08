const Trip = require('../models/trip')

exports.index = (req,res) => {
  res.render('index')
}

exports.home = (req,res) => {
  let currentUserID = req.session.passport.user
  Trip.find({users : currentUserID}).exec((err, data) => {
    if (err) console.log(err)
    if (data != "" || data != null) {
      res.render('home/index',{"results":data})
    }
    else {
      res.render('home/index')
    }
  })
}
