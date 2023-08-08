import express from "express";
import {
  createMasyarakat,
  deleteMasyarakat,
  editMasyarakat,
  getAllMasyarakats,
  getMasyarakatById,
} from "../controllers/masyarakat.controller.js";

const router = express.Router();

router.get("/masyarakats", getAllMasyarakats);
router.get("/masyarakat/:id", getMasyarakatById);
router.post("/masyarakat", createMasyarakat);
router.patch("/masyarakat/:id", editMasyarakat);
router.delete("/masyarakat/:id", deleteMasyarakat);

export default router;
