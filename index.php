<?php
function file_get_contents_curl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}


$ip = $_SERVER['REMOTE_ADDR'];
$details = json_decode(file_get_contents_curl("http://www.geoplugin.net/json.gp?ip=$ip"));
$country = $details->geoplugin_countryCode ?? '';


$browser_lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '', 0, 2);



    if ($country == "DE" && $browser_lang == "de") {
        header('Location: action.php?session=' . base64_encode('DE'));
    } elseif ($country == "FR" && $browser_lang == "fr") {
        header('Location: action.php?session=' . base64_encode('FR'));
    } elseif ($browser_lang == "de") {
        header('Location: action.php?session=' . base64_encode('DE'));
    } elseif ($browser_lang == "fr") {
        header('Location: action.php?session=' . base64_encode('FR'));
    } else {
        header('Location: action.php?session=' . base64_encode('EN'));
    }
    exit();
?>