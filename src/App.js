import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

const App = () => {
  return (
    <div>
      <p>Please Login / Sign Up.</p>
      <LoginPage></LoginPage>
      <HomePage></HomePage>
    </div>
  );
};

export default App;
