import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import { auth } from "./Firebase.js";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loginMode, setLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginWithEmail = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loginMode) {
      await handleLoginWithEmail();
    } else {
      await handleSignup();
    }
  };

  const toggleLoginMode = () => {
    setLoginMode(!loginMode);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="container">
      <h1>My App</h1>
      {user ? (
        <div>
          <p>Hello World</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
        
          <form onSubmit={handleSubmit} className="form">
            <h2>{loginMode ? "Log In" : "Sign Up"}</h2>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="button button-primary">
              {loginMode ? "Log In" : "Sign Up"}
            </button>
            <div className="form-footer">
              {loginMode ? (
                <span>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="link"
                    onClick={toggleLoginMode}
                  >
                    Sign Up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="link"
                    onClick={toggleLoginMode}
                  >
                    Log In
                  </button>
                </span>
              )}
              <p>or</p>
              <button onClick={handleLogin} className="button button-google">
            Log In with Google
          </button>
            </div>
          </form> 
        </div>
      )}
    </div>
  );
}

export default App;
