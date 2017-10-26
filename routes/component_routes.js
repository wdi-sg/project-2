const Component = require('../models/component')
const Type = require('../models/type')

const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('components/new')
})

router.get('/variables', (req, res) => {
  Type
  .find()
  .then(types => {
    res.render('components/variables', {
      types
    })
  })
.catch(err => {
  console.log(err)
})
})

router.get('/showall', (req, res) => {
  Component
  .find()
  .sort({type: 1})
  .then(components => {
    res.render('components/showall', {
      components
    })
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/summary', (req, res) => {
  Component
  .aggregate(
    [
      { $group: {
        _id: '$type',
        total: { $sum: {$multiply: ['$unit_cost', '$quantity']} }
      }
      }
    ]
   )
  .then(components => {
    res.render('components/summary', {
      components
    })
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/:id', (req, res) => {
  Component
  .findById(req.params.id)
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
    type: formData.type,
    owner: req.user.id
  })
  newComponent.save() // save the object that was created
  .then(
    // success flow, for now is to redirect to all reviews route
    () => res.redirect('components/showall'),
    err => res.send('error happened')
  )
})

// UPDATE
router.put('/:id', (req, res) => {
  var formData = req.body
  Component.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    description: formData.description,
    vendor: formData.vendor,
    unit_cost: formData.unit_cost,
    quantity: formData.quantity,
    type: formData.type
  })
  .then(() => res.redirect(`/components/${req.params.id}`))
  .catch(err => console.log(err))
})

router.put('/variables', (req, res) => {
  var formData = req.body
  Type.findByIdAndUpdate(req.params.id, {
    margin: formData.margin
  })
  .then(() => res.redirect('/components/variables'))
  .catch(err => console.log(err))
})

// DELETE
router.delete('/:id', (req, res) => {
  Component.findByIdAndRemove(req.params.id)
  .then(() => res.redirect('/components/showall'))
  .catch(err => console.log(err))
})

module.exports = router
