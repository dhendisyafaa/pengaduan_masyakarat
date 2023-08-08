import { Sequelize } from "sequelize";

const db = new Sequelize("", "", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
