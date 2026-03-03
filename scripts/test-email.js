const { Resend } = require('resend');

const resend = new Resend('re_EDK9t77w_H9GaATrNC89EgQEmey59SbKw');

console.log('Attempting to send test email to rudraraushan000@gmail.com...');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'rudraraushan000@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
}).then((response) => { 
    if (response.error) {
        console.error('Error sending email:', response.error);
    } else {
        console.log('Success! Test email sent:', response.data);
    }
}).catch((error) => {
    console.error('Unexpected error:', error);
});
