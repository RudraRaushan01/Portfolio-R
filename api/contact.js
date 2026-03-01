// api/contact.js
import { Resend } from 'resend';

const resend = new Resend('re_2ZZc4oMt_HW2cHxyX1o4obDA53JTczNpa');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Send Email via Resend
      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rudraraushan000@gmail.com',
        reply_to: email,
        subject: `New Message from Portfolio: ${name}`,
        text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error('Error sending email:', error);
        return res.status(400).json({ error: 'Failed to send email' });
      }

      console.log('Email sent successfully via Resend');
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
