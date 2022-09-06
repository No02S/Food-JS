<?php
    $current_content = json_decode(file_get_contents($_POST["fileName"], true));
    file_put_contents($_POST["fileName"], $_POST["myJson"]);
?>