import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import chatRouter from './routers/chatRouter';
import { dbConnect } from './config/dbConnect';
import { notFound, errorHandler } from './middlewares/errorHandler';

dotenv.config();

// connect to mongoDB database
dbConnect();

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chats', chatRouter);

// error handlers
app.use(notFound);
app.use(errorHandler);

server.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
