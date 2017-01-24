const express = require('express')
const router = express.Router()
const programController = require('../controllers/program_controller')

router.get('/', programController.listAll)

router.get('/own', programController.listOwn)

router.get('/new', programController.new)

router.get('/:id', programController.listOne)

router.get('/:id/edit', programController.edit)

router.post('/', programController.create)

router.put('/:id', programController.update)

router.delete('/:id', programController.delete)

module.exports = router
