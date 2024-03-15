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

        // Add the primaryName to the appropriate relation array
        if (entry.familyRelation === 'Aida') {
          aida.push(entry.primaryName);
        } else if (entry.familyRelation === 'Kolbjørn') {
          kolbjorn.push(entry.primaryName);
        }

        // If there are any additionalGuests, add them as well
        if (entry.additionalGuests) {
          var additionalGuests = Array.isArray(entry.additionalGuests) ? entry.additionalGuests : entry.additionalGuests.split(', ');
          if (entry.familyRelation === 'Aida') {
            aida = aida.concat(additionalGuests);
          } else if (entry.familyRelation === 'Kolbjørn') {
            kolbjorn = kolbjorn.concat(additionalGuests);
          }
        }
      }
    }

    // Create a string for the HTML output
    // Create a string for the HTML output
var html = '<table style="width: 100%; text-align: center;"><thead><tr><th colspan="2">Aida</th><th colspan="2">Kolbjørn</th></tr></thead><tbody>';

// Find the maximum length between the two arrays
var maxLength = Math.max(aida.length, kolbjorn.length);

// Loop through the maxLength
for (var i = 0; i < maxLength; i++) {
  html += '<tr>';

  // If there is a name in the aida array at this index, add it to the table
  if (i < aida.length) {
    html += '<td colspan="2">' + aida[i] + '</td>';
  } else {
    html += '<td colspan="2"></td>'; // Add an empty cell if there is no name
  }

  // If there is a name in the kolbjorn array at this index, add it to the table
  if (i < kolbjorn.length) {
    html += '<td colspan="2">' + kolbjorn[i] + '</td>';
  } else {
    html += '<td colspan="2"></td>'; // Add an empty cell if there is no name
  }

  html += '</tr>';

  // If there are additional guests, add them in the next row in the second column of the pair
  if (aida[i] && aida[i].additionalGuests) {
    html += '<tr><td></td><td>' + aida[i].additionalGuests.join(', ') + '</td><td colspan="2"></td></tr>';
  }
  if (kolbjorn[i] && kolbjorn[i].additionalGuests) {
    html += '<tr><td colspan="2"></td><td></td><td>' + kolbjorn[i].additionalGuests.join(', ') + '</td></tr>';
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