import Masyarakat from "../models/masyarakat.model.js";
import Petugas from "../models/petugas.model.js";

export const verifyMasyarakat = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon login ke akun Anda!" });
  }
  const user = await Masyarakat.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user)
    return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
  req.userId = user.uuid;
  next();
};

export const adminOnly = async (req, res) => {
  const petugas = await Petugas.findOne({
    where: {
      id_petugas: req.session.userId,
    },
  });
  //   if (!petugas)
  //     return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
  //   if (condition) {
  //   }
  console.log(petugas);
};
