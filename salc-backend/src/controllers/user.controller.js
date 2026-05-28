const UserModel = require('../models/user.model');

const UserController = {
  // GET /api/users (admin only)
  getAll: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
  },

  // GET /api/users/:id — hanya pemilik akun, teacher, atau admin
  getById: async (req, res) => {
    try {
      const isOwner = Number(req.params.id) === req.user.id;
      const isStaff = ['teacher', 'admin'].includes(req.user.role);
      if (!isOwner && !isStaff) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }

      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch user' });
    }
  },

  // PUT /api/users/:id — hanya pemilik akun atau admin
  update: async (req, res) => {
    try {
      const isOwner = Number(req.params.id) === req.user.id;
      const isAdmin = req.user.role === 'admin';
      if (!isOwner && !isAdmin) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }

      const { name, email } = req.body;
      const affected = await UserModel.update(req.params.id, { name, email });
      if (!affected) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, message: 'User updated successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to update user' });
    }
  },
};

module.exports = UserController;
