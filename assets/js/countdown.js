
$(document).ready(function() {
    var weddingDate = new Date('2025-07-26T15:00:00'); // Set your wedding date
    $('#countdown').countdown(weddingDate, function(event) {
        $(this).html(event.strftime(
            '<div>%w <span>weeks</span></div> ' +
            '<div>%d <span>days</span></div> ' +
            '<div>%H <span>hours</span></div> ' +
            '<div>%M <span>minutes</span></div> ' +
            '<div>%S <span>seconds</span></div>'));
    });

    // Display the wedding date
    $('#countdown').after('<p>Wedding Date: ' + weddingDate.toDateString() + '</p>');

    // Listen for changes in the number of additional guests
    $('#numAdditionalGuests').change(function() {
        var numGuests = parseInt($(this).val());
        var additionalGuestsContainer = $('#additionalGuestsContainer');
        additionalGuestsContainer.empty(); // Clear previous guest textboxes

        // Add textboxes for additional guests
        for (var i = 1; i <= numGuests; i++) {
            var textbox = '<div class="field"><label for="additionalGuest' + i + '">Ekstra gjest ' + i + '</label>' +
                '<input type="text" id="additionalGuest' + i + '" name="additionalGuest' + i + '" required></div>';
            additionalGuestsContainer.append(textbox);
        }
    });
});