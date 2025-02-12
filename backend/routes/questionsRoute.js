import express from "express";
import { addQuestionController } from "../controllers/questionsController/addQuestionController.js";
import authorize from "../utils/authorize.js";
import { removeQuestionController } from "../controllers/questionsController/removeQuestionController.js";
import { getAllQuestionsController } from "../controllers/questionsController/getAllQuestionsController.js";
const questionsRouter = express.Router();

questionsRouter.post("/addQuestion", authorize, addQuestionController);
questionsRouter.post("/removeQuestion", authorize, removeQuestionController);
questionsRouter.get("/getAllQuestions", authorize, getAllQuestionsController);

export default questionsRouter;
