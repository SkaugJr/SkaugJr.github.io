// Get a reference to the database service
var database = firebase.database();

// Retrieve the data from Firebase
database.ref('/').once('value').then(function(snapshot) {
  var data = snapshot.val();

  // Create an empty object for each relation
  var aida = [];
  var kolbjorn = [];

  // Loop through the data
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var entry = data[key];

      // Add the primaryName to the appropriate relation object
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
});