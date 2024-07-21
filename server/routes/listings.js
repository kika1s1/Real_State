import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, uploadImage } from '../controllers/listings.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../config/upload.js';
const router = express.Router();
router.post("/upload",  upload.array('images', 6), uploadImage)
router.post('/create', upload.array('images', 6), verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;
