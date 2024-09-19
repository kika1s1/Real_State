import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import verifyAdmin from "../middleware/adminMiddleware.js"
import { promoteAdmin } from "../controllers/admin.js"
const router = express.Router()

router.patch("/promote/:id", verifyToken, verifyAdmin, promoteAdmin)

export default router