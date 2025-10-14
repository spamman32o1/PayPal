# Project Overview

This project integrates with a Telegram bot to receive notifications and interactively toggle an AFK (away from keyboard) status flag that is shared between the web interface and Telegram commands.

## AFK Status Storage

* `AFK_STATUS_FILE` (defined in `config.php`) controls where the AFK toggle is persisted on disk.
* The `afk_status.php` helper exposes `getAfkStatus()` and `setAfkStatus()` for consistent reads and writes from both the bot and the web application.

## Telegram Webhook Endpoint

The `telegram_webhook.php` endpoint accepts Telegram webhook updates, validates signatures when provided, and responds to:

* `/afk` – Displays the current AFK mode along with usage guidance.
* `/afk on` – Enables AFK mode.
* `/afk off` – Disables AFK mode.

Responses are sent using the existing `TelegramBot` sender defined in `backend.php` so that all outbound messages reuse the same delivery logic.

## Deployment

1. Upload the repository files to your hosting environment and ensure PHP has write access to the `logs/` directory (for both `app.log` and `afk_status.json`).
2. Serve `telegram_webhook.php` over HTTPS at a publicly accessible URL (e.g., `https://your-domain.example/telegram_webhook.php`).
3. Configure Telegram to deliver updates to the webhook or schedule a poller:
   * **Webhook** – Issue the following request, replacing placeholders accordingly:
     ```bash
     curl "https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook" \
       -d "url=https://your-domain.example/telegram_webhook.php" \
       -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
     ```
   * **Polling fallback** – If webhooks are not feasible, schedule a background job or cron task that periodically calls `getUpdates` on the bot API and forwards `/afk` commands to the new endpoint.
4. (Optional) Update the `TELEGRAM_WEBHOOK_SECRET` constant in `config.php` to a custom value if you set a secret token when configuring the webhook. Ensure the same secret is supplied in the `setWebhook` request so signature checks pass.

After completing these steps, Telegram will deliver AFK commands to your server, enabling the bot and web application to stay in sync.
