// src/authFunctions.js
import { signInAnonymously, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Sign in Anonymously
const signUpAnonymously = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("User signed in anonymously:", userCredential.user);
  } catch (error) {
    console.error("Error signing in anonymously:", error.message);
  }
};

// Sign out
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

export { signUpAnonymously, logout };