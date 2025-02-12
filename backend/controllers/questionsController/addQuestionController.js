import pkg from "express";
const { Request, Response } = pkg;
import { Question } from "../../database/database.js";

/**
 * Controller to create a user.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const addQuestionController = async (req, res) => {
  const { question, options, correctAnswer, point } = req.body || {};
  const role = req.role;

  if (role !== "ADMIN") {
    return res.status(403).json({
      status: "FORBIDDEN",
      message: "You are not authorized to add questions",
    });
  }

  if (
    !question ||
    !options ||
    !correctAnswer ||
    (Array.isArray(options) && options.length !== 4)
  ) {
    return res
      .status(400)
      .json({ status: "BAD_REQUEST", message: "Missing required fields" });
  }

  try {
    await Question.create({
      questionText: question,
      options,
      correctAnswer,
      point: point || 1,
    });
    return res
      .status(200)
      .json({ status: "SUCCESS", message: "Question added successfully!!!" });
  } catch (error) {
    console.error("addQuestionController", error);
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong. Error creating user",
    });
  }
};
