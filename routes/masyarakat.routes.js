import express from "express";
import {
  createMasyarakat,
  deleteMasyarakat,
  editMasyarakat,
  getAllMasyarakat,
  getMasyarakatById,
} from "../controllers/masyarakat.controller.js";
import { verifyMasyarakat } from "../middleware/AuthUser.middleware.js";

const router = express.Router();

router.get("/masyarakat", verifyMasyarakat, getAllMasyarakat);
router.get("/masyarakat/:id", verifyMasyarakat, getMasyarakatById);
router.post("/masyarakat", createMasyarakat);
router.patch("/masyarakat/:id", verifyMasyarakat, editMasyarakat);
router.delete("/masyarakat/:id", verifyMasyarakat, deleteMasyarakat);

export default router;
