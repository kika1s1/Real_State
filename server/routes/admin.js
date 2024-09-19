import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import verifyAdmin from "../middleware/adminMiddleware.js"
import { promoteDemoteAdmin } from "../controllers/admin.js"
const router = express.Router()

router.patch("/promote_demote/:id", verifyToken, verifyAdmin, promoteDemoteAdmin)

export default router