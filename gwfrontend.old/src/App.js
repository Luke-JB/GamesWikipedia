import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import './CSS/App.css';
import Home from './Pages/Home.js';
import Login from './Pages/Login.js';
import Register from './Pages/Register.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path={"/Login"} element={<Login/>} />
        <Route path={"/Register"} element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
