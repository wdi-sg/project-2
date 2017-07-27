var express = require('express')
var router = express.Router()
var Episode = require('../models/Episodes')

router.get('/', function (req, res){
 Episode
 .find({
   user: req.user.id
 })
 .exec(function (err, episode) {
   if (err) res.send(err)
   res.render('profile/profile', {
     episode: episode,
   })
 })
})

module.exports = router
