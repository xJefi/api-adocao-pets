const express = require('express');
const PetController = require('../controllers/petController');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware');

const router = express.Router();

//Rota pública
router.get('/available', PetController.getAvailable);

//Rotas de admin
router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.getAll,
);
router.get(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.getById,
);

router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.createPet,
);
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.updatePet,
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.deletePet,
);

module.exports = router;
