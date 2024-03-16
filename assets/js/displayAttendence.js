import { db } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { get, ref, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

// Retrieve the data from Firebase
get(child(ref(db), 'Svarskjema/')).then((snapshot) => {
  if (snapshot.exists()) {
    var data = snapshot.val();

    // Create an empty array for the guests
    var guests = [];

    // Loop through the data
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var entry = data[key];
    
        // Create a string for the names
        var names = entry.primaryName;

        // Add the additional guests to the names string
        if (entry.additionalGuests) {
          for (var i = 0; i < entry.additionalGuests.length; i++) {
            names += '<br>' + entry.additionalGuests[i];
          }
        }

        // Add the entry to the guests array
        guests.push({
          name: names,
          contactInfo: entry.primaryContact
        });
      }
    }

    // Create a string for the HTML output
    var html = '<table style="width: 100%;"><thead><tr><th style="text-align: center;">Fullt navn</th><th style="text-align: center;">Kontaktinfo</th></tr></thead><tbody>';

    // Loop through the guests array
    for (var i = 0; i < guests.length; i++) {
      html += '<tr>';
      html += '<td style="text-align: center;">' + guests[i].name + '</td>';
      html += '<td style="text-align: center;">' + guests[i].contactInfo + '</td>';
      html += '</tr>';
    }

    // Calculate the total number of guests
    var totalGuestCount = guests.length;

    // Add the count to the HTML output
    html += '<tfoot><tr><td colspan="2" style="text-align: center;">Totalt antall gjester: ' + totalGuestCount + '</td></tr></tfoot>';

    html += '</tbody></table>';

    // Update the HTML of a specific element to display the list
    document.getElementById('nameList').innerHTML = html;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});