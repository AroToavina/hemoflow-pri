const express = require('express');
const router = express.Router();
const centerController = require('../controllers/centerController');
const { auth, checkRole } = require('../middleware/auth');

router.get('/', auth, centerController.getCenters);
router.post('/', auth, checkRole(['ADMIN']), centerController.addCenter);

module.exports = router;
