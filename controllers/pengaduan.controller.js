import Masyarakat from "../models/masyarakat.model.js";
import Pengaduan from "../models/pengaduan.model.js";
import path from "path";
import fs from "fs";
import Tanggapan from "../models/tanggapan.model.js";

export const getAllPengaduan = async (req, res) => {
  try {
    const response = await Pengaduan.findAll({
      // include: [{ model: Masyarakat }, { model: Tanggapan }],
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getPengaduanById = async (req, res) => {
  try {
    const response = await Pengaduan.findOne({
      where: {
        id_pengaduan: req.params.id,
      },
      include: [{ model: Tanggapan }],
    });
    if (!response)
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createPengaduan = async (req, res) => {
  try {
    const nik = req.body.nik;
    const isi_laporan = req.body.isi_laporan;
    const status = "proses";

    const file = req.files.image;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
    const fileSize = file.data.length;

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({
        message: "Invalid image!",
      });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });
      try {
        await Pengaduan.create({
          nik: nik,
          image: fileName,
          url: url,
          isi_laporan: isi_laporan,
          status: status,
        }).then((result) => {
          res
            .status(201)
            .json({ message: "Pengaduan berhasil diajukan!", created: result });
        });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const editPengaduan = async (req, res) => {
  const pengaduan = await Pengaduan.findOne({
    where: {
      id_pengaduan: req.params.id,
    },
  });
  if (!pengaduan)
    return res.status(404).json({ message: "Pengguna tidak ditemukan!" });

  let fileName;
  if (req.files === null) {
    fileName = pengaduan.image;
  } else {
    const file = req.files.image;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    const allowedType = [".png", ".jpg", ".jpeg"];
    const fileSize = file.data.length;

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({
        message: "Invalid image!",
      });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${pengaduan.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const isi_laporan = req.body.isi_laporan;
  const status = "proses";
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Pengaduan.update(
      { image: fileName, url: url, isi_laporan: isi_laporan, status: status },
      {
        where: {
          id_pengaduan: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Pengaduan berhasil diubah!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deletePengaduan = async (req, res) => {
  const pengaduan = await Pengaduan.findOne({
    where: {
      id_pengaduan: req.params.id,
    },
  });
  if (!pengaduan)
    return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
  try {
    const filepath = `./public/images/${pengaduan.image}`;
    fs.unlinkSync(filepath);
    await Pengaduan.destroy({
      where: {
        id_pengaduan: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil menghapus pengaduan!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
