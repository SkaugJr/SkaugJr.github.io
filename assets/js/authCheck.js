import { auth } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // No user is signed in, redirect to login page
    window.location.href = 'login.html'; // Replace 'login.html' with the actual URL of your login page
  }
});