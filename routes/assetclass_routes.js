const Position = require('../models/position')

const express = require('express')

const router = express.Router()
const mongoose = require('mongoose') // for DB


router.get ('/', (req,res) => {
  Position
  .aggregate(
    [ {$match: {
      user: new mongoose.Types.ObjectId(req.user.id)
    }
  },
      { $group: {
        _id : '$assetClass',

        total: { $sum : {$multiply:["$units", "$closingPrice"]}},


      }
      }
    ]
  )
  .then(assetClassPosition => {
    res.render('assetclass', {assetClassPosition
    })
    //res.send(assetClassPosition)
  })
  .catch(err=> {
    console.log(err)
  })
})




module.exports = router
