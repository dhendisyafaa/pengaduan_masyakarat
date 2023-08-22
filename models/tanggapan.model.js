import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Tanggapan = db.define(
  "tanggapan",
  {
    id_tanggapan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_petugas: DataTypes.INTEGER,
    id_pengaduan: DataTypes.INTEGER,
    // nama_petugas: DataTypes.STRING,
    tgl_tanggapan: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    tanggapan: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Tanggapan;

(async () => {
  await db.sync();
})();
