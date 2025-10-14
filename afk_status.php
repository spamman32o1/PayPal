<?php
require_once __DIR__ . '/config.php';

/**
 * Ensure the AFK status file exists with a default value.
 */
function initializeAfkStatusStorage(): void
{
    $directory = dirname(AFK_STATUS_FILE);

    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    if (!file_exists(AFK_STATUS_FILE)) {
        $defaultPayload = [
            'afk' => false,
            'updated_at' => time(),
        ];

        file_put_contents(
            AFK_STATUS_FILE,
            json_encode($defaultPayload, JSON_PRETTY_PRINT),
            LOCK_EX
        );
    }
}

/**
 * Retrieve the persisted AFK status flag.
 */
function getAfkStatus(): bool
{
    initializeAfkStatusStorage();

    $contents = file_get_contents(AFK_STATUS_FILE);
    if ($contents === false) {
        return false;
    }

    $data = json_decode($contents, true);

    if (!is_array($data) || !array_key_exists('afk', $data)) {
        return false;
    }

    return (bool) $data['afk'];
}

/**
 * Persist the AFK status flag to disk.
 */
function setAfkStatus(bool $enabled): bool
{
    initializeAfkStatusStorage();

    $payload = [
        'afk' => $enabled,
        'updated_at' => time(),
    ];

    return file_put_contents(
        AFK_STATUS_FILE,
        json_encode($payload, JSON_PRETTY_PRINT),
        LOCK_EX
    ) !== false;
}

/**
 * Helper to present the AFK status as a human-readable string.
 */
function describeAfkStatus(bool $enabled): string
{
    return $enabled ? 'ON' : 'OFF';
}
