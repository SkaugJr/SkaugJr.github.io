import { db } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { get, ref, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

// Retrieve reference to the Firebase Realtime Database
const usersRef = db.ref('Brukere/');

// Login function
document.addEventListener('DOMContentLoaded', function() {
function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check if the username exists in the database
  usersRef.child(username).once('value', (snapshot) => {
    const userData = snapshot.val();
    if (userData && userData.password === password) {
      // Authentication successful, redirect to the dashboard or home page
      window.location.href = 'index.html'; // Replace 'dashboard.html' with the desired destination
    } else {
      // Authentication failed, display an error message
      alert('Ugyldig brukernavn eller passord. Prøv på nytt.');
    }
  });
}
});