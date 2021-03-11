import express from "express";
const router = express.Router();
import {
  getAuthUser,
  postNewUser,
  putUpdateUser,
  getUserInfo,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(getAuthUser);
router.route("/register").post(postNewUser);
router.route("/settings").put(protect, putUpdateUser).get(protect, getUserInfo);

export default router;
