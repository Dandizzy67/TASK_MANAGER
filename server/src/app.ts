import "dotenv/config"; //reads .env into process.env
import express from "express";
import cors from "cors"; // cross origin resource sharing
import mongoose from "mongoose";
import taskRouter from "./routes/taskRoutes";

const app = express(); // was to start up the server in express

const PORT = process.env.PORT || 6741;

//CORS: ONLY the client url address my call this api
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173/",
  }),
);

// converts evrey request to json (javascript format)
app.use(express.json());

//Every Endpoint must start  with /api/tasks is handled  by task router
// .use is an inbuilt middleware (middle man) that can be used to convert, check and validate request

app.use("/api/tasks", taskRouter);

const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URL as string);

  console.log("Database connected successfully");

  app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
};

startServer();
