import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import ProfileUpdate from './Pages/ProfileUpdate';
import ProfileGames from './Pages/ProfileGames';
import GameWiki from './Pages/GameWiki';
import Search from './Pages/Search';
import GameAdd from './Pages/GameAdd';
import About from './Pages/About';
import Admin from './Pages/Admin';
import Header from './Components/Header';
import ProtectedRoute from "./Components/ProtectedRoute";
import { getCurrentUser } from './api/api';
import GameEdit from './Pages/GameEdit';
//import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("authToken") ? true : false;
  });

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("authToken", "placeholder");
    } else {
      localStorage.removeItem("authToken");
    }
  }, [isLoggedIn]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
  }, []);

  return (
    <>
      <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route index element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path={"/Register"} element={<Register/>} />
          <Route path="/Profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
          <Route path="/ProfileUpdate" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfileUpdate setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
          <Route path="/ProfileGames" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ProfileGames setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
          <Route path={"/GameWiki"} element={<GameWiki user={user} />} />
          <Route path={"/GameWiki/:gameId"} element={<GameWiki user={user} />} />
          <Route path={"/Search"} element={<Search setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/GameAdd" element={<ProtectedRoute isLoggedIn={isLoggedIn}><GameAdd setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
          <Route path="/GameEdit" element={<ProtectedRoute isLoggedIn={isLoggedIn}><GameEdit setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
          <Route path={"/About"} element={<About setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Admin" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Admin setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
