var gallery = document.getElementById('image-gallery');

gallery.addEventListener('wheel', function(e) {
    // Prevent the default browser scroll
    e.preventDefault();

    // Scroll the gallery
    gallery.scrollLeft += e.deltaY;
});

function openFullscreen(element) {
    var fullscreenView = document.getElementById('fullscreen-view');
    if (!fullscreenView) {
        fullscreenView = document.createElement('div');
        fullscreenView.id = 'fullscreen-view';
        fullscreenView.innerHTML = '<img src=""><button onclick="closeFullscreen()">Close</button>';
        document.body.appendChild(fullscreenView);
    }
    fullscreenView.style.display = 'flex';
    fullscreenView.querySelector('img').src = element.src;
}

function closeFullscreen() {
    var fullscreenView = document.getElementById('fullscreen-view');
    fullscreenView.style.display = 'none';
}