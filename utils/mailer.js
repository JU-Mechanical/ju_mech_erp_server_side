import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or use smtp config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReminderEmail = async (toEmail, name, percentage) => {
  const loginLink= `${process.env.CLIENT_URL}/`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
     subject: "Complete Your JU Mech ERP Profile",
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f4f4f4; padding: 30px; border-radius: 10px; color: #333;">
    <h2 style="color: #b70924;">Hi ${name || "there"},</h2>

    <p>We noticed that your <strong>JU Mechanical Engineering ERP</strong> profile is not fully completed yet.</p>

    <p>Completing your profile ensures you receive all official department communications and alumni benefits without any interruptions.</p>

    <p>Please click the button below to log in and complete your details.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${loginLink}" style="
        background-color: #b70924;
        color: #fff;
        padding: 14px 28px;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
        display: inline-block;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      ">
        Complete My Profile
      </a>
    </div>

    <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>

    <div style="background-color: #fff; padding: 12px 15px; border-radius: 6px; border: 1px solid #ccc; word-wrap: break-word; font-size: 14px; color: #b70924;">
      ${loginLink}
    </div>

    <p>If you have already updated your profile recently, you can ignore this email.</p>

    <p>Thanks,<br/>
    <strong>Department of Mechanical Engineering</strong><br/>
    Jadavpur University</p>
  </div>
  `,
  };

  return transporter.sendMail(mailOptions);
};
