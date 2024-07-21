import {Router} from 'express'
import { deleteUser, getUser, getUserListings, test, updateUser } from '../controllers/user.js'
import upload from "../config/multer.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = Router()

router.get("/test",test)
router.post('/update/:id',verifyToken, upload.single('profileImage'), updateUser); 
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)
export default router