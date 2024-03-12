var gallery = document.getElementById('image-gallery');

gallery.addEventListener('wheel', function(e) {
    // Prevent the default browser scroll
    e.preventDefault();

    // Scroll the gallery
    gallery.scrollLeft += e.deltaY;
});