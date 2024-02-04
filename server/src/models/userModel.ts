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
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F4819327-male-avatar-profile-icon-of-smiling-caucasian-man&psig=AOvVaw3vcky0viNQB55WUEqBf0DV&ust=1707099150274000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOCX8YXOkIQDFQAAAAAdAAAAABAJ",
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

const User = mongoose.model<IUserModel>("user", userSchema);

export default User;
