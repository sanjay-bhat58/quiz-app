import { DataTypes, Sequelize } from "sequelize";

/**
 * Defines the User model.
 * @param {Sequelize} sequelize - Sequelize instance.
 * @returns {import("sequelize").Model} - User model.
 */
const UserModel = (sequelize) =>
  sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(330),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      employeeId: {
        type: DataTypes.STRING(12),
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default UserModel;
