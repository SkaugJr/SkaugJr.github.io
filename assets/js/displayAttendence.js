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
    var html = '<table style="width: 100%;"><thead><tr><th colspan="2" style="text-align: center;">Aida</th><th colspan="2" style="text-align: center;">Kolbjørn</th></tr></thead><tbody>';

    // Function to add a row to the table
    function addRow(primaryNameAida, additionalNameAida, primaryNameKolbjorn, additionalNameKolbjorn) {
      html += '<tr>';
      html += '<td colspan="2" style="text-align: left;">' + (primaryNameAida || '') + '</td>';
      html += '<td style="text-align: left;">' + (additionalNameAida || '') + '</td>';
      html += '<td colspan="2" style="text-align: left;">' + (primaryNameKolbjorn || '') + '</td>';
      html += '<td style="text-align: left;">' + (additionalNameKolbjorn || '') + '</td>';
      html += '</tr>';
    }

    // Iterate over the aida array
    for (var i = 0; i < aida.length; i++) {
      addRow(aida[i].primaryName, aida[i].additionalGuests && aida[i].additionalGuests[0], '', '');
      for (var j = 1; j < (aida[i].additionalGuests || []).length; j++) {
        addRow('', aida[i].additionalGuests[j], '', '');
      }
    }

    // Iterate over the kolbjorn array
    for (var i = 0; i < kolbjorn.length; i++) {
      addRow('', '', kolbjorn[i].primaryName, kolbjorn[i].additionalGuests && kolbjorn[i].additionalGuests[0]);
      for (var j = 1; j < (kolbjorn[i].additionalGuests || []).length; j++) {
        addRow('', '', '', kolbjorn[i].additionalGuests[j]);
      }
    }

    html += '</tbody></table>';

    // Update the HTML of a specific element to display the list
    document.getElementById('nameList').innerHTML = html;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});