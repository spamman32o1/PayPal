# Project Overview

This project integrates with a Telegram bot to receive notifications and surface an AFK (away from keyboard) status flag that is shared between the web interface and Telegram commands.

## Configuration

Telegram credentials and the AFK toggle are now stored in `config.json` alongside `config.php`. The file must expose the following structure:

```json
{
  "telegram": {
    "token": "<bot token>",
    "chat_id": "<destination chat id>",
    "parse_mode": "HTML"
  },
  "afk_auto_mode": false
}
```

* `telegram.token`, `telegram.chat_id`, and `telegram.parse_mode` are used to initialise the Telegram bot.
* `afk_auto_mode` controls the AFK mode across the application. Update this value and redeploy to change the behaviour.

The PHP bootstrap (`config.php`) reads this JSON file and exposes the values as constants that the rest of the application consumes. If the file is missing or invalid the application will raise a runtime exception so issues surface quickly.

## AFK Status

* `afk_status.php` exposes `getAfkStatus()` which now returns the `afk_auto_mode` flag from `config.json`.
* `describeAfkStatus()` remains available for presenting human-readable output.

## Telegram Webhook Endpoint

The `telegram_webhook.php` endpoint accepts Telegram webhook updates, validates signatures when provided, and responds to `/afk` commands with the current AFK status. The command is now read-only and instructs operators to update `config.json` to toggle the mode.

## Deployment

1. Upload the repository files to your hosting environment and ensure PHP has write access to the `logs/` directory (for `app.log`).
2. Serve `telegram_webhook.php` over HTTPS at a publicly accessible URL (e.g., `https://your-domain.example/telegram_webhook.php`).
3. Configure Telegram to deliver updates to the webhook or schedule a poller:
   * **Webhook** – Issue the following request, replacing placeholders accordingly:
     ```bash
     curl "https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook" \
       -d "url=https://your-domain.example/telegram_webhook.php" \
       -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
     ```
   * **Polling fallback** – If webhooks are not feasible, schedule a background job or cron task that periodically calls `getUpdates` on the bot API and forwards `/afk` commands to the new endpoint.
4. (Optional) Update the `TELEGRAM_WEBHOOK_SECRET` constant in `config.php` (or introduce your own handling) if you set a secret token when configuring the webhook. Ensure the same secret is supplied in the `setWebhook` request so signature checks pass.

After completing these steps, Telegram will deliver AFK commands to your server, allowing the bot and web application to stay in sync.
