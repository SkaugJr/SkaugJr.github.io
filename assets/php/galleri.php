<?php
$dir = 'galleri/'; // Define the directory path

// Open a directory, and read its contents
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
      if($file != '.' && $file != '..') { // Ignore the . and .. folders
        echo "<img src='$dir$file' alt='$file'>"; // Display the image
      }
    }
    closedir($dh);
  }
}
?>