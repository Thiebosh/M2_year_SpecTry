<?php
session_start();


require_once("controllers/directory_manager.php");

$RESP_CODE = array(
    "success"=>"200",
    "bad_request"=>"400",
    "not_found"=>"404",
    "error"=>"500"
);

$directoryManager = new DirectoryManager(__DIR__."/projects");
if (isset($_GET['action'])) {
    switch ($action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_STRING)) {
        case 'execute':
            if (!isset($_POST['project_name'], $_POST['page'])) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $post['project_name'] = filter_input(INPUT_POST, 'project_name', FILTER_SANITIZE_STRING);
            $post['page'] = filter_input(INPUT_POST, 'page', FILTER_SANITIZE_STRING);
            if (in_array(false, $post, true)) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $result = $directoryManager->include_file($post['project_name'], "routeur.php", $post['page']);
            http_response_code($result ? $RESP_CODE["success"] : $RESP_CODE["error"]);
            exit();

        case 'create_folder':
            if (!isset($_POST['project_name'])) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $post['project_name'] = filter_input(INPUT_POST, 'project_name', FILTER_SANITIZE_STRING);
            if (in_array(false, $post, true)) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $result = $directoryManager->create_folder($post['project_name']);
            http_response_code($result ? $RESP_CODE["success"] : $RESP_CODE["error"]);
            exit();

        case 'create_file':
            if (!isset($_POST['project_name'], $_POST['file_name'], $_POST['file_content'])) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $post['project_name'] = filter_input(INPUT_POST, 'project_name', FILTER_SANITIZE_STRING);
            $post['file_name'] = filter_input(INPUT_POST, 'file_name', FILTER_SANITIZE_STRING);
            $post['file_content'] = $_POST["file_content"];
            if (in_array(false, $post, true)) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $result = $directoryManager->create_file("{$post['project_name']}/{$post['file_name']}", $post['file_content']);
            http_response_code($result ? $RESP_CODE["success"] : $RESP_CODE["error"]);
            exit();

        case 'remove_files':
            if (!isset($_POST['project_name'])) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $post['project_name'] = filter_input(INPUT_POST, 'project_name', FILTER_SANITIZE_STRING);
            if (in_array(false, $post, true)) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $result = $directoryManager->remove_files($post['project_name']);
            http_response_code($result ? $RESP_CODE["success"] : $RESP_CODE["error"]);
            exit();

        case 'remove_folder':
            if (!isset($_POST['project_name'])) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $post['project_name'] = filter_input(INPUT_POST, 'project_name', FILTER_SANITIZE_STRING);
            if (in_array(false, $post, true)) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }

            $result = $directoryManager->remove_folder($post['project_name']);
            http_response_code($result ? $RESP_CODE["success"] : $RESP_CODE["error"]);
            exit();

        case 'get_session':

            if(!isset($_SESSION["data"])) {
                echo("{}");
                exit();
            }
            echo (json_encode($_SESSION["data"]));
            exit();
        
        case 'set_session':
            if(!isset($_POST['session'])) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }
            $post['session'] = filter_input(INPUT_POST, 'session', FILTER_SANITIZE_STRING);
            if (in_array(false, $post, true)) {
                http_response_code($RESP_CODE["bad_request"]);
                exit();
            }
            $_SESSION = json_decode($_POST['session']);
            http_response_code($RESP_CODE["success"]);
            exit();
        
        case "probe":
            echo("alive");
            http_response_code($RESP_CODE["success"]);
            exit();

    }
}

http_response_code($RESP_CODE["bad_request"]);
exit();
