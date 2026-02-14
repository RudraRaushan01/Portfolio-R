// api/contact.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Integrate with an email service like Resend, SendGrid, or Nodemailer here.
    // For now, we'll just log the data and return success.
    console.log('Form submission received:', { name, email, message });

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
