const Country = require('../models/Country')
const Vote = require('../models/Vote')

function add (req, res) {

  var newVote = new Vote({
    points: 1,
    month: 1,
    country: req.body.country,
    user: req.user.id
  })
  newVote.save(function (err, createdVote) {
    if (err) res.send(err)
    res.send(createdVote)
  })
}

module.exports = add
