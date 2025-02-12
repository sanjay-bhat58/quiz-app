import { DataTypes, Sequelize } from "sequelize";

/**
 * Defines the User model.
 * @param {Sequelize} sequelize - Sequelize instance.
 * @returns {import("sequelize").Model} - User model.
 */
const QuestionModel = (sequelize) =>
  sequelize.define(
    "questions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      options: {
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          if (!Array.isArray(value) || value.length !== 4) {
            throw new Error("Options must be an array of exactly 4 strings");
          }
          this.setDataValue("options", JSON.stringify(value));
        },
      },
      correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      point: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

export default QuestionModel;
