import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analyzer from './pages/analyzer';
import Guide from './pages/guide';
import About from './pages/about';
import Login from './pages/login';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App" style={{ maxWidth: '900px', margin: 'auto', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Analyzer />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
