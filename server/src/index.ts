import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.router';
import userRouter from './routers/user.router';
import chatRouter from './routers/chat.router';
import { dbConnect } from './config/db.connect';
import { notFound, errorHandler } from './middlewares/error.handler';

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
