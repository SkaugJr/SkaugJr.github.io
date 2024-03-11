<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $primaryName = $_POST["primaryName"];
    $familyRelation = $_POST["familyRelation"];
    $primaryContact = $_POST["primaryContact"];
    $additionalNames = $_POST["additionalName"];

    // Prepare the data for storage or processing
    $data = "Primary Attendee:\nName: $primaryName\nRelation: $familyRelation\nContact: $primaryContact\n\n";
    foreach ($additionalNames as $name) {
        $data .= "Additional Attendee:\nName: $name\n\n";
    }

    // Store data (e.g., in a text file)
    file_put_contents("Deltakerliste.txt", $data, FILE_APPEND);

    // Redirect to thank you page
    header("Location: rsvp_thankyou.html");
    exit;
}
?>