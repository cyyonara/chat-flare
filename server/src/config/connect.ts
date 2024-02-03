import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_CONN_STRING as string);
    console.log("db connected!");
  } catch (error: any) {
    console.error(error);
  }
};
