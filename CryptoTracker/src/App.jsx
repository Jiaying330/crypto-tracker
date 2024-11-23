// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { Box } from "@mui/material";
// import { makeStyles } from "@mui/styles";

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundColor: "#141618",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
