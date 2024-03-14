// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Storage
const storage = firebase.storage();

// Reference to the root folder of your images in Firebase Storage
const imagesRef = storage.ref().child('Galleri/');

// Function to fetch and display images
function displayImages() {
    // Get all images in the 'images' folder
    imagesRef.listAll().then(function(result) {
        // Loop through each image in the folder
        result.items.forEach(function(imageRef) {
            // Get the download URL for the image
            imageRef.getDownloadURL().then(function(url) {
                // Create an <img> element
                const img = document.createElement('img');
                // Set the 'src' attribute to the download URL
                img.src = url;
                // Append the <img> element to the gallery container
                document.getElementById('imageGallery').appendChild(img);
            }).catch(function(error) {
                console.error('Error getting download URL:', error);
            });
        });
    }).catch(function(error) {
        console.error('Error listing images:', error);
    });
}

// Call the function to display images when the page loads
window.onload = function() {
    displayImages();
};
