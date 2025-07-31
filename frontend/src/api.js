import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/seo', // ✅ Matches backend route mount
});

export const analyzeText = (data) => API.post('/analyze', data); // Final URL: /api/seo/analyze
