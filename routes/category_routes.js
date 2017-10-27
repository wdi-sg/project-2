const passport = require('../config/ppConfig')

const Pattern = require('../models/pattern')
const Project = require('../models/project')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  let categoryArray = ['woodcraft','papercraft', 'sewing', 'knitting']
  res.render('category/all', {
    categoryArray
  })
})

router.get('/:category/', (req, res) => {
  const searchCategory = req.params.category
  Pattern.find({"category" : searchCategory}).limit(10)
  .then((patterns) => {

    Project.find({"category" : searchCategory}).limit(10)
    .then((projects) => {

      res.render('category/show', {
        patterns , projects
      })
    })

  })
})

module.exports = router
