import express from "express";
const router = express.Router();
import {
  getUserBugs,
  postCreateBug,
  getBugDetails,
  deleteBugById,
  putBugById,
  postCreateBugNote,
} from "../controllers/bugController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getUserBugs).post(protect, postCreateBug);
router
  .route("/:id")
  .get(protect, getBugDetails)
  .delete(protect, deleteBugById)
  .put(protect, putBugById);
router.route("/:id/notes").post(protect, postCreateBugNote);

export default router;
