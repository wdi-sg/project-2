const express = require('express')
const router = express.Router()
const classrooms_controller = require('../controllers/classrooms_controller')

// router.get('/:id', classrooms_controller.viewClass)

router.get('/', classrooms_controller.listClassrooms)

router.post('/add', classrooms_controller.createClass)

router.put('/:id', classrooms_controller.joinClass)

router.delete('/:id', classrooms_controller.leaveClass)

module.exports = router
