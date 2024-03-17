import { storage } from '/assets/js/firebaseInit.js';
import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// Function to fetch all images and display them sequentially
async function displayImagesSequentially() {
  var listRef = ref(storage, 'Galleri'); // Adjust this path to your images

  // Fetch all images
  try {
    const res = await listAll(listRef);
    let imageCounter = 1; // Initialize image counter

    // Display each image sequentially
    for (const itemRef of res.items) {
      await displayImage(itemRef, imageCounter++);
    }
  } catch (error) {
    // Handle any errors
    console.error("Error fetching images", error);
  }
}

// Function to fetch an image and display it in the gallery
async function displayImage(imageRef, imageNumber) {
  try {
    const url = await getDownloadURL(imageRef);

    // Create the HTML structure for the image
    var html = `
      <article class="thumb">
        <a href="${url}" class="image"><img src="${url}" alt="" /></a>
        <h2>${imageNumber}</h2>
      </article>
    `;

    // Append the HTML to the gallery div
    document.getElementById('main').innerHTML += html;
  } catch (error) {
    // Handle any errors
    console.error("Error displaying image", error);
  }
}

// Call the function to display images sequentially
displayImagesSequentially();
