import { Schema, InferSchemaType, model } from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: true,
      min: 4,
      max: 24,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      min: 8,
      max: 24,
    },
    profilePicture: {
      type: Schema.Types.String,
      require: false,
      default:
        'https://firebasestorage.googleapis.com/v0/b/school-9c7f7.appspot.com/o/taskify%2Fd2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg?alt=media&token=18eb0774-b91a-416d-be8d-d6a49753cd0e',
    },
  },
  { timestamps: true }
);

interface IUserModel extends InferSchemaType<typeof userSchema> {
  generateToken: () => string;
}

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: '60d',
  });
};

export const User = model<IUserModel>('User', userSchema);
