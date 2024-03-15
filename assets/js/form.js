// Import Firebase
import { get, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { db } from './firebaseInit.js'; // replace with the actual path to your firebaseInit.js file

// Function to submit the form data
function submitForm(e) {
  e.preventDefault();

  const primaryName = document.getElementById('primaryName').value;
  const primaryContact = document.getElementById('primaryContact').value;
  const familyRelation = document.getElementById('familyRelation').value;
  const numAdditionalGuests = document.getElementById('numAdditionalGuests').value;

  const additionalGuests = [];
  for (let i = 1; i <= numAdditionalGuests; i++) {
    additionalGuests.push(document.getElementById('additionalGuest' + i).value);
  }

  const newResponseKey = ref(db, 'responses').push().key;

  set(ref(db, 'responses/' + newResponseKey), {
    primaryName,
    primaryContact,
    familyRelation,
    numAdditionalGuests,
    additionalGuests
  })
  .then(() => {
    console.log("Document written with ID: ", newResponseKey);
    alert("Takk for at du fylte ut svarskjema!");
    window.location.href = 'index.html'; // Redirect to the main page after successful submission
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    alert("Feilmelding, vennligst prøv på nytt.");
  });
}

// Event listener for form submission
document.getElementById('myForm').addEventListener('submit', submitForm);

// Event listener for the change in the number of additional guests
document.getElementById('numAdditionalGuests').addEventListener('change', function() {
  const numGuests = parseInt(this.value);
  const additionalGuestsContainer = document.getElementById('additionalGuestsContainer');
  additionalGuestsContainer.innerHTML = ''; // Clear existing textboxes

  // Add textboxes for additional guests, starting from 1
  if (numGuests > 0) {
    for (let i = 1; i <= numGuests; i++) {
      const textbox = `<div class="field"><label for="additionalGuest${i}">Ekstra gjest ${i}</label>` +
        `<input type="text" id="additionalGuest${i}" name="additionalGuest${i}" required></div>`;
      additionalGuestsContainer.insertAdjacentHTML('beforeend', textbox);
    }
  }
});

// Initialize additional guests textboxes based on default value
document.getElementById('numAdditionalGuests').dispatchEvent(new Event('change')); // Trigger the change event initially