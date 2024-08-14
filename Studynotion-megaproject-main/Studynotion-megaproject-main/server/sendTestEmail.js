const nodemailer = require("nodemailer");
require("dotenv").config();
async function sendTestEmail() {
  try {
    // Create a Nodemailer transporter using your SMTP settings
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587, // Update the port if necessary
      secure: false, // Set to true if using SSL/TLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send a test email
    let info = await transporter.sendMail({
      from: "vineet kumar <nk4709176@gmail.com>",
      to: "vk73511390@gmail.com",
      subject: "Test Email",
      html: "<p>This is a test email sent using Nodemailer.</p>",
    });

    console.log("Test email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
}

// Call the function to send the test email
sendTestEmail();
