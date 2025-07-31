const express = require('express');
const router = express.Router();
const { analyzeText } = require('../controllers/seocontroller');

// @route   POST /api/seo/analyze
// @desc    Analyze text, return keywords, readability, SEO metrics
// @access  Public
router.post('/analyze', analyzeText);

module.exports = router;
