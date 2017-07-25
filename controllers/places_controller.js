const Place = require('../models/Place')
const User = require('../models/User')

function showMain (req, res) {
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
      user: req.user
    })
  })
}

module.exports = {
  showMain
}
