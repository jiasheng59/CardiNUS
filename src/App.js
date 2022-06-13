import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { ChooseAttires, TestingShuffle } from "./Game";
import Color from "./Player";
import NightEvent from "./Event/NightEvent";

const App = () => {
  return (
    <div>
      <hi>CardiNUS</hi>
      <p>Please Login / Sign Up.</p>
      <LoginPage />
      <HomePage />
      <NightEvent />
      <TestingShuffle></TestingShuffle>
    </div>
  );
};

export default App;
