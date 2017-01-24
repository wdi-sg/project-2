const express= require('express')
const messageController = require('../controllers/message_controller')
const chatboxController = require('../controllers/chatbox_controller')
const router = express.Router({mergeParams: true})

router.get('/new', messageController.new)
router.post('/:id', messageController.create)
router.get('/:id', messageController.list)
router.post('/', chatboxController.list)

module.exports = router
