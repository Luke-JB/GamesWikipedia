import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
//import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/Home"} element={<Home/>} />
          <Route path={"/Login"} element={<Login/>} />
          <Route path={"/Register"} element={<Register/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
