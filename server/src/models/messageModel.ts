import mongoose, { InferSchemaType } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    people: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: true,
    },
  },
  { timestamps: true }
);

interface IMessageModel extends InferSchemaType<typeof messageSchema> {}

const Message = mongoose.model<IMessageModel>("message", messageSchema);

export default Message;
