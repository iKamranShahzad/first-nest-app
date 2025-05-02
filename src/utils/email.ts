import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
export async function sendVerificationEmail(to: string, token: string) {
  const verificationUrl = `http://localhost:5173/verify?token=${token}`;
  await transporter.sendMail({
    from: '"No Reply" <noreply@example.com>',
    to,
    subject: 'Verify your account',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`,
  });
}

export async function sendResetEmail(to: string, token: string) {
  const verificationUrl = `http://localhost:5173/reset-password?token=${token}`;
  await transporter.sendMail({
    from: '"No Reply" <noreply@example.com>',
    to,
    subject: 'Reset your password',
    html: `<p>Click <a href="${verificationUrl}">here</a> to reset your account's password.</p>`,
  });
}
