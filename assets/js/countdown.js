
$(document).ready(function() {
    var weddingDate = new Date('2025-07-26T15:00:00'); // Set your wedding date

    // Display the wedding date above the countdown
    $('#countdown').before('<p><b>Vielse: ' + weddingDate.toLocaleString('nb-NO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) + '</b></p>');

    $('#countdown').countdown(weddingDate, function(event) {
        $(this).html(event.strftime(
            '<div class="countdown-wrapper">' +
                '<div class="countdown-item">' +
                    '<div class="countdown-number">%w</div>' +
                    '<div class="countdown-label">Uker</div>' +
                '</div>' +
                '<div class="countdown-item">' +
                    '<div class="countdown-number">%d</div>' +
                    '<div class="countdown-label">Dager</div>' +
                '</div>' +
                '<div class="countdown-item">' +
                    '<div class="countdown-number">%H</div>' +
                    '<div class="countdown-label">Timer</div>' +
                '</div>' +
                '<div class="countdown-item">' +
                    '<div class="countdown-number">%M</div>' +
                    '<div class="countdown-label">Minutter</div>' +
                '</div>' +
                '<div class="countdown-item">' +
                    '<div class="countdown-number">%S</div>' +
                    '<div class="countdown-label">Sekunder</div>' +
                '</div>' +
            '</div>'
        ));

        // Adjust the size of countdown numbers and labels
        $('.countdown-number').css('font-size', '2.5rem'); // Adjust the size as needed
        $('.countdown-label').css('font-size', '1rem'); // Adjust the size as needed

        // Update CSS to align items horizontally
        $('.countdown-wrapper').css('display', 'flex');
        $('.countdown-item').css('text-align', 'center');
        $('.countdown-item').css('flex', '1');
    });
});
