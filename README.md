# Project Overview

This project integrates with a Telegram bot to receive notifications and surface an AFK (away from keyboard) status flag that is shared between the web interface and scheduled processes.

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

## Deployment

1. Upload the repository files to your hosting environment and ensure PHP has write access to the `logs/` directory (for `app.log`).
2. Configure your background processing or monitoring scripts to send updates directly through the Telegram bot using the credentials from `config.json`.

## SSH Availability Probe

The repository now ships with a CLI helper located at `tools/ssh_probe.php` for validating SSH reachability before performing automated login flows.

### Hosts file format

Provide one or more files containing newline-separated host entries via the `--hosts-file` option. Blank lines and lines beginning with `#` are ignored. Each entry can be:

* A bare hostname or IP address (the default SSH port `22` is used).
* A hostname or IPv4 address with a custom port, written as `example.com:2222`.
* An IPv6 address in bracket notation with a port, e.g. `[2001:db8::1]:2222`.

### Running the probe

```bash
php tools/ssh_probe.php --hosts-file=hosts.txt [--hosts-file=more-hosts.txt] [--timeout=10]
```

* `--hosts-file` may be provided multiple times; all hosts are merged and deduplicated before probing.
* `--timeout` sets the connection timeout (seconds) used for each probe. If omitted the default is 5 seconds.

For each host, the script attempts to open a TCP connection to the configured SSH port using `fsockopen`. Hosts that cannot be reached within the timeout are skipped and logged as `[SKIP]`, while hosts with reachable SSH ports are marked as `[OK]` before progressing to the login workflow.
