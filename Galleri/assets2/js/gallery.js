import { storage } from '/assets/js/firebaseInit.js';
import { ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

var $body = $('body');

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
    initializePoptrox();

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
        <h2>${imageNumber}</h2>
        <p><a id="downloadLink${imageNumber}" href="#" onclick="downloadImage('${url}', 'downloadLink${imageNumber}')"><i class="fa-solid fa-download"></i></a></p>
    </article>
  `;

  // Append the HTML to the gallery div
  document.getElementById('main').innerHTML += html;
}

window.downloadImage = function(originalUrl, linkId) {
  fetch(originalUrl)
    .then(response => response.blob())
    .then(blob => {
      // Create a new Blob URL every time the link is clicked
      const url = URL.createObjectURL(blob);
      const a = document.getElementById(linkId);

      // Set the href attribute to the new Blob URL just before triggering the download
      a.addEventListener('click', function(event) {
        a.href = url;

        // Use the file name from the url for the download, if available
        const fileName = originalUrl.split('/').pop();
        a.download = fileName ? fileName : 'image.jpg';
      }, { once: true });

      // Trigger the download
      a.click();

      // Revoke the Blob URL after the download is complete
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    })
    .catch(error => console.error('Error:', error));
}// gsutil cors set cors.json gs://ak-bryllup.appspot.com

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