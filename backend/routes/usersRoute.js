import express from "express";
import { createUserController } from "../controllers/usersControllers/createUserController.js";
import { userLoginController } from "../controllers/usersControllers/userLogin.js";
const usersRouter = express.Router();

usersRouter.post("/createAccount", createUserController);

usersRouter.post("/userLogin", userLoginController);

export default usersRouter;
