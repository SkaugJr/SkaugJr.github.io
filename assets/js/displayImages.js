import * as firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    // Your Firebase configuration here
  };
  
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  const galleriRef = storage.ref('Galleri');

  galleriRef.listAll().then(function(res) {
    res.items.forEach(function(itemRef) {
      // Called once for each item in the folder
      displayImage(itemRef);
    });
  }).catch(function(error) {
    // Handle any errors
    console.error('Error getting files:', error);
  });

  function displayImage(itemRef) {
    itemRef.getDownloadURL().then(function(url) {
      // Get a reference to the carousel
      const carousel = document.getElementById('carouselSlides');
  
      // Create a new slide
      const slide = document.createElement('li');
      slide.className = 'slide';
  
      // Create an image container
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';
  
      // Create an img element
      const img = document.createElement('img');
      img.src = url;
  
      // Add the img element to the image container
      imageContainer.appendChild(img);
  
      // Add the image container to the slide
      slide.appendChild(imageContainer);
  
      // Add the slide to the carousel
      carousel.appendChild(slide);
    }).catch(function(error) {
      // Handle any errors
      console.error('Error displaying image:', error);
    });
  }
