import { Schema, model, InferSchemaType } from 'mongoose';

const chatSchema = new Schema(
  {
    chatName: {
      type: Schema.Types.String,
      required: true,
    },
    chatCreator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isGroupChat: {
      type: Schema.Types.Boolean,
      required: true,
    },
    users: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
          isLeaved: { type: Schema.Types.Boolean, required: true },
        },
      ],
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

interface IChatModel extends InferSchemaType<typeof chatSchema> {}

chatSchema.pre('save', function (next) {
  const usersCopy: { user: string; isLeaved: boolean }[] = [];

  this.users.forEach((user) => {
    const isUserExist = usersCopy.find((u) => u.user === user._id?.toString());

    if (isUserExist) {
      throw new Error('Users cannot duplicate');
    } else {
      usersCopy.push({ user: user._id!.toString(), isLeaved: false });
    }
  });
});

export const Chat = model<IChatModel>('Chat', chatSchema);
