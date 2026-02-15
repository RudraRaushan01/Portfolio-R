const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// 1. Read .env file manually since dotenv is not installed
const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found at', envPath);
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        envVars[key] = value;
    }
});

const { EMAIL_USER, EMAIL_PASS } = envVars;

if (!EMAIL_USER || !EMAIL_PASS || EMAIL_PASS === 'YOUR_APP_PASSWORD_HERE') {
    console.error('Error: Invalid credentials in .env file.');
    console.error('EMAIL_USER:', EMAIL_USER);
    console.error('EMAIL_PASS:', EMAIL_PASS ? '******' : 'undefined');
    process.exit(1);
}

// 2. Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// 3. Send Test Email
const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER, // Send to self
    subject: 'Test Email from Portfolio R Project',
    text: 'If you are reading this, your email configuration works!',
};

console.log('Attempting to send test email to', EMAIL_USER, '...');

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Success! Test email sent:', info.response);
    }
});
