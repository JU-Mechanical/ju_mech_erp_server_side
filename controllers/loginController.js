import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//? Importing the necessary models
import User from "../models/UserDetailsModel/User.js";
dotenv.config();
// Secret key for JWT (store this in an environment variable)
const JWT_SECRET = process.env.JWT;

//? Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    //^ Find the user by email
    const user = await User.findOne({
      email: email,
    });

    console.log(user)
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "MISSING OR INVALID CREDENTIALS!" });
    }
    console.log(user)

    //^ Check password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "MISSING OR INVALID CREDENTIALS!" });
    }

    //& Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: email },
      JWT_SECRET,
      {
        expiresIn: "1d", // Token valid for 1 day
      }
    );

    console.log(token)

    res.status(200).json({ token, user: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};
