import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import GamePage from "./GamePage";
const App = () => {
  return (
    <div>
      <hi>CardiNUS</hi>
      <p>Please Login / Sign Up.</p>
      <LoginPage />
      <HomePage />
      <GamePage />
    </div>
  );
};

export default App;
