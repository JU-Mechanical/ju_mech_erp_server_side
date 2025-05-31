
import dotenv from "dotenv";
//? Importing the necessary models
import User from "../models/UserDetailsModel/User.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
dotenv.config();

export const forgotpwd= async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  // Always respond with success for privacy
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ message: 'If email exists, a reset link was sent.' });

  const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '15m' });

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
   console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log(resetLink)
  await transporter.sendMail({
    to: user.email,
    subject: "Reset your JU Mech ERP password",
    html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f4f4f4; padding: 30px; border-radius: 10px; color: #333;">
  <h2 style="color: #b70924;">Hi ${user.name || "there"},</h2>

  <p>You recently requested to reset your password for your <strong>JU Mechanical Engineering ERP</strong> account.</p>

  <p>Click the button below to reset it. <strong>This link will expire in 15 minutes.</strong></p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${resetLink}" style="
      background-color: #b70924;
      color: #fff;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 6px;
      font-size: 16px;
      display: inline-block;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    ">
      Reset Your Password
    </a>
  </div>

  <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>

  <div style="background-color: #fff; padding: 12px 15px; border-radius: 6px; border: 1px solid #ccc; word-wrap: break-word; font-size: 14px; color: #b70924;">
    ${resetLink}
  </div>

  <p>If you did not request a password reset, please ignore this email or contact us if you have concerns.</p>

  <p>Thanks,<br/>
  <strong>Department of Mechanical Engineering</strong><br/>
  Jadavpur University</p>
</div>
`,
  });

  return res.status(200).json({ message: 'If email exists, a reset link was sent.' });
}

export const resetpwd=async(req,res)=>{
    const { token } = req.params;
  const { newPassword } = req.body;
  console.log(token,newPassword);
  const JWT_SECRET = process.env.JWT;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const user = await User.findOne({
    _id: payload.id,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return res.status(200).json({ message: 'Password reset successful' });
}