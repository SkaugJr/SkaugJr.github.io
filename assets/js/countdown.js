
$(document).ready(function() {
    var weddingDate = new Date('2025-07-26T15:00:00'); // Set your wedding date

    // Display the wedding date above the countdown
    $('#countdown').before('<p>Bryllupsdato: ' + weddingDate.toLocaleString('nb-NO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) + '</p>');

    // Initialize the countdown
    $('#countdown').countdown(weddingDate, function(event) {
        $(this).html(event.strftime(
            '<div>%w <span>uker</span></div> ' +
            '<div>%d <span>dager</span></div> ' +
            '<div>%H <span>timer</span></div> ' +
            '<div>%M <span>minutter</span></div> ' +
            '<div>%S <span>sekunder</span></div>'));
    });
});