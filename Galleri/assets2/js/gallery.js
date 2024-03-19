import { storage } from '/assets/js/firebaseInit.js';
import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// Function to fetch all images and display them sequentially
async function displayImagesSequentially() {
  var listRef = ref(storage, 'Galleri'); // Adjust this path to your images

  // Fetch all images
  try {
    const res = await listAll(listRef);

    document.getElementById('imageCount').textContent = `Antall bilder: ${res.items.length}`;

    // Fetch all URLs
    const urls = await Promise.all(res.items.map(itemRef => getDownloadURL(itemRef)));

    // Display each image
    urls.forEach((url, index) => {
      displayImage(url, index + 1);
    });

    
    // Apply transition delay to each thumbnail
    $('#main .thumb').each(function(i) {
      var delay = i * 0.15 + 0.5 + 's';
      $(this).css('transition-delay', delay);
    });

    // Initialize Poptrox on the container of the images
    openSlider('#main');

  } catch (error) {
    // Handle any errors
    console.error("Error fetching images", error);
  }
}

// Function to display an image in the gallery
function displayImage(url, imageNumber) {
  // Create the HTML structure for the image
  var html = `
    <article class="thumb">
        <a href="${url}" class="image"><img src="${url}" title="<a href="${url}" download><i class="fa-solid fa-download"></i></a>" /></a>
        <h2>${imageNumber}</h2>
    </article>
  `;

  // Append the HTML to the gallery div
  document.getElementById('main').innerHTML += html;
}

function openSlider(selector) {
  $(selector).poptrox({
    usePopupCaption: true,
    usePopupNav: true
  });
}

// Call the function to display images sequentially
displayImagesSequentially();