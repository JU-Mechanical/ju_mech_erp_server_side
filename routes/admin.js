import express from "express";
import { getallusers } from "../controllers/adminController.js";


const router = express.Router();
//? backend routes
router.get("/getstudents", getallusers); // for user login



export default router;
