import { db, auth } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { get, ref, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

// Check if the current user is an admin
auth.onAuthStateChanged((user) => {
  if (user && user.email === 'admin@akbryllup.no') {
    const kontaktRef = ref(db, 'Kontakt');

    get(kontaktRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const ul = document.createElement('ul');

        // Create a header
        const header = document.createElement('h3');
        header.innerHTML = '<i class="fa-solid fa-inbox"></i> Beskjeder:';

        for (let key in data) {
          const li = document.createElement('li');
          li.textContent = data[key].name;

          const p = document.createElement('p');
          p.textContent = data[key].message;

          li.appendChild(p);
          ul.appendChild(li);
        }

        // Append the header and the list to 'kontaktMeldinger'
        const kontaktMeldinger = document.getElementById('kontaktMeldinger');
        kontaktMeldinger.appendChild(header);
        kontaktMeldinger.appendChild(ul);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }  
});