const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
// extension: /users/new
router.get('/new', usersController.register)

// extension: /users
router.post('/', usersController.create)

module.exports = router
