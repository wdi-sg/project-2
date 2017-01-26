const express= require('express')
const chatboxController = require('../controllers/chatbox_controller')
const router = express.Router({mergeParams: true})

router.get('/new', messageController.new)
router.post('/new', messageController.create)
//router.get('/:id', messageController.list)


module.exports = router
