import { db } from './firebaseInit.js';

function submitForm(e) {
  e.preventDefault();

  var primaryName = document.getElementById('primaryName').value;
  var primaryContact = document.getElementById('primaryContact').value;
  var familyRelation = document.getElementById('familyRelation').value;
  var numAdditionalGuests = document.getElementById('numAdditionalGuests').value;

  db.collection("responses").add({
    primaryName: primaryName,
    primaryContact: primaryContact,
    familyRelation: familyRelation,
    numAdditionalGuests: numAdditionalGuests
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    alert("Form submitted successfully!");
    window.scrollTo(0,0);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

$(document).ready(function() {
  // Event listener for the change in the number of additional guests
  $('#numAdditionalGuests').change(function() {
    var numGuests = parseInt($(this).val());
    var additionalGuestsContainer = $('#additionalGuestsContainer');
    additionalGuestsContainer.empty(); // Clear existing textboxes

    // Add textboxes for additional guests, starting from 1
    if (numGuests > 0) {
      for (var i = 1; i <= numGuests; i++) {
        var textbox = '<div class="field"><label for="additionalGuest' + i + '">Ekstra gjest ' + i + '</label>' +
          '<input type="text" id="additionalGuest' + i + '" name="additionalGuest' + i + '" required></div>';
        additionalGuestsContainer.append(textbox);
      }
    }
  });

  // Initialize additional guests textboxes based on default value
  $('#numAdditionalGuests').change(); // Trigger the change event initially
});