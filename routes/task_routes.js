const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// routes
router.get('/new', (req,res)=>{
  res.render('task/new')
})

module.exports = router
