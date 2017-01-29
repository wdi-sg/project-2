const express = require('express')
const classrooms_controller = require('../controllers/classrooms_controller')

router.get('/classroom/:id', classrooms_controller.viewClass)

router.post('/classroom/create', classrooms_controller.createClass)

router.post('/classroom/edit', classrooms_controller.leaveClass)
