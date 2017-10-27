const passport = require('../config/ppConfig')
const User = require('../models/user')
const Pattern = require('../models/pattern')
const Project = require('../models/project')
const express = require('express')
const router = express.Router()

const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })


router.get('/new', (req, res) => {
  res.render('pattern/new')
})

router.post('/new', upload.single('image'), (req, res) => {

  const userData = req.user
  const userId = userData.id
  const userPattern = userData.pattern
  const patternData = req.body.pattern
  cloudinary.uploader.upload(req.file.path, function(result) {
    let newPattern = new Pattern({
      title : patternData.title,
      creator : userId,
      category : patternData.category,
      material : patternData.material,
      steps : patternData.steps,
      imageUrl : result.secure_url
    })
    newPattern.save()
    .then(pattern => {
      console.log('success')
      res.redirect(`/pattern/${pattern.id}`)
    }, err => res.send(err))
  })

})

router.get('/:id', (req, res) => {
  const patternId = req.params.id
  Pattern.findById(patternId)
  .populate('creator')
  .then(pattern => {
    let userBookmark = req.user.bookmark
    let notBookmark = true
    let userBookmarkId =""

    for (var i = 0; i < userBookmark.length; i++) {
      userBookmarkId = userBookmark[i].toString()
      if(userBookmarkId === patternId){
        notBookmark = false
      }
    }
    let userMatch = (pattern.creator.id === req.user.id)
    Project.find({pattern : patternId})
    .then(variations => {
      res.render('pattern/details', {
        pattern, userMatch, variations, notBookmark
      })
    })
  })
  .catch(err => res.send(err))
})
///

router.get('/:id/edit', (req, res) => {

  Pattern.findById(req.params.id)
  .populate('creator')
  .then(pattern => {
    if (pattern.creator.id === req.user.id){
      res.render('pattern/edit', {
        pattern
      })
    }
    else res.redirect('/')
  })
})

router.put('/:id/edit', upload.single('image'), (req, res) => {
  const newPatternData = req.body.pattern
  const patternId = req.params.id
  cloudinary.uploader.upload(req.file.path, function(result) {

    Pattern.findByIdAndUpdate(patternId, {
      title : newPatternData.title,
      material : newPatternData.material,
      steps: newPatternData.steps,
      imageUrl: result.secure_url,

    })
    .then(() => res.redirect(`/pattern/${patternId}`))
    .catch(err => res.send(err))
  })
})
router.delete('/:id/edit', (req, res) => {
  const patternId = req.params.id
  Pattern.findById(req.params.id)
  .populate('creator')
  .then(pattern => {

    if (pattern.creator.id === req.user.id){
      const patternVariation = pattern.variation
      console.log(patternVariation)
      console.log(typeof patternVariation)
      Pattern.findByIdAndRemove(patternId)
      .then(() => {
        for (var i = 0; i < patternVariation.length; i++) {
          console.log(patternVariation[i])
          console.log(patternVariation[i].id)
          Project.findByIdAndUpdate(patternVariation[i], {
            pattern : {}
          })
          .then(() => {
            console.log('project updated')

            res.redirect(`/home`)
          })
          .catch(err => console.log(err))
        }
    })
    .catch(err => res.send(err))
  }

  else res.redirect(`/pattern/${patternId}`)
  })
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
router.post('/:id/variation/new', upload.single('image'), (req, res) => {
  const userData = req.user
  const userId = userData.id
  const userProject = userData.project
  // console.log(req.params)
  const patternId = req.params.id
  const projectData = req.body.project
  let projectTitle = projectData.title


  Pattern
  .findById(patternId)
  .then(pattern => {
    const projectCategory = pattern.category
    cloudinary.uploader.upload(req.file.path, function(result) {
      let newProject = new Project({
        title : projectTitle,
        creator : userId,
        category : projectCategory,
        material : projectData.material,
        pattern : patternId,
        imageUrl : result.secure_url
      })

      newProject.save()
      .then(project => {

        res.redirect(`/project/${project.id}`) // redirect to the details page of the projects
        // User.findByIdAndUpdate(userId, {
        //   project : userProject
        // })
        // .then(() => {
        //   console.log('User successfully updated')
        // })
        // .catch(err => console.log('Update failed'))
      }, err => res.send(err))
    })
  })
.catch(err => console.log('findpattern by id error'))
})
// router.get('/:id/bookmark', (req, res) => {
//   console.log('get ')
//   //res.redirect('/pattern/:id')
// })

router.post('/:id/bookmark', (req, res) => {
  const userId = req.user.id
  const patternId = req.params.id
  let userBookmark = req.user.bookmark
  let notBookmark = true
  for (var i = 0; i < userBookmark.length; i++) {
    if(userBookmark[i].id === patternId){
      notBookmark = false
    }
  }
  if(notBookmark){
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

  } else {
    res.redirect(`/pattern/${patternId}`)
  }


})

module.exports = router
