import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Masyarakat from "./masyarakat.model.js";

const { DataTypes } = Sequelize;

const Pengaduan = db.define(
  "pengaduan",
  {
    id_pengaduan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tgl_pengaduan: DataTypes.DATE,
    nik: DataTypes.STRING,
    isi_laporan: DataTypes.STRING,
    foto: DataTypes.STRING,
    status: DataTypes.ENUM("0", "proses", "selesai"),
  },
  {
    freezeTableName: true,
  }
);

export default Pengaduan;

(async () => {
  await db.sync();
})();
