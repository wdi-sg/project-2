const passport = require('../config/ppConfig')
const User = require('../models/user')
const Pattern = require('../models/pattern')
const Project = require('../models/project')
const express = require('express')
const router = express.Router()
const async = require('async')

router.get('/', (req, res) => {
  let categoryArray = ['woodcraft','papercraft', 'sewing', 'knitting']

  Pattern.find({"category" : 'woodcraft'}).limit(6)
  .then((woodcraftPatterns) => {
    Pattern.find({"category" : 'sewing'}).limit(6)
    .then((sewingPatterns) => {
      Pattern.find({"category" : 'papercraft'}).limit(6)
      .then((papercraftPatterns) => {
        res.render('home', {
          woodcraftPatterns, sewingPatterns, papercraftPatterns
        })
      })
    })
  })
  .catch(err => console.log(err))



  // var searchWoodcraft = Pattern.find({"category" : 'woodcraft'}).limit(6)
  //
  // var searchPapercraft = Pattern.find({"category" : 'papercraft'}).limit(6)
  //
  // async.series([searchWoodcraft, searchPapercraft], function(err, results) {
  //   console.log(results)
  // })



})

module.exports = router
