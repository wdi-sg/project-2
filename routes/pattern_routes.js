const passport = require('../config/ppConfig')
const User = require('../models/user')
const Pattern = require('../models/pattern')
const Project = require('../models/project')
const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('pattern/new')
})

router.post('/new', (req, res) => {
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

router.get('/:id', (req, res) => {
  const patternId = req.params.id
  Pattern.findById(patternId)
  .populate('creator')
  .then(pattern => {
    res.render('pattern/details', {
      pattern
    })
  })
})
///
router.put('/:id', (req, res) => {
 // check if the user is the creator, if yes allow to edit
})
router.get('/:id/variation/new', (req,res) => {
  // const patternId = req.params.id
  Pattern.findById(req.params.id)
  .then(pattern => {
    res.render('pattern/variation', {
      pattern
    })
  })
})
router.post('/:id/variation/new', (req, res) => {
  const userData = req.user
  const userId = userData.id
  const userProject = userData.project
  // console.log(req.params)
  const patternId = req.params.id
  const projectData = req.body.project
  let projectTitle = projectData.title
  // console.log(patternId)

  Pattern
  .findById(patternId)
  .then(pattern => {
    //console.log('found pattern')
    if (!projectTitle){
      var lastPartId = userId.substring(20)
      projectTitle = pattern.title +'v' + lastPartId
    }
    const patternVariation = pattern.variation
    const projectCategory = pattern.category
    let newProject = new Project({
      title : projectTitle,
      creator : userId,
      category : projectCategory,
      material : projectData.material,
      pattern : patternId,

    })

    newProject.save()
    .then(project => {
      //console.log('saving project')
      userProject.push(project.id)
      patternVariation.push(project.id)
      Pattern.findByIdAndUpdate(patternId,{
        variation : patternVariation
      })
      .then(() => console.log('update variation'))
      .catch(err => console.log(err))

      User.findByIdAndUpdate(userId, {
        project : userProject
      })
      .then(() => {
        console.log('User successfully updated')
        res.redirect(`/profile`) // redirect to the details page of the projects
      })
      .catch(err => console.log('Update failed'))
    }, err => res.send(err))

  })
.catch(err => console.log('findpattern by id error'))
})
// router.get('/:id/bookmark', (req, res) => {
//   console.log('get ')
//   //res.redirect('/pattern/:id')
// })

router.post('/:id/bookmark', (req, res) => {
  const userId = req.user.id


  User.findById(userId)
  .then(user => {

    let userBookmark = user.bookmark
    const patternId = req.params.id
    userBookmark.push(patternId)

    User.findByIdAndUpdate(userId, {
      bookmark : userBookmark
    })
    .then(() => {

      res.redirect(`/pattern/${patternId}`)
    }, (err) => console.log(err))

  })

})

module.exports = router
