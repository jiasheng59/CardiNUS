import React from "react";
import { useState, useEffect } from "react";
import fire from "./fire";
import Login from "./Login";
import Hero from "./Hero";
import "./App.css";
import LoginPage from "./LoginPage";

const App = () => {
  return (
    <div>
      <p>Please Login / Sign Up.</p>
      <LoginPage></LoginPage>
    </div>
  );
};

export default App;
