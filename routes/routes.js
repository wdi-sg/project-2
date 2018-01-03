const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


// =============== controller module ===============
const baseController = require('../controllers/baseController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const bookmarkController = require('../controllers/bookmarkController');
const extraController = require('../controllers/extraController');


// =============== local module ===============



// ===============  base route  ===============
router.get('/', baseController.home);
router.get('/profile/:id', baseController.profile);
router.get('/fullreview/:id', baseController.review);


// ===============  auth route  ===============
router.get('/logout', authController.logout);
router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/signup', authController.signup);
router.post('/signup', authController.signupPost);


// ===============  review route  ===============
router.get('/review/add', reviewController.add);
router.post('/review/add/:id', upload.single('photo'), reviewController.addPost);
router.get('/review/edit/:id', reviewController.edit);
router.post('/review/edit/:id', reviewController.editPost);
router.delete('/review/delete', reviewController.delete);


// ===============  bookmark route  ===============
router.post('/bookmark/add/:id', bookmarkController.add);
// router.post('/bookmark/edit', bookmarkController.edit);
router.delete('/bookmark/delete', bookmarkController.delete);


// ===============  extra route  ===============
router.get('/extra/like', extraController.like);
router.post('/extra/write', extraController.write);
router.delete('/extra/delete', extraController.delete);


module.exports = router;
