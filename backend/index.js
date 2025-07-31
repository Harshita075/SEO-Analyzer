require('dotenv').config();
const express = require('express');
const cors = require('cors');
const seoroutes = require('./routes/seoroutes'); // ✅ Make sure this matches the actual file name

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/seo', seoroutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('✅ SEO Analyzer API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log("✅ TextRazor API Key:", process.env.TEXTRAZOR_API_KEY);

  console.log(` Server is running at http://localhost:${PORT}`);
});
