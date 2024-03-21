import { storage } from '/assets/js/firebaseInit.js';
import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

var $body = $('body');

// Function to fetch all images and display them sequentially
async function displayImagesSequentially() {
  var listRef = ref(storage, 'Galleri'); // Adjust this path to your images

  // Fetch all images
  try {
    const res = await listAll(listRef);

    document.getElementById('imageCount').textContent = `Bilder: ${res.items.length}`;

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
    initializePoptrox();
    $('#footer').trigger('---toggle');

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
        <a href="${url}" class="image"><img src="${url}" data-position="center center"/></a>
        <h2>#${imageNumber}</h2>
        <p><button class="download-button" onclick="downloadImage('${url}', '${imageNumber}')"> <i class="fa-solid fa-download fa-2xl"></i> </button></p>
    </article>
  `;

  // Append the HTML to the gallery div
  document.getElementById('main').innerHTML += html;
}

window.downloadImage = function(url, imageNumber) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      // Create an object URL for the blob
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;

      // Set the download filename to imagenumber.jpg
      a.download = `${imageNumber}.jpg`;

      // Append the link to the document body and click it
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    })
    .catch(error => console.error('Error:', error));
}

// gsutil cors set cors.json gs://ak-bryllup.appspot.com

function initializePoptrox() {
  var $main = $('#main');

  // Poptrox.
  $main.poptrox({
    baseZIndex: 20000,
    caption: function($a) {
      var s = '';

      $a.nextAll().each(function() {
        s += this.outerHTML;
      });

      return s;
    },
    fadeSpeed: 300,
    onPopupClose: function() { $body.removeClass('modal-active'); },
    onPopupOpen: function() { $body.addClass('modal-active'); },
    overlayOpacity: 0,
    popupCloserText: '',
    popupHeight: 150,
    popupLoaderText: '',
    popupSpeed: 300,
    popupWidth: 150,
    selector: '.thumb > a.image',
    usePopupCaption: true,
    usePopupCloser: true,
    usePopupDefaultStyling: false,
    usePopupForceClose: true,
    usePopupLoader: true,
    usePopupNav: true,
    windowMargin: 50
  });

  // Hack: Set margins to 0 when 'xsmall' activates.
  breakpoints.on('<=xsmall', function() {
    $main[0]._poptrox.windowMargin = 0;
  });

  breakpoints.on('>xsmall', function() {
    $main[0]._poptrox.windowMargin = 50;
  });
}

// Call the function to display images sequentially
displayImagesSequentially();