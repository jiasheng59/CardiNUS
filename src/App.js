import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { ChooseAttires, TestingShuffle } from "./Game";
import Color from "./Player";
import NightEvent from "./Event/NightEvent";
import VoteForCaptainEvent from "./Event/VoteEvent";
import Timer from "./Timer";
import Captain from "./Captain";

const App = () => {
  return (
    <div>
      <hi>CardiNUS</hi>
      <p>Please Login / Sign Up.</p>
      <LoginPage />
      <HomePage />
      <TestingShuffle></TestingShuffle>
      <NightEvent></NightEvent>
      <Captain></Captain>
      <VoteForCaptainEvent></VoteForCaptainEvent>
      <Timer secondsLeft={15}></Timer>
    </div>
  );
};

export default App;
