import { Schema, model, InferSchemaType } from 'mongoose';

const chatSchema = new Schema(
  {
    chatName: {
      type: Schema.Types.String,
      required: true,
    },
    chatCreator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    isGroupChat: {
      type: Schema.Types.Boolean,
      required: true,
    },
    people: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
          isLeaved: { type: Schema.Types.Boolean, required: false, default: false },
        },
      ],
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'message',
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

interface IChatModel extends InferSchemaType<typeof chatSchema> {}

export const Chat = model<IChatModel>('chat', chatSchema);
