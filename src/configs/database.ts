import { Sequelize } from "sequelize";

const sequelize = new Sequelize("express-pokemon", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
