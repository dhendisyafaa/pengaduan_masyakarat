import express from "express";
import {
  createTanggapan,
  deleteTanggapan,
  editTanggapan,
  getAllTanggapan,
  getTanggapanById,
} from "../controllers/tanggapan.controller.js";

const router = express.Router();

router.get("/tanggapan", getAllTanggapan);
router.get("/tanggapan/:id", getTanggapanById);
router.post("/tanggapan", createTanggapan);
router.patch("/tanggapan/:id", editTanggapan);
router.delete("/tanggapan/:id", deleteTanggapan);

export default router;
