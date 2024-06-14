import { Schema, model, InferSchemaType } from 'mongoose';

const messageSchema = new Schema(
   {
      chatId: {
         type: Schema.Types.ObjectId,
         ref: 'Chat',
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
         ref: 'User',
         required: true,
      },
      receivers: {
         type: [
            {
               user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
               isMessageRead: {
                  type: Schema.Types.Boolean,
                  required: false,
                  default: false,
               },
            },
         ],
         required: true,
      },
      reactors: {
         type: [
            {
               reaction: {
                  type: Schema.Types.String,
                  required: true,
               },
               user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            },
         ],
         required: false,
         default: [],
      },
   },
   { timestamps: true }
);

interface IMessageModel extends InferSchemaType<typeof messageSchema> {}

export const Message = model<IMessageModel>('Message', messageSchema);
