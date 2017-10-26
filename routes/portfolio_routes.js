const Position = require('../models/position')

const express = require('express')

const router = express.Router()



// router.get('/', (req, res) => {
//   Position
//   .find({'user': req.user.id})
//   //.find()
//   .then( position => {
//     res.render('portfolio', {
//       position})
// })
//   .catch( err => {
//     console.log(err);
//   })
//   })

router.post('/', (req, res) => {
  var formData = req.body.position

  // remember how to create new object from constructor, it's back again
  // thanks to FORMIDABLE mongoose
  var newPosition = new Position({
  name : formData.name,
  ticker : formData.ticker,
  inceptionDate : formData.inceptionDate,
  units : formData.units,
  price : formData.price,
  assetClass: formData.assetClass,
  amountInvested : formData.amountInvested,
  closingPrice : formData.closingPrice,
  user : req.user.id

  })

  newPosition.save()
  .then()
  .then(
    () => res.redirect('/portfolio'),
    err => res.send(err)
  ) // why? mongoose save(), doesn't have .catch()
})

router.get ('/', (req,res) => {
  Position
  .aggregate(
    [
      { $group: {
        _id : '$assetClass',
        total: { $sum : {$multiply:["$units", "$closingPrice"]}},

      }

      }
    ]
  )
  .then(assetClassPosition => {
    res.render('portfolio', {assetClassPosition
    })
    //res.send(assetClassPosition)
  })
  .catch(err=> {
    console.log(err)
  })
})


module.exports = router
