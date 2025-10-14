<?php
$configPath = __DIR__ . '/config.json';

if (!file_exists($configPath)) {
    throw new RuntimeException('Missing config.json file.');
}

$configContents = file_get_contents($configPath);
if ($configContents === false) {
    throw new RuntimeException('Unable to read config.json.');
}

$config = json_decode($configContents, true);
if (!is_array($config)) {
    throw new RuntimeException('Invalid JSON in config.json.');
}

$telegramConfig = $config['telegram'] ?? [];

if (!isset($telegramConfig['token'], $telegramConfig['chat_id'])) {
    throw new RuntimeException('Telegram configuration is incomplete in config.json.');
}

define('TELEGRAM_BOT_TOKEN', (string) $telegramConfig['token']);
define('TELEGRAM_CHAT_ID', (string) $telegramConfig['chat_id']);
define('TELEGRAM_PARSE_MODE', isset($telegramConfig['parse_mode']) ? (string) $telegramConfig['parse_mode'] : 'HTML');
define('AFK_AUTO_MODE', isset($config['afk_auto_mode']) ? (bool) $config['afk_auto_mode'] : false);

define('TELEGRAM_API_URL', 'https://api.telegram.org/bot' . TELEGRAM_BOT_TOKEN . '/');

define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_FILE_TYPES', ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx']);
define('RATE_LIMIT_REQUESTS', 10);
define('RATE_LIMIT_WINDOW', 3600);
define('RATE_LIMIT_TIME', 3600);
define('ENABLE_RATE_LIMITING', false);
define('ENABLE_LOGGING', true);
define('ENABLE_FILE_UPLOADS', true);

define('LOG_FILE', __DIR__ . '/logs/app.log');
define('UPLOADS_DIR', __DIR__ . '/uploads/');
define('DEBUG_MODE', false);

if (!file_exists(dirname(LOG_FILE))) {
    mkdir(dirname(LOG_FILE), 0755, true);
}
if (!file_exists(UPLOADS_DIR)) {
    mkdir(UPLOADS_DIR, 0755, true);
}

?>
