<?php
// Stien til mappen som inneholder bildene
$imageDirectory = 'images/gallery/';

// Hent en liste over alle filer i mappen
$fileList = scandir($imageDirectory);

// Fjern . og .. fra filisten
$fileList = array_diff($fileList, array('..', '.'));

// Send filisten som JSON-respons
header('Content-Type: application/json');
echo json_encode(array_values($fileList));
?>
