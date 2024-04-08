// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); // Import path module
const gmailPassword = process.env.GMAIL_PASSWORD;

const app = express();
app.use(cors(
	{
		"origin": "*",
		"optionsSuccessStatus": 204
	}
))
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nitish1dalvi@gmail.com', // your Gmail username
    pass: process.env.GMAIL_PASSWORD // your Gmail password token
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'nitish1dalvi@gmail.com', // sender email
    to: 'nitish1dalvi@gmail.com', // receiver email
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error occurred while sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Sending index.html file
});

const PORT = process.env.PORT || 5000; // Default to port 5000 if PORT environment variable is not defined
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
