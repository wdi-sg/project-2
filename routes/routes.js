const express = require('express');
const router = express.Router();

// controllers file
const homeController = require('../controllers/homeController.js');

router.get('/', homeController.home);
router.post('/search', homeController.search);
router.get('/result', homeController.result);
router.post('/smartsearch', homeController.smartSearch);

module.exports = router;
