import express from "express";
import dotenv from "dotenv";
dotenv.config();
import usersRouter from "./routes/usersRoute.js";
import sequelize from "./database/database.js";
import questionsRouter from "./routes/questionsRoute.js";

const app = express();
app.use(express.json());

// Test the connection and start server only if successful
async function initializeServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

app.use(usersRouter);
app.use(questionsRouter);

initializeServer();
