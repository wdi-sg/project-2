const express = require('express')
const router = express.Router()
const beneficiaryController = require('../controllers/beneficiary_controller')

router.get('/new', beneficiaryController.new)

router.post('/', beneficiaryController.signup)

module.exports = router
