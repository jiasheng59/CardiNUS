import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import NightEvent from "./Game";

const App = () => {
  return (
    <div>
      <hi>CardiNUS</hi>
      <p>Please Login / Sign Up.</p>
      <LoginPage></LoginPage>
      <HomePage></HomePage>
      <h1>Hello</h1>
      <NightEvent />
    </div>
  );
};

export default App;
