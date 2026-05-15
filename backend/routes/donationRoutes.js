const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { auth, checkRole } = require('../middleware/auth');

router.get('/', auth, donationController.getDonations);
router.post('/', auth, checkRole(['ADMIN', 'SECRETAIRE']), donationController.addDonation);
router.patch('/:id/status', auth, checkRole(['ADMIN', 'MEDECIN']), donationController.updateDonationStatus);

module.exports = router;
