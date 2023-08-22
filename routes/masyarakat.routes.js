import express from "express";
import {
  createMasyarakat,
  deleteMasyarakat,
  editMasyarakat,
  getAllMasyarakat,
  getMasyarakatById,
} from "../controllers/masyarakat.controller.js";

const router = express.Router();

router.get("/masyarakat", getAllMasyarakat);
router.get("/masyarakat/:id", getMasyarakatById);
router.post("/masyarakat", createMasyarakat);
router.patch("/masyarakat/:id", editMasyarakat);
router.delete("/masyarakat/:id", deleteMasyarakat);

export default router;
