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
            arrows: true,
            responsive: [
              {
                breakpoint: 1024, // Screen size in pixels
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  arrows: true
                }
              },
              {
                breakpoint: 600, // Screen size in pixels
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  arrows: true
                }
              },
              {
                breakpoint: 480, // Screen size in pixels
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: true
                }
              }
            ]
          });
        $('.slick-next').html('>');
        $('.slick-prev').html('<');
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
  
        // Create a link element for Fancybox
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('data-fancybox', 'gallery');
  
        // Add the img element to the link
        link.appendChild(img);
  
        // Add the link element to the slide
        slide.appendChild(link);
  
        // Add the slide to the Slick slider
        $('.your-slider').append(slide);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error displaying image:', error);
      });
  }