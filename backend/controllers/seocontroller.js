const axios = require('axios');
const qs = require('qs');

const SUGGESTION_LIMIT = 8;

exports.analyzeText = async (req, res) => {
  try {
    const { text, insert, keyword } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // 🧠 Request to TextRazor API
    const response = await axios.post(
      'https://api.textrazor.com/',
      qs.stringify({
        extractors: 'entities,topics,keywords,words,sentences',
        text: text
      }),
      {
        headers: {
          'x-textrazor-key': process.env.TEXTRAZOR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const data = response.data.response;

    if (!data || !data.sentences) {
      return res.status(400).json({
        error: 'TextRazor returned incomplete data',
        details: response.data
      });
    }

    // 📊 Basic Stats
    const wordCount = text.trim().split(/\s+/).length;
    const sentenceCount = text.trim().split(/[.!?]+/).filter(Boolean).length;

    const countSyllables = word => {
      word = word.toLowerCase().replace(/[^a-z]/g, '');
      const matches = word.match(/[aeiouy]{1,2}/g) || [];
      return Math.max(1, word.endsWith('e') ? matches.length - 1 : matches.length);
    };

    const totalSyllables = text.trim().split(/\s+/)
      .reduce((sum, word) => sum + countSyllables(word), 0);

    const readabilityScore = Number(
      (206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount)).toFixed(2)
    );

    let readabilityLabel = '';
    if (readabilityScore >= 90) readabilityLabel = 'Very Easy';
    else if (readabilityScore >= 80) readabilityLabel = 'Easy';
    else if (readabilityScore >= 70) readabilityLabel = 'Fairly Easy';
    else if (readabilityScore >= 60) readabilityLabel = 'Standard';
    else if (readabilityScore >= 50) readabilityLabel = 'Fairly Difficult';
    else if (readabilityScore >= 30) readabilityLabel = 'Difficult';
    else readabilityLabel = 'Very Difficult';

    // 🧠 Smart Keyword Suggestion Logic
    const generateSmartKeywordSuggestionsAI = (text, data, limit = SUGGESTION_LIMIT) => {
      const scoredKeywords = [];

      if (data.keywords) {
        data.keywords.forEach(k => {
          if (k.score > 0.4 && k.keyword.length > 2) {
            const freq = (text.match(new RegExp(`\\b${k.keyword}\\b`, 'gi')) || []).length;
            scoredKeywords.push({
              keyword: k.keyword.toLowerCase(),
              score: k.score + freq * 0.1
            });
          }
        });
      }

      if (data.topics) {
        data.topics.forEach(t => {
          if (t.score > 0.5 && t.label.length > 2) {
            scoredKeywords.push({
              keyword: t.label.toLowerCase(),
              score: t.score + 0.3
            });
          }
        });
      }

      if (data.entities) {
        data.entities.forEach(e => {
          if (['Product', 'Organization', 'Place'].includes(e.type)) {
            scoredKeywords.push({
              keyword: e.entityId.toLowerCase(),
              score: 0.8
            });
          }
        });
      }

      const unique = {};
      for (const item of scoredKeywords) {
        if (!unique[item.keyword] || unique[item.keyword].score < item.score) {
          unique[item.keyword] = item;
        }
      }

      const sorted = Object.values(unique)
        .sort((a, b) => b.score - a.score)
        .map(entry => entry.keyword);

      return sorted.slice(0, limit);
    };

    const smartKeywordSuggestions = generateSmartKeywordSuggestionsAI(text, data);
    const keywords = [...new Set(smartKeywordSuggestions)];

    // 📈 Keyword Density
    const keywordDensity = {};
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      const match = text.match(regex);
      const count = match ? match.length : 0;
      keywordDensity[kw] = ((count / wordCount) * 100).toFixed(2);
    });

    const seoScore = Math.min(100, keywords.length * 10); // 10 pts per keyword

    // ✍️ Append keyword at the end of the text
   
// ✍️ Append keyword at the end of the text (clean, no "with")
let updatedText = text;
if (insert && keyword) {
  const trimmedText = text.trim();
  const trimmedKeyword = keyword.trim();

  // Avoid duplicate if keyword is already at the end
  if (!trimmedText.toLowerCase().endsWith(trimmedKeyword.toLowerCase())) {
    updatedText = `${trimmedText} ${trimmedKeyword}`;
  } else {
    updatedText = trimmedText; // Don't re-append
  }
}

    // ✅ Final JSON Response
    res.json({
      wordCount,
      sentenceCount,
      readabilityScore,
      readabilityLabel,
      seoScore,
      keywords,
      topicSuggestions: (data.topics || [])
        .filter(t => t.label)
        .map(t => t.label.toLowerCase()),
      smartKeywordSuggestions,
      keywordDensity,
      updatedText,
      keywordInserted: insert ? keyword : null
    });

  } catch (error) {
    console.error('❌ Error in analyzeText:', error.response?.data || error.message);
    res.status(500).json({
      error: 'SEO analysis failed',
      details: error.response?.data || error.message
    });
  }
};
