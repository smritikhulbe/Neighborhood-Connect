// src/components/Login.js
import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { signUpAnonymously, logout } from "../authFunctions";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, Anonymous User!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Sign Up Anonymously</h2>
          <button onClick={signUpAnonymously}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default Login;
