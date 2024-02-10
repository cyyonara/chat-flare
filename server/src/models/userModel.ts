import mongoose, { InferSchemaType } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/school-9c7f7.appspot.com/o/tic-talk%2FdefaultAvatar.png?alt=media&token=1c88256c-cd60-46f9-9e13-98027da79a6a",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function (): string {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET as string, {
    expiresIn: "60d",
  });
};

interface IUserModel extends InferSchemaType<typeof userSchema> {
  generateToken: () => string;
}

const User = mongoose.model<IUserModel>("User", userSchema);

export default User;
