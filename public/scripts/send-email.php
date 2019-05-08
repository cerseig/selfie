<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $translations = [
        'fr' => [
            'subject' => '[Selfie App] - Ton avatar',
            'body' => 'Hey ! Comme promis, nous t\'envoyons ton avatar.'
        ],
        'en' => [
            'subject' => '[Selfie App] - Your avatar',
            'body' => 'Hey ! As promised, we are sending you, your avatar.'
        ],
    ];

    $data = json_decode(file_get_contents("php://input"), true);

    $lang = $data['lang'];
    $to = $data['email'];
    $urlAvatar = $data['urlAvatar'];
    $urlPicture = $data['urlPicture'];
    $translations = $translations[$lang];

    $urlPictureImg = $urlPicture ? '<img src="'.$urlPicture.'"/>' : '';

    $subject =  $translations['subject'];
    $message =  '<h1>'.$translations['subject'].'</h1>'.
                '<img src="'.$urlAvatar.'"/>'.
                $urlPictureImg.
                '<p>'.$translations['body'].'</p>';
    $headers =  'From: '.$to."\r\n".
                'Reply-To: '.$to."\r\n".
                'X-Mailer: PHP/'.phpversion()."\r\n".
                'Content-Type: text/html; charset=UTF-8\r\n';
 
    if ($to && $lang && $urlAvatar) {
        $test =  mail($to, $subject, $message, $headers);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'to' => $to
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => $message,
            'to' => $to
        ]);
    }
    
?>