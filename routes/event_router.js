const express = require('express')
const eventController = require('../controllers/event_controller')
const router = express.Router()

router.get('/new', eventController.new)
router.post('/new', eventController.create)

router.get('/', eventController.index)
router.get('/:id', eventController.show)
router.get('/:id/edit', eventController.edit)
router.put('/:id/edit', eventController.put)
router.get('/:id/delete', eventController.delete)

module.exports = router
