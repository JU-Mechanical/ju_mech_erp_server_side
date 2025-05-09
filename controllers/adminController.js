import User from "../models/UserDetailsModel/User.js"

export const getallusers=async(req,res)=>{
    try {
        const users=await User.find({});
         console.log('jh');
        res.status(200).json(users);
    } catch (error) {
        
    }
}