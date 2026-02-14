# Portfolio R - Personal Portfolio Website

This is a personal portfolio website built with HTML, CSS, and Vanilla JavaScript. It is designed to be responsive and features a modern, clean aesthetic.

## Features

- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.
- **Dynamic Content:** Includes a typing effect and a contact form.
- **Clean Code:** Structured HTML, organized CSS, and modular JavaScript.
- **Vercel Ready:** Configured for easy deployment on Vercel with serverless functions.

## Project Structure

- `index.html`: Home page.
- `about.html`: About page.
- `services.html`: Services page.
- `projects.html`: Projects page.
- `contact.html`: Contact page.
- `style.css`: Global styles.
- `script.js`: Interactive logic.
- `api/contact.js`: Vercel Serverless Function for handling contact form submissions.
- `vercel.json`: Vercel configuration for routing and rewrites.

## Deploy to Vercel

This project is ready to be deployed on Vercel.

1.  **Push to GitHub:** Ensure your project is pushed to a GitHub repository.
2.  **Import to Vercel:**
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click "Add New..." -> "Project".
    - Import your GitHub repository.
3.  **Configure:**
    - The `vercel.json` file automatically handles routing (e.g., `/about` instead of `/about.html`).
    - The Serverless Function at `api/contact.js` will automatically be detected and deployed.
4.  **Deploy:** Click "Deploy" and wait for the build to complete.

### Contact Form Setup

The contact form is configured to send emails to `rudraraushan000@gmail.com` using **Nodemailer** and **Gmail**.

**Important:** To make this work, you must set the following **Environment Variables** in your Vercel Project Settings:

1.  **EMAIL_USER**: Your Gmail address (e.g., `rudraraushan000@gmail.com`).
2.  **EMAIL_PASS**: Your **Gmail App Password** (Not your login password!).
    - Go to [Google Account Security](https://myaccount.google.com/security).
    - Search for "App passwords".
    - Create a new app password and copy the 16-character code.

without these variables, the contact form will fail to send emails.

## Local Development

To run this project locally with the serverless function capabilities, you can use the Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Or simply open `index.html` in your browser for the static parts (the contact form will not work without a backend server).
