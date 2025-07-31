import React from 'react';

const KeywordButton = ({ keyword, onInsert }) => (
  <button
    onClick={() => onInsert(keyword)}
    style={{
      marginLeft: '10px',
      padding: '4px 8px',
      fontSize: '0.85rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
  >
    Insert
  </button>
);

export default KeywordButton;
