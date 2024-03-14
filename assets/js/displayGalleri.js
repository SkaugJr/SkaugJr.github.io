import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { storage } from './firebaseInit.js';


const galleriRef = ref(storage, 'Galleri');
let imagePromises = [];

listAll(galleriRef)
  .then((res) => {
    res.items.forEach((itemRef, index, array) => {
      // Called once for each item in the folder
      imagePromises.push(displayImage(itemRef, index, array));
    });

    // Initialize Slick after all images have been loaded
    Promise.all(imagePromises).then(() => {
      $('.your-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false, // Disable autoplay
        arrows: true, // Enable navigation arrows
      });
    });
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error getting files:', error);
  });

function displayImage(itemRef, index, array) {
  return getDownloadURL(itemRef)
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