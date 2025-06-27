import nodemailer from "nodemailer";

// Transport config
const transport = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, body: string): Promise<void> {
  try {
    if (!to || !body) {
      throw new Error(`Invalid email or body: to=${to}, body=${body}`);
    }

    await transport.sendMail({
      from: "workflow@gmail.com",
      sender: "workflow@gmail.com",
      to,
      subject: "Hello from workflow",
      text: body,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}:`, err);
    throw err; 
  }
}
