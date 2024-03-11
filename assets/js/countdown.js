// Get the wedding date
var weddingDate = new Date("2025-07-26T15:00:00");

// Function to update the countdown
function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = weddingDate - currentDate;

    // Calculate remaining days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Display the countdown in a visually appealing format
    const countdownDisplay = `
        <div class="countdown">
            <div class="countdown-item">
                <span class="countdown-value">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        </div>
    `;

    // Update the HTML content with the countdown display
    document.getElementById('countdown').innerHTML = countdownDisplay;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

// Initial call to update the countdown immediately
updateCountdown();