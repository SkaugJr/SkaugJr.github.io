import { storage } from '/assets/js/firebaseInit.js';
import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// Fetch all the images and display them
var listRef = ref(storage, 'Galleri'); // Adjust this path to your images
listAll(listRef).then(function(res) {
  res.items.forEach(function(itemRef) {
    displayImage(itemRef);
  });
}).catch(function(error) {
  // Handle any errors
  console.error("Error fetching images", error);
});

// Function to fetch an image and display it in the gallery
function displayImage(imageRef) {
  getDownloadURL(imageRef).then(function(url) {
    // Create the HTML structure for the image
    var html = `
      <article class="thumb">
        <a href="${url}" class="image"><img src="${url}" alt="" /></a>
        <h2>Image Title</h2>
        <p>Image Description</p>
      </article>
    `;

    // Append the HTML to the gallery div
    document.getElementById('gallery').innerHTML += html;
  }).catch(function(error) {
    // Handle any errors
    console.error("Error displaying image", error);
  });
}