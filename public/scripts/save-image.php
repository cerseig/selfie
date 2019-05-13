<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $dataJson = json_decode(file_get_contents("php://input"), true);
    $typeUpload = $dataJson['type'];

    if (preg_match('/^data:image\/(\w+);base64,/', $dataJson['image'], $type)) {
        $data = substr($dataJson['image'], strpos($dataJson['image'], ',') + 1);
        $type = strtolower($type[1]); // jpg, png, gif
    
        if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
            // throw new \Exception('invalid image type');
        }
    
        $data = base64_decode($data);
    
        if ($data === false) {
            throw new \Exception('base64_decode failed');
        }
    } else {
        // throw new \Exception('did not match data URI with image data');
    }

    if (isset($_SERVER['HTTPS']) &&
        ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
        isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
        $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {

        $protocol = 'https://';
    }
    else {
        $protocol = 'http://';
    }

    $uniqId = md5(uniqid(rand(), true));
    $path = '/img/uploads/'.$typeUpload.'/'.$uniqId.'.png';
    $savePath = '..'.$path;

    if ($typeUpload) {
        file_put_contents($savePath, $data);
    }

    echo json_encode([
        'success' => true,
        'uniqId' => $uniqId,
        'path' => $protocol.$_SERVER['HTTP_HOST'].$path
    ]);

?>