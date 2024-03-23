import { db } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { get, ref, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

// Get a reference to the Gjestebok folder in Firebase
const gjestebokRef = ref(db, 'Gjestebok');

// Use the get function to retrieve the data
get(gjestebokRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      var message = document.getElementById('message').value;
      message = message.replace(/\n/g, '<br>');

      // Create a heading for the list
      const heading = document.createElement('h3');
      heading.innerHTML = '<i class="fa-solid fa-comments"></i> Meldinger:';
      messagesContainer.appendChild(heading);

      // Loop through the data and create HTML elements for each message
      for (let key in data) {
        const message = data[key].message;
        const messageElement = document.createElement('li');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
      }
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });