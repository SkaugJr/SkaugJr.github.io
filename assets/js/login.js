import { auth } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

// Login function
function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const email = `${username}@akbryllup.no`;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // Redirect to the dashboard or home page
      window.location.href = 'index.html'; // Replace 'index.html' with the desired destination
    })
    .catch((error) => {
      // Authentication failed, display an error message
      alert('Ugyldig brukernavn eller passord. Prøv på nytt.');
    });
}

// Attach loginUser to form submit event
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  loginUser();
});