import { UserDoc } from "@/types/user";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"], // restrict to valid roles
      default: "user",
    },
  },
  { timestamps: true }
);

const User = models.User || model<UserDoc>("User", UserSchema);

export default User;
