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
import { Server } from 'socket.io';
import messageRouter from './routers/message.router';

dotenv.config();

// connect to mongoDB database
dbConnect();

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      allowedHeaders: '*',
   },
});

app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

// error handlers
app.use(notFound);
app.use(errorHandler);

server.listen(port, () => {
   console.log(`server is running at port ${port}`);
});

io.on('connection', (socket) => {
   socket.on('new-groupChat', (newGroupChat) => {
      socket.broadcast.emit('new-groupChat', newGroupChat);
   });

   socket.on('new-message', (updatedChat) => {
      socket.broadcast.emit('new-message', updatedChat);
   });
});
