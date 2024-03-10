<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $primaryName = $_POST["primaryName"];
    $primaryRelation = $_POST["primaryRelation"];
    $primaryContact = $_POST["primaryContact"];
    $additionalNames = $_POST["additionalName"]; // This will be an array

    // Process data (e.g., store in database, send email, etc.)
    // Example: Store in a text file
    $data = "Primary Attendee:\nName: $primaryName\nRelation: $primaryRelation\nContact: $primaryContact\n\n";
    foreach ($additionalNames as $name) {
        $data .= "Additional Attendee:\nName: $name\n\n";
    }
    file_put_contents("rsvp_responses.txt", $data, FILE_APPEND);

    // Redirect back to the RSVP page or show a thank you message
    header("Location: rsvp_thankyou.html");
    exit;
}
?>