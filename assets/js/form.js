// Import Firebase
import { get, ref, set, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { db } from './firebaseInit.js'; // replace with the actual path to your firebaseInit.js file

// Function to submit the form data
function submitForm(e) {
  e.preventDefault();

  const primaryName = document.getElementById('primaryName').value;
  const primaryContact = document.getElementById('primaryContact').value;
  const participation = document.getElementById('participation').value;
  const numAdditionalGuests = document.getElementById('numAdditionalGuests').value;

  const additionalGuests = [];
  for (let i = 1; i <= numAdditionalGuests; i++) {
    additionalGuests.push(document.getElementById('additionalGuest' + i).value);
  }

  const newResponseKey = Date.now().toString() + '_' + primaryName;  // Generate a unique key based on the current timestamp

  const participationFolder = participation === '1' ? 'Deltar' : 'Deltar Ikke';

  set(child(ref(db), 'Svarskjema/' + participationFolder + '/' + newResponseKey), {
    primaryName,
    primaryContact,
    participation,
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

document.addEventListener('DOMContentLoaded', function() {
  // Event listener for form submission
  document.getElementById('rsvpForm').addEventListener('submit', submitForm);

  // Event listener for the change in the number of additional guests
  document.getElementById('numAdditionalGuests').addEventListener('change', function() {
    const numGuests = parseInt(this.value);
    const additionalGuestsContainer = document.getElementById('additionalGuestsContainer');
    additionalGuestsContainer.innerHTML = ''; // Clear existing textboxes

    // Add textboxes for additional guests, starting from 1
    if (numGuests > 0) {
      for (let i = 1; i <= numGuests; i++) {
        const newField = document.createElement('div');
        newField.className = 'field half';

        const newLabel = document.createElement('label');
        newLabel.htmlFor = 'additionalGuest' + i;
        newLabel.innerHTML = '<i class="fa-solid fa-user"></i> Medhørende gjest #' + i;

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.id = 'additionalGuest' + i;
        newInput.name = 'additionalGuest' + i;
        newInput.required = true;

        newField.appendChild(newLabel);
        newField.appendChild(newInput);

        additionalGuestsContainer.appendChild(newField);
      }
    }
  });

  // Initialize additional guests textboxes based on default value
  document.getElementById('numAdditionalGuests').dispatchEvent(new Event('change')); // Trigger the change event initially
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('kontaktMessage').value;

  const newResponseKey =  Date.now().toString() + '_' + name; // Generate a unique key based on the current timestamp

  set(child(ref(db), 'Kontakt/' + newResponseKey), {
    name,
    message
  })
  .then(() => {
    console.log("Document written with ID: ", newResponseKey);
    alert("Beskjeden er sent!");
    window.location.href = 'index.html'; // Redirect to the main page after successful submission
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    alert("Feilmelding, vennligst prøv på nytt.");
  });
});

// Event listener for guestbook form submission
document.getElementById('guestbookForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const message = document.getElementById('message').value;

  const randomIndex = Math.floor(Math.random() * message.length);
  const newResponseKey = Date.now().toString()+ '_' + message.charAt(randomIndex); // Generate a unique key based on the current timestamp and a random character from the message

  set(child(ref(db), 'Gjestebok/' + newResponseKey), {
    message
  })
  .then(() => {
    console.log("Document written with ID: ", newResponseKey);
    alert("Beskjeden er sendt!");
    window.location.href = 'index.html'; // Redirect to the main page after successful submission
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    alert("Feilmelding, vennligst prøv på nytt.");
  });
});