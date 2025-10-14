<?php
define('TELEGRAM_BOT_TOKEN', '7561126263:AAGlciobholgl-OGUXWssbicq7XRyJbG7js');
define('TELEGRAM_CHAT_ID', '8137159582');

define('TELEGRAM_PARSE_MODE', 'HTML');
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
define('AFK_STATUS_FILE', __DIR__ . '/logs/afk_status.json');
define('TELEGRAM_WEBHOOK_SECRET', TELEGRAM_BOT_TOKEN);
define('DEBUG_MODE', false);

if (!file_exists(dirname(LOG_FILE))) {
    mkdir(dirname(LOG_FILE), 0755, true);
}
if (!file_exists(UPLOADS_DIR)) {
    mkdir(UPLOADS_DIR, 0755, true);
}

?>