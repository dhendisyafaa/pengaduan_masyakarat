import argon2 from "argon2";
import Petugas from "../models/petugas.model.js";
import Tanggapan from "../models/tanggapan.model.js";

export const getAllPetugas = async (req, res) => {
  try {
    const response = await Petugas.findAll({
      attributes: ["id_petugas", "nama_petugas", "username", "telp", "level"],
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getPetugasById = async (req, res) => {
  try {
    const response = await Petugas.findOne({
      attributes: ["id_petugas", "nama_petugas", "username", "telp", "level"],
      where: {
        id_petugas: req.params.id,
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

export const createPetugas = async (req, res) => {
  const { nama_petugas, username, password, telp, level } = req.body;

  const hashPassword = await argon2.hash(password);
  try {
    await Petugas.create({
      nama_petugas: nama_petugas,
      username: username,
      password: hashPassword,
      telp: telp,
      level: level,
    });
    res.status(201).json({ message: "Berhasil register!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const editPetugas = async (req, res) => {
  const user = await Petugas.findOne({
    where: {
      id_petugas: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan!" });

  const { nama_petugas, username, password, telp, level } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  try {
    await Petugas.update(
      {
        nama_petugas: nama_petugas || user.nama_petugas,
        username: username || user.username,
        password: hashPassword,
        telp: telp || user.telp,
        level: level || user.level,
      },
      {
        where: {
          id_petugas: req.params.id,
        },
      }
    );
    res.status(201).json({ msg: "Berhasil memperbarui profil!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deletePetugas = async (req, res) => {
  const findUser = await Petugas.findOne({
    where: {
      id_petugas: req.params.id,
    },
  });
  if (!findUser)
    return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
  try {
    await Petugas.destroy({
      where: {
        id_petugas: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil menghapus akun!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
