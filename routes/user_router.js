const express = require('express')
const userController = require('../controllers/user_controller')
const messageRouter = require('./message_router')
const isLoggedIn = require('../middleware/isLoggedIn')
const multer = require('multer')
const upload = multer({dest: './uploads/'})

const router = express.Router()

router.get('/signup', userController.signup)

router.post('/signup', userController.create)

router.use(isLoggedIn)

router.get('/delete', userController.delete)
router.get('/avatar', userController.avatar)
router.put('/edit', upload.single('myFile'), userController.update)

router.get(`/profile`, userController.show)
router.get(`/edit`, userController.edit)
router.use(`/message`, messageRouter)
module.exports = router
