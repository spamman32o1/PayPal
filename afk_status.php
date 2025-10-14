<?php
require_once __DIR__ . '/config.php';

/**
 * Retrieve the AFK status as configured in config.json.
 */
function getAfkStatus(): bool
{
    return (bool) AFK_AUTO_MODE;
}

/**
 * Helper to present the AFK status as a human-readable string.
 */
function describeAfkStatus(bool $enabled): string
{
    return $enabled ? 'ON' : 'OFF';
}
