<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/afk_status.php';
require_once __DIR__ . '/backend.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Unable to read request body']);
    exit;
}

$secret = defined('TELEGRAM_WEBHOOK_SECRET') && TELEGRAM_WEBHOOK_SECRET !== ''
    ? TELEGRAM_WEBHOOK_SECRET
    : TELEGRAM_BOT_TOKEN;

$signatureHeader = $_SERVER['HTTP_X_TELEGRAM_BOT_API_SIGNATURE'] ?? null;
if ($signatureHeader !== null && $secret !== '') {
    $expectedSignature = base64_encode(hash_hmac('sha256', $rawBody, $secret, true));

    if (!hash_equals($expectedSignature, $signatureHeader)) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Invalid signature']);
        exit;
    }
}

$secretTokenHeader = $_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] ?? null;
if ($secretTokenHeader !== null && $secret !== '') {
    if (!hash_equals($secret, $secretTokenHeader)) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Invalid secret token']);
        exit;
    }
}

$update = json_decode($rawBody, true);
if (!is_array($update)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid payload']);
    exit;
}

$message = $update['message'] ?? [];
$text = isset($message['text']) ? trim($message['text']) : '';
if ($text === '') {
    echo json_encode(['ok' => true, 'ignored' => true]);
    exit;
}

$chatId = $message['chat']['id'] ?? TELEGRAM_CHAT_ID;
$bot = new TelegramBot(TELEGRAM_BOT_TOKEN, $chatId);

$parts = preg_split('/\s+/', $text);
$command = strtolower($parts[0] ?? '');
$command = preg_replace('/@.+$/', '', $command);
$argument = strtolower($parts[1] ?? '');

switch ($command) {
    case '/afk':
        $currentStatus = getAfkStatus();
        $statusText = describeAfkStatus($currentStatus);

        if ($argument === '') {
            $responseText = "AFK mode is currently {$statusText}.";
        } else {
            $responseText = 'AFK mode is read-only via Telegram.';
        }

        $responseText .= "\nUpdate afk_auto_mode in config.json to change the setting.";
        break;

    default:
        echo json_encode(['ok' => true, 'ignored' => true]);
        exit;
}

$bot->sendMessage($responseText);

echo json_encode(['ok' => true]);
