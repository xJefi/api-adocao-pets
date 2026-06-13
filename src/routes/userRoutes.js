const express = require('express');
const UserController = require('../controllers/userController');
const {
  authenticateToken,
  authorizeRole,
  authorizeOwnerOrAdmin,
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  UserController.getAll,
);
router.get(
  '/:id',
  authenticateToken,
  authorizeOwnerOrAdmin,
  UserController.getById,
);
router.put(
  '/:id',
  authenticateToken,
  authorizeOwnerOrAdmin,
  UserController.update,
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  UserController.deleteUser,
);

module.exports = router;
