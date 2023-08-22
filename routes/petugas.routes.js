import express from "express";
import {
  createPetugas,
  deletePetugas,
  editPetugas,
  getAllPetugas,
  getPetugasById,
} from "../controllers/petugas.controller.js";

const router = express.Router();

router.get("/petugas", getAllPetugas);
router.get("/petugas/:id", getPetugasById);
router.post("/petugas", createPetugas);
router.patch("/petugas/:id", editPetugas);
router.delete("/petugas/:id", deletePetugas);

export default router;
