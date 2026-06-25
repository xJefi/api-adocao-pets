const express = require('express');
const AdoptionController = require('../controllers/adoptionController');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  AdoptionController.getAllAdoptions,
);

router.post(
  '/',
  authenticateToken,
  authorizeRole('adopter'),
  AdoptionController.createAdoption,
);

module.exports = router;
