const express = require('express');
const router = express.Router();
const PredictionController = require('../controllers/prediction.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { validateFeedback } = require('../middlewares/validation.middleware');

router.use(verifyToken);

// Siswa kirim essay (pertanyaan + jawaban) & lihat riwayatnya
router.get('/',          PredictionController.getHistory);
router.post('/',         PredictionController.submit);

// Feedback berbasis questionId (opsional, bila ada bank soal)
router.post('/feedback', validateFeedback, PredictionController.getAutoFeedback);

module.exports = router;