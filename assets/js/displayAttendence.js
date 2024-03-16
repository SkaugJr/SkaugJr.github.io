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
  
      // Add the primary guest to the guests array
      guests.push({
        name: entry.primaryName,
        contactInfo: entry.primaryContact,
        class: 'primary'
      });
  
      // Add the additional guests to the guests array
      if (entry.additionalGuests) {
        for (var i = 0; i < entry.additionalGuests.length; i++) {
          guests.push({
            name: entry.additionalGuests[i],
            contactInfo: '',
            class: 'secondary'
          });
        }
      }
    }
  }
  
  // Loop through the guests array
  for (var i = 0; i < guests.length; i++) {
    html += '<tr class="' + guests[i].class + '">';
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