// Import the functions you need from the SDKs you need
import { firebaseConfig } from './firebaseConfig.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArOXQKdmFjragCtWHgrQglooNDlgUfXpk",
  authDomain: "ak-bryllup.firebaseapp.com",
  databaseURL: "https://ak-bryllup-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "ak-bryllup",
  storageBucket: "ak-bryllup.appspot.com",
  messagingSenderId: "219159117972",
  appId: "1:219159117972:web:2531f93e1d22d7f04a3481",
  measurementId: "G-Y3TG6Y30BE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
export const auth = getAuth(app);