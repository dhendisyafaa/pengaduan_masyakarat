import Masyarakat from "../models/masyarakat.model.js";
import Pengaduan from "../models/pengaduan.model.js";

export const getAllPengaduans = async (req, res) => {
  try {
    const response = await Pengaduan.findAll({
      include: [{ model: Masyarakat }],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPengaduanById = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

export const createPengaduan = async (req, res) => {
  try {
    res
      .status(201)
      .json({ message: "Pengaduan Tersampaikan!", data: req.body });
    await Pengaduan.create({
      id_pengaduan: req.body.id_pengaduan,
      tgl_pengaduan: req.body.tgl_pengaduan,
      isi_laporan: req.body.isi_laporan,
      foto: req.body.foto,
      status: req.body.status,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const editPengaduan = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePengaduan = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};
