import User from "../models/UserDetailsModel/User.js";
import { getPercentageFilled } from "../utils/getcompletionstatus.js";
import { sendReminderEmail } from "../utils/mailer.js";

export const getallusers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 20; // Default to 20 users per page

    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit);

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const sendIncompleteUsersReminder = async (req, res) => {
  try {
    const users = await User.find({});
    let count = 0;

    for (const user of users) {
      const percentage = getPercentageFilled(user.toObject());
      console.log(`User: ${user.email}, Completion: ${percentage}%`);
      if (percentage < 100 && user.email ) {
        await sendReminderEmail(user.email, user.name, percentage);
        count++;
      }
    }

    res.status(200).json({ message: `Sent ${count} reminder emails.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

