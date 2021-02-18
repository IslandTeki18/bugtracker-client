import express from "express";
const router = express.Router();
import { getUserBugs, postCreateBug } from "../controllers/bugController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getUserBugs).post(protect, postCreateBug);

export default router;
