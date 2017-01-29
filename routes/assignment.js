const express = require('express')
const assignments_controller = require('../controllers/assignments_controller')



router.get('/assignment/create', assignments_controller.loadAssignmentForm)

router.post('/assignment/create', assignments_controller.createAssignment)

router.get('/assignment/:id', assignments_controller.viewOneAssignment)

router.update('/assignment/:id/edit', assignments_controller.editOneAssignment)

router.delete('/assignment/:id/delete', assignments_controller.deleteAssignment)

module.exports = router
