import { Resend } from 'resend';

// ensure the environment variable is set; log if missing
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not defined.  Email sending will fail.');
}
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // only accept POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { name, email, message } = req.body || {};

  // basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'rudraraushan000@gmail.com',
      subject: `New Contact from ${name}`,
      html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    console.log('resend response', result);
    return res.status(200).json({ success: true });
  } catch (error) {
    // log detailed error for debugging
    console.error('Error sending contact email:', error);
    // some error objects from Resend come back as {message, ...}
    return res.status(500).json({ error: error.message || error });
  }
}
