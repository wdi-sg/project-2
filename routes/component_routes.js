const Component = require('../models/component')
const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('components/new')
})

router.get('/showall', (req, res) => {
  Component
  .find()
  .then(components => {
    res.render('components/showall', {
      components
    })
  })
  .catch(err => {
    console.log(err)
  })
})


router.get('/:id', (req, res) => {
  // instead of find all, we can `findById`
  Component
  .findById(req.params.id) // no need limit since there's only one
  .populate('owner')
  // .populate(<field name>)
  .then(component => {
    res.render('components/show', {
      component
    })
  })
  .catch(err => {
    console.log(err)
  })
})

// CREATE NEW COMPONENT
router.post('/', (req, res) => {
  var formData = req.body

  var newComponent = new Component({
    name: formData.name,
    description: formData.description,
    vendor: formData.vendor,
    unit_cost: formData.unit_cost,
    quantity: formData.quantity,
    owner: req.user.id
  })

  newComponent.save() // save the object that was created
  .then(
    // success flow, for now is to redirect to all reviews route
    () => res.redirect('components/showall'),
    err => res.send('error happened')
  )
})




module.exports = router
