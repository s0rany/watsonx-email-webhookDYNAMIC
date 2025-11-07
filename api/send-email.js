import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", error: "Method not allowed" });
  }

  const { name, email, message, emailTo } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: emailTo, // dynamic recipient
      subject: `Message from ${name}`,
      text: message
    });
    res.status(200).json({ status: "email_sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: error.message });
  }
}
git branch -M main
git remote add origin https://github.com/s0rany/watsonx-email-webhookDYNAMIC.git
git push -u origin main