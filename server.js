import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // load your .env variables

const app = express();
app.use(express.json());

// POST endpoint that Watsonx Assistant will call
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Set up the Gmail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your App Password
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name} (via Watsonx)" <${process.env.EMAIL_USER}>`, // shows sender name
      to: process.env.EMAIL_USER, // send to yourself for testing
      subject: `Message from ${name}`,
      text: `From: ${email}\n\n${message}`, // include sender email in the body
    });

    res.json({ status: "email_sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
