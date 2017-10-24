const express = require('express')
const router = express.Router()
const Fridge = require('../models/fridge')

//random string function
const stringGen = function(len){
    var text = " ";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

//routes
router.get('/new', (req, res)=>{
  res.render('fridge/new')
})

router.post('/', (req,res)=>{
  var fridgeData = req.body.fridge
  var newFridge = new Fridge({
    name: fridgeData.name,
    passcode: stringGen(5),
    members: req.user.id
  })

  newFridge.save()
  .then(
    fridge => res.render('fridge/fridge'),
    err => res.send(err)
  )
})

//route for fridge view
router.get('/fridge', (req,res)=>{
  res.render('fridge/fridge')
})

module.exports = router
