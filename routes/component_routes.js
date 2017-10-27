const Component = require('../models/component')
const Type = require('../models/type')

const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  Type
  .find()
  .then(types => {
    res.render('components/new', {
      types
    })
  })
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

// SHOW ALL COMPONENTS
router.get('/showall', (req, res) => {
  // if admin, can view all components
  if (req.user.isAdmin) var statusFind = ''
  // if not admin, can only view components owned by user
  else statusFind = {'owner': req.user.id}
  Component
  .find(statusFind)
  .populate('type')
  .sort({type: 1})
  .then(components => {
    var sumCost = 0
    var sumPrice = 0
    for (var i = 0; i < components.length; i++) {
      sumCost += components[i].totalCost
      sumPrice += components[i].totalPrice
    }
    var sumMargin = Math.round((1 - sumCost / sumPrice) * 100)
    res.render('components/showall', {
      components, sumCost, sumPrice, sumMargin
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
    { $lookup: {
      from: 'types', localField: 'type', foreignField: '_id', as: 'typeName'
    }},
    {
      $group: {
        _id: '$typeName.name',
        subtotalCost: { $sum: {$multiply: ['$unit_cost', '$quantity']} }
      }
    }
    ]
  )
  .then(components => {
    var totalCost = 0
    for (var i = 0; i < components.length; i++) {
      totalCost += components[i].subtotalCost
    }
    res.render('components/summary', {
      components, totalCost
    })
  })
})

router.get('/:id', (req, res) => {
  Component
  .findById(req.params.id)
  .populate('type')
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
  newComponent.save()
  .then(
    () => res.redirect('components/showall'),
    err => res.send('error happened')
  )
})

// NEED TO BE BEFORE /:id
router.put('/variables', (req, res) => {
  var formData = req.body

  formData.id.forEach((id, index) => {
    Type.findByIdAndUpdate(id, {
      margin: formData.margin[index]
    })
    .then(
      () => {
        if (index === formData.margin.length - 1) {
          whenUpdateAllDone(req, res)
        }
      }
    )
  })
})

function whenUpdateAllDone (req, res) {
  return res.redirect('/components/variables')
}

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
  .then(() => res.redirect('/components/showall'))
  .catch(err => console.log(err))
})

// DELETE
router.delete('/:id', (req, res) => {
  Component.findByIdAndRemove(req.params.id)
  .then(() => res.redirect('/components/showall'))
  .catch(err => console.log(err))
})

module.exports = router
