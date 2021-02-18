import express from "express";
const router = express.Router();
import { getAuthUser, postNewUser } from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/login").post(getAuthUser);
router.route("/").post(postNewUser);

export default router;
