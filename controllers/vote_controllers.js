const Country = require('../models/Country')
const Vote = require('../models/Vote')
const User = require('../models/User')

function search (req, res) {
  Country.findOne({
    name: req.body.searchInput
  }, function (err, theCountry) {
    if (err) res.send(err)
    res.redirect('/countries/' + theCountry.id)
  })
}

function show (req, res) {
  Country
  .findById(req.params.id)
  .exec(function (err, countryData) {
    if (err) res.send(err)

    Vote
    .find({
      country: countryData.id
    })
    .populate('Country')
    .exec(function (err, voteData) {
      if (err) res.send(err)

      res.render('countries/show', {
        countryData,
        voteData
      })
    })
  })
}

function add (req, res) {
  var newVote = new Vote({
    points: 1,
    month: 1,
    country: req.params.id,
    user: req.user.id
  })
  newVote.save(function (err, createdVote) {
    if (err) res.send(err)
    res.json(createdVote)
  })
}

// function update (req, res) {
//   Country.findOne({'name': countryName }, (err, country) => {
//     if (err) res.send(err)
//     let newUpvote = country.upvotes[0] + 1
//     Country.findOneAndUpdate({ 'name': 'singapore'}, {
//       '$set': {'upvotes.0': newUpvote}
//     }, function (err, theCountry) {
//       if (err) res.send(err)
//       res.json(theCountry)
//     })
//   })
// }

module.exports = {
  search, show, add
}
