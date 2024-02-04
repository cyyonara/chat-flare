import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import morgan from "morgan";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import { connect } from "./config/connect";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import chatRouter from "./routes/chatRouter";

dotenv.config();

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);

connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chats", chatRouter);

app.use(notFound);
app.use(errorHandler);

server.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
