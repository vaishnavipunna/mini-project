import { ObjectId } from "mongoose";
import { Id } from ".";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UserDoc extends IUser {
  _id: ObjectId;
}

export interface UserType extends IUser {
  id: Id;
}
