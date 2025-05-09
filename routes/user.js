import express from "express";

//? importing backend controllers
import { login } from "../controllers/loginController.js";
import { signup } from "../controllers/signupController.js";
import { getPrimaryUserDetails } from "../controllers/getPrimaryDetails.js";
import { detailsSubmit } from "../controllers/detailsSubmitController.js";
import { createreq, getUserRequests } from "../controllers/user.js";
import { attachmentsMulter } from "../helpers/multer.js";
import { restructureData } from "../helpers/restructure.js";

const router = express.Router();
//? backend routes
router.post("/login", login); // for user login
router.post("/signup", signup); // for user signup
router.get("/creds-primary", getPrimaryUserDetails); // used to get primary detals for local storage
router.post("/details-submit",attachmentsMulter, detailsSubmit); // for updating details
router.post("/createreq", createreq);
router.post("/getreqs", getUserRequests);


export default router;
