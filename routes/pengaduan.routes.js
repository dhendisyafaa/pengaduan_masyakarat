import express from "express";
import {
  createPengaduan,
  deletePengaduan,
  editPengaduan,
  getAllPengaduan,
  getPengaduanById,
} from "../controllers/pengaduan.controller.js";
import { verifyMasyarakat } from "../middleware/AuthUser.middleware.js";

const router = express.Router();

router.get("/pengaduan", verifyMasyarakat, getAllPengaduan);
router.get("/pengaduan/:id", verifyMasyarakat, getPengaduanById);
router.post("/pengaduan", verifyMasyarakat, createPengaduan);
router.patch("/pengaduan/:id", verifyMasyarakat, editPengaduan);
router.delete("/pengaduan/:id", verifyMasyarakat, deletePengaduan);

export default router;
