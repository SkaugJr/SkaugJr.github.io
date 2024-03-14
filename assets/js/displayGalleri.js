import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { storage } from './firebaseInit.js';

// Import Swiper
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

const galleriRef = ref(storage, 'Galleri');

listAll(galleriRef)
  .then((res) => {
    res.items.forEach((itemRef, index, array) => {
      // Called once for each item in the folder
      displayImage(itemRef, index, array);
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
      loop: true, // Enable looping
    });
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error getting files:', error);
  });

function displayImage(itemRef, index, array) {
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

      // Create a link element
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('data-lightbox', 'gallery');
      a.appendChild(img);

      // Add the link element to the slide instead of the img element
      slide.appendChild(a);

      // Add the slide to the Swiper wrapper
      swiperWrapper.appendChild(slide);

      // If this is the first image, set it as the next button image
      if (index === 0) {
        document.querySelector('.swiper-button-next').style.backgroundImage = 'url(' + url + ')';
      }

      // If this is the last image, set it as the previous button image
      if (index === array.length - 1) {
        document.querySelector('.swiper-button-prev').style.backgroundImage = 'url(' + url + ')';
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error displaying image:', error);
    });
}