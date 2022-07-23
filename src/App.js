import React from "react";
import { useState, useEffect } from "react";
import { fire, auth} from "./firebase/fire";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Login from "./Home/Login";
import Home from "./Home/Home";
import "./App.css";
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [playerId, setPlayerId] = useState("Anon")

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  }

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  useEffect(() => {
    const authListener = () => {
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          clearInputs();
          setUser(user);
        } else {
          setUser("");
        }
      });
    };
    authListener();
  }, []);

  return (
    <div className="App">
      <div className="title">
        CardiNUS
        <img className="logo" src={require("./img/cardinus.png")} height={"68"} width={"68"} alt="" />
        <button className="howToPlay">How To Play</button>
      </div>

        <button class="hbtn hb-fill-right">Slide</button>

      
      <div>
        {user ? (
          <Home
            handleLogout={handleLogout}
            playerId={playerId}
            setPlayerId={setPlayerId}
          />
        ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
            signInWithGoogle={signInWithGoogle}
          />
        )}
      </div>
    </div>
  );
};

export default App;
