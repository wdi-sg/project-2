const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers_controller')
const passport =
require('../config/passport')

router.get('/new', function (req, res) {
  res.render('teachers/index');
});

router.post('/', teachersController.create);

router.get('/teacherLoginView', teachersController.showAllRequests);

router.get('/updateProfile', function (req,res) {
  res.render('teacherProfile/index')
});


router.post('/deleteStudent', teachersController.remove);

router.post('/updateName', teachersController.updateName);
router.post('/updateGender', teachersController.updateGender);
router.post('/updateAddress', teachersController.updateAddress);
router.post('/updatePostalCode', teachersController.updatePostalCode);
router.post('/updateSubject', teachersController.updateSubject);
router.post('/updateQualification', teachersController.updateQualification);
router.post('/updateDescription', teachersController.updateDescription);
router.post('/updateFee', teachersController.updateFee);

router.get('/test', teachersController.test)

router.post('/login',
 passport.authenticate('local-teacher', {
   successRedirect: '/teachers/teacherLoginView',
   failureRedirect: '/teachers/new'
 }))

module.exports = router;
