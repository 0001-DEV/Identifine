<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// Read raw JSON or POST data
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'A valid name and email address are required.']);
    exit;
}

$recipient = 'reachus@xtremecardz.com';
$refId = 'IDF-' . strtoupper(substr(uniqid(), -6));
$timestamp = date('M j, Y - g:i A');
$subject = "NEW ENQUIRY: {$name}";

// Option 3: Clean, Concise & Direct Format (Zero Fluff)
$htmlContent = "
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>New Website Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #111111; margin: 0; padding: 20px; font-size: 15px; line-height: 1.6; }
    .box { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px 28px; }
    .title { font-size: 18px; font-weight: 700; margin: 0 0 16px; color: #111111; border-bottom: 2px solid #E2B857; padding-bottom: 8px; }
    .row { margin-bottom: 10px; }
    .label { font-weight: 600; color: #555555; display: inline-block; width: 70px; }
    .value { color: #111111; }
    .msg-title { font-weight: 600; color: #555555; margin-top: 18px; margin-bottom: 6px; }
    .msg-content { background: #f7f7f7; padding: 14px 16px; border-radius: 6px; color: #111111; white-space: pre-wrap; font-size: 14px; line-height: 1.6; }
    .footer { margin-top: 24px; padding-top: 14px; border-top: 1px solid #eeeeee; font-size: 13px; color: #888888; }
  </style>
</head>
<body>
  <div class='box'>
    <div class='title'><strong>NEW ENQUIRY</strong></div>
    <div style='height: 16px;'></div>
    <div class='row'><span class='label'>Name:</span> <span class='value'><strong>" . htmlspecialchars($name) . "</strong></span></div>
    <div class='row'><span class='label'>Email:</span> <span class='value'><a href='mailto:" . htmlspecialchars($email) . "' style='color: #111111; text-decoration: underline;'>" . htmlspecialchars($email) . "</a></span></div>
    <div class='row'><span class='label'>Date:</span> <span class='value'>{$timestamp}</span></div>
    
    <div class='msg-title'>Message:</div>
    <div class='msg-content'>" . nl2br(htmlspecialchars($message)) . "</div>

    <div class='footer'>
      Click <strong>Reply</strong> to email " . htmlspecialchars($name) . " directly.
    </div>
  </div>
</body>
</html>
";

$mailSent = false;
$serverHost = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'identifine.com.ng';
$senderEmail = 'noreply@' . $serverHost;

// Method 1: WordPress wp_mail()
if (file_exists(__DIR__ . '/wp-load.php')) {
    try {
        require_once __DIR__ . '/wp-load.php';
        if (function_exists('wp_mail')) {
            $wpHeaders = [
                'Content-Type: text/html; charset=UTF-8',
                'From: Identifine Web <' . $senderEmail . '>',
                'Reply-To: ' . $name . ' <' . $email . '>'
            ];
            $mailSent = wp_mail($recipient, $subject, $htmlContent, $wpHeaders);
        }
    } catch (\Throwable $e) {
        // Fallback below
    }
}

// Method 2: Native PHP mail() with strict envelope parameters
if (!$mailSent) {
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=utf-8';
    $headers[] = 'From: Identifine Web <' . $senderEmail . '>';
    $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
    $headers[] = 'Return-Path: <' . $senderEmail . '>';
    $headers[] = 'X-Mailer: PHP/' . phpversion();

    $mailSent = @mail($recipient, $subject, $htmlContent, implode("\r\n", $headers), '-f' . $senderEmail);
    if (!$mailSent) {
        $mailSent = @mail($recipient, $subject, $htmlContent, implode("\n", $headers), '-f' . $senderEmail);
    }
}

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Inquiry successfully transmitted',
        'refId' => $refId
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Mail delivery could not be completed directly by server.',
        'recipient' => $recipient,
        'refId' => $refId
    ]);
}
