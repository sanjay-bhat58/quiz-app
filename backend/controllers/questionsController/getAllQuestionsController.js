import pkg from "express";
const { Request, Response } = pkg;
import { Question } from "../../database/database.js";

/**
 * Controller to create a user.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getAllQuestionsController = async (req, res) => {
  const role = req.role;

  if (role !== "ADMIN") {
    return res.status(403).json({
      status: "FORBIDDEN",
      message: "You are not authorized to access all questions",
    });
  }

  try {
    let questions = await Question.findAll({
      where: { isDeleted: false },
      attributes: ["id", "questionText", "options", "correctAnswer", "point"],
    });
    questions = questions.map((question) => ({
      ...question.dataValues,
      options: JSON.parse(question.dataValues.options),
    }));
    return res
      .status(200)
      .json({
        status: "OK",
        message: "All questions fetched successfully",
        data: { questions },
      });
  } catch (error) {
    console.error("getAllQuestionsController", error);
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong. Error deleting question",
    });
  }
};
