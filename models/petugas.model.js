import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Petugas = db.define(
  "petugas",
  {
    id_petugas: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_petugas: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telp: DataTypes.INTEGER,
    level: DataTypes.ENUM("admin", "petugas"),
  },
  {
    freezeTableName: true,
  }
);

export default Petugas;

(async () => {
  await db.sync();
})();
