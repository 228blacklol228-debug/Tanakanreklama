<?php
declare(strict_types=1);

const RECIPIENT = 'andrewbaldov@yandex.ru';
const SITE_HOSTS = ['agency-aa.ru', 'www.agency-aa.ru'];

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

function wantsJson(): bool
{
    return strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;
}

function finish(bool $ok, string $message, int $status = 200): void
{
    http_response_code($status);

    if (wantsJson()) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    if ($ok) {
        $path = '/';
        $referer = $_SERVER['HTTP_REFERER'] ?? '';
        $parts = parse_url($referer);
        if (is_array($parts) && in_array(strtolower((string) ($parts['host'] ?? '')), SITE_HOSTS, true)) {
            $path = (string) ($parts['path'] ?? '/');
        }
        header('Location: ' . $path . '?sent=1#contact', true, 303);
        exit;
    }

    header('Content-Type: text/plain; charset=UTF-8');
    echo $message;
    exit;
}

function input(string $key, int $maxLength): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr($value, 0, $maxLength, 'UTF-8');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    finish(false, 'Метод не поддерживается.', 405);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if (!in_array($originHost, SITE_HOSTS, true)) {
        finish(false, 'Недопустимый источник запроса.', 403);
    }
}

if (input('website', 200) !== '') {
    finish(true, 'Заявка отправлена.');
}

$name = input('name', 80);
$contact = input('contact', 120);
$project = input('project', 4000);
$page = input('page', 500);
$consent = ($_POST['consent'] ?? '') === '1';

if (mb_strlen($name, 'UTF-8') < 2 || mb_strlen($contact, 'UTF-8') < 3 || !$consent) {
    finish(false, 'Заполните имя, контакт и подтвердите согласие на обработку данных.', 422);
}

$time = (new DateTimeImmutable('now', new DateTimeZone('Europe/Moscow')))->format('d.m.Y H:i:s T');
$body = implode("\n", [
    'Новая заявка с сайта AA agency',
    '',
    'Имя: ' . $name,
    'Контакт: ' . $contact,
    'О проекте: ' . ($project !== '' ? $project : 'не указано'),
    'Страница: ' . ($page !== '' ? $page : 'не указана'),
    'Время: ' . $time,
]);

$subject = 'Новая заявка с сайта AA agency';
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$replyTo = filter_var($contact, FILTER_VALIDATE_EMAIL) ? $contact : 'no-reply@agency-aa.ru';
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: AA agency <no-reply@agency-aa.ru>',
    'Reply-To: ' . $replyTo,
    'X-Mailer: PHP/' . PHP_VERSION,
]);

if (!mail(RECIPIENT, $encodedSubject, $body, $headers)) {
    error_log('AA agency lead form: mail() returned false');
    finish(false, 'Сервер не смог отправить письмо. Попробуйте ещё раз позднее.', 500);
}

finish(true, 'Заявка отправлена.');
