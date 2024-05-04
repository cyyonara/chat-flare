import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CONN_STRING as string);
    console.log('db connected');
  } catch (error: any) {
    console.error(error);
  }
};
