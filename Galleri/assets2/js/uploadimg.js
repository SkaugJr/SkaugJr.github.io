import { storage } from '/assets/js/firebaseInit.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";


// Get a reference to the form and the file input
var form = document.getElementById('upload-form');
var fileInput = document.getElementById('image');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the file from the file input
    var file = fileInput.files[0];

    // Create a storage ref
    var storageRef = ref(storage, 'DelteBilder/' + file.name);

    // Upload file
    var uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.error(error);
        }, 
        () => {
            // Handle successful uploads on complete
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
});