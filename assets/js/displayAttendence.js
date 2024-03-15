import { db } from './firebaseInit.js'; // Adjust the path based on the actual location of firebaseInit.js
import { get, ref, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

// Retrieve the data from Firebase
get(child(ref(db), 'Svarskjema/')).then((snapshot) => {
  if (snapshot.exists()) {
    var data = snapshot.val();

    // Create an empty array for each relation
    var aida = [];
    var kolbjorn = [];

    // Loop through the data
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var entry = data[key];

        // Add the entry to the appropriate relation array
        if (entry.familyRelation === 'Aida') {
          aida.push(entry);
        } else if (entry.familyRelation === 'Kolbjørn') {
          kolbjorn.push(entry);
        }
      }
    }

    // Create a string for the HTML output
    var html = '<table style="width: 100%;"><thead><tr><th style="text-align: center;">Aida</th><th style="text-align: center;">Kolbjørn</th></tr></thead><tbody>';

    // Find the maximum length between the two arrays
    var maxLength = Math.max(aida.length, kolbjorn.length);

    // Loop through the maxLength
    for (var i = 0; i < maxLength; i++) {
      html += '<tr>';

      // If there is an entry in the aida array at this index, add it to the table
      if (i < aida.length) {
        html += '<td style="text-align: center;">' + aida[i].primaryName + '</td>';
      } else {
        html += '<td></td>'; // Add an empty cell if there is no entry
      }

      // If there is an entry in the kolbjorn array at this index, add it to the table
      if (i < kolbjorn.length) {
        html += '<td style="text-align: center;">' + kolbjorn[i].primaryName + '</td>';
      } else {
        html += '<td></td>'; // Add an empty cell if there is no entry
      }

      html += '</tr>';
    }

    // Calculate the number of guests for Aida and Kolbjørn
    var aidaGuestCount = aida.reduce((count, person) => count + 1 + (person.additionalGuests ? person.additionalGuests.length : 0), 0);
    var kolbjornGuestCount = kolbjorn.reduce((count, person) => count + 1 + (person.additionalGuests ? person.additionalGuests.length : 0), 0);

    // Calculate the total number of guests
    var totalGuestCount = aidaGuestCount + kolbjornGuestCount;

    // Add the counts to the HTML output
    html += '<tfoot><tr><td style="text-align: center;">Antall gjester Aida: ' + aidaGuestCount + '</td><td style="text-align: center;">Antall gjester Kolbjørn: ' + kolbjornGuestCount + '</td></tr>';
    html += '<tr><td colspan="2" style="text-align: center;">Totalt antall gjester: ' + totalGuestCount + '</td></tr></tfoot>';

    html += '</tbody></table>';

    // Update the HTML of a specific element to display the list
    document.getElementById('nameList').innerHTML = html;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});