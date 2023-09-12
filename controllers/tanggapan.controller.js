import Pengaduan from "../models/pengaduan.model.js";
import Tanggapan from "../models/tanggapan.model.js";

export const getAllTanggapan = async (req, res) => {
  try {
    const response = await Tanggapan.findAll();
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getTanggapanById = async (req, res) => {
  try {
    const response = await Tanggapan.findOne({
      where: {
        id_tanggapan: req.params.id,
      },
      include: [{ model: Pengaduan }],
    });
    if (!response)
      return res.status(404).json({ message: "Tanggapan tidak ditemukan!" });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createTanggapan = async (req, res) => {
  const { tanggapan, id_petugas, id_pengaduan } = req.body;
  try {
    await Tanggapan.create({
      tanggapan: tanggapan,
      id_petugas: id_petugas,
      id_pengaduan: id_pengaduan,
    });
    res.status(201).json({ message: "Berhasil membuat tanggapan!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const editTanggapan = async (req, res) => {
  const tanggapan = await Tanggapan.findOne({
    where: {
      id_tanggapan: req.params.id,
    },
  });
  if (!tanggapan)
    return res.status(404).json({ message: "Tanggapan tidak ditemukan!" });

  try {
    await Tanggapan.update(
      {
        tanggapan: req.body.tanggapan || tanggapan.tanggapan,
      },
      {
        where: {
          id_tanggapan: req.params.id,
        },
      }
    );
    res.status(201).json({ msg: "Berhasil memperbarui tanggapan!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteTanggapan = async (req, res) => {
  try {
    const tanggapan = await Tanggapan.findOne({
      where: {
        id_tanggapan: req.params.id,
      },
    });
    if (!tanggapan)
      return res.status(404).json({ message: "Tanggapan tidak ditemukan!" });
    try {
      await Tanggapan.destroy({
        where: {
          id_tanggapan: req.params.id,
        },
      });
      res.status(200).json({ message: "Tanggapan berhasil dihapus!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
