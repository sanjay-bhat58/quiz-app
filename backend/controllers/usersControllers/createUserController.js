import pkg from "express";
const { Request, Response } = pkg;
import { User } from "../../database/database.js";
import { Op } from "sequelize";
import { generatePasswordHash } from "../../utils/managePasswordHashing.js";

/**
 * Controller to create a user.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const createUserController = async (req, res) => {
  const { email, password, name, employeeId } = req.body || {};

  if (!email || !password || !name || !employeeId) {
    return res
      .status(400)
      .json({ status: "BAD_REQUEST", message: "Missing required fields" });
  }

  // Check if email or employeeId already exists
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { employeeId: employeeId }],
    },
    attributes: ["employeeId"],
  });

  if (existingUser) {
    return res.status(409).json({
      status: "CONFLICT",
      message: "User with the given email or employee ID already exists",
    });
  }

  try {
    const hashedPassword = await generatePasswordHash(password);
    await User.create({ email, password: hashedPassword, name, employeeId });
    return res
      .status(200)
      .json({ status: "SUCCESS", message: "User created successfully!!!" });
  } catch (error) {
    console.error("createUserController", error);
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong. Error creating user",
    });
  }
};
