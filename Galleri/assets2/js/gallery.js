import { storage } from '/assets/js/firebaseInit.js';
import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

// Function to create a thumbnail from a full-sized image
function createThumbnail(imageUrl, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = "anonymous"; // Add this line
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
  
        var width = img.width;
        var height = img.height;
  
        // Calculate the new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
  
        ctx.drawImage(img, 0, 0, width, height);
  
        resolve(canvas.toDataURL());
      };
      img.onerror = function() {
        reject(new Error("Failed load image"));
      };
      img.src = imageUrl;
    });
  }

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
    // Create a thumbnail for the image
    createThumbnail(url, 200, 200).then(function(thumbnailUrl) {
      // Create the HTML structure for the image
      var html = `
        <article class="thumb">
          <a href="${url}" class="image"><img src="${thumbnailUrl}" alt="" /></a>
          <h2>Image Title</h2>
          <p>Image Description</p>
        </article>
      `;

      // Append the HTML to the gallery div
      document.getElementById('gallery').innerHTML += html;
    });
  }).catch(function(error) {
    // Handle any errors
    console.error("Error displaying image", error);
  });
}