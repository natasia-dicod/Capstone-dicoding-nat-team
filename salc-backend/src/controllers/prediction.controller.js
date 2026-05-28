const axios = require('axios');
const db = require('../config/db');
require('dotenv').config();

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:5000';

const PredictionController = {
  // POST /api/predictions — siswa kirim essay (pertanyaan + jawaban) dan dapat feedback AI
  // Body: { question, answer }
  submit: async (req, res) => {
    try {
      const { question, answer } = req.body;

      if (!answer || answer.trim().length < 3) {
        return res.status(400).json({ success: false, message: 'Answer must be at least 3 characters' });
      }

      // Default aman sesuai constraint DB: category enum NOT NULL (default 'cukup'), score NOT NULL
      let category = 'cukup';
      let score = 0;
      let feedback = null;
      let confidence = null;
      let mlAvailable = true;

      try {
        const mlResponse = await axios.post(
          `${ML_URL}/predict`,
          { text: answer },
          { timeout: 10000 }
        );
        const d = mlResponse.data || {};
        if (d.kategori != null) category = d.kategori;
        if (d.skor != null) score = d.skor;
        feedback = d.feedback ?? null;
        confidence = d.confidence ?? null;
      } catch (mlErr) {
        // Fallback: ML service mati — jawaban tetap disimpan, feedback menyusul (status pending)
        console.warn('ML service unavailable, saving answer without feedback:', mlErr.message);
        mlAvailable = false;
      }

      const [result] = await db.execute(
        `INSERT INTO predictions (user_id, question, answer, category, score, feedback)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [req.user.id, question || null, answer, category, score, feedback]
      );

      res.status(201).json({
        success: true,
        message: mlAvailable
          ? 'Jawaban berhasil dikirim dan dinilai'
          : 'Jawaban berhasil dikirim. Penilaian AI sedang menunggu karena layanan belum tersedia.',
        data: { id: result.insertId, question, answer, category, score, feedback, confidence, ml_available: mlAvailable },
      });
    } catch (err) {
      console.error('Submit prediction error:', err.message);
      res.status(500).json({ success: false, message: 'Failed to submit answer' });
    }
  },

  // GET /api/predictions — riwayat jawaban milik user yang login
  getHistory: async (req, res) => {
    try {
      const [rows] = await db.execute(
        `SELECT id, question, answer, category, score, feedback, created_at
         FROM predictions
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [req.user.id]
      );
      res.json({ success: true, data: rows });
    } catch (err) {
      console.error('Fetch prediction history error:', err.message);
      res.status(500).json({ success: false, message: 'Failed to fetch answer history' });
    }
  },

  // POST /api/predictions/feedback — feedback berbasis questionId (dipakai bila ada bank soal)
  getAutoFeedback: async (req, res) => {
    try {
      const { questionId, answer } = req.body;

      if (!questionId || !answer) {
        return res.status(400).json({ success: false, message: 'questionId and answer are required' });
      }

      const mlResponse = await axios.post(
        `${ML_URL}/predict`,
        { text: answer },
        { timeout: 10000 }
      );

      const { kategori, skor, feedback, confidence } = mlResponse.data;

      await db.execute(
        `INSERT INTO predictions (user_id, question_id, answer, category, score, feedback)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [req.user.id, questionId, answer, kategori, skor, feedback]
      );

      res.json({
        success: true,
        data: { kategori, skor, feedback, confidence },
      });
    } catch (err) {
      console.error('Auto feedback error:', err.message);
      res.status(500).json({
        success: false,
        message: 'ML service tidak tersedia. Pastikan AI service sudah berjalan di port 5000.',
      });
    }
  },
};

module.exports = PredictionController;
