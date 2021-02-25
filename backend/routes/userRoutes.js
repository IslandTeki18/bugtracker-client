import express from "express";
const router = express.Router();
import { getAuthUser, postNewUser } from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(getAuthUser);
router.route("/register").post(postNewUser);

export default router;
