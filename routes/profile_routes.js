const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Fridge = require('../models/fridge')

router.get('/', (req, res)=>{
    User.findById(req.user.id)
    .populate('fridges')
    .then(members =>
      res.render('profile', {
        members
      })
    )
    .catch(err => {
      console.log(err)
    })
})



module.exports = router
