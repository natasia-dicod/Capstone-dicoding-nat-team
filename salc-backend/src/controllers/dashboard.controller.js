const db = require('../config/db');
const ProgressModel = require('../models/progress.model');

const DashboardController = {
  // GET /api/dashboard — statistik sesuai role user yang login
  getStats: async (req, res) => {
    try {
      const role = req.user.role;

      if (role === 'teacher' || role === 'admin') {
        const [[students]] = await db.execute(
          "SELECT COUNT(*) AS total FROM users WHERE role = 'student'"
        );
        const [[avg]] = await db.execute(
          'SELECT AVG(score) AS avg_score FROM progress'
        );
        const [[atRisk]] = await db.execute(
          `SELECT COUNT(DISTINCT user_id) AS total
           FROM early_warnings
           WHERE resolved = FALSE AND is_at_risk = TRUE`
        );

        return res.json({
          success: true,
          data: {
            totalStudents : students.total || 0,
            averageScore  : avg.avg_score != null ? Math.round(avg.avg_score * 10) / 10 : 0,
            atRiskStudents: atRisk.total || 0,
          },
        });
      }

      // Siswa
      const summary = await ProgressModel.getSummary(req.user.id);
      const [[materials]] = await db.execute(
        'SELECT COUNT(*) AS total FROM materials WHERE is_active = TRUE'
      );

      return res.json({
        success: true,
        data: {
          totalCompleted: Number(summary.completed) || 0,
          totalMaterials: materials.total || 0,
          currentScore  : summary.avg_score != null ? Math.round(summary.avg_score) : 0,
        },
      });
    } catch (err) {
      console.error('Dashboard error:', err.message);
      res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
    }
  },
};

module.exports = DashboardController;
