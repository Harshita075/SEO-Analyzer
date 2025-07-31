import React, { useState } from 'react';

const API_ENDPOINT = 'http://localhost:5000/api/seo/analyze';

const SEOForm = ({ text, setText, setResults }) => {
  const [contentType, setContentType] = useState('Blog Post');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert('Please enter content to analyze.');
      return;
    }

    setLoading(true);

    const payload = {
      text,
      insert: !!keyword.trim(),
      keyword: keyword.trim(),
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      setResults(data);
    } catch (error) {
      console.error('SEO analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setKeyword('');
    setResults(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '700px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2 style={{ fontWeight: '600', marginBottom: '1.5rem' }}>📄 Content Input</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Content Type
        </label>
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
          }}
        >
          <option>Blog Post</option>
          <option>Newsletter</option>
          <option>Social Media</option>
          <option>Product Description</option>
          <option>Landing Page</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Primary Target Keyword (optional)
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g., content marketing"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Your Content
        </label>
        <textarea
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your blog post, newsletter, or any content you want to optimize..."
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            resize: 'vertical',
            minHeight: '180px',
            maxHeight: '400px',
            lineHeight: '1.6',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            flex: 1,
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {loading ? 'Analyzing...' : 'Analyze Content'}
        </button>

        <button
          type="button"
          onClick={handleClear}
          style={{
            flex: 1,
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
          }}
        >
          Clear All
        </button>
      </div>
    </form>
  );
};

export default SEOForm;
