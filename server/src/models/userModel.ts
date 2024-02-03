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

interface TUserModel extends InferSchemaType<typeof userSchema> {
  generateToken: () => string;
}

const User = mongoose.model<TUserModel>("user", userSchema);

export default User;
