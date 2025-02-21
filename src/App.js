// src/App.jsx

import React from 'react';
import { Routes, Route, useLocation, useMatch } from 'react-router-dom'; // Removed BrowserRouter import
import './App.css';
import Home from './components/Home';
import Create from './components/Create';
import Display from './components/Display'; // Import Display component
import Navigation from './components/Navigation'; // Navigation bar

function App() {
  const location = useLocation(); // Get the current location
  const isPostPage = useMatch('/post/:id'); // Check if current path matches /post/:id

  return (
    <div className="App">
      {/* Render Navigation bar only if the current path is not /post/:id */}
      {!isPostPage && <Navigation />}
      

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/post/:id" element={<Display />} /> {/* New route for Display */}
        {/* Optionally, add a NotFound route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
