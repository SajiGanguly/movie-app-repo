
import './App.css';
import MainPage from './components/Screens/Mainscreen';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebySideloginpage from './components/Login/Login';
import { useState } from 'react';
import MySelectedMoviesPage from './components/Mymovies';
import MovieResultCard from './components/Moviecardresult';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidebySideloginpage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/mymovies" element={<MySelectedMoviesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
