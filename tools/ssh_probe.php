#!/usr/bin/env php
<?php

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "This script must be run from the command line.\n");
    exit(1);
}

const DEFAULT_TIMEOUT = 5;

if (!function_exists('str_starts_with')) {
    function str_starts_with(string $haystack, string $needle): bool
    {
        if ($needle === '') {
            return true;
        }

        return strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}

function print_usage(): void
{
    $usage = sprintf(
        "Usage: php tools/ssh_probe.php --hosts-file=<path> [--hosts-file=<path> ...] [--timeout=<seconds>]\n\n" .
        "Options:\n" .
        "  --hosts-file   Path to a file that contains newline-separated host entries. May be provided multiple times.\n" .
        "  --timeout      Optional timeout in seconds for establishing the SSH probe connection. Defaults to %s seconds.\n" .
        "  --help         Display this help message and exit.\n\n",
        DEFAULT_TIMEOUT
    );
    fwrite(STDOUT, $usage);
}

$options = getopt('', ['hosts-file:', 'timeout::', 'help']);
if ($options === false) {
    fwrite(STDERR, "Failed to parse options.\n");
    print_usage();
    exit(1);
}

if (array_key_exists('help', $options)) {
    print_usage();
    exit(0);
}

$hostFiles = $options['hosts-file'] ?? [];
if (!is_array($hostFiles)) {
    $hostFiles = [$hostFiles];
}

if (count($hostFiles) === 0) {
    fwrite(STDERR, "At least one --hosts-file must be provided.\n");
    print_usage();
    exit(1);
}

$timeout = DEFAULT_TIMEOUT;
if (isset($options['timeout'])) {
    if (!is_numeric($options['timeout']) || $options['timeout'] <= 0) {
        fwrite(STDERR, "Timeout must be a positive number of seconds.\n");
        exit(1);
    }
    $timeout = (float) $options['timeout'];
}

$hosts = [];
foreach ($hostFiles as $filePath) {
    if (!is_string($filePath) || $filePath === '') {
        fwrite(STDERR, "Invalid hosts file path provided.\n");
        exit(1);
    }

    if (!is_file($filePath) || !is_readable($filePath)) {
        fwrite(STDERR, sprintf("Hosts file '%s' is not readable.\n", $filePath));
        exit(1);
    }

    $contents = file_get_contents($filePath);
    if ($contents === false) {
        fwrite(STDERR, sprintf("Failed to read hosts file '%s'.\n", $filePath));
        exit(1);
    }

    $lines = preg_split('/\r?\n/', $contents);
    foreach ($lines as $lineNumber => $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || str_starts_with($trimmed, '#')) {
            continue;
        }
        $hosts[] = [
            'entry' => $trimmed,
            'source' => $filePath,
            'line' => $lineNumber + 1,
        ];
    }
}

if (count($hosts) === 0) {
    fwrite(STDERR, "No hosts were found in the provided files.\n");
    exit(1);
}

function parse_host_entry(string $entry): array
{
    if (str_starts_with($entry, '[')) {
        // Expect IPv6 in [addr]:port format
        if (preg_match('/^\[(.*)]:(\d{1,5})$/', $entry, $matches)) {
            return [$matches[1], (int) $matches[2]];
        }
    }

    $url = @parse_url('tcp://' . $entry);
    if ($url !== false && isset($url['host'])) {
        $host = $url['host'];
        $port = $url['port'] ?? 22;
        return [$host, (int) $port];
    }

    // Fallback assume raw hostname
    return [$entry, 22];
}

$uniqueHosts = [];
foreach ($hosts as $hostInfo) {
    [$host, $port] = parse_host_entry($hostInfo['entry']);
    $key = $host . ':' . $port;
    if (isset($uniqueHosts[$key])) {
        continue;
    }
    $uniqueHosts[$key] = [
        'host' => $host,
        'port' => $port,
        'entry' => $hostInfo['entry'],
    ];
}

foreach ($uniqueHosts as $info) {
    $host = $info['host'];
    $port = $info['port'];

    $connection = @fsockopen($host, $port, $errno, $errstr, $timeout);
    if ($connection === false) {
        fwrite(STDERR, sprintf("[SKIP] %s (resolved as %s:%d): %s (%d)\n", $info['entry'], $host, $port, $errstr ?: 'connection failed', $errno));
        continue;
    }

    stream_set_timeout($connection, (int) ceil($timeout));
    fclose($connection);

    fwrite(STDOUT, sprintf("[OK] %s (resolved as %s:%d) - SSH port reachable. Proceeding to login routine...\n", $info['entry'], $host, $port));
    // Placeholder for login routine
}

exit(0);
