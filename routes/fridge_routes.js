const express = require('express')
const router = express.Router()
const Fridge = require('../models/fridge')
const Task = require('../models/task')

//random string function
const stringGen = function(len){
    var text = "";
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
    members: [req.user.id]
  })
  //


  newFridge.save()
  .then(
    fridge => {
      var user = req.user
      user.fridges.push(fridge.id)

      user.save()
      .then(() => res.redirect('profile'))
      // res.render('fridge/fridge')
    },
    err => res.send(err)
  )
})

router.get('/enter', (req,res)=>{
  res.render('fridge/enter')
})

router.post('/enter', (req,res)=>{
  var formdata=req.body.fridge
  Fridge.find({name:formdata.name})
  .then(fridges => {
    if (fridges[0].passcode===formdata.passcode ){
      var user = req.user
      fridges[0].members.push(user.id)
      user.fridges.push(fridges[0].id)
      fridges[0].save()
      user.save()
      res.redirect(`/fridge/${fridges[0].id}`)
    }else{
      res.redirect('/profile')
    }
  })
})


router.get('/:id', (req, res)=>{
  Fridge.findById(req.params.id)
  .then(fridge => {
    res.render('fridge/fridge', {fridge})
  })
})

router.delete('/:id', (req, res)=>{
  Fridge.findByIdAndRemove(req.params.id)
  .then(()=> res.redirect('/profile'))
  .catch(err => console.log(err))
})


module.exports = router
