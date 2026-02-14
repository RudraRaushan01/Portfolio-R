// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Create Transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail address (rudraraushan000@gmail.com)
          pass: process.env.EMAIL_PASS, // Your App Password
        },
      });

      // Email Options
      const mailOptions = {
        from: `"${name}" <${email}>`, // "Name" <sender@example.com>
        to: process.env.EMAIL_USER, // Send to yourself
        replyTo: email,
        subject: `New Message from Portfolio: ${name}`,
        text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      // Send Email
      await transporter.sendMail(mailOptions);

      console.log('Email sent successfully');
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });

    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
