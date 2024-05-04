import { Schema, model, InferSchemaType } from 'mongoose';

const messageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'chat',
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    isImage: {
      type: Schema.Types.Boolean,
      required: true,
    },
    isLeaveMessage: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
    isNewMemberMessage: {
      type: Schema.Types.Boolean,
      required: false,
      default: false,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    receivers: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
          isMessageRead: { type: Schema.Types.Boolean, required: false, default: false },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

interface IMessageModel extends InferSchemaType<typeof messageSchema> {}

export const Message = model<IMessageModel>('message', messageSchema);
