import express from "express";
import {
  createPengaduan,
  deletePengaduan,
  editPengaduan,
  getAllPengaduans,
  getPengaduanById,
} from "../controllers/pengaduan.controller.js";

const router = express.Router();

router.get("/pengaduans", getAllPengaduans);
router.get("/pengaduan:id", getPengaduanById);
router.post("/pengaduan", createPengaduan);
router.patch("/pengaduan:id", editPengaduan);
router.delete("/pengaduan:id", deletePengaduan);

export default router;
