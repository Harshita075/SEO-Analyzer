import React, { useState } from 'react';
import SEOForm from '../components/SEOForm';
import ResultsPanel from '../components/ResultsPanel';
import bgImage from '../assets/background.png';
import './analyzer.css';

const Analyzer = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '2rem 1rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          maxWidth: '960px',
          margin: '0 auto',
          padding: '2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            fontSize: '2rem',
            color: '#333',
          }}
        >
          SEO Analyzer ~ Climb Higher in the Rankings!
        </h1>

        <SEOForm text={text} setText={setText} setResults={setResults} />

        {results && (
          <ResultsPanel
            results={results}
            text={text}
            setResults={setResults}
            setText={setText} // ✅ Passed here so keyword insert syncs
          />
        )}
      </div>
    </div>
  );
};

export default Analyzer;
