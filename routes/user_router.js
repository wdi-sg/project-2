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
router.post('/avatar', upload.single('myFile'), userController.upload)

router.get(`/profile`, userController.show)
router.use(`/message`, messageRouter)
module.exports = router
