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
const helper = require('../helpers/helperFunction');


// ===============  base route  ===============
router.get('/', helper.hasLogged, baseController.home);
router.get('/profile/:id', helper.ensureAuthenticated, baseController.profile);
router.get('/fullreview/:id', helper.ensureAuthenticated, baseController.review);


// ===============  auth route  ===============
router.get('/logout', authController.logout);
router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/signup', authController.signup);
router.post('/signup', authController.signupPost);


// ===============  review route  ===============
router.get('/review/add', helper.ensureAuthenticated, reviewController.add);
router.post('/review/add/:id', upload.single('photo'), reviewController.addPost);
router.get('/review/edit/:id', helper.ensureAuthenticated, reviewController.edit);
router.put('/review/edit/:id', reviewController.editPost);
router.delete('/review/delete/:id', reviewController.delete);


// ===============  bookmark route  ===============
router.post('/bookmark/add/:id', bookmarkController.add);
router.delete('/bookmark/delete/:id', bookmarkController.delete);


// ===============  extra route  ===============
router.get('/extra/like/:id', extraController.like);
router.post('/extra/write/:id', extraController.write);
router.delete('/extra/delete/:id', extraController.delete);


// ===============  404 error route  ===============
router.get('*', baseController.error);


module.exports = router;
