import Masyarakat from "../models/masyarakat.model.js";
import argon2 from "argon2";
import Petugas from "../models/petugas.model.js";

export const Login = async (req, res) => {
  // login using nik and password for masyarakat
  if (req.query.role === "masyarakat") {
    const user = await Masyarakat.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user)
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) {
      return res.status(400).json({ message: "Password salah!" });
    }
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const nama = user.nama;
    const username = user.username;
    res.status(200).json({ uuid, nama, username });
  } else if (req.query.role === "petugas") {
    const petugas = await Petugas.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!petugas)
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    const match = await argon2.verify(petugas.password, req.body.password);
    if (!match) {
      return res.status(400).json({ message: "Password salah!" });
    }
    req.session.id_petugas = petugas.id_petugas;
    const id_petugas = petugas.id_petugas;
    const nama_petugas = petugas.nama_petugas;
    const username = petugas.username;
    res.status(200).json({ id_petugas, nama_petugas, username });
  } else {
    res.status(400).json({ message: "Please add query params role user!" });
  }
};

// export const Login = async (req, res) => {
//   const user = await Masyarakat.findOne({
//     where: {
//       username: req.body.username,
//     },
//   });

//   const petugas = await Petugas.findOne({
//     where: {
//       username: req.body.username,
//     },
//   });

//   if (!user || !petugas)
//     return res.status(404).json({ message: "Pengguna tidak ditemukan!" });

//   const match = await argon2.verify(user.password, req.body.password);
//   if (!match) {
//     return res.status(400).json({ message: "Password salah!" });
//   }
//   req.session.userId = user.uuid;
//   const uuid = user.uuid;
//   const nama = user.nama;
//   const username = user.username;
//   // const telp = user.telp;
//   res.status(200).json({ uuid, nama, username });
// };

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon login ke akun Anda!" });
  }
  const user = await Masyarakat.findOne({
    attributes: ["uuid", "nama", "username", "telp"],
    where: {
      uuid: req.session.userId,
    },
  });
  const petugas = await Petugas.findOne({
    attributes: ["id_petugas", "nama_petugas", "username", "telp"],
    where: {
      id_petugas: req.session.id_petugas,
    },
  });
  if (!user || !petugas)
    return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
  res.status(200).json(user);
};

export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Tidak dapat login" });
    res.status(200).json({ message: "Anda telah logout!" });
  });
};
