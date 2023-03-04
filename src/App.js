import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React  from 'react';

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
