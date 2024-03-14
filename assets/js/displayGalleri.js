import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { storage } from './firebaseInit.js';

// Import jQuery and Slick
import $ from 'https://code.jquery.com/jquery-3.6.0.min.js';
import 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';

const galleriRef = ref(storage, 'Galleri');

listAll(galleriRef)
  .then((res) => {
    res.items.forEach((itemRef, index, array) => {
      // Called once for each item in the folder
      displayImage(itemRef, index, array);
    });

    // Initialize Slick after all images have been loaded
    $('.your-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error getting files:', error);
  });

function displayImage(itemRef, index, array) {
  getDownloadURL(itemRef)
    .then((url) => {
      // Create a div element
      const slide = document.createElement('div');
      slide.className = 'slick-slide';

      // Create an img element
      const img = document.createElement('img');
      img.src = url;

      // Add the img element to the slide
      slide.appendChild(img);

      // Add the slide to the Slick slider
      $('.your-slider').append(slide);
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error displaying image:', error);
    });
}