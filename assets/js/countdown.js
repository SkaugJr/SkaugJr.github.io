
$(document).ready(function() {
    var weddingDate = new Date('2025-07-26T15:00:00'); // Set your wedding date and time

    // Format the wedding date and time
    var formattedWeddingDateTime = weddingDate.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    // Display the wedding date and time
    $('#countdown').after('<p>Bryllupsdato og tid: ' + formattedWeddingDateTime + '</p>');

    // Initialize the countdown timer
    $('#countdown').countdown(weddingDate, function(event) {
        $(this).html(event.strftime(
            '<div>%w <span>uker</span></div> ' +
            '<div>%d <span>dager</span></div> ' +
            '<div>%H <span>timer</span></div> ' +
            '<div>%M <span>minutter</span></div> ' +
            '<div>%S <span>sekunder</span></div>'
        ));
    });
});
