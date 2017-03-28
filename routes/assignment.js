const express = require('express')
const router = express.Router()
const assignments_controller = require('../controllers/assignments_controller')



router.get('/create', assignments_controller.loadAssignmentForm)

router.post('/create', assignments_controller.createAssignment)

router.get('/:id', assignments_controller.viewOneAssignment)

router.put('/', assignments_controller.editOneAssignment)

router.delete('/', assignments_controller.deleteAssignment)

module.exports = router
