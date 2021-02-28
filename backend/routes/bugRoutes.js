import express from "express";
const router = express.Router();
import {
  getUserBugs,
  postCreateBug,
  getBugDetails,
} from "../controllers/bugController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getUserBugs).post(protect, postCreateBug);
router.route("/:id").get(protect, getBugDetails);

export default router;
