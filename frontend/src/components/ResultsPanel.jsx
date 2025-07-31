import React from 'react';
import KeywordButton from './KeywordButton';
import background from '../assets/background.png';

const cardStyle = {
  flex: '1 1 180px',
  padding: '1rem',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

const ResultsPanel = ({ results, text, setResults, setText }) => {
  const {
    smartKeywordSuggestions = [],
    updatedText,
    wordCount,
    sentenceCount,
    readabilityScore,
    readabilityLabel,
    seoScore,
  } = results;

  const handleInsert = async (keyword) => {
    try {
      const response = await fetch('http://localhost:5000/api/seo/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
               text: updatedText || text,    // ✅ use original text for insertion
          insert: true,
          keyword,
        }),
      });

      const data = await response.json();

      if (data.updatedText) {
        setResults({
          ...results,
          text: data.updatedText,
          updatedText: data.updatedText,
          seoScore: data.seoScore,
          wordCount: data.wordCount,
          sentenceCount: data.sentenceCount,
          readabilityScore: data.readabilityScore,
          readabilityLabel: data.readabilityLabel,
          smartKeywordSuggestions: data.smartKeywordSuggestions,
          keywords: data.keywords,
          keywordDensity: data.keywordDensity,
          keywordInserted: data.keywordInserted,
        });

        if (typeof setText === 'function') {
          setText(data.updatedText); // ✅ update original text state
        }
      }
    } catch (error) {
      console.error("Keyword insert failed:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '1000px',
          margin: 'auto',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>📊 SEO Results</h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          <div style={cardStyle}><h4>📝 Word Count</h4><p>{wordCount}</p></div>
          <div style={cardStyle}><h4>📌 Sentence Count</h4><p>{sentenceCount}</p></div>
          <div style={cardStyle}><h4>📖 Readability</h4><p>{readabilityScore} ({readabilityLabel})</p></div>
          <div style={cardStyle}><h4>🚀 SEO Score</h4><p>{seoScore}</p></div>
        </div>

        <h3>💡 Smart Keyword Suggestions</h3>
        {smartKeywordSuggestions.length === 0 ? (
          <p>No keyword suggestions available.</p>
        ) : (
          <ul>
            {smartKeywordSuggestions.slice(0, 8).map((keyword, idx) => (
              <li key={idx}>
                {keyword}{' '}
                <KeywordButton keyword={keyword} onInsert={handleInsert} />
              </li>
            ))}
          </ul>
        )}

        <h3 style={{ marginTop: '2rem' }}>📝 Updated Text Preview</h3>
        <textarea
          rows="8"
          value={ text}
          readOnly
          style={{
            width: '100%',
            padding: '1rem',
            marginTop: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontFamily: 'monospace',
          }}
        />
      </div>
    </div>
  );
};

export default ResultsPanel;
