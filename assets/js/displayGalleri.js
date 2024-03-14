import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { storage } from './firebaseInit.js';

const galleriRef = ref(storage, 'Galleri');

listAll(galleriRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      // Called once for each item in the folder
      displayImage(itemRef);
    });
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error getting files:', error);
  });

  function displayImage(itemRef) {
    getDownloadURL(itemRef)
      .then((url) => {
        // Get a reference to the image container
        const imageContainer = document.getElementById('displayGalleri');
  
        // Create an img element
        const img = document.createElement('img');
        img.src = url;
  
        // Add the img element to the image container
        imageContainer.appendChild(img);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error displaying image:', error);
      });
  }