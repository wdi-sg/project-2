const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  var formData = req.body

  User.findByIdAndUpdate(
    req.params.id,
    {
      name: formData.name,
      email: formData.email,
      slug: formData.name
        .toLowerCase()
        .split(' ')
        .join('-')
    },
    { new: true }
  )
    .then(user => res.redirect(`/profile/${user.slug}`))
    .catch(err => console.log(err))
})

module.exports = router
