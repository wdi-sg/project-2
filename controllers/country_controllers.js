const Country = require('../models/Country')
const Vote = require('../models/Vote')

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
    .aggregate(
      {
        $group: {
          _id: {
            'month': '$month',
            'country': '$country'
          },
          totalVotes: {
            $sum: '$points'
          }
        }
      },
      function (err, voteData) {
        if (err) res.send(err)

        res.send(voteData)

        // res.render('countries/show', {
        //   countryData,
        //   voteData
        // })
      })
  })
}

module.exports = {
  search, show
}
