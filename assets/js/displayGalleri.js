import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { storage } from './firebaseInit.js';

// Import Swiper
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

const galleriRef = ref(storage, 'Galleri');

listAll(galleriRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      // Called once for each item in the folder
      displayImage(itemRef);
    });

    // Initialize Swiper after all images have been loaded
    const swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 3,
      spaceBetween: 10,
    });
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error getting files:', error);
  });

function displayImage(itemRef) {
  getDownloadURL(itemRef)
    .then((url) => {
      // Get a reference to the Swiper wrapper
      const swiperWrapper = document.querySelector('.swiper-wrapper');

      // Create a slide element
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';

      // Create an img element
      const img = document.createElement('img');
      img.src = url;

      // Add the img element to the slide
      slide.appendChild(img);

      // Add the slide to the Swiper wrapper
      swiperWrapper.appendChild(slide);
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error displaying image:', error);
    });
}