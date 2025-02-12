import { Sequelize } from "sequelize";
import UserModel from "./models/userModel.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

/** @type {import("sequelize").Model} */
const User = UserModel(sequelize);

export { User };
export default sequelize;
