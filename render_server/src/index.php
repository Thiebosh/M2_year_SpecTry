<?php
session_start();

require_once("controllers/directory_manager.php");

// a mettre dans un fichier "return_codes.php" et a inclure ici et dans les controleurs
$SUCCESS = "200";
$BAD_REQUEST = "400";
$ERROR = "500";

function generate($root_path) {
    echo("\ncall generate");
    if (!isset($_GET['project_name'], $_GET['page'])) {# $_POST
        http_response_code($BAD_REQUEST);
        exit();
    }

    $post['project_name'] = filter_input(INPUT_GET, 'project_name', FILTER_SANITIZE_STRING); # INPUT_POST
    $post['page'] = filter_input(INPUT_GET, 'page', FILTER_SANITIZE_STRING); # INPUT_POST
    if (in_array(false, $post, true)) {
        http_response_code($BAD_REQUEST);
        exit();
    }

    echo("\nargs ok");

    $dir_path = "{$root_path}/{$post['project_name']}";
    $file_path = "{$root_path}/{$post['project_name']}/routeur.php";
    if (!(is_dir($dir_path) && file_exists($file_path))) {
        http_response_code($ERROR);
        exit();
    }

    echo("\nfile exists");
    require_once($path);
    http_response_code($SUCCESS);
    exit();
}


$root_path = __DIR__."/projects";
$directoryManager = new DirectoryManager($root_path);
if (isset($_GET['action'])) {
    switch ($action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING)) {
        case 'generate':
            generate($root_path);
            exit();

        case 'create_folder': //localhost:80/index.php?action=create_folder&project_name=test
            http_response_code($directoryManager->create_folder());
            exit();

        case 'create_file': //localhost:80/index.php?action=create_file&project_name=test&file_name=exemple.html&file_content="un peu de texte"
            http_response_code($directoryManager->create_folder());
            exit();

        case 'remove_files': //localhost:80/index.php?action=remove_files&project_name=test
            http_response_code($directoryManager->remove_files());
            exit();

        case 'remove_folder': //localhost:80/index.php?action=remove_folder&project_name=test
            http_response_code($directoryManager->remove_folder());
            exit();

        case "probe":
            echo("alive");
            http_response_code($SUCCESS);
            exit();
    }
}

http_response_code($BAD_REQUEST);
exit();
