import mongoose, { InferSchemaType } from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatPhoto: {
      type: String,
      default: null,
    },
    people: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true }
);

interface IChatModel extends InferSchemaType<typeof chatSchema> {}

const Chat = mongoose.model<IChatModel>("user", chatSchema);

export default Chat;
