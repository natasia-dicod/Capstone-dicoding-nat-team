const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const { validateUserUpdate } = require('../middlewares/validation.middleware');

// Semua route user butuh token
router.use(verifyToken);

// GET /api/users — hanya admin yang boleh lihat semua user
router.get('/', authorizeRoles('admin'), UserController.getAll);

// GET /api/users/:id — pemilik akun atau teacher/admin (dicek di controller)
router.get('/:id', UserController.getById);

// PUT /api/users/:id — pemilik akun atau admin (dicek di controller)
router.put('/:id', validateUserUpdate, UserController.update);

module.exports = router;
