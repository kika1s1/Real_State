import { Router } from "express";

import { signup,signin, google, updateUserProfile } from "../controllers/auth.js";
import upload from "../config/multer.js";
const router = Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.put('/update_profile', upload.single('profileImage'), updateUserProfile); 


export default router;
