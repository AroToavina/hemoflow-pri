const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');
const { auth, checkRole } = require('../middleware/auth');

router.get('/', auth, donorController.getDonors);
router.get('/:id', auth, donorController.getDonorById);
router.post('/', auth, checkRole(['ADMIN', 'SECRETAIRE']), donorController.addDonor);
router.put('/:id', auth, checkRole(['ADMIN', 'SECRETAIRE']), donorController.updateDonor);
router.delete('/:id', auth, checkRole(['ADMIN']), donorController.deleteDonor);

module.exports = router;
