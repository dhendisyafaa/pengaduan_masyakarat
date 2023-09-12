import argon2 from "argon2";
import Masyarakat from "../models/masyarakat.model.js";
import Pengaduan from "../models/pengaduan.model.js";

export const getAllMasyarakat = async (req, res) => {
  try {
    const response = await Masyarakat.findAll({
      attributes: ["uuid", "nik", "nama", "username", "telp"],
      // include: [
      //   {
      //     model: Pengaduan,
      //     // attributes: ["name", "id"],
      //   },
      // ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getMasyarakatById = async (req, res) => {
  try {
    const response = await Masyarakat.findOne({
      attributes: ["uuid", "nik", "nama", "username", "telp"],
      where: {
        uuid: req.params.id,
      },
      include: [{ model: Pengaduan }],
    });
    if (!response)
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createMasyarakat = async (req, res) => {
  const { nik, nama, username, password, telp } = req.body;

  const hashPassword = await argon2.hash(password);
  try {
    await Masyarakat.create({
      nik: nik,
      nama: nama,
      username: username,
      password: hashPassword,
      telp: telp,
    });
    res.status(201).json({ message: "Berhasil register!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const editMasyarakat = async (req, res) => {
  const user = await Masyarakat.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan!" });

  const { nik, nama, username, password, telp } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  try {
    await Masyarakat.update(
      {
        nik: nik || user.nik,
        nama: nama || user.nama,
        username: username || user.username,
        password: hashPassword,
        telp: telp || user.telp,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(201).json({ msg: "Berhasil memperbarui profil!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteMasyarakat = async (req, res) => {
  const user = await Masyarakat.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user)
    return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
  try {
    await Masyarakat.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil menghapus akun!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
