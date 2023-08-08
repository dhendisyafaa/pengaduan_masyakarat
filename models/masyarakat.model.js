import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Pengaduan from "./pengaduan.model.js";

const { DataTypes } = Sequelize;

const Masyarakat = db.define(
  "masyarakat",
  {
    nik: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

// Masyarakat.belongsTo(Pengaduan);
// Masyarakat.hasMany(Pengaduan, { foreignKey: "nik" });
// Pengaduan.belongsTo(Masyarakat, { foreignKey: "nik" });

export default Masyarakat;

(async () => {
  await db.sync();
})();
