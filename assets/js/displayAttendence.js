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
    var html = '<h2>Aida</h2><ul>';
    for (var i = 0; i < aida.length; i++) {
      html += '<li>' + aida[i] + '</li>';
    }
    html += '</ul><h2>Kolbjørn</h2><ul>';
    for (var i = 0; i < kolbjorn.length; i++) {
      html += '<li>' + kolbjorn[i] + '</li>';
    }
    html += '</ul>';

    // Update the HTML of a specific element to display the list
    document.getElementById('nameList').innerHTML = html;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});