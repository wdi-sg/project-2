const express = require('express')
const router = express.Router()
const Fridge = require('../models/fridge')

router.get('/new', (req, res)=>{
  res.render('fridge/new')
})

router.post('/', (req,res)=>{
  var fridgeData = req.body.fridge
  var newFridge = new Fridge({
    name: fridgeData.name
  })

  newFridge.save()
  .then(
    fridge => res.redirect('/profile'),
    err => res.send(err)
  )
})

module.exports = router
