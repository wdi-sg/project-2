const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Pattern = require('../models/pattern')
const Project = require('../models/project')
const { hasLoggedOut, isLoggedIn } = require('../helpers')

router.get('/', hasLoggedOut, (req, res) => {
  User
  .findById(req.user.id)
  .populate('bookmark')
  .then(user => {
    Pattern.find({creator: req.user.id})
    .then(patterns => {
      Project.find({creator: req.user.id})
      .then(projects => {
        res.render('user/profile', {
          user, patterns, projects
        })
      })
    })
  })
  .catch(err => {
    res.send(err)
  })
})



router.delete('/',hasLoggedOut, (req, res) => {
  // consider add alert screen
  const userId = req.user.id
  User.findByIdAndRemove(req.user.id)
  .then(() => {
    req.logout()
    res.redirect(`/`)

    Pattern.find({creator: userId})
    .then(patternsArray => {
      for (var i = 0; i < patternsArray.length; i++) {
        Pattern.findByIdAndRemove(patternsArray[i].id)
        .then(() => {
          
          Project.find({creator: userId})
          .then(projectsArray => {
            for (var i = 0; i < projectsArray.length; i++) {
              Project.findByIdAndRemove(projectsArray[i].id)
              .then(() => {})
              }
            })
            .catch(err => {

            })
          })
          .catch(err => {
          })
        }
      })
      .catch(err => {
      })
    })
    .catch(err => res.send(err))
  })



router.get('/edit', hasLoggedOut, (req,res) => {
  res.render('user/editaccount')
})
router.put('/edit', (req,res) => {
  let updateData = req.body.user
  let newSlug = req.body.user.slug

  if (updateData.name) {
    newSlug = updateData.name.toLowerCase().split(' ').join('-')
  }
  // if (updateData.password) {
  //   bcrypt.hash(updateData.password,10)
  //   .then(hash => {
  //     newPassword = hash
  //   })
  //
  // }
  User.findByIdAndUpdate(req.user.id, {
    name : updateData.name,
    //password : updateData.password, // need to rehash it
    slug : newSlug
  })
  .then(user => res.redirect('/profile'))
  .catch(err => res.send(err))

})

router.get('/:slug', (req, res) => {
  const profileSLug = req.params.slug

  User
  .find({ slug : profileSLug})
  .then(user => {
    const userDetails = user[0]
    Pattern.find({creator: userDetails.id})
    .then(patterns =>
      Project.find({creator: userDetails.id})
      .then(projects => {
        res.render('user/otherprofile', {
          userDetails, patterns, projects
        })
      })
    )
  })
  .catch(err => {
    res.send(err)
  })
})



module.exports = router
