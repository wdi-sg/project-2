const passport = require('../config/ppConfig')
const User = require('../models/user')
const Pattern = require('../models/pattern')
const express = require('express')
const router = express.Router()

router.get('/pattern', (req, res) => {
  res.render('pattern/new')
})

router.post('/pattern', (req, res) => {
  const userData = req.user
  const userId = userData.id
  const userPattern = userData.pattern
  const patternData = req.body.pattern
  let newPattern = new Pattern({
    title : patternData.title,
    creator : userId,
    category : patternData.category,
    material : patternData.material,
    steps : patternData.steps
  })
  newPattern.save()
  .then(pattern => {
    userPattern.push(pattern.id)
    User.findByIdAndUpdate(userId, {
      pattern : userPattern
    })
    .then(() => {
      console.log('User successfully updated')

      res.redirect(`/`) //   res.redirect(`/${patternData.category}/${pattern.id}`)
    })
    .catch(err => console.log('Update failed'))
  }, err => res.send(err))
})

module.exports = router
