const express = require('express')
const router = express.Router()
const classrooms_controller = require('../controllers/classrooms_controller')

router.get('/:id', classrooms_controller.viewClass)

router.post('/add', classrooms_controller.createClass)

router.post('/:id/edit', classrooms_controller.leaveClass)

module.exports = router
