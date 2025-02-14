import pkg from "express";
const { Request, Response } = pkg;
import { User } from "../../database/database.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { comparePassword } from "../../utils/managePasswordHashing.js";

/**
 * Controller to create a user.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const userLoginController = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "BAD_REQUEST", message: "Missing required fields" });
  }

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate JWT token
    const token = jwt.sign(
      {
        employeeId: 0,
        userName: "Admin User",
        userRole: "ADMIN",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      status: "OK",
      message: "Admin Login successful",
      data: { token },
    });
  }

  // Check if email or employeeId already exists
  const userData = await User.findOne({
    where: {
      email: email,
    },
    attributes: ["password", "name", "employeeId"],
  });

  if (!userData) {
    return res.status(401).json({
      status: "UNAUTHORIZED",
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await comparePassword(password, userData.password);
  if (isPasswordValid) {
    // Generate JWT token
    const token = jwt.sign(
      {
        employeeId: userData.employeeId,
        userRole: "USER",
        userName: userData.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res
      .status(200)
      .json({ status: "OK", message: "Login successful", data: { token } });
  } else {
    return res.status(401).json({
      status: "UNAUTHORIZED",
      message: "Invalid email or password",
    });
  }
};
