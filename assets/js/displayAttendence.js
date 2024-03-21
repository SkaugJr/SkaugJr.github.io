import { db, auth } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { get, ref, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

// Check if the current user is an admin
auth.onAuthStateChanged((user) => {
  if (user && user.email === 'admin@akbryllup.no') {
    // List of subfolders to fetch data from
    const subfolders = ['Deltar', 'Deltar Ikke'];

    // Loop through each subfolder
    subfolders.forEach((subfolder) => {
      // Retrieve the data from Firebase
      get(child(ref(db), 'Svarskjema/' + subfolder)).then((snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();

          // Create an empty array for the guests
          var guests = [];

          // Initialize the total guest count
          var totalGuestCount = 0;

          // Loop through the data
          for (var key in data) {
            var entry = data[key];

            // Create a string for the names
            var names = entry.primaryName;

            // Increment the total guest count for the primary guest
            totalGuestCount++;

            // Add the additional guests to the names string
            if (entry.additionalGuests) {
              for (var i = 0; i < entry.additionalGuests.length; i++) {
                names += '<br>' + entry.additionalGuests[i];

                // Increment the total guest count for each additional guest
                totalGuestCount++;
              }
            }

            // Add the entry to the guests array
            guests.push(names);
          }

          // Create a string for the HTML output
          var color = subfolder === 'Deltar' ? '#4CAF50' : '#8B0000';
          var html = '<table style="width: 100%;"><thead><tr><th style="text-align: center;"><i class="fa-solid fa-users" style="color: ' + color + ';"></i> ' + subfolder + '</th></tr></thead><tbody>';

          // Loop through the guests array
          for (var i = 0; i < guests.length; i++) {
            html += '<tr>';
            html += '<td style="text-align: center;">' + guests[i] + '</td>';
            html += '</tr>';
          }

          // Add the count to the HTML output
          html += '<tfoot><tr><td style="text-align: center;"><strong>Antall: <span style="color: ' + color + ';">' + totalGuestCount + '</span></strong></td></tr></tfoot>';

          html += '</tbody></table>';

          // Update the HTML of a specific element to display the list
          document.getElementById('nameList').innerHTML += html;
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  } else {
    // Redirect to the login page or show an error message
  }
});