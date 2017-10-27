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

})

router.get('/:id', (req, res) => {
  const patternId = req.params.id
  Pattern.findById(patternId)
  .populate('creator')
  .populate('variation')
  .then(pattern => {

    var userMatch = (pattern.creator.id === req.user.id)

    res.render('pattern/details', {
      pattern, userMatch
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
      })// can pass in pattern infor
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
    console.log('found pattern')
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
          .then(console.log('project updated'))
          .catch(err => console.log(err))
        }
        User.findById(pattern.creator.id)
        .then(user => {
          console.log(user)
          console.log(typeof user) // object
          let patternArray = user.pattern
          console.log(patternArray)
          console.log(typeof patternArray) //object
          // find the position of the pattern in the pattern array
        })
        .catch(err => console.log(err))
        // User.findByIdAndUpdate(pattern.creator.id, {
        //
        // })



        res.redirect(`/home`)})
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
  // console.log(patternId)

  Pattern
  .findById(patternId)
  .then(pattern => {
    // if (!projectTitle){
    //   var lastPartId = userId.slice(20)
    //   projectTitle = pattern.title +'v' + lastPartId
    // }
    const patternVariation = pattern.variation
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
    // console.log(typeof(patternId))
    // console.log(userBookmark)
    // console.log(typeof(userBookmark[0]))
    // const checkingId = toString(req.params.id)
    // console.log(userBookmark.hasOwnProperty(checkingId))

    // if (userBookmark.includes(checkingId)){
    //   console.log('userBookmark.includes(checkingId))', userBookmark.includes(checkingId))
    //   res.redirect(`/pattern/${patternId}`)
    // }
    // else {

    // console.log('!userBookmark.includes(checkingId))', userBookmark.includes(checkingId))
    //
    userBookmark.push(patternId)
    // console.log(userBookmark)
    User.findByIdAndUpdate(userId, {
      bookmark : userBookmark
    })
    .then(() => {

      res.redirect(`/pattern/${patternId}`)
    }, (err) => console.log(err))

    // }



  })

})

module.exports = router
