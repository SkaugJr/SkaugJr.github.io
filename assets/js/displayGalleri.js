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
        const slider = $('.your-slider');
      
        slider.slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
              }
            }
          ]
        }).slick('setPosition');
      
        // Create a counter element
        const counter = document.createElement('div');
        counter.id = 'counter';
        document.getElementById('Galleri').appendChild(counter);
      
        // Update the counter when the slide changes
        slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
          document.getElementById('counter').textContent = (currentSlide + 1) + ' / ' + slick.slideCount;
        });
      
        // Trigger the afterChange event manually to update the counter initially
        slider.slick('slickGoTo', slider.slick('slickCurrentSlide'));
      
        $('.slick-next').html('&#10236');
        $('.slick-prev').html('&#10235');
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

        // Create a link element for Lightbox
        const link = document.createElement('a');
        link.href = url; // Set the href attribute to the image URL
        link.setAttribute('data-lightbox', 'G1'); // Set the data-lightbox attribute to 'G1'

        // Add the img element to the link
        link.appendChild(img);

        // Add the link element to the slide
        slide.appendChild(link);

        // Add the slide to the Slick slider
        $('.your-slider').append(slide);

        // Return the slide element
        return slide;
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error displaying image:', error);
      });
  }