document.getElementById('audio-control').addEventListener('click', function () {
    var audio = document.getElementById('background-audio');

    if (audio.paused) {
        audio.play();
        this.textContent = 'Pause';
    } else {
        audio.pause();
        this.textContent = 'Play';
    }
});