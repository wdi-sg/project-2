const express = require('express')
const router = express.Router()
const programController = require('../controllers/program_controller')

router.get('/', programController.listAll)

router.get('/new', programController.new)

router.get('/:id', programController.listOne)

router.get('/adminEdit/:id', programController.adminEdit)

router.get('/guardianNewB/:id', programController.guardianNewB)

router.post('/', programController.create)

router.put('/adminUpdate/:id', programController.adminUpdate)

router.put('/guardianAddB/:id', programController.guardianAddB)

router.delete('/adminDelete/:id', programController.adminDelete)

router.delete('/guardianDelete/:id', programController.guardianDelete)

module.exports = router
