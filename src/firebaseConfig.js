// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMT37ESKppxPnduQRQPKaY0rftJbPIQyg",
  authDomain: "mh-2025.firebaseapp.com",
  projectId: "mh-2025",
  storageBucket: "mh-2025.firebasestorage.app",
  messagingSenderId: "786101368222",
  appId: "1:786101368222:web:185ce41366ddce578d528f",
  measurementId: "G-E2SPM1HDKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);