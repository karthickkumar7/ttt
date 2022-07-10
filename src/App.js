import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap";

// local
import Home from "./pages/Home";
import PostDeatil from "./pages/PostDeatil";
import D3js from "./pages/D3js";
import TicTacToe from "./pages/TicTacToe";
import ChatHome from "./pages/ChatHome";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<Home />} />
        <Route path="/post/:id" element={<PostDeatil />} />
        <Route path="/d3js" element={<D3js />} />
        <Route path="/game" element={<TicTacToe />} />
        <Route path="/chat" element={<ChatHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
