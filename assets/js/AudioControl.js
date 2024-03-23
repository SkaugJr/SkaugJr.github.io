document.getElementById('audio-control').addEventListener('click', function () {
    var audio = document.getElementById('background-audio');

    if (audio.paused) {
        audio.play();
        this.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        this.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});