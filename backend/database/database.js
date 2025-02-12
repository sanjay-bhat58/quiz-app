import { Sequelize } from "sequelize";
import UserModel from "./models/userModel.js";
import QuestionModel from "./models/questionModel.js";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: process.env.PORT === "DEV",
});

/** @type {import("sequelize").Model} */
const User = UserModel(sequelize);

/** @type {import("sequelize").Model} */
const Question = QuestionModel(sequelize);

export { User, Question };
export default sequelize;
