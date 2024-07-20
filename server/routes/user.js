import {Router} from 'express'
import { test, updateUser } from '../controllers/user.js'
import upload from "../config/multer.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = Router()

router.get("/test",test)
router.post('/update/:id',verifyToken, upload.single('profileImage'), updateUser); 

export default router