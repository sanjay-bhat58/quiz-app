import pkg from "express";
const { Request, Response } = pkg;
import { Question } from "../../database/database.js";

/**
 * Controller to create a user.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const removeQuestionController = async (req, res) => {
  const { questionId } = req.body || {};
  const role = req.role;

  if (role !== "ADMIN") {
    return res.status(403).json({
      status: "FORBIDDEN",
      message: "You are not authorized to add questions",
    });
  }

  if (!questionId || Number.isInteger(questionId) === false) {
    return res
      .status(400)
      .json({ status: "BAD_REQUEST", message: "Missing required fields" });
  }

  const existingQuestion = await Question.findOne({
    where: { id: questionId, isDeleted: false },
    attributes: ["id"],
  });

  if (!existingQuestion) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "Question not found or already deleted",
    });
  }

  try {
    await Question.update(
      { isDeleted: true },
      { where: { id: questionId }, fields: ["isDeleted"] }
    );
    return res
      .status(200)
      .json({ status: "SUCCESS", message: "Question removed successfully!!!" });
  } catch (error) {
    console.error("removeQuestionController", error);
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong. Error deleting question",
    });
  }
};
