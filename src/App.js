import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { NightEvent, ChooseAttires } from "./Game";

const App = () => {
  return (
    <div>
      <hi>CardiNUS</hi>
      <p>Please Login / Sign Up.</p>
      <LoginPage></LoginPage>
      <HomePage></HomePage>
      <NightEvent />
      <ChooseAttires />
    </div>
  );
};

export default App;
