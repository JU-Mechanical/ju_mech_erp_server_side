import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//? Importing the necessary models
import User from "../models/UserDetailsModel/User.js";
dotenv.config();
// Secret key for JWT (store this in an environment variable)
const JWT_SECRET = process.env.JWT;

//? get primary user details
export const getPrimaryUserDetails = async (req, res) => {
  try {
    //?getting the token from the request header
    const token = req.headers.authorization.split(" ")[1]; // Extracting the token from the request header
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    //^ Verify & decode the token
    // let decoded;
    // try{
    //   decoded = jwt.verify(token, JWT_SECRET);
    // }catch (error){
    //   console.log(error)
    // }
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const userId = decoded.userId; // Extracting the user ID from the token
    const email = decoded.email; // Extracting the email from the token

    // Find the user by ID and select only the required fields
    const user = await User.findById(userId).select(
      "name email mobileNo rollNumber personalInfo enrollmentDetails academicBackground academicInfo curricularInfo careerProgression miscellaneous"
    );

    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }

    if (user.email !== email) {
      return res.status(403).json({ message: "UNAUTHORIZED ACCESS!" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
