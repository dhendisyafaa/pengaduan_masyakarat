import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Masyarakat from "./masyarakat.model.js";
import Tanggapan from "./tanggapan.model.js";

const { DataTypes } = Sequelize;

const Pengaduan = db.define(
  "pengaduan",
  {
    id_pengaduan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tgl_pengaduan: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    nik: DataTypes.CHAR,
    isi_laporan: DataTypes.TEXT,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    // status: DataTypes.STRING,
    status: DataTypes.ENUM("0", "proses", "selesai"),
  },
  {
    freezeTableName: true,
  }
);

Pengaduan.hasMany(Tanggapan, { foreignKey: "id_pengaduan" });
Tanggapan.belongsTo(Pengaduan, { foreignKey: "id_pengaduan" });

export default Pengaduan;

(async () => {
  await db.sync();
})();
