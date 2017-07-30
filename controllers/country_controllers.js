const Country = require('../models/Country')
const Input = require('../models/Input')

function search (req, res) {
  Country.findOne({
    name: req.body.searchInput
  }, function (err, theCountry) {
    if (err) res.send(err)

    res.render('country', {
      country: theCountry
    })
  })
}

function update (req, res) {

  Input.findOne({
    'janUp': true
    // 'pair': ['singapore', 'jocelyn@hotmail.com']
  }), (err, input) => {
    console.log(test)
    if (err) res.send(err)
    if (input.janUp === true) return null
  }
  Country.findOne({'name': 'singapore' }, (err, country) => {
    if (err) res.send(err)
    let newUpvote = country.upvotes[0] + 1
    Country.findOneAndUpdate({ 'name': 'singapore' }, {
      '$set': {'upvotes.0': newUpvote}
    }, function (err, theCountry) {
      if (err) res.send(err)
      res.json(theCountry)
    })
  })
}

module.exports = {
  search, update
}
