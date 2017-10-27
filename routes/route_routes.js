const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('map/route')
})
router.put('/', (req, res) => {
  var _id = (req.body.user).substring(7, 31)
  console.log('startPostal', req.body.postalArray[0])
  console.log('endPostal', req.body.postalArray[1])
  User.findByIdAndUpdate(_id,
    { startPostal: req.body.postalArray[0],
      endPostal: req.body.postalArray[1],
      arrTime: Number(req.body.time)
    },
  { new: true },
  function (err, success) {
    if (err) return console.log(err)
    var startDigits = req.body.postalArray[0].toString().substr(0, 2)
    var endDigits = req.body.postalArray[1].toString().substr(0, 2)
    var startRegex = new RegExp('^' + startDigits + '\\d+', 'gm')
    var endRegex = new RegExp('^' + endDigits + '\\d+', 'gm')

    User.count({
      'startPostal': {$regex: startRegex},
      'endPostal': {$regex: endRegex},
      'arrTime': Number(req.body.time)
    })
    .then((data) => {
      res.send(JSON.stringify(data))
    })
  }
)
})

module.exports = router
