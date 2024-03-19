import { db } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { get, ref, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

// Retrieve the data from Firebase
get(child(ref(db), 'Svarskjema/')).then((snapshot) => {
  if (snapshot.exists()) {
    var data = snapshot.val();

    // Create an empty array for the guests
    var guests = [];

    // Initialize the total guest count
    var totalGuestCount = 0;

    // Loop through the data
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var entry = data[key];

        // Check if the guest is participating
        if (entry.participation === 1) {
          // Create a string for the names
          var names = entry.primaryName.split(' ')[0];

          // Increment the total guest count for the primary guest
          totalGuestCount++;

          // Add the additional guests to the names string
          if (entry.additionalGuests) {
            for (var i = 0; i < entry.additionalGuests.length; i++) {
              names += '<br>' + entry.additionalGuests[i].split(' ')[0];

              // Increment the total guest count for each additional guest
              totalGuestCount++;
            }
          }

          // Add the entry to the guests array
          guests.push(names);
        }
      }
    }

    // Create a string for the HTML output
    var html = '<table style="width: 100%;"><thead><tr><th style="text-align: center;"><i class="fa-solid fa-users" style="color: #4CAF50;"></i> Deltakerliste</th></tr></thead><tbody>';

    // Loop through the guests array
    for (var i = 0; i < guests.length; i++) {
      html += '<tr>';
      html += '<td style="text-align: center;">' + guests[i] + '</td>';
      html += '</tr>';
    }

    // Add the count to the HTML output
    html += '<tfoot><tr><td style="text-align: center;"><strong>Totalt antall gjester: ' + totalGuestCount + '</strong></td></tr></tfoot>';

    html += '</tbody></table>';

    // Update the HTML of a specific element to display the list
    document.getElementById('nameList').innerHTML = html;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});